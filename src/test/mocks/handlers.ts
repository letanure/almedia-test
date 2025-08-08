/**
 * MSW Request Handlers
 *
 * Mock API responses for development and testing.
 * Demonstrates how to mock external APIs while maintaining
 * the same response format as your real API services.
 */

import { HttpResponse, http } from "msw"

// Example Rick & Morty API mocks
const rickMortyHandlers = [
  // Get single character
  http.get("https://rickandmortyapi.com/api/character/:id", ({ params }) => {
    const id = Number(params.id)

    // Simulate different responses for demo
    if (id === 999) {
      return HttpResponse.json(
        { error: "Character not found" },
        { status: 404 },
      )
    }

    return HttpResponse.json({
      id,
      name: `Mock Character ${id}`,
      status: id % 2 === 0 ? "Alive" : "Dead",
      species: "Human",
      image: `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`,
      gender: "Male",
      origin: { name: "Earth" },
      location: { name: "Earth" },
    })
  }),

  // Get all characters
  http.get("https://rickandmortyapi.com/api/character", () => {
    return HttpResponse.json({
      info: {
        count: 826,
        pages: 42,
        next: "https://rickandmortyapi.com/api/character?page=2",
        prev: null,
      },
      results: Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `Mock Character ${i + 1}`,
        status: i % 3 === 0 ? "Dead" : "Alive",
        species: "Human",
        image: `https://rickandmortyapi.com/api/character/avatar/${i + 1}.jpeg`,
      })),
    })
  }),
]

// Example internal API mocks (for your future APIs)
const internalApiHandlers = [
  // Mock todos endpoint
  http.get("/api/todos", () => {
    return HttpResponse.json([
      {
        id: "1",
        text: "Mock todo 1",
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        text: "Mock todo 2",
        completed: true,
        createdAt: new Date().toISOString(),
      },
    ])
  }),

  http.post("/api/todos", async ({ request }) => {
    const body = (await request.json()) as { text: string }
    return HttpResponse.json(
      {
        id: crypto.randomUUID(),
        text: body.text,
        completed: false,
        createdAt: new Date().toISOString(),
      },
      { status: 201 },
    )
  }),
]

export const handlers = [...rickMortyHandlers, ...internalApiHandlers]
