import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ColumnHeaderProps {
  title: string
  onDelete: () => void
}

export const ColumnHeader = ({ title, onDelete }: ColumnHeaderProps) => {
  return (
    <div className="p-3 border-b border-gray-300 flex justify-between items-center group">
      <h3 className="font-medium">{title}</h3>
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-40 hover:opacity-100 transition-opacity"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
