import { useTaskActions } from "../../hooks/useTaskActions"
import { TaskForm } from "./TaskForm"

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
  const { openEditTaskModal, updateTask } = useTaskActions(columnId)

  const handleClick = () => {
    openEditTaskModal(
      <TaskForm
        initialData={{ title, description }}
        onSubmit={(data) => updateTask(taskId, data)}
      />,
    )
  }

  return (
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
  )
}
