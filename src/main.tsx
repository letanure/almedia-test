import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@/styles/global.css"
import "@/i18n"
import { performanceMonitor } from "@/lib/performance"
import { AppProviders } from "@/providers/AppProviders"
import { enableMocking } from "@/test/mocks/setup"
import App from "./App"

// Initialize performance monitoring
performanceMonitor.init()

const rootElement = document.getElementById("root")
if (rootElement) {
  enableMocking().then(() => {
    createRoot(rootElement).render(
      <StrictMode>
        <AppProviders>
          <App />
        </AppProviders>
      </StrictMode>,
    )
  })
} else {
  throw new Error('Root element with id "root" not found.')
}
