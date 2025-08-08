import { useStore } from "@/hooks/useStores"
import type { CommentFormData } from "../schemas"

/**
 * Hook for comment CRUD operations
 * Centralizes all comment actions to eliminate prop drilling
 */
export const useCommentActions = (taskId: string) => {
  const { taskStore } = useStore()

  /**
   * Add new comment to task
   */
  const addComment = (data: CommentFormData) => {
    taskStore.addComment(taskId, data)
  }

  /**
   * Update existing comment
   */
  const editComment = (commentId: string, data: CommentFormData) => {
    taskStore.updateComment(taskId, commentId, data.content)
  }

  /**
   * Delete comment (soft delete)
   */
  const deleteComment = (commentId: string) => {
    taskStore.deleteComment(taskId, commentId)
  }

  /**
   * Reply to existing comment
   */
  const replyToComment = (parentId: string, data: CommentFormData) => {
    taskStore.addReply(taskId, parentId, data)
  }

  return {
    addComment,
    editComment,
    deleteComment,
    replyToComment,
  }
}
