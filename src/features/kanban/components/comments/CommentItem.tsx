import { useTranslation } from "react-i18next"
import type { Comment } from "../../schemas"

interface CommentItemProps {
  comment: Comment
}

export const CommentItem = ({ comment }: CommentItemProps) => {
  const { t } = useTranslation()

  return (
    <div className="border-b border-gray-100 pb-3 mb-3 last:border-b-0 last:pb-0 last:mb-0">
      <p className="text-sm mb-2">{comment.content}</p>
      <p className="text-xs text-gray-500">
        {comment.updatedAt ? t("common.updated") : t("common.created")}{" "}
        {(comment.updatedAt || comment.createdAt).toLocaleDateString()}
      </p>
    </div>
  )
}
