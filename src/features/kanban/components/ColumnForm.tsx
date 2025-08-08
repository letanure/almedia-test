import { useTranslation } from "react-i18next"
import { FormBuilder } from "@/components/custom-ui/FormBuilder/FormBuilder"
import type { FormFieldConfig } from "@/components/custom-ui/FormBuilder/types"
import { type ColumnFormData, ColumnFormSchema } from "../schemas"

interface ColumnFormProps {
  onSubmit: (name: string) => void
  initialData?: { name: string }
}

export const ColumnForm = ({ onSubmit, initialData }: ColumnFormProps) => {
  const { t } = useTranslation()

  const fields: FormFieldConfig[] = [
    {
      type: "text",
      name: "name",
      label: t("kanban.column.name"),
      placeholder: t("kanban.column.name"),
      autoComplete: "off",
      layout: "full",
    },
  ]

  const handleSubmit = async (data: ColumnFormData) => {
    onSubmit(data.name)
  }

  return (
    <FormBuilder
      fields={fields}
      schema={ColumnFormSchema}
      defaultValues={{ name: initialData?.name || "" }}
      onSubmit={handleSubmit}
      submitLabel={initialData ? t("common.save") : t("kanban.board.addColumn")}
      resetLabel=""
      showReset={false}
      resetAfterSubmit={true}
      translateMessage={t}
    />
  )
}
