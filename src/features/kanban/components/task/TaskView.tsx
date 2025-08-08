import { Edit, Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"

interface TaskViewProps {
  title: string
  description?: string
  onEdit: () => void
  onDelete: () => void
}

export const TaskView = ({
  title,
  description,
  onEdit,
  onDelete,
}: TaskViewProps) => {
  const { t } = useTranslation()

  return (
    <div className="space-y-4">
      {/* Task Details */}
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {description && (
          <p className="text-gray-600 whitespace-pre-wrap">{description}</p>
        )}
      </div>

      {/* Future: Comments section would go here */}
      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-2">
          {t("kanban.task.comments")}
        </h4>
        <p className="text-sm text-gray-400">{t("kanban.task.noComments")}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t">
        <Button onClick={onEdit} className="flex-1">
          <Edit className="h-4 w-4 mr-2" />
          {t("kanban.task.editTask")}
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          <Trash2 className="h-4 w-4 mr-2" />
          {t("kanban.task.deleteTask")}
        </Button>
      </div>
    </div>
  )
}
