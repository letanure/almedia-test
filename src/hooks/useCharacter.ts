/**
 * useCharacter Hook - EXAMPLE
 *
 * This demonstrates how to create React hooks that use your API services.
 *
 * Key patterns shown:
 * - Loading and error states
 * - Cleanup with AbortController
 * - Type-safe API integration
 * - Simple state management
 *
 * Replace this with hooks for your actual API services.
 */

import { useEffect, useState } from "react"
import { type Character, getCharacter } from "@/services/rickMortyService"

interface UseCharacterResult {
  character: Character | null
  loading: boolean
  error: string | null
}

export function useCharacter(id: number): UseCharacterResult {
  const [character, setCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Skip if no ID provided
    if (!id) return

    // Create abort controller for cleanup
    const controller = new AbortController()

    const fetchCharacter = async () => {
      setLoading(true)
      setError(null)

      const response = await getCharacter(id)

      // Check if request was aborted
      if (controller.signal.aborted) return

      if (response.error) {
        setError(response.data.message)
        setCharacter(null)
      } else {
        setCharacter(response.data)
        setError(null)
      }

      setLoading(false)
    }

    fetchCharacter()

    // Cleanup function
    return () => {
      controller.abort()
    }
  }, [id])

  return { character, loading, error }
}
