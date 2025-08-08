import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"
import { Card } from "@/components/ui/card"
import type { Task } from "../../schemas"

interface TaskCardProps {
  task: Task
  onClick?: (taskId: string) => void
}

export const TaskCard = ({ task, onClick }: TaskCardProps) => {
  return (
    <Card
      className="p-3 cursor-pointer hover:bg-accent/50 transition-colors"
      onClick={() => onClick?.(task.id)}
    >
      <Stack spacing="xs">
        <Text tag="h4" size="sm" weight="medium">
          {task.title}
        </Text>
        {task.description && (
          <Text tag="p" size="xs" variant="muted" className="line-clamp-2">
            {task.description}
          </Text>
        )}
      </Stack>
    </Card>
  )
}
