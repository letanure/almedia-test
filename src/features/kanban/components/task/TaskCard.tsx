import { Trash2 } from "lucide-react"
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
    <div className="relative group/card">
      <button
        type="button"
        className="w-full mb-2 p-2 border cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors text-left"
        onClick={handleClick}
      >
        <div className="text-sm">{title}</div>
        {description && (
          <div className="text-xs text-gray-600">{description}</div>
        )}
      </button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDeleteClick}
        className="absolute top-1 right-1 h-5 w-5 p-0 opacity-0 group-hover/card:opacity-40 hover:opacity-100 transition-opacity"
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
  )
}
