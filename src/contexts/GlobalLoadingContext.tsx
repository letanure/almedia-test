import type React from "react"
import { createContext, useContext, useState } from "react"
import { LoadingOverlay } from "@/components/custom-ui/LoadingOverlay"

interface GlobalLoadingContextType {
  isLoading: boolean
  setLoading: (loading: boolean, options?: LoadingOptions) => void
}

interface LoadingOptions {
  messageKey?: string
  message?: string
}

const GlobalLoadingContext = createContext<
  GlobalLoadingContextType | undefined
>(undefined)

interface GlobalLoadingProviderProps {
  children: React.ReactNode
}

export function GlobalLoadingProvider({
  children,
}: GlobalLoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingOptions, setLoadingOptions] = useState<LoadingOptions>({})

  const setLoading = (loading: boolean, options?: LoadingOptions) => {
    setIsLoading(loading)
    setLoadingOptions(options || {})
  }

  return (
    <GlobalLoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
      <LoadingOverlay
        isVisible={isLoading}
        messageKey={loadingOptions.messageKey}
        message={loadingOptions.message}
      />
    </GlobalLoadingContext.Provider>
  )
}

export function useGlobalLoading() {
  const context = useContext(GlobalLoadingContext)
  if (context === undefined) {
    throw new Error(
      "useGlobalLoading must be used within a GlobalLoadingProvider",
    )
  }
  return context
}
