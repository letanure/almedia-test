import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { TaskCard } from "../task/TaskCard"

interface DraggableTaskCardProps {
  taskId: string
  columnId: string
  title: string
  description?: string
}

export const DraggableTaskCard = ({
  taskId,
  columnId,
  title,
  description,
}: DraggableTaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({
    id: taskId,
    data: {
      type: "task",
      task: { id: taskId, columnId, title, description },
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <>
      {/* Gray shadow placeholder showing where the card will be dropped */}
      {isOver && (
        <div className="bg-gray-200 border-2 border-dashed border-gray-400 rounded p-2 mb-2 min-h-[60px] opacity-60 shadow-sm flex items-center justify-center">
          <div className="text-gray-500 text-sm">Drop here</div>
        </div>
      )}

      {!isDragging && (
        <div ref={setNodeRef} style={style} {...attributes}>
          <div {...listeners} className="drag-handle-target">
            <TaskCard
              taskId={taskId}
              columnId={columnId}
              title={title}
              description={description}
            />
          </div>
        </div>
      )}

      {isDragging && <div ref={setNodeRef} style={style} className="h-0" />}
    </>
  )
}
