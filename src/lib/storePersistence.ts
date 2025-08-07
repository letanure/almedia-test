import { action, reaction } from "mobx"
import * as storage from "./storage"

export interface PersistenceConfig {
  enabled?: boolean
  key?: string
  debounceMs?: number
  schema?: unknown // ZodSchema - using unknown to avoid Zod dependency
  // Updated for E2E snapshot fixes
}

export function makePersistent<T extends object>(
  store: T,
  config: PersistenceConfig = {},
): T {
  const { enabled = true, key, debounceMs = 300, schema } = config

  if (!enabled || !storage.isSupported()) {
    return store
  }

  const storageKey = key || store.constructor.name

  let timeoutId: NodeJS.Timeout | null = null

  const saveToStorage = action(() => {
    storage.setItem(storageKey, store)
  })

  const debouncedSave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(saveToStorage, debounceMs)
  }

  const loadFromStorage = action(() => {
    const rawData = storage.getItem<Partial<T>>(storageKey)
    if (rawData) {
      if (schema && typeof schema === "object" && "parse" in schema) {
        // Validate with Zod schema if provided
        try {
          const validatedData = (
            schema as { parse: (data: unknown) => T }
          ).parse(rawData)
          Object.assign(store, validatedData)
        } catch (error) {
          console.warn(`Hydration validation failed for ${storageKey}:`, error)
          // Could either: ignore corrupted data, use defaults, or throw
          // For now, ignore corrupted data and use store defaults
        }
      } else {
        // No schema provided, trust the data (backward compatibility)
        Object.assign(store, rawData)
      }
    }
  })

  loadFromStorage()

  reaction(
    () => JSON.stringify(store),
    () => debouncedSave(),
    { fireImmediately: false },
  )

  return store
}
