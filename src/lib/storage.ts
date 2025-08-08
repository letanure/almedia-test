const PREFIX = "app_"

function getKey(key: string): string {
  return `${PREFIX}${key}`
}

export function setItem<T>(key: string, value: T): boolean {
  try {
    const serialized = JSON.stringify(value)
    localStorage.setItem(getKey(key), serialized)
    return true
  } catch (_error) {
    console.warn(`Failed to save to localStorage:`, _error)
    return false
  }
}

export function getItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(getKey(key))
    if (item === null) return null
    return JSON.parse(item) as T
  } catch (_error) {
    console.warn(`Failed to read from localStorage:`, _error)
    return null
  }
}

export function removeItem(key: string): boolean {
  try {
    localStorage.removeItem(getKey(key))
    return true
  } catch (_error) {
    console.warn(`Failed to remove from localStorage:`, _error)
    return false
  }
}

export function clear(): boolean {
  try {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith(PREFIX),
    )
    keys.forEach((key) => localStorage.removeItem(key))
    console.log("Cleared all app localStorage data")
    return true
  } catch (_error) {
    console.warn(`Failed to clear localStorage:`, _error)
    return false
  }
}

if (typeof window !== "undefined" && import.meta.env.DEV) {
  ;(window as Window & { clearAppStorage?: () => boolean }).clearAppStorage =
    clear
}

export function hasItem(key: string): boolean {
  try {
    return localStorage.getItem(getKey(key)) !== null
  } catch (_error) {
    return false
  }
}

export function isSupported(): boolean {
  try {
    const testKey = "__storage_test__"
    localStorage.setItem(testKey, "test")
    localStorage.removeItem(testKey)
    return true
  } catch (_error) {
    return false
  }
}
