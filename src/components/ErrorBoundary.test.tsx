import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { renderWithProviders, suppressConsoleError } from "@/test/utils"
import { ErrorBoundary } from "./ErrorBoundary"

// Test component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error("Test error")
  }
  return <div>No error</div>
}

describe("ErrorBoundary", () => {
  suppressConsoleError()

  it("renders children when there is no error", () => {
    renderWithProviders(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>,
    )

    expect(screen.getByText("No error")).toBeInTheDocument()
  })

  it("renders error fallback when there is an error", () => {
    renderWithProviders(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    )

    expect(screen.getByText("Something went wrong")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Try again" }),
    ).toBeInTheDocument()
  })

  it("renders custom fallback when provided", () => {
    const customFallback = <div>Custom error message</div>

    renderWithProviders(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    )

    expect(screen.getByText("Custom error message")).toBeInTheDocument()
  })

  it("shows try again button when error occurs", async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    )

    expect(screen.getByText("Something went wrong")).toBeInTheDocument()

    const tryAgainButton = screen.getByRole("button", { name: "Try again" })
    expect(tryAgainButton).toBeInTheDocument()

    // NOTE: Full state reset testing requires complex setup
    await user.click(tryAgainButton)
  })
})
