import { useTranslation } from "react-i18next"
import { FormBuilder } from "@/components/custom-ui/FormBuilder/FormBuilder"
import type { FormFieldConfig } from "@/components/custom-ui/FormBuilder/types"
import { Button } from "@/components/ui/button"
import { type TaskFormData, TaskFormSchema } from "../../schemas"

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void
  onCancel?: () => void
  onDelete?: () => void
  initialData?: TaskFormData
}

export const TaskForm = ({
  onSubmit,
  onCancel,
  onDelete,
  initialData,
}: TaskFormProps) => {
  const { t } = useTranslation()

  const fields: FormFieldConfig[] = [
    {
      type: "text",
      name: "title",
      label: t("kanban.task.title"),
      placeholder: "Enter task title...",
      autoComplete: "off",
      layout: "full",
    },
    {
      type: "textarea",
      name: "description",
      label: t("kanban.task.description"),
      placeholder: "Add a more detailed description...",
      autoComplete: "off",
      layout: "full",
      rows: 4,
    },
    {
      type: "date",
      name: "dueDate",
      label: "Due Date",
      placeholder: "Select due date",
      layout: "full",
    },
    {
      type: "select",
      name: "importance",
      label: "Importance",
      placeholder: "Select importance",
      layout: "half",
      options: [
        { value: "low", label: "Low" },
        { value: "high", label: "High" },
      ],
    },
    {
      type: "select",
      name: "urgency",
      label: "Urgency",
      placeholder: "Select urgency",
      layout: "half",
      options: [
        { value: "low", label: "Low" },
        { value: "high", label: "High" },
      ],
    },
  ]

  const handleSubmit = async (data: TaskFormData) => {
    onSubmit(data)
  }

  return (
    <div data-testid="task-form">
      <FormBuilder
        fields={fields}
        schema={TaskFormSchema}
        defaultValues={{
          title: initialData?.title || "",
          description: initialData?.description || "",
          dueDate: initialData?.dueDate,
          importance: initialData?.importance || "low",
          urgency: initialData?.urgency || "low",
        }}
        onSubmit={handleSubmit}
        submitLabel={initialData ? t("common.save") : t("kanban.task.addTask")}
        resetLabel={onCancel ? t("common.cancel") : ""}
        showReset={!!onCancel}
        resetAfterSubmit={!initialData}
        translateMessage={t}
      />
      {onCancel && (
        <div className="mt-4">
          <Button variant="outline" onClick={onCancel} className="w-full">
            {t("common.cancel")}
          </Button>
        </div>
      )}
      {initialData && onDelete && (
        <div className="mt-4 pt-4 border-t">
          <Button variant="destructive" onClick={onDelete} className="w-full">
            {t("kanban.task.deleteTask")}
          </Button>
        </div>
      )}
    </div>
  )
}
