import { useCallback } from "react"
import { useStore } from "@/hooks/useStores"

/**
 * Hook for navigating between tasks in the kanban board
 */
export const useTaskNavigation = () => {
  const { columnStore, boardStore } = useStore()

  /**
   * Get first available task across all columns
   */
  const getFirstAvailableTask = useCallback(() => {
    for (const column of columnStore.columns) {
      const taskIds = boardStore.getTaskIdsByColumn(column.id)
      if (taskIds.length > 0 && taskIds[0]) {
        return { taskId: taskIds[0], columnId: column.id }
      }
    }
    return null
  }, [columnStore.columns, boardStore])

  /**
   * Get all tasks in order across all columns
   */
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

  /**
   * Get next task in sequence (loops to beginning)
   */
  const getNextTask = useCallback(
    (currentTaskId: string) => {
      const allTasks = getAllTasks()
      const currentIndex = allTasks.findIndex(
        (task) => task.taskId === currentTaskId,
      )
      if (currentIndex === -1) return null

      const nextIndex = (currentIndex + 1) % allTasks.length
      return allTasks[nextIndex]
    },
    [getAllTasks],
  )

  /**
   * Get previous task in sequence (loops to end)
   */
  const getPreviousTask = useCallback(
    (currentTaskId: string) => {
      const allTasks = getAllTasks()
      const currentIndex = allTasks.findIndex(
        (task) => task.taskId === currentTaskId,
      )
      if (currentIndex === -1) return null

      const prevIndex =
        currentIndex === 0 ? allTasks.length - 1 : currentIndex - 1
      return allTasks[prevIndex]
    },
    [getAllTasks],
  )

  return {
    getFirstAvailableTask,
    getAllTasks,
    getNextTask,
    getPreviousTask,
  }
}
