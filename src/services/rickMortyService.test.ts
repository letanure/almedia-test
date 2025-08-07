/**
 * MSW Integration Test
 *
 * Demonstrates how MSW mocks API calls in tests
 */

import { describe, expect, it } from "vitest"
import { getAllCharacters, getCharacter } from "./rickMortyService"

describe("Rick & Morty Service with MSW", () => {
  it("should fetch a character successfully", async () => {
    const response = await getCharacter(1)

    expect(response.error).toBe(false)
    if (!response.error) {
      expect(response.data.id).toBe(1)
      expect(response.data.name).toBe("Mock Character 1")
      expect(response.data.species).toBe("Human")
      expect(response.data.status).toMatch(/Alive|Dead/)
    }
  })

  it("should handle character not found", async () => {
    const response = await getCharacter(999)

    expect(response.error).toBe(true)
    if (response.error) {
      expect(response.data.status).toBe(404)
    }
  })

  it("should fetch all characters with pagination", async () => {
    const response = await getAllCharacters()

    expect(response.error).toBe(false)
    if (!response.error) {
      expect(response.data.info.count).toBe(826)
      expect(response.data.results).toHaveLength(20)
      expect(response.data.results[0]?.name).toBe("Mock Character 1")
    }
  })
})
