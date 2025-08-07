/**
 * Rick & Morty API Service - EXAMPLE
 *
 * This is a demonstration of how to structure API services in your application.
 *
 * Key patterns shown:
 * - Co-located types with service functions
 * - Simple API client usage with typed responses
 * - Standardized error handling with { error, data } format
 * - Configuration kept close to implementation
 *
 * Replace this with your actual API services following the same patterns.
 */

import { ApiClient } from "@/lib/apiClient"
import type { ApiResponse } from "@/types/api"

/**
 * Example API Types
 * Define types that match your API responses - only include fields you actually use
 */

export interface Character {
  id: number
  name: string
  status: "Alive" | "Dead" | "unknown"
  species: string
  image: string
  // Add more fields as needed
}

export interface ApiInfo {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface PaginatedResponse<T> {
  info: ApiInfo
  results: T[]
}

// Example API configuration - replace with your API details
const RICK_MORTY_CONFIG = {
  baseUrl: "https://rickandmortyapi.com/api",
  authType: "none" as const,
  timeout: 10000,
}

// Create API client instance - one per external API
const rickMortyClient = new ApiClient(RICK_MORTY_CONFIG)

/**
 * Example API Functions
 * Follow this pattern: simple functions that return ApiResponse<T>
 */

export async function getCharacter(
  id: number,
): Promise<ApiResponse<Character>> {
  return rickMortyClient.get<Character>(`/character/${id}`)
}

export async function getAllCharacters(): Promise<
  ApiResponse<PaginatedResponse<Character>>
> {
  return rickMortyClient.get<PaginatedResponse<Character>>("/character")
}
