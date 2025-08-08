import { MoreHorizontal, X } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Flex } from "@/components/custom-ui/Flex"
import { Text } from "@/components/custom-ui/Text"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useModal } from "@/contexts/ModalContext"

interface ColumnHeaderProps {
  name: string
  onUpdate: (name: string) => void
  onDelete: () => void
}

export const ColumnHeader = ({
  name,
  onUpdate,
  onDelete,
}: ColumnHeaderProps) => {
  const { t } = useTranslation()
  const modal = useModal()
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(name)

  const handleSave = () => {
    if (editName.trim() && editName.trim() !== name) {
      onUpdate(editName.trim())
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditName(name)
    setIsEditing(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave()
    if (e.key === "Escape") handleCancel()
  }

  const handleDelete = async () => {
    const confirmed = await modal.confirmDelete({
      message: t("kanban.column.confirmDeleteMessage"),
    })

    if (confirmed) {
      onDelete()
    }
  }

  if (isEditing) {
    return (
      <Flex align="center" className="gap-2 flex-1">
        <Input
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onKeyDown={handleKeyPress}
          onBlur={handleSave}
          className="text-sm font-medium"
          autoFocus
        />
        <Button size="sm" variant="ghost" onClick={handleCancel}>
          <X className="h-4 w-4" />
        </Button>
      </Flex>
    )
  }

  return (
    <Flex justify="between" align="center">
      <Text tag="h3" size="sm" weight="medium">
        {name}
      </Text>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setIsEditing(true)}>
            {t("kanban.column.editColumn")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} className="text-destructive">
            {t("kanban.column.deleteColumn")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Flex>
  )
}
