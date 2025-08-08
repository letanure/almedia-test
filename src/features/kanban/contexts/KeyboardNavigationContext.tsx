import { createContext, type ReactNode, useContext, useState } from "react"

interface KeyboardNavigationContextType {
  selectedTaskId: string | null
  selectedColumnId: string | null
  selectTask: (taskId: string, columnId: string) => void
  clearSelection: () => void
  isTaskSelected: (taskId: string) => boolean
}

const KeyboardNavigationContext =
  createContext<KeyboardNavigationContextType | null>(null)

interface KeyboardNavigationProviderProps {
  children: ReactNode
}

export const KeyboardNavigationProvider = ({
  children,
}: KeyboardNavigationProviderProps) => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null)

  const selectTask = (taskId: string, columnId: string) => {
    setSelectedTaskId(taskId)
    setSelectedColumnId(columnId)
  }

  const clearSelection = () => {
    setSelectedTaskId(null)
    setSelectedColumnId(null)
  }

  const isTaskSelected = (taskId: string) => {
    return selectedTaskId === taskId
  }

  return (
    <KeyboardNavigationContext.Provider
      value={{
        selectedTaskId,
        selectedColumnId,
        selectTask,
        clearSelection,
        isTaskSelected,
      }}
    >
      {children}
    </KeyboardNavigationContext.Provider>
  )
}

export const useKeyboardNavigation = () => {
  const context = useContext(KeyboardNavigationContext)
  if (!context) {
    throw new Error(
      "useKeyboardNavigation must be used within KeyboardNavigationProvider",
    )
  }
  return context
}
