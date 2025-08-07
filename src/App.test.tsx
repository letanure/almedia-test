import { screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { renderWithProviders } from "@/test/utils"
import App from "./App"

describe("App", () => {
  it("renders without crashing", () => {
    renderWithProviders(<App />)
    expect(screen.getByText("Almedia Kanban")).toBeInTheDocument()
  })
})
