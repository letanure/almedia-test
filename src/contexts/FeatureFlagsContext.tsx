/**
 * Feature Flags Context Provider
 *
 * Provides centralized access to feature flags across the application.
 * Makes it easier to test components and potentially fetch flags remotely.
 */

import type React from "react"
import { createContext, useContext } from "react"
import { config, type Features } from "@/config"

interface FeatureFlagsContextType {
  features: Features
  isFeatureEnabled: (flag: keyof Features) => boolean
}

const FeatureFlagsContext = createContext<FeatureFlagsContextType | undefined>(
  undefined,
)

interface FeatureFlagsProviderProps {
  children: React.ReactNode
  overrides?: Partial<Features> // For testing
}

export function FeatureFlagsProvider({
  children,
  overrides,
}: FeatureFlagsProviderProps) {
  const features = { ...config.features, ...overrides }

  const isFeatureEnabled = (flag: keyof Features) => features[flag]

  return (
    <FeatureFlagsContext.Provider value={{ features, isFeatureEnabled }}>
      {children}
    </FeatureFlagsContext.Provider>
  )
}

export function useFeatureFlags() {
  const context = useContext(FeatureFlagsContext)
  if (context === undefined) {
    throw new Error(
      "useFeatureFlags must be used within a FeatureFlagsProvider",
    )
  }
  return context
}
