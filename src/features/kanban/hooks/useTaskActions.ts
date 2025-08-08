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

  const addTask = (taskData: TaskFormData) => {
    const task = taskStore.createTask(taskData)
    boardStore.addTaskToColumn(task.id, columnId)
    modal.close("add-task")
  }

  return {
    openAddTaskModal,
    addTask,
    columnId,
  }
}
