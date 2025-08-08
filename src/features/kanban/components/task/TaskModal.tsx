import { observer } from "mobx-react-lite"
import { useState } from "react"
import { useStore } from "@/hooks/useStores"
import { useTaskModalActions } from "../../hooks/useTaskModalActions"
import type { TaskFormData } from "../../schemas"
import { TaskForm } from "./TaskForm"
import { TaskView } from "./TaskView"

interface TaskModalProps {
  taskId: string
}

export const TaskModal = observer(({ taskId }: TaskModalProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const { taskStore } = useStore()
  const { handleUpdateTask, handleDeleteTask } = useTaskModalActions(taskId)

  const task = taskStore.getTaskById(taskId)
  if (!task) return null

  const { title, description, dueDate, importance, urgency } = task
  const comments = task.comments || []

  // Force MobX to track comments by accessing length
  comments.length

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = (data: TaskFormData) => {
    handleUpdateTask(taskId, data)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleDelete = () => {
    handleDeleteTask(taskId, title)
  }

  if (isEditing) {
    return (
      <TaskForm
        initialData={{ title, description, dueDate, importance, urgency }}
        onSubmit={handleSave}
        onCancel={handleCancel}
      />
    )
  }

  return (
    <TaskView
      taskId={taskId}
      title={title}
      description={description}
      comments={comments}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
})
