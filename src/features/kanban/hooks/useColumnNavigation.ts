import { useCallback } from "react"
import { useStore } from "@/hooks/useStores"

/**
 * Hook for navigating to tasks in adjacent columns
 */
export const useColumnNavigation = () => {
  const { columnStore, boardStore } = useStore()

  /**
   * Get first task from next column with tasks (with wraparound)
   */
  const getNextColumnTask = useCallback(
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
        if (!nextColumn) break

        const taskIds = boardStore.getTaskIdsByColumn(nextColumn.id)

        // If column has tasks, return first task
        if (taskIds.length > 0 && taskIds[0]) {
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

  /**
   * Get first task from previous column with tasks (with wraparound)
   */
  const getPreviousColumnTask = useCallback(
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
        if (!prevColumn) break

        const taskIds = boardStore.getTaskIdsByColumn(prevColumn.id)

        // If column has tasks, return first task
        if (taskIds.length > 0 && taskIds[0]) {
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

  return {
    getNextColumnTask,
    getPreviousColumnTask,
  }
}
