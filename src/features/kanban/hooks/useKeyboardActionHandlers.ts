import { useCallback } from "react"
import { useStore } from "@/hooks/useStores"
import type { ShortcutAction } from "../config/keyboardShortcuts"
import { useKeyboardNavigation } from "../contexts/KeyboardNavigationContext"
import { useTaskModal } from "../contexts/TaskModalContext"
import { useColumnNavigation } from "./useColumnNavigation"
import { useTaskActions } from "./useTaskActions"
import { useTaskMovement } from "./useTaskMovement"
import { useTaskNavigation } from "./useTaskNavigation"

/**
 * Hook that maps keyboard shortcut actions to their handler functions
 */
export const useKeyboardActionHandlers = () => {
  const { taskStore } = useStore()
  const { selectedTaskId, selectedColumnId, selectTask, clearSelection } =
    useKeyboardNavigation()
  const { openModal } = useTaskModal()

  // Import action hooks
  const { getFirstAvailableTask, getNextTask, getPreviousTask } =
    useTaskNavigation()
  const { getNextColumnTask, getPreviousColumnTask } = useColumnNavigation()
  const {
    moveTaskToNextColumn,
    moveTaskToPreviousColumn,
    moveTaskUpInColumn,
    moveTaskDownInColumn,
  } = useTaskMovement()
  const taskActions = useTaskActions(selectedColumnId || "")

  /**
   * Handle delete task with proper navigation
   */
  const handleDeleteTask = useCallback(async () => {
    if (!selectedTaskId || !selectedColumnId) return

    const task = taskStore.getTaskById(selectedTaskId)
    if (!task) return

    // Find next task to select before deleting
    const nextTask =
      getNextTask(selectedTaskId) || getPreviousTask(selectedTaskId)

    // Use the existing taskActions delete method
    await taskActions.handleDeleteTask(selectedTaskId, task.title)

    // Select next task or clear selection after deletion
    if (nextTask) {
      selectTask(nextTask.taskId, nextTask.columnId)
    } else {
      clearSelection()
    }
  }, [
    selectedTaskId,
    selectedColumnId,
    taskStore,
    taskActions,
    getNextTask,
    getPreviousTask,
    selectTask,
    clearSelection,
  ])

  /**
   * Execute action based on shortcut configuration
   */
  const executeAction = useCallback(
    (action: ShortcutAction) => {
      switch (action) {
        case "SELECT_FIRST_OR_NEXT":
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

        case "PREVIOUS_TASK":
          if (!selectedTaskId) {
            // Select first available task if nothing selected
            const firstTask = getFirstAvailableTask()
            if (firstTask) {
              selectTask(firstTask.taskId, firstTask.columnId)
            }
          } else {
            // Navigate to previous task
            const prevTask = getPreviousTask(selectedTaskId)
            if (prevTask) {
              selectTask(prevTask.taskId, prevTask.columnId)
            }
          }
          break

        case "NEXT_TASK":
          if (!selectedTaskId) {
            // Select first available task if nothing selected
            const firstTask = getFirstAvailableTask()
            if (firstTask) {
              selectTask(firstTask.taskId, firstTask.columnId)
            }
          } else {
            // Navigate to next task
            const nextTask = getNextTask(selectedTaskId)
            if (nextTask) {
              selectTask(nextTask.taskId, nextTask.columnId)
            }
          }
          break

        case "PREVIOUS_COLUMN":
          if (selectedTaskId && selectedColumnId) {
            // Navigate to task in previous column
            const prevColumnTask = getPreviousColumnTask(selectedColumnId)
            if (prevColumnTask?.taskId) {
              selectTask(prevColumnTask.taskId, prevColumnTask.columnId)
            }
          }
          break

        case "NEXT_COLUMN":
          if (selectedTaskId && selectedColumnId) {
            // Navigate to task in next column
            const nextColumnTask = getNextColumnTask(selectedColumnId)
            if (nextColumnTask?.taskId) {
              selectTask(nextColumnTask.taskId, nextColumnTask.columnId)
            }
          }
          break

        case "CLEAR_SELECTION":
          clearSelection()
          break

        case "OPEN_TASK":
          if (selectedTaskId) {
            openModal(selectedTaskId)
          }
          break

        case "DELETE_TASK":
          if (selectedTaskId && selectedColumnId) {
            handleDeleteTask()
          }
          break

        case "MOVE_TASK_LEFT":
          if (selectedTaskId && selectedColumnId) {
            const newColumnId = moveTaskToPreviousColumn(
              selectedTaskId,
              selectedColumnId,
            )
            if (newColumnId) {
              selectTask(selectedTaskId, newColumnId) // Keep task selected in new column
            }
          }
          break

        case "MOVE_TASK_RIGHT":
          if (selectedTaskId && selectedColumnId) {
            const newColumnId = moveTaskToNextColumn(
              selectedTaskId,
              selectedColumnId,
            )
            if (newColumnId) {
              selectTask(selectedTaskId, newColumnId) // Keep task selected in new column
            }
          }
          break

        case "MOVE_TASK_UP":
          if (selectedTaskId && selectedColumnId) {
            moveTaskUpInColumn(selectedTaskId, selectedColumnId)
            // Keep same task selected
          }
          break

        case "MOVE_TASK_DOWN":
          if (selectedTaskId && selectedColumnId) {
            moveTaskDownInColumn(selectedTaskId, selectedColumnId)
            // Keep same task selected
          }
          break

        case "SHOW_HELP":
          // This will be handled by the parent component
          return "SHOW_HELP"

        case "ADD_COLUMN":
          // This will be handled by the parent component
          return "ADD_COLUMN"

        default:
          console.warn(`Unknown keyboard action: ${action}`)
      }

      return null
    },
    [
      selectedTaskId,
      selectedColumnId,
      selectTask,
      clearSelection,
      openModal,
      getFirstAvailableTask,
      getNextTask,
      getPreviousTask,
      getNextColumnTask,
      getPreviousColumnTask,
      moveTaskToNextColumn,
      moveTaskToPreviousColumn,
      moveTaskUpInColumn,
      moveTaskDownInColumn,
      handleDeleteTask,
    ],
  )

  return {
    executeAction,
  }
}
