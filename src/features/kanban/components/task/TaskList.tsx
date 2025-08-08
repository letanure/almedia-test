import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"
import { useStore } from "@/hooks/useStores"
import { TaskCard } from "./TaskCard"

interface TaskListProps {
  columnId: string
}

export const TaskList = observer(({ columnId }: TaskListProps) => {
  const { t } = useTranslation()
  const { boardStore, taskStore } = useStore()

  const taskIds = boardStore.getTaskIdsByColumn(columnId)
  const tasks = taskStore.getTasksByIds(taskIds)

  const handleTaskClick = (taskId: string) => {
    // TODO: Open task detail modal
    console.log("Task clicked:", taskId)
  }

  if (tasks.length === 0) {
    return (
      <Stack spacing="sm" className="min-h-32">
        <Text tag="p" variant="muted" size="sm" align="center" className="py-8">
          {t("kanban.task.noTasks")}
        </Text>
      </Stack>
    )
  }

  return (
    <Stack spacing="sm">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onClick={handleTaskClick} />
      ))}
    </Stack>
  )
})
