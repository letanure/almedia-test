import { GripVertical, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTaskModal } from "../../contexts/TaskModalContext"
import { useTaskActions } from "../../hooks/useTaskActions"

interface TaskCardProps {
  taskId: string
  columnId: string
  title: string
  description?: string
}

export const TaskCard = ({
  taskId,
  columnId,
  title,
  description,
}: TaskCardProps) => {
  const { handleDeleteTask } = useTaskActions(columnId)
  const { openModal } = useTaskModal()

  const handleClick = () => {
    openModal(taskId)
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    handleDeleteTask(taskId, title)
  }

  return (
    <div className="relative group/card mb-2">
      <div className="border rounded hover:border-gray-400 hover:bg-gray-50 transition-colors">
        {/* Drag handle */}
        <div
          className="drag-handle absolute left-1 top-1 h-full flex items-center opacity-0 group-hover/card:opacity-60 hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-10"
          data-drag-handle="true"
        >
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>

        {/* Card content */}
        <button
          type="button"
          className="w-full p-2 pl-6 cursor-pointer transition-colors text-left"
          onClick={handleClick}
        >
          <div className="text-sm">{title}</div>
          {description && (
            <div className="text-xs text-gray-600">{description}</div>
          )}
        </button>

        {/* Delete button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDeleteClick}
          className="absolute top-1 right-1 h-5 w-5 p-0 opacity-0 group-hover/card:opacity-40 hover:opacity-100 transition-opacity"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
