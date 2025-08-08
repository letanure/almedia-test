import { Edit, Trash2 } from "lucide-react"
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
}

export const CommentItem = ({
  comment,
  onEdit,
  onDelete,
}: CommentItemProps) => {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)

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
    <div className="group border-b border-gray-100 pb-3 mb-3 last:border-b-0 last:pb-0 last:mb-0">
      <div className="flex justify-between items-start">
        <p className="text-sm mb-2 flex-1">{comment.content}</p>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
    </div>
  )
}
