import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { CommentFormData } from "../../schemas"

interface CommentFormProps {
  onSubmit: (data: CommentFormData) => void
  onCancel?: () => void
  placeholder?: string
  defaultValue?: string
  compact?: boolean
}

export const CommentForm = ({
  onSubmit,
  onCancel,
  placeholder,
  defaultValue = "",
  compact = false,
}: CommentFormProps) => {
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
    <form
      onSubmit={handleSubmit}
      className={compact ? "space-y-2" : "space-y-3"}
    >
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder || t("kanban.comments.placeholder")}
        className={`${compact ? "min-h-[60px]" : "min-h-[80px]"} resize-none`}
        rows={compact ? 2 : 3}
        data-testid="comment-input"
      />
      <div className="flex gap-2">
        <Button
          type="submit"
          size="sm"
          disabled={!content.trim()}
          data-testid="add-comment-button"
        >
          {t("kanban.comments.addComment")}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCancel}
          >
            {t("common.cancel")}
          </Button>
        )}
      </div>
    </form>
  )
}
