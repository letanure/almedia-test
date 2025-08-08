import { createContext, type ReactNode, useContext, useState } from "react"

interface TaskModalContextType {
  taskId: string | null
  isOpen: boolean
  openModal: (taskId: string) => void
  closeModal: () => void
}

const TaskModalContext = createContext<TaskModalContextType | undefined>(
  undefined,
)

export const useTaskModal = () => {
  const context = useContext(TaskModalContext)
  if (!context) {
    throw new Error("useTaskModal must be used within TaskModalProvider")
  }
  return context
}

interface TaskModalProviderProps {
  children: ReactNode
}

export const TaskModalProvider = ({ children }: TaskModalProviderProps) => {
  const [taskId, setTaskId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const openModal = (id: string) => {
    setTaskId(id)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setTaskId(null)
  }

  const value = {
    taskId,
    isOpen,
    openModal,
    closeModal,
  }

  return (
    <TaskModalContext.Provider value={value}>
      {children}
    </TaskModalContext.Provider>
  )
}
