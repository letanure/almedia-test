/**
 * API Integration Example Component
 *
 * Demonstrates the API patterns implemented in this starter kit:
 * - Standardized error handling with { error, data } format
 * - Loading states and error boundaries
 * - React hooks for API integration
 * - AbortController for cleanup
 *
 * This is an isolated example showing how to integrate external APIs.
 * Replace with your actual API services following the same patterns.
 */

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCharacter } from "@/hooks/useCharacter"

export function ApiExample() {
  const [characterId, setCharacterId] = useState<number>(1)
  const { character, loading, error } = useCharacter(characterId)

  const loadRandomCharacter = () => {
    // Rick & Morty API has 826 characters
    setCharacterId(Math.floor(Math.random() * 826) + 1)
  }

  return (
    <div className="p-6 border rounded-lg bg-gray-50 dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-4">API Integration Example</h3>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={loadRandomCharacter} disabled={loading}>
            Load Random Character
          </Button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Demonstrates: API calls, loading states, error handling
          </span>
        </div>

        {loading && (
          <div className="p-4 border rounded bg-blue-50 dark:bg-blue-900/20">
            <p className="text-blue-700 dark:text-blue-300">
              Loading character #{characterId}...
            </p>
          </div>
        )}

        {error && (
          <div className="p-4 border rounded bg-red-50 dark:bg-red-900/20">
            <p className="text-red-700 dark:text-red-300">Error: {error}</p>
          </div>
        )}

        {character && !loading && (
          <div className="p-4 border rounded bg-green-50 dark:bg-green-900/20">
            <div className="flex items-center gap-4">
              <img
                src={character.image}
                alt={character.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-green-800 dark:text-green-200">
                  {character.name}
                </h4>
                <p className="text-sm text-green-600 dark:text-green-300">
                  {character.species} • {character.status}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>• Uses standardized ApiResponse&lt;T&gt; format</p>
          <p>• Implements proper loading and error states</p>
          <p>• Includes request cleanup with AbortController</p>
          <p>• Co-located types with service functions</p>
        </div>
      </div>
    </div>
  )
}
