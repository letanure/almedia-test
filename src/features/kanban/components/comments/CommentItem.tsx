import { Edit, Reply, Trash2 } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { getRelativeTime } from "@/utils"
import type { Comment, CommentFormData } from "../../schemas"
import { CommentForm } from "./CommentForm"

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
        <CommentForm
          onSubmit={handleSave}
          onCancel={handleCancel}
          defaultValue={comment.content}
        />
      </div>
    )
  }

  return (
    <div
      className={`group border-b border-gray-100 pb-3 mb-3 last:border-b-0 last:pb-0 last:mb-0 ${
        comment.replyTo ? "ml-6 border-l-2 border-gray-200 pl-3" : ""
      }`}
    >
      {/* Show parent comment context for replies */}
      {parentComment && (
        <div className="mb-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
          <span className="font-medium">Replying to:</span>{" "}
          {parentComment.content.substring(0, 100)}
          {parentComment.content.length > 100 && "..."}
        </div>
      )}

      <div className="flex justify-between items-start">
        <p className="text-sm mb-2 flex-1">{comment.content}</p>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReply}
            className="h-6 w-6 p-0"
          >
            <Reply className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="h-6 w-6 p-0"
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="h-6 w-6 p-0 hover:text-red-500"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        {comment.updatedAt ? t("common.updated") : t("common.created")}{" "}
        {getRelativeTime(comment.updatedAt || comment.createdAt, t)}
      </p>

      {/* Reply form */}
      {isReplying && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <CommentForm
            onSubmit={handleReplySubmit}
            onCancel={handleReplyCancel}
            placeholder={`Reply to this comment...`}
          />
        </div>
      )}
    </div>
  )
}
