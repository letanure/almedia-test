import { DragOverlay } from "@dnd-kit/core"
import { TaskCard } from "./task/TaskCard"

interface DragPreviewProps {
  activeTask: {
    id: string
    title: string
    columnId: string
  } | null
}

// Drag preview overlay shown during drag operations
export const DragPreview = ({ activeTask }: DragPreviewProps) => {
  return (
    <DragOverlay>
      {activeTask && (
        <div className="transform rotate-2 shadow-2xl">
          <TaskCard
            taskId={activeTask.id}
            columnId={activeTask.columnId}
            title={activeTask.title}
          />
        </div>
      )}
    </DragOverlay>
  )
}
