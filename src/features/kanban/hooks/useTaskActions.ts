import { useTranslation } from "react-i18next"
import { useModal } from "@/contexts/ModalContext"
import { useStore } from "@/hooks/useStores"
import type { CreateTask, TaskFormData } from "../schemas"

export const useTaskActions = (columnId: string) => {
  const { t } = useTranslation()
  const modal = useModal()
  const { taskStore, boardStore } = useStore()

  const openAddTaskModal = (formComponent: React.ReactNode) => {
    modal.openForm("add-task", formComponent, {
      title: t("kanban.task.addTask"),
      size: "md",
    })
  }

  const openEditTaskModal = (formComponent: React.ReactNode) => {
    modal.openForm("edit-task", formComponent, {
      title: t("kanban.task.editTask"),
      size: "md",
    })
  }

  const addTask = (taskData: TaskFormData) => {
    const createTaskData: CreateTask = {
      ...taskData,
      importance: taskData.importance || "low",
      urgency: taskData.urgency || "low",
      comments: [],
    }
    const taskId = taskStore.createTask(createTaskData)
    boardStore.addTaskToColumn(taskId, columnId)
    modal.close("add-task")
  }

  const handleDeleteTask = async (taskId: string, taskTitle: string) => {
    const confirmed = await modal.confirmDelete({
      message: t("kanban.task.confirmDeleteMessage", { title: taskTitle }),
    })

    if (confirmed) {
      taskStore.deleteTask(taskId)
      boardStore.deleteTask(taskId)
    }
  }

  return {
    openAddTaskModal,
    openEditTaskModal,
    addTask,
    handleDeleteTask,
    columnId,
  }
}
