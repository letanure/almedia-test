import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"
import { Button } from "@/components/ui/button"
import { useModal } from "@/contexts/ModalContext"
import { useStore } from "@/hooks/useStores"
import type { TaskFormData } from "../../schemas"
import { TaskCard } from "./TaskCard"
import { TaskForm } from "./TaskForm"

interface TaskListProps {
  columnId: string
}

export const TaskList = observer(({ columnId }: TaskListProps) => {
  const { t } = useTranslation()
  const { boardStore, taskStore } = useStore()
  const modal = useModal()

  const taskIds = boardStore.getTaskIdsByColumn(columnId)
  const tasks = taskStore.getTasksByIds(taskIds)

  const handleAddTask = (data: TaskFormData) => {
    const newTaskId = taskStore.createTask({
      ...data,
      comments: [],
      importance: data.importance || "low",
      urgency: data.urgency || "low",
    })
    boardStore.addTaskToColumn(newTaskId, columnId)
    modal.close("add-task")
  }

  const handleStartAddTask = () => {
    modal.openForm(
      "add-task",
      <TaskForm
        onSubmit={handleAddTask}
        onCancel={() => modal.close("add-task")}
      />,
      {
        title: t("kanban.task.addTask"),
        size: "md",
      },
    )
  }

  return (
    <Stack spacing="sm" className="min-h-32">
      {/* Task Cards */}
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          taskId={task.id}
          columnId={columnId}
          title={task.title}
        />
      ))}

      {/* No tasks message */}
      {tasks.length === 0 && (
        <Text tag="p" variant="muted" size="sm" align="center" className="py-4">
          {t("kanban.task.noTasks")}
        </Text>
      )}

      {/* Add Task Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleStartAddTask}
        className="w-full justify-start text-muted-foreground hover:text-foreground"
      >
        + {t("kanban.task.addTask")}
      </Button>
    </Stack>
  )
})
