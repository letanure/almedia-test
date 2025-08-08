import { useTranslation } from "react-i18next"
import { useModal } from "@/contexts/ModalContext"
import { useStore } from "@/hooks/useStores"
import type { TaskFormData } from "../schemas"

export const useTaskActions = (columnId: string) => {
  const { t } = useTranslation()
  const modal = useModal()
  const { taskStore } = useStore()

  const openAddTaskModal = (formComponent: React.ReactNode) => {
    modal.openForm("add-task", formComponent, {
      title: t("kanban.task.addTask"),
      size: "md",
    })
  }

  const addTask = (taskData: TaskFormData) => {
    // TODO: Implement task creation
    taskStore.addTask(columnId, taskData)
    modal.close("add-task")
  }

  return {
    openAddTaskModal,
    addTask,
    columnId,
  }
}
