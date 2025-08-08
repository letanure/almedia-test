import { Edit, Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import type { Comment, CommentFormData } from "../../schemas"
import { CommentList } from "../comments/CommentList"

interface TaskViewProps {
  title: string
  description?: string
  comments: Comment[]
  onEdit: () => void
  onDelete: () => void
  onAddComment: (data: CommentFormData) => void
  onEditComment: (commentId: string, data: CommentFormData) => void
  onDeleteComment: (commentId: string) => void
  onReplyComment: (parentId: string, data: CommentFormData) => void
}

export const TaskView = ({
  title,
  description,
  comments,
  onEdit,
  onDelete,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onReplyComment,
}: TaskViewProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col h-full">
      {/* Header with actions */}
      <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-200">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 break-words">
            {title}
          </h2>
          {description && (
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {description}
            </div>
          )}
        </div>
        <div className="flex gap-2 ml-4 flex-shrink-0">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-1" />
            {t("kanban.task.editTask")}
          </Button>
          <Button variant="outline" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4 mr-1" />
            {t("kanban.task.deleteTask")}
          </Button>
        </div>
      </div>

      {/* Comments section with better separation */}
      <div className="flex-1 min-h-0">
        <div className="mb-3">
          <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
            {t("kanban.task.comments")}
            <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {comments.length}
            </span>
          </h3>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          <CommentList
            comments={comments}
            onAddComment={onAddComment}
            onEditComment={onEditComment}
            onDeleteComment={onDeleteComment}
            onReplyComment={onReplyComment}
          />
        </div>
      </div>
    </div>
  )
}
