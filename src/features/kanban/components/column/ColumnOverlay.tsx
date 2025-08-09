import { DragOverlay } from "@dnd-kit/core"
import type { Column as ColumnType } from "../../schemas"
import { Column } from "./Column"

interface ColumnOverlayProps {
  column: ColumnType | null | undefined
}

export const ColumnOverlay = ({ column }: ColumnOverlayProps) => {
  return (
    <DragOverlay style={{ zIndex: 9999 }}>
      {column ? (
        <div className="rotate-3 shadow-xl transform-gpu">
          <Column columnId={column.id} title={column.name}>
            <div className="opacity-50">
              <div className="h-16 bg-muted-foreground/10 rounded mb-2"></div>
              <div className="h-12 bg-muted-foreground/10 rounded"></div>
            </div>
          </Column>
        </div>
      ) : null}
    </DragOverlay>
  )
}
