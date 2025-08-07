import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { FormBuilder } from "@/components/custom-ui/FormBuilder"
import { Stack } from "@/components/custom-ui/Stack"
import { Button } from "@/components/ui/button"
import { type TaskFormData, TaskFormSchema } from "../../schemas"

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void
  onCancel: () => void
  initialData?: TaskFormData
}

export function TaskForm({ onSubmit, onCancel, initialData }: TaskFormProps) {
  const { t } = useTranslation()

  // Auto-focus first field with delay for modal animation
  useEffect(() => {
    const timer = setTimeout(() => {
      const firstInput = document.querySelector(
        'input[name="title"]',
      ) as HTMLInputElement
      if (firstInput) {
        firstInput.focus()
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Stack spacing="md">
      <FormBuilder
        fields={[
          {
            name: "title",
            type: "text",
            label: t("kanban.task.title"),
            placeholder: t("kanban.task.title"),
            layout: "full",
          },
          {
            name: "description",
            type: "textarea",
            label: t("kanban.task.description"),
            placeholder: t("kanban.task.description"),
            layout: "full",
            rows: 4,
          },
        ]}
        schema={TaskFormSchema}
        onSubmit={onSubmit}
        defaultValues={initialData}
        submitLabel={initialData ? t("common.save") : t("kanban.task.addTask")}
      />
      <Button variant="outline" onClick={onCancel} className="w-full">
        {t("common.cancel")}
      </Button>
    </Stack>
  )
}
