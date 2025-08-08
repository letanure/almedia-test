import { useTranslation } from "react-i18next"
import { FormBuilder } from "@/components/custom-ui/FormBuilder/FormBuilder"
import type { FormFieldConfig } from "@/components/custom-ui/FormBuilder/types"
import { type TaskFormData, TaskFormSchema } from "../../schemas"

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void
  initialData?: TaskFormData
}

export const TaskForm = ({ onSubmit, initialData }: TaskFormProps) => {
  const { t } = useTranslation()

  const fields: FormFieldConfig[] = [
    {
      type: "text",
      name: "title",
      label: t("kanban.task.title"),
      placeholder: t("kanban.task.title"),
      autoComplete: "off",
      layout: "full",
    },
    {
      type: "textarea",
      name: "description",
      label: t("kanban.task.description"),
      placeholder: t("kanban.task.description"),
      autoComplete: "off",
      layout: "full",
    },
  ]

  const handleSubmit = async (data: TaskFormData) => {
    onSubmit(data)
  }

  return (
    <FormBuilder
      fields={fields}
      schema={TaskFormSchema}
      defaultValues={{
        title: initialData?.title || "",
        description: initialData?.description || "",
      }}
      onSubmit={handleSubmit}
      submitLabel={initialData ? t("common.save") : t("kanban.task.addTask")}
      resetLabel=""
      showReset={false}
      resetAfterSubmit={true}
      translateMessage={t}
    />
  )
}
