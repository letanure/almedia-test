import { useTranslation } from "react-i18next"
import type { Comment, CommentFormData } from "../../schemas"
import { CommentForm } from "./CommentForm"
import { CommentItem } from "./CommentItem"

interface CommentListProps {
  comments: Comment[]
  onAddComment: (data: CommentFormData) => void
  onEditComment: (commentId: string, data: CommentFormData) => void
  onDeleteComment: (commentId: string) => void
}

export const CommentList = ({
  comments = [],
  onAddComment,
  onEditComment,
  onDeleteComment,
}: CommentListProps) => {
  const { t } = useTranslation()

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700">
        {t("kanban.comments.title")} ({comments.length})
      </h4>

      <div className="space-y-3">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onEdit={onEditComment}
              onDelete={onDeleteComment}
            />
          ))
        ) : (
          <p className="text-sm text-gray-400 mb-3">
            {t("kanban.comments.noComments")}
          </p>
        )}
      </div>

      <CommentForm onSubmit={onAddComment} />
    </div>
  )
}
