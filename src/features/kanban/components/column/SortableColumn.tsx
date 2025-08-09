import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { Column as ColumnType } from "../../schemas"
import { Column } from "./Column"

interface SortableColumnProps {
  column: ColumnType
  onUpdateColumn: (id: string, name: string) => void
  onDeleteColumn: (id: string) => void
}

export const SortableColumn = ({
  column,
  onUpdateColumn: _onUpdateColumn,
  onDeleteColumn: _onDeleteColumn,
}: SortableColumnProps) => {
  const { attributes, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: column.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : "auto",
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex-shrink-0"
        {...attributes}
      >
        {/* Placeholder/ghost column */}
        <div className="min-w-72 flex-1 p-4 border-2 border-dashed border-muted-foreground/30 bg-muted/20 rounded-lg">
          <div className="h-full opacity-50">
            <div className="h-6 bg-muted-foreground/20 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-16 bg-muted-foreground/10 rounded"></div>
              <div className="h-12 bg-muted-foreground/10 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex-shrink-0"
      {...attributes}
    >
      <Column columnId={column.id} title={column.name}>
        <div className="min-h-32">
          {/* Column content will be handled by Column component */}
        </div>
      </Column>
    </div>
  )
}
