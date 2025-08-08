/**
 * Shared TypeScript types actually used in the application
 */

// API response wrapper (used in services/api.ts)
export interface ApiResponse<T = unknown> {
  data: T
  message?: string
  status: "ok" | "error"
}

// Type for store constructors with optional persistence config
export interface StoreConstructor<T = unknown> {
  new (): T
  persistenceConfig?: {
    key: string
    enabled?: boolean
    schema?: unknown // ZodSchema - using unknown to avoid Zod dependency in shared types
  }
  name?: string
}
