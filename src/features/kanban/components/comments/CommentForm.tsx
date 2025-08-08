import { useTranslation } from "react-i18next"
import { FormBuilder } from "@/components/custom-ui/FormBuilder/FormBuilder"
import type { FormFieldConfig } from "@/components/custom-ui/FormBuilder/types"
import { type CommentFormData, CommentFormSchema } from "../../schemas"

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
  defaultValue,
  compact = false,
}: CommentFormProps) => {
  const { t } = useTranslation()

  const fields: FormFieldConfig[] = [
    {
      type: "textarea",
      name: "content",
      placeholder: placeholder || t("kanban.comments.placeholder"),
      className: compact ? "min-h-[60px]" : "min-h-[80px]",
      layout: "full",
    },
  ]

  const handleSubmit = async (data: CommentFormData) => {
    onSubmit(data)
  }

  return (
    <FormBuilder
      fields={fields}
      schema={CommentFormSchema}
      defaultValues={{ content: defaultValue || "" }}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitLabel={t("kanban.comments.addComment")}
      submitSize="sm"
      cancelLabel={onCancel ? t("common.cancel") : ""}
      cancelSize="sm"
      showCancel={!!onCancel}
      resetAfterSubmit={true}
      translateMessage={t}
      className={compact ? "space-y-2" : undefined}
    />
  )
}
