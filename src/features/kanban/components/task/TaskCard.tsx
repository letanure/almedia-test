import { Edit, Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Task } from "../../schemas"

interface TaskCardProps {
  task: Task
  onEdit?: (taskId: string) => void
  onDelete?: (taskId: string) => void
  onClick?: (taskId: string) => void
}

export const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onClick,
}: TaskCardProps) => {
  const { t } = useTranslation()

  const handleCardClick = () => {
    onClick?.(task.id)
  }

  const handleCardDoubleClick = () => {
    onEdit?.(task.id)
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit?.(task.id)
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete?.(task.id)
  }

  return (
    <Card
      className="p-3 cursor-pointer hover:bg-accent/50 transition-colors group"
      onClick={handleCardClick}
      onDoubleClick={handleCardDoubleClick}
    >
      <Stack spacing="xs">
        <div className="flex items-start justify-between">
          <Text tag="h4" size="sm" weight="medium" className="flex-1 pr-2">
            {task.title}
          </Text>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 text-muted-foreground/40 hover:text-muted-foreground"
              onClick={handleEditClick}
              title={t("common.edit")}
            >
              <Edit className="h-2.5 w-2.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 text-muted-foreground/40 hover:text-muted-foreground"
              onClick={handleDeleteClick}
              title={t("common.delete")}
            >
              <Trash2 className="h-2.5 w-2.5" />
            </Button>
          </div>
        </div>
        {task.description && (
          <Text tag="p" size="xs" variant="muted" className="line-clamp-2">
            {task.description}
          </Text>
        )}
      </Stack>
    </Card>
  )
}
