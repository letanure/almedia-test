import { createContext, type ReactNode, useState } from "react"
import { RootStore } from "@/stores/RootStore"

interface StoreProviderProps {
  children: ReactNode
}

export const StoreContext = createContext<RootStore | null>(null)

/**
 * Provides MobX store context to the React component tree
 * @param children - React components to wrap with store context
 * @returns React element with store context applied
 */
export function StoreProvider({ children }: StoreProviderProps) {
  const [store] = useState(() => new RootStore())

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
