/**
 * Shared API Types
 *
 * Only the types that API services actually need to import.
 * Internal ApiClient types are co-located with the client.
 */

export interface ApiError {
  type:
    | "network"
    | "validation"
    | "server"
    | "auth"
    | "timeout"
    | "abort"
    | "unknown"
  message: string
  status?: number
  code?: string
  details?: Record<string, unknown>
  timestamp?: number
}

export type ApiResponse<T, E = ApiError> =
  | { error: false; data: T }
  | { error: true; data: E }
