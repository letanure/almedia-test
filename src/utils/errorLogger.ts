import type { ErrorInfo } from "react"

/**
 * Centralized error logging for error boundaries
 * @param error - The error that was thrown
 * @param errorInfo - React error boundary info with component stack
 */
export function logError(error: Error, errorInfo: ErrorInfo) {
  if (import.meta.env.DEV) {
    console.group("🚨 Error Boundary Caught Error")
    console.error("Error:", error)
    console.error("Error Info:", errorInfo)
    console.error("Stack:", error.stack)
    console.groupEnd()
    return
  }

  // TODO: Add production error tracking (Sentry, LogRocket, etc.)
  console.error("Error caught by boundary:", error.message)
}
