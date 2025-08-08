/**
 * Simple API Client
 *
 * Lightweight HTTP client with consistent error handling.
 * Add features as needed - keep it simple!
 */

import type { ApiError, ApiResponse } from "@/types/api"

/**
 * Internal ApiClient Types
 * These are only used by the ApiClient implementation
 */

export interface ApiConfig {
  baseUrl: string
  authType?: "none" | "bearer" | "apikey" | "basic"
  authHeader?: string
  timeout?: number
}

export class ApiClient {
  private config: ApiConfig

  constructor(config: ApiConfig) {
    this.config = config
  }

  /**
   * Make HTTP request with standardized error handling
   */
  async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const url = `${this.config.baseUrl}${endpoint}`

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        const error: ApiError = {
          type: response.status >= 500 ? "server" : "validation",
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          timestamp: Date.now(),
        }
        return { error: true, data: error }
      }

      // Parse JSON response
      const data = (await response.json()) as T
      return { error: false, data }
    } catch (err) {
      const error: ApiError = {
        type: "network",
        message: err instanceof Error ? err.message : "Network error",
        timestamp: Date.now(),
      }
      return { error: true, data: error }
    }
  }

  /**
   * Convenience methods
   */
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" })
  }

  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }
}
