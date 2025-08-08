import { useTranslation } from "react-i18next"
import { useModal } from "@/contexts/ModalContext"
import { useStore } from "@/hooks/useStores"
import type { CommentFormData, TaskFormData } from "../schemas"

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
    const taskId = taskStore.createTask(taskData)
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

  const addComment = (taskId: string, data: CommentFormData) => {
    taskStore.addComment(taskId, data)
  }

  return {
    openAddTaskModal,
    openEditTaskModal,
    addTask,
    handleDeleteTask,
    addComment,
    columnId,
  }
}
