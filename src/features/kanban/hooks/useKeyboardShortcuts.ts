import { useCallback, useEffect, useState } from "react"
import { useModal } from "@/contexts/ModalContext"
import { useStore } from "@/hooks/useStores"
import { useKeyboardNavigation } from "../contexts/KeyboardNavigationContext"
import { useTaskModal } from "../contexts/TaskModalContext"

export const useKeyboardShortcuts = () => {
  const { columnStore, boardStore, taskStore } = useStore()
  const { selectedTaskId, selectedColumnId, selectTask, clearSelection } =
    useKeyboardNavigation()
  const { openModal, isOpen } = useTaskModal()
  const modal = useModal()
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)

  const getFirstAvailableTask = useCallback(() => {
    // Find first column with tasks
    for (const column of columnStore.columns) {
      const taskIds = boardStore.getTaskIdsByColumn(column.id)
      if (taskIds.length > 0) {
        return { taskId: taskIds[0], columnId: column.id }
      }
    }
    return null
  }, [columnStore.columns, boardStore])

  const getAllTasks = useCallback(() => {
    const allTasks: Array<{ taskId: string; columnId: string }> = []
    for (const column of columnStore.columns) {
      const taskIds = boardStore.getTaskIdsByColumn(column.id)
      for (const taskId of taskIds) {
        allTasks.push({ taskId, columnId: column.id })
      }
    }
    return allTasks
  }, [columnStore.columns, boardStore])

  const getNextTask = useCallback(
    (currentTaskId: string) => {
      const allTasks = getAllTasks()
      const currentIndex = allTasks.findIndex(
        (task) => task.taskId === currentTaskId,
      )
      if (currentIndex === -1) return null

      const nextIndex = (currentIndex + 1) % allTasks.length // Loop back to start
      return allTasks[nextIndex]
    },
    [getAllTasks],
  )

  const getPreviousTask = useCallback(
    (currentTaskId: string) => {
      const allTasks = getAllTasks()
      const currentIndex = allTasks.findIndex(
        (task) => task.taskId === currentTaskId,
      )
      if (currentIndex === -1) return null

      const prevIndex =
        currentIndex === 0 ? allTasks.length - 1 : currentIndex - 1 // Loop to end
      return allTasks[prevIndex]
    },
    [getAllTasks],
  )

  const getNextColumn = useCallback(
    (currentColumnId: string) => {
      const currentIndex = columnStore.columns.findIndex(
        (col) => col.id === currentColumnId,
      )
      if (currentIndex === -1) return null

      // Keep searching until we find a column with tasks or have checked all columns
      let nextIndex = (currentIndex + 1) % columnStore.columns.length
      let attempts = 0
      const maxAttempts = columnStore.columns.length

      while (attempts < maxAttempts) {
        const nextColumn = columnStore.columns[nextIndex]
        const taskIds = boardStore.getTaskIdsByColumn(nextColumn.id)

        // If column has tasks, return first task
        if (taskIds.length > 0) {
          return { taskId: taskIds[0], columnId: nextColumn.id }
        }

        // Move to next column
        nextIndex = (nextIndex + 1) % columnStore.columns.length
        attempts++
      }

      return null
    },
    [columnStore.columns, boardStore],
  )

  const getPreviousColumn = useCallback(
    (currentColumnId: string) => {
      const currentIndex = columnStore.columns.findIndex(
        (col) => col.id === currentColumnId,
      )
      if (currentIndex === -1) return null

      // Keep searching until we find a column with tasks or have checked all columns
      let prevIndex =
        currentIndex === 0 ? columnStore.columns.length - 1 : currentIndex - 1
      let attempts = 0
      const maxAttempts = columnStore.columns.length

      while (attempts < maxAttempts) {
        const prevColumn = columnStore.columns[prevIndex]
        const taskIds = boardStore.getTaskIdsByColumn(prevColumn.id)

        // If column has tasks, return first task
        if (taskIds.length > 0) {
          return { taskId: taskIds[0], columnId: prevColumn.id }
        }

        // Move to previous column
        prevIndex =
          prevIndex === 0 ? columnStore.columns.length - 1 : prevIndex - 1
        attempts++
      }

      return null
    },
    [columnStore.columns, boardStore],
  )

  const moveTaskToNextColumn = useCallback(
    (taskId: string, currentColumnId: string) => {
      const currentIndex = columnStore.columns.findIndex(
        (col) => col.id === currentColumnId,
      )
      if (currentIndex === -1) return null

      const nextIndex = (currentIndex + 1) % columnStore.columns.length
      const nextColumn = columnStore.columns[nextIndex]

      // Move task to end of next column
      boardStore.moveTask(
        taskId,
        nextColumn.id,
        boardStore.getTaskIdsByColumn(nextColumn.id).length,
      )
      return nextColumn.id
    },
    [columnStore.columns, boardStore],
  )

  const moveTaskToPreviousColumn = useCallback(
    (taskId: string, currentColumnId: string) => {
      const currentIndex = columnStore.columns.findIndex(
        (col) => col.id === currentColumnId,
      )
      if (currentIndex === -1) return null

      const prevIndex =
        currentIndex === 0 ? columnStore.columns.length - 1 : currentIndex - 1
      const prevColumn = columnStore.columns[prevIndex]

      // Move task to end of previous column
      boardStore.moveTask(
        taskId,
        prevColumn.id,
        boardStore.getTaskIdsByColumn(prevColumn.id).length,
      )
      return prevColumn.id
    },
    [columnStore.columns, boardStore],
  )

  const moveTaskUpInColumn = useCallback(
    (taskId: string, columnId: string) => {
      const taskIds = boardStore.getTaskIdsByColumn(columnId)
      const currentIndex = taskIds.indexOf(taskId)
      if (currentIndex <= 0) return false // Already at top or not found

      // Move task up one position
      boardStore.moveTask(taskId, columnId, currentIndex - 1)
      return true
    },
    [boardStore],
  )

  const moveTaskDownInColumn = useCallback(
    (taskId: string, columnId: string) => {
      const taskIds = boardStore.getTaskIdsByColumn(columnId)
      const currentIndex = taskIds.indexOf(taskId)
      if (currentIndex === -1 || currentIndex >= taskIds.length - 1)
        return false // Already at bottom or not found

      // Move task down one position
      boardStore.moveTask(taskId, columnId, currentIndex + 1)
      return true
    },
    [boardStore],
  )

  const isInInputField = useCallback(() => {
    const activeElement = document.activeElement
    if (!activeElement) return false

    const tagName = activeElement.tagName.toLowerCase()
    const isContentEditable =
      activeElement.getAttribute("contenteditable") === "true"

    return tagName === "input" || tagName === "textarea" || isContentEditable
  }, [])

  const handleDeleteTask = useCallback(async () => {
    if (!selectedTaskId || !selectedColumnId) return

    const task = taskStore.getTaskById(selectedTaskId)
    if (!task) return

    const confirmed = await modal.confirmDelete({
      titleKey: "kanban.task.deleteTitle",
      messageKey: "kanban.task.deleteMessage",
    })

    if (confirmed) {
      // Find next task to select before deleting
      const nextTask =
        getNextTask(selectedTaskId) || getPreviousTask(selectedTaskId)

      // Delete the task
      boardStore.removeTask(selectedTaskId, selectedColumnId)
      taskStore.deleteTask(selectedTaskId)

      // Select next task or clear selection
      if (nextTask) {
        selectTask(nextTask.taskId, nextTask.columnId)
      } else {
        clearSelection()
      }
    }
  }, [
    selectedTaskId,
    selectedColumnId,
    taskStore,
    boardStore,
    modal,
    getNextTask,
    getPreviousTask,
    selectTask,
    clearSelection,
  ])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere when user is typing in input fields
      if (isInInputField()) return

      switch (e.key) {
        case "Tab":
          e.preventDefault()
          if (!selectedTaskId) {
            // Select first available task if nothing selected
            const firstTask = getFirstAvailableTask()
            if (firstTask) {
              selectTask(firstTask.taskId, firstTask.columnId)
            }
          } else {
            // Move to next task
            const nextTask = getNextTask(selectedTaskId)
            if (nextTask) {
              selectTask(nextTask.taskId, nextTask.columnId)
            }
          }
          break

        case "ArrowDown":
        case "j": // Gmail style
          e.preventDefault()
          if (!selectedTaskId) {
            // Select first available task if nothing selected
            const firstTask = getFirstAvailableTask()
            if (firstTask) {
              selectTask(firstTask.taskId, firstTask.columnId)
            }
          } else {
            if (e.shiftKey && selectedColumnId) {
              // Shift+Down: Move task down in column
              moveTaskDownInColumn(selectedTaskId, selectedColumnId)
              // Keep same task selected
            } else {
              // Navigate to next task
              const nextTask = getNextTask(selectedTaskId)
              if (nextTask) {
                selectTask(nextTask.taskId, nextTask.columnId)
              }
            }
          }
          break

        case "ArrowUp":
        case "k": // Gmail style
          e.preventDefault()
          if (!selectedTaskId) {
            // Select first available task if nothing selected
            const firstTask = getFirstAvailableTask()
            if (firstTask) {
              selectTask(firstTask.taskId, firstTask.columnId)
            }
          } else {
            if (e.shiftKey && selectedColumnId) {
              // Shift+Up: Move task up in column
              moveTaskUpInColumn(selectedTaskId, selectedColumnId)
              // Keep same task selected
            } else {
              // Navigate to previous task
              const prevTask = getPreviousTask(selectedTaskId)
              if (prevTask) {
                selectTask(prevTask.taskId, prevTask.columnId)
              }
            }
          }
          break

        case "ArrowLeft":
        case "h": // Vim style
          e.preventDefault()
          if (selectedTaskId && selectedColumnId) {
            if (e.shiftKey) {
              // Shift+Left: Move task to previous column
              const newColumnId = moveTaskToPreviousColumn(
                selectedTaskId,
                selectedColumnId,
              )
              if (newColumnId) {
                selectTask(selectedTaskId, newColumnId) // Keep task selected in new column
              }
            } else {
              // Navigate to previous column
              const prevColumnTask = getPreviousColumn(selectedColumnId)
              if (prevColumnTask?.taskId) {
                selectTask(prevColumnTask.taskId, prevColumnTask.columnId)
              }
            }
          }
          break

        case "ArrowRight":
        case "l": // Vim style
          e.preventDefault()
          if (selectedTaskId && selectedColumnId) {
            if (e.shiftKey) {
              // Shift+Right: Move task to next column
              const newColumnId = moveTaskToNextColumn(
                selectedTaskId,
                selectedColumnId,
              )
              if (newColumnId) {
                selectTask(selectedTaskId, newColumnId) // Keep task selected in new column
              }
            } else {
              // Navigate to next column
              const nextColumnTask = getNextColumn(selectedColumnId)
              if (nextColumnTask?.taskId) {
                selectTask(nextColumnTask.taskId, nextColumnTask.columnId)
              }
            }
          }
          break

        case "Enter":
        case " ": // Spacebar
        case "o": // Gmail style "open"
          e.preventDefault()
          if (selectedTaskId) {
            openModal(selectedTaskId)
          }
          break

        case "Escape":
          // Only clear selection if modal is not open, otherwise let modal handle it
          if (!isOpen) {
            clearSelection()
          }
          break

        case "?":
          e.preventDefault()
          setIsHelpModalOpen(true)
          break

        case "Delete":
          e.preventDefault()
          if (selectedTaskId) {
            handleDeleteTask()
          }
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [
    selectedTaskId,
    selectedColumnId,
    selectTask,
    clearSelection,
    openModal,
    isOpen,
    getNextTask,
    getPreviousTask,
    getNextColumn,
    getPreviousColumn,
    handleDeleteTask,
    getFirstAvailableTask,
    isInInputField,
    moveTaskDownInColumn,
    moveTaskToNextColumn,
    moveTaskToPreviousColumn,
    moveTaskUpInColumn,
  ])

  return {
    isHelpModalOpen,
    setIsHelpModalOpen,
  }
}
