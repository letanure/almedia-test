import { useTranslation } from "react-i18next"
import { useModal } from "@/contexts/ModalContext"
import { useStore } from "@/hooks/useStores"
import { useTaskModal } from "../contexts/TaskModalContext"
import type { CommentFormData } from "../schemas"

/**
 * Hook that centralizes all task modal operations
 * Eliminates duplicate logic between useTaskActions and PersistentTaskModal
 */
export const useTaskModalActions = () => {
  const { t } = useTranslation()
  const modal = useModal()
  const { taskStore, boardStore } = useStore()
  const { closeModal } = useTaskModal()

  /**
   * Update task and close modal
   */
  const handleUpdateTask = (
    taskId: string,
    data: { title: string; description?: string },
  ) => {
    taskStore.updateTask(taskId, data)
    closeModal()
  }

  /**
   * Delete task with confirmation and close modal
   */
  const handleDeleteTask = async (taskId: string, taskTitle: string) => {
    const confirmed = await modal.confirmDelete({
      message: t("kanban.task.confirmDeleteMessage", { title: taskTitle }),
    })

    if (confirmed) {
      taskStore.deleteTask(taskId)
      boardStore.deleteTask(taskId)
      closeModal()
    }
  }

  /**
   * Add comment to task
   */
  const handleAddComment = (taskId: string, data: CommentFormData) => {
    taskStore.addComment(taskId, data)
  }

  /**
   * Edit existing comment
   */
  const handleEditComment = (
    taskId: string,
    commentId: string,
    data: CommentFormData,
  ) => {
    taskStore.updateComment(taskId, commentId, data.content)
  }

  /**
   * Delete comment
   */
  const handleDeleteComment = (taskId: string, commentId: string) => {
    taskStore.deleteComment(taskId, commentId)
  }

  /**
   * Reply to comment
   */
  const handleReplyComment = (
    taskId: string,
    parentId: string,
    data: CommentFormData,
  ) => {
    taskStore.addReply(taskId, parentId, data)
  }

  return {
    handleUpdateTask,
    handleDeleteTask,
    handleAddComment,
    handleEditComment,
    handleDeleteComment,
    handleReplyComment,
  }
}
