import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { CommentFormData } from "../../schemas"

interface InlineCommentFormProps {
  onSubmit: (data: CommentFormData) => void
  onCancel?: () => void
  placeholder?: string
  defaultValue?: string
}

export const InlineCommentForm = ({
  onSubmit,
  onCancel,
  placeholder,
  defaultValue = "",
}: InlineCommentFormProps) => {
  const { t } = useTranslation()
  const [content, setContent] = useState(defaultValue)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      onSubmit({ content: content.trim() })
      setContent("")
    }
  }

  const handleCancel = () => {
    setContent(defaultValue)
    onCancel?.()
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-start">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder || t("kanban.comments.placeholder")}
        className="flex-1 h-[60px] resize-none text-sm"
        rows={2}
      />
      <div className="flex gap-1 flex-shrink-0 h-[60px] items-start">
        <Button
          type="submit"
          size="sm"
          disabled={!content.trim()}
          className="text-xs px-2"
        >
          {t("kanban.comments.addComment")}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCancel}
            className="text-xs px-2"
          >
            {t("common.cancel")}
          </Button>
        )}
      </div>
    </form>
  )
}
