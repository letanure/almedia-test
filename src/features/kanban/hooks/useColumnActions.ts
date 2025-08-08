import { useTranslation } from "react-i18next"
import { useModal } from "@/contexts/ModalContext"
import { useStore } from "@/hooks/useStores"

export const useColumnActions = (columnId: string, columnName: string) => {
  const { t } = useTranslation()
  const modal = useModal()
  const { columnStore } = useStore()

  const openEditModal = (formComponent: React.ReactNode) => {
    modal.openForm("edit-column", formComponent, {
      title: t("kanban.column.editColumn"),
      size: "md",
    })
  }

  const updateColumn = (name: string) => {
    columnStore.updateColumn(columnId, { name })
    modal.close("edit-column")
  }

  const handleDelete = async () => {
    const confirmed = await modal.confirmDelete({
      message: t("kanban.column.confirmDeleteMessage", { name: columnName }),
    })

    if (confirmed) {
      columnStore.deleteColumn(columnId)
    }
  }

  return {
    openEditModal,
    updateColumn,
    handleDelete,
    columnName,
  }
}
