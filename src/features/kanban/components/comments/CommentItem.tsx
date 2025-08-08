import { Edit, Reply, Trash2 } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { getRelativeTime } from "@/utils"
import type { Comment, CommentFormData } from "../../schemas"
import { InlineCommentForm } from "./InlineCommentForm"

interface CommentItemProps {
  comment: Comment
  onEdit: (commentId: string, data: CommentFormData) => void
  onDelete: (commentId: string) => void
  onReply: (parentId: string, data: CommentFormData) => void
  parentComment?: Comment // For showing reply context
}

export const CommentItem = ({
  comment,
  onEdit,
  onDelete,
  onReply,
  parentComment,
}: CommentItemProps) => {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const [isReplying, setIsReplying] = useState(false)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = (data: CommentFormData) => {
    onEdit(comment.id, data)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleDelete = () => {
    onDelete(comment.id)
  }

  const handleReply = () => {
    setIsReplying(true)
  }

  const handleReplySubmit = (data: CommentFormData) => {
    onReply(comment.id, data)
    setIsReplying(false)
  }

  const handleReplyCancel = () => {
    setIsReplying(false)
  }

  if (isEditing) {
    return (
      <div className="border-b border-gray-100 pb-3 mb-3 last:border-b-0 last:pb-0 last:mb-0">
        <InlineCommentForm
          onSubmit={handleSave}
          onCancel={handleCancel}
          defaultValue={comment.content}
        />
      </div>
    )
  }

  return (
    <div
      className={`group border-b border-gray-100 pb-2 mb-2 last:border-b-0 last:pb-0 last:mb-0 ${
        comment.replyTo ? "ml-4 border-l-2 border-gray-200 pl-2" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex-1 min-w-0">
          <span className="text-sm pr-2">
            {parentComment && (
              <span className="text-xs text-gray-500 mr-1">→ </span>
            )}
            {comment.content}
          </span>
          <span className="text-xs text-gray-400 ml-2">
            [{comment.updatedAt ? t("common.updated") : t("common.created")}{" "}
            {getRelativeTime(comment.updatedAt || comment.createdAt, t)}]
          </span>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReply}
            className="h-4 w-4 p-0"
          >
            <Reply className="h-2.5 w-2.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="h-4 w-4 p-0"
          >
            <Edit className="h-2.5 w-2.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="h-4 w-4 p-0 hover:text-red-500"
          >
            <Trash2 className="h-2.5 w-2.5" />
          </Button>
        </div>
      </div>

      {/* Reply form */}
      {isReplying && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <InlineCommentForm
            onSubmit={handleReplySubmit}
            onCancel={handleReplyCancel}
            placeholder={`Reply to this comment...`}
          />
        </div>
      )}
    </div>
  )
}
