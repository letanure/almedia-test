import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { Modal } from "@/components/custom-ui/Modal"
import { useModal } from "@/contexts/ModalContext"
import { useStore } from "@/hooks/useStores"
import { useTaskModal } from "../../contexts/TaskModalContext"
import type { CommentFormData } from "../../schemas"
import { TaskModal } from "./TaskModal"

export const PersistentTaskModal = observer(() => {
  const { taskId, isOpen, closeModal } = useTaskModal()
  const { taskStore, boardStore } = useStore()
  const { t } = useTranslation()
  const modal = useModal()

  if (!taskId || !isOpen) return null

  const handleUpdate = (
    taskId: string,
    data: { title: string; description?: string },
  ) => {
    taskStore.updateTask(taskId, data)
    closeModal()
  }

  const handleDelete = async (taskId: string, taskTitle: string) => {
    const confirmed = await modal.confirmDelete({
      message: t("kanban.task.confirmDeleteMessage", { title: taskTitle }),
    })

    if (confirmed) {
      taskStore.deleteTask(taskId)
      boardStore.deleteTask(taskId)
      closeModal()
    }
  }

  const handleAddComment = (taskId: string, data: CommentFormData) => {
    taskStore.addComment(taskId, data)
  }

  const handleEditComment = (
    taskId: string,
    commentId: string,
    data: CommentFormData,
  ) => {
    taskStore.updateComment(taskId, commentId, data.content)
  }

  const handleDeleteComment = (taskId: string, commentId: string) => {
    taskStore.deleteComment(taskId, commentId)
  }

  const handleReplyComment = (
    taskId: string,
    parentId: string,
    data: CommentFormData,
  ) => {
    taskStore.addReply(taskId, parentId, data)
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="Task Details" size="xl">
      <TaskModal
        taskId={taskId}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onAddComment={handleAddComment}
        onEditComment={handleEditComment}
        onDeleteComment={handleDeleteComment}
        onReplyComment={handleReplyComment}
      />
    </Modal>
  )
})
