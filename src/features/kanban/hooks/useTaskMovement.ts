import { useCallback } from "react"
import { useStore } from "@/hooks/useStores"

/**
 * Hook for moving tasks between and within columns
 */
export const useTaskMovement = () => {
  const { columnStore, boardStore } = useStore()

  /**
   * Move task to next column (with wraparound)
   */
  const moveTaskToNextColumn = useCallback(
    (taskId: string, currentColumnId: string) => {
      const currentIndex = columnStore.columns.findIndex(
        (col) => col.id === currentColumnId,
      )
      if (currentIndex === -1) return null

      const nextIndex = (currentIndex + 1) % columnStore.columns.length
      const nextColumn = columnStore.columns[nextIndex]

      if (!nextColumn) return null

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

  /**
   * Move task to previous column (with wraparound)
   */
  const moveTaskToPreviousColumn = useCallback(
    (taskId: string, currentColumnId: string) => {
      const currentIndex = columnStore.columns.findIndex(
        (col) => col.id === currentColumnId,
      )
      if (currentIndex === -1) return null

      const prevIndex =
        currentIndex === 0 ? columnStore.columns.length - 1 : currentIndex - 1
      const prevColumn = columnStore.columns[prevIndex]

      if (!prevColumn) return null

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

  /**
   * Move task up one position within column
   */
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

  /**
   * Move task down one position within column
   */
  const moveTaskDownInColumn = useCallback(
    (taskId: string, columnId: string) => {
      const taskIds = boardStore.getTaskIdsByColumn(columnId)
      const currentIndex = taskIds.indexOf(taskId)
      if (currentIndex === -1 || currentIndex >= taskIds.length - 1) {
        return false // Already at bottom or not found
      }

      // Move task down one position
      boardStore.moveTask(taskId, columnId, currentIndex + 1)
      return true
    },
    [boardStore],
  )

  return {
    moveTaskToNextColumn,
    moveTaskToPreviousColumn,
    moveTaskUpInColumn,
    moveTaskDownInColumn,
  }
}
