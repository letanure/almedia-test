import type { ReactNode } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { I18nextProvider } from "react-i18next"
import { BrowserRouter } from "react-router-dom"
import { ErrorFallback } from "@/components/ErrorFallback"
import { FeatureFlagsProvider } from "@/contexts/FeatureFlagsContext"
import { GlobalLoadingProvider } from "@/contexts/GlobalLoadingContext"
import { ModalProvider } from "@/contexts/ModalContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { ToastProvider } from "@/contexts/ToastContext"
import i18n from "@/i18n"
import { StoreProvider } from "@/providers/StoreProvider"
import { logError } from "@/utils"

interface AppProvidersProps {
  children: ReactNode
}

/**
 * Composites all app providers to avoid provider hell in App.tsx
 * @param children - React components to wrap with providers
 * @returns React element with all providers applied
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <FeatureFlagsProvider>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <I18nextProvider i18n={i18n}>
            <BrowserRouter>
              <GlobalLoadingProvider>
                <ToastProvider>
                  <ModalProvider>
                    <StoreProvider>{children}</StoreProvider>
                  </ModalProvider>
                </ToastProvider>
              </GlobalLoadingProvider>
            </BrowserRouter>
          </I18nextProvider>
        </ThemeProvider>
      </FeatureFlagsProvider>
    </ErrorBoundary>
  )
}
