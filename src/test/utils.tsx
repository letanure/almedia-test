import { render } from "@testing-library/react"
import type { ReactElement } from "react"
import { afterEach, beforeEach, vi } from "vitest"
import { AppProviders } from "@/providers/AppProviders"

/**
 * Test utility for rendering components with full app context
 * @param ui - React element to render
 * @returns Testing Library render result with all providers
 */
export function renderWithProviders(ui: ReactElement) {
  return render(<AppProviders>{ui}</AppProviders>)
}

/**
 * Suppresses console.error during tests to reduce noise from expected errors
 * Call this in describe blocks where React Error Boundaries are tested
 */
export function suppressConsoleError() {
  const originalError = console.error
  beforeEach(() => {
    console.error = vi.fn()
  })
  afterEach(() => {
    console.error = originalError
  })
}

export * from "@testing-library/react"
