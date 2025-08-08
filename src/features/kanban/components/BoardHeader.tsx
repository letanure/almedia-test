import { Keyboard } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { useModal } from "@/contexts/ModalContext"
import { useStore } from "@/hooks/useStores"
import { ColumnForm } from "./column/ColumnForm"

export const BoardHeader = () => {
  const { t } = useTranslation()
  const modal = useModal()
  const { columnStore } = useStore()

  const handleAddColumn = () => {
    modal.openForm(
      "add-column",
      <ColumnForm
        onSubmit={(name) => {
          columnStore.addColumn(name)
          modal.close("add-column")
        }}
      />,
      {
        title: t("kanban.board.addColumn"),
        size: "md",
      },
    )
  }

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">{t("kanban.board.title")}</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Keyboard className="h-4 w-4" />
          <span>{t("kanban.shortcuts.hint")}</span>
        </div>
      </div>
      <div>
        <Button onClick={handleAddColumn} data-testid="add-column-button">
          {t("kanban.board.addColumn")}
        </Button>
      </div>
    </div>
  )
}
