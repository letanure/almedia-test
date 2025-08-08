import { Edit, Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { useModal } from "@/contexts/ModalContext"
import { useStore } from "@/hooks/useStores"
import { ColumnForm } from "./ColumnForm"

interface ColumnHeaderProps {
  columnId: string
  title: string
}

export const ColumnHeader = ({ columnId, title }: ColumnHeaderProps) => {
  const { t } = useTranslation()
  const modal = useModal()
  const { columnStore } = useStore()

  const handleEdit = () => {
    modal.openForm(
      "edit-column",
      <ColumnForm
        initialData={{ name: title }}
        onSubmit={(name) => {
          columnStore.updateColumn(columnId, { name })
          modal.close("edit-column")
        }}
      />,
      {
        title: t("kanban.column.editColumn"),
        size: "md",
      },
    )
  }

  const handleDelete = async () => {
    const confirmed = await modal.confirmDelete({
      message: t("kanban.column.confirmDeleteMessage", { name: title }),
    })

    if (confirmed) {
      columnStore.deleteColumn(columnId)
    }
  }

  return (
    <div className="p-3 border-b border-gray-300 flex justify-between items-center group">
      <h3 className="font-medium">{title}</h3>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleEdit}
          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-40 hover:opacity-100 transition-opacity"
        >
          <Edit className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-40 hover:opacity-100 transition-opacity"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
