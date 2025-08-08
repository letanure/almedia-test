import { useTranslation } from "react-i18next"
import { useModal } from "@/contexts/ModalContext"
import { useStore } from "@/hooks/useStores"
import { useTaskModal } from "../contexts/TaskModalContext"
import type { CommentFormData } from "../schemas"
import { useCommentActions } from "./useCommentActions"

/**
 * Hook that centralizes all task modal operations
 * Eliminates duplicate logic between useTaskActions and PersistentTaskModal
 */
export const useTaskModalActions = (taskId: string) => {
  const { t } = useTranslation()
  const modal = useModal()
  const { taskStore, boardStore } = useStore()
  const { closeModal } = useTaskModal()
  const { addComment, editComment, deleteComment, replyToComment } =
    useCommentActions(taskId)

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
  const handleAddComment = (_taskId: string, data: CommentFormData) => {
    addComment(data)
  }

  /**
   * Edit existing comment
   */
  const handleEditComment = (
    _taskId: string,
    commentId: string,
    data: CommentFormData,
  ) => {
    editComment(commentId, data)
  }

  /**
   * Delete comment
   */
  const handleDeleteComment = (_taskId: string, commentId: string) => {
    deleteComment(commentId)
  }

  /**
   * Reply to comment
   */
  const handleReplyComment = (
    _taskId: string,
    parentId: string,
    data: CommentFormData,
  ) => {
    replyToComment(parentId, data)
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
