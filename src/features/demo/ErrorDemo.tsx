import { useState } from "react"
import { useErrorBoundary } from "react-error-boundary"
import { Button } from "@/components/ui/button"

/**
 * Error Demo Component
 *
 * This component demonstrates error boundary functionality.
 * It provides buttons to trigger different types of errors:
 * - Render error (throws during render)
 * - Async error (throws in event handler using useErrorBoundary)
 *
 * In a real application, you would remove this component.
 * It's included in the starter kit to demonstrate error boundary patterns.
 * All styles and text are inline so you can delete just this one file to remove the demo.
 */

const demoStyles = {
  container: {
    margin: "2em auto",
    padding: "1.5em",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    backgroundColor: "#f9fafb",
    maxWidth: "800px",
  },

  title: {
    marginTop: 0,
    color: "#374151",
    fontSize: "1.1em",
  },

  description: {
    color: "#6b7280",
    marginBottom: "1em",
    fontSize: "0.9em",
  },

  buttons: {
    display: "flex",
    gap: "1em",
    marginBottom: "1em",
  },

  note: {
    fontSize: "0.8em",
    color: "#9ca3af",
    fontStyle: "italic",
  },
} satisfies Record<string, React.CSSProperties>

const demoText = {
  title: "Error Boundary Demo",
  description:
    "This section demonstrates error boundary functionality. Try the buttons below to see how errors are handled gracefully.",
  renderError: "Trigger Render Error",
  asyncError: "Trigger Async Error",
  note: "Note: In production, remove this demo component. It's included to showcase error boundary patterns.",
}

export function ErrorDemo() {
  const [shouldThrow, setShouldThrow] = useState(false)
  const { showBoundary } = useErrorBoundary()

  // This will cause a render error that the error boundary will catch
  if (shouldThrow) {
    throw new Error("Demo render error - This is intentional for testing!")
  }

  const handleAsyncError = () => {
    // Simulate an async operation that fails
    setTimeout(() => {
      try {
        throw new Error("Demo async error - This is intentional for testing!")
      } catch (error) {
        // Use the error boundary hook to show async errors
        showBoundary(error)
      }
    }, 100)
  }

  return (
    <div style={demoStyles.container}>
      <h3 style={demoStyles.title}>{demoText.title}</h3>
      <p style={demoStyles.description}>{demoText.description}</p>

      <div style={demoStyles.buttons}>
        <Button onClick={() => setShouldThrow(true)}>
          {demoText.renderError}
        </Button>

        <Button onClick={handleAsyncError}>{demoText.asyncError}</Button>
      </div>

      <p style={demoStyles.note}>{demoText.note}</p>
    </div>
  )
}
