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

  const handleTaskClick = (taskId: string) => {
    // TODO: Open task detail modal
    console.log("Task clicked:", taskId)
  }

  const handleAddTask = (data: TaskFormData) => {
    const newTask = taskStore.createTask({ ...data, comments: [] })
    boardStore.addTaskToColumn(newTask.id, columnId)
    modal.close("add-task")
  }

  const handleEditTask = (taskId: string) => {
    const task = taskStore.getTaskById(taskId)
    if (!task) return

    modal.openForm(
      "edit-task",
      <TaskForm
        onSubmit={(data) => {
          taskStore.updateTask(taskId, data)
          modal.close("edit-task")
        }}
        onCancel={() => modal.close("edit-task")}
        initialData={{ title: task.title, description: task.description }}
      />,
      {
        title: t("kanban.task.editTask"),
        size: "md",
      },
    )
  }

  const handleDeleteTask = async (taskId: string) => {
    const confirmed = await modal.confirmDelete({
      message: t("kanban.task.confirmDeleteMessage"),
    })

    if (confirmed) {
      taskStore.deleteTask(taskId)
      boardStore.deleteTask(taskId)
    }
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
          task={task}
          onClick={handleTaskClick}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
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
