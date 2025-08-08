import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { CommentFormData } from "../../schemas"

interface CommentFormProps {
  onSubmit: (data: CommentFormData) => void
  onCancel?: () => void
  placeholder?: string
}

export const CommentForm = ({
  onSubmit,
  onCancel,
  placeholder,
}: CommentFormProps) => {
  const { t } = useTranslation()
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      onSubmit({ content: content.trim() })
      setContent("")
    }
  }

  const handleCancel = () => {
    setContent("")
    onCancel?.()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder || t("kanban.comments.placeholder")}
        className="min-h-[80px]"
        required
      />
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={!content.trim()}>
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
