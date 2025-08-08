import { useTranslation } from "react-i18next"
import type { Comment, CommentFormData } from "../../schemas"
import { CommentForm } from "./CommentForm"
import { CommentItem } from "./CommentItem"

interface CommentListProps {
  comments: Comment[]
  onAddComment: (data: CommentFormData) => void
  onEditComment: (commentId: string, data: CommentFormData) => void
  onDeleteComment: (commentId: string) => void
  onReplyComment: (parentId: string, data: CommentFormData) => void
}

export const CommentList = ({
  comments = [],
  onAddComment,
  onEditComment,
  onDeleteComment,
  onReplyComment,
}: CommentListProps) => {
  const { t } = useTranslation()

  return (
    <div className="space-y-4">
      {/* Comments list */}
      <div className="space-y-3">
        {comments.length > 0 ? (
          comments.map((comment) => {
            const parentComment = comment.replyTo
              ? comments.find((c) => c.id === comment.replyTo)
              : undefined

            return (
              <CommentItem
                key={comment.id}
                comment={comment}
                onEdit={onEditComment}
                onDelete={onDeleteComment}
                onReply={onReplyComment}
                parentComment={parentComment}
              />
            )
          })
        ) : (
          <p className="text-sm text-gray-500 text-center py-6">
            {t("kanban.comments.noComments")}
          </p>
        )}
      </div>

      {/* Add comment form at bottom */}
      <div className="border-t border-gray-200 pt-4">
        <CommentForm onSubmit={onAddComment} />
      </div>
    </div>
  )
}
