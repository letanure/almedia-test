import type { DragEndEvent } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { useStore } from "@/hooks/useStores"

export const useDragAndDrop = () => {
  const { boardStore } = useStore()

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!active || !over) return

    const activeId = active.id as string
    const overId = over.id as string

    // If dropping on the same element, do nothing
    if (activeId === overId) return

    // Get source column info
    const sourceColumnId = boardStore.getColumnForTask(activeId)
    if (!sourceColumnId) return

    // Check if we're dropping on a task or a column
    const targetColumnId =
      over.data?.current?.type === "column"
        ? overId
        : boardStore.getColumnForTask(overId)

    if (!targetColumnId) return

    // If moving within the same column
    if (sourceColumnId === targetColumnId) {
      const columnTasks = boardStore.getTaskIdsByColumn(sourceColumnId)
      const oldIndex = columnTasks.indexOf(activeId)
      const newIndex =
        over.data?.current?.type === "column"
          ? columnTasks.length
          : columnTasks.indexOf(overId)

      if (oldIndex === newIndex) return

      // Reorder within the same column
      const reorderedTasks = arrayMove(columnTasks, oldIndex, newIndex)

      // Update board store with new order
      boardStore.columnTasks[sourceColumnId] = reorderedTasks
    } else {
      // Moving between different columns
      const targetPosition =
        over.data?.current?.type === "column"
          ? boardStore.getTaskIdsByColumn(targetColumnId).length
          : boardStore.getTaskIdsByColumn(targetColumnId).indexOf(overId)

      boardStore.moveTask(activeId, targetColumnId, targetPosition)
    }
  }

  return {
    handleDragEnd,
  }
}
