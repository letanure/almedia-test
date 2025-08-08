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
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard
        taskId={taskId}
        columnId={columnId}
        title={title}
        description={description}
      />
    </div>
  )
}
