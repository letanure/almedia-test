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
    <div className="space-y-4">
      {/* Task Details */}
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {description && (
          <p className="text-gray-600 whitespace-pre-wrap">{description}</p>
        )}
      </div>

      {/* Comments section */}
      <div>
        <CommentList
          comments={comments}
          onAddComment={onAddComment}
          onEditComment={onEditComment}
          onDeleteComment={onDeleteComment}
          onReplyComment={onReplyComment}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t">
        <Button onClick={onEdit} className="flex-1">
          <Edit className="h-4 w-4 mr-2" />
          {t("kanban.task.editTask")}
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          <Trash2 className="h-4 w-4 mr-2" />
          {t("kanban.task.deleteTask")}
        </Button>
      </div>
    </div>
  )
}
