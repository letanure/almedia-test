import { observer } from "mobx-react-lite"
import { useState } from "react"
import { useStore } from "@/hooks/useStores"
import type { CommentFormData } from "../../schemas"
import { TaskForm } from "./TaskForm"
import { TaskView } from "./TaskView"

interface TaskModalProps {
  taskId: string
  onUpdate: (
    taskId: string,
    data: { title: string; description?: string },
  ) => void
  onDelete: (taskId: string, taskTitle: string) => void
  onAddComment: (taskId: string, data: CommentFormData) => void
  onEditComment: (
    taskId: string,
    commentId: string,
    data: CommentFormData,
  ) => void
  onDeleteComment: (taskId: string, commentId: string) => void
}

export const TaskModal = observer(
  ({
    taskId,
    onUpdate,
    onDelete,
    onAddComment,
    onEditComment,
    onDeleteComment,
  }: TaskModalProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const { taskStore } = useStore()

    const task = taskStore.getTaskById(taskId)
    if (!task) return null

    const { title, description } = task
    const comments = task.comments || []

    // Force MobX to track comments by accessing length
    const _ = comments.length

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

    const handleAddComment = (data: CommentFormData) => {
      onAddComment(taskId, data)
    }

    const handleEditComment = (commentId: string, data: CommentFormData) => {
      onEditComment(taskId, commentId, data)
    }

    const handleDeleteComment = (commentId: string) => {
      onDeleteComment(taskId, commentId)
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
        comments={comments}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddComment={handleAddComment}
        onEditComment={handleEditComment}
        onDeleteComment={handleDeleteComment}
      />
    )
  },
)
