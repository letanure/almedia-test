import { useState } from "react"
import { TaskForm } from "./TaskForm"
import { TaskView } from "./TaskView"

interface TaskModalProps {
  taskId: string
  title: string
  description?: string
  onUpdate: (
    taskId: string,
    data: { title: string; description?: string },
  ) => void
  onDelete: (taskId: string, taskTitle: string) => void
}

export const TaskModal = ({
  taskId,
  title,
  description,
  onUpdate,
  onDelete,
}: TaskModalProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = (data: { title: string; description?: string }) => {
    onUpdate(taskId, data)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleDelete = () => {
    onDelete(taskId, title)
  }

  if (isEditing) {
    return (
      <TaskForm
        initialData={{ title, description }}
        onSubmit={handleSave}
        onCancel={handleCancel}
      />
    )
  }

  return (
    <TaskView
      title={title}
      description={description}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}
