import type { DragStartEvent } from "@dnd-kit/core"
import { useState } from "react"
import { useStore } from "@/hooks/useStores"

interface ActiveTask {
  id: string
  title: string
  description?: string
  columnId: string
}

/**
 * Hook to manage drag preview state for DnD operations
 */
export const useDragPreview = () => {
  const { taskStore, boardStore } = useStore()
  const [activeTask, setActiveTask] = useState<ActiveTask | null>(null)

  /**
   * Handle drag start - capture task info for preview
   */
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const task = taskStore.getTaskById(active.id as string)
    const columnId = boardStore.getColumnForTask(active.id as string)

    if (task && columnId) {
      setActiveTask({
        id: task.id,
        title: task.title,
        description: task.description,
        columnId,
      })
    }
  }

  /**
   * Clear active task when drag ends
   */
  const clearActiveTask = () => {
    setActiveTask(null)
  }

  return {
    activeTask,
    handleDragStart,
    clearActiveTask,
  }
}
