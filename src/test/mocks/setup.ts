/**
 * MSW Development Setup
 *
 * Initializes MSW for development mode when VITE_ENABLE_API_MOCKS=true
 */

export async function enableMocking() {
  if (import.meta.env.VITE_ENABLE_API_MOCKS !== "true") {
    return
  }

  const { worker } = await import("./browser")

  return worker.start({
    onUnhandledRequest: "warn",
  })
}
