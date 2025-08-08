import { useTranslation } from "react-i18next"
import { useModal } from "@/contexts/ModalContext"
import { useStore } from "@/hooks/useStores"
import type { TaskFormData } from "../schemas"

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

  const openTaskModal = (modalComponent: React.ReactNode) => {
    modal.openForm("task-modal", modalComponent, {
      title: t("kanban.task.viewDetails"),
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
    const task = taskStore.createTask(taskData)
    boardStore.addTaskToColumn(task.id, columnId)
    modal.close("add-task")
  }

  const updateTask = (taskId: string, taskData: TaskFormData) => {
    taskStore.updateTask(taskId, taskData)
    modal.close("task-modal")
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

  const getTaskData = (taskId: string) => {
    return taskStore.getTaskById(taskId)
  }

  return {
    openAddTaskModal,
    openTaskModal,
    openEditTaskModal,
    addTask,
    updateTask,
    handleDeleteTask,
    getTaskData,
    columnId,
  }
}
