import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { useModal } from "@/contexts/ModalContext"
import { useStore } from "@/hooks/useStores"
import { Column } from "./Column"
import { BoardHeader } from "./components/BoardHeader"

export const KanbanBoard = observer(() => {
  const { t } = useTranslation()
  const modal = useModal()
  const { columnStore } = useStore()

  const handleDeleteColumn = async (columnId: string, columnName: string) => {
    const confirmed = await modal.confirmDelete({
      message: t("kanban.column.confirmDeleteMessage", { name: columnName }),
    })

    if (confirmed) {
      columnStore.deleteColumn(columnId)
    }
  }

  return (
    <div className="h-full p-6">
      <BoardHeader />

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columnStore.columns.map((column) => (
          <Column
            key={column.id}
            title={column.name}
            onDelete={() => handleDeleteColumn(column.id, column.name)}
          >
            <div>Tasks will go here</div>
          </Column>
        ))}
      </div>
    </div>
  )
})
