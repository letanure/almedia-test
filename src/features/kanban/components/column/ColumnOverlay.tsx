import { DragOverlay } from "@dnd-kit/core"
import { useStore } from "@/hooks/useStores"
import type { Column as ColumnType } from "../../schemas"
import { Column } from "./Column"

interface ColumnOverlayProps {
  column: ColumnType | null | undefined
}

export const ColumnOverlay = ({ column }: ColumnOverlayProps) => {
  const { columnStore } = useStore()

  return (
    <DragOverlay style={{ zIndex: 9999 }}>
      {column ? (
        <div className="rotate-3 shadow-xl transform-gpu">
          <Column
            column={column}
            onUpdateColumn={(id, name) =>
              columnStore.updateColumn(id, { name })
            }
            onDeleteColumn={(id) => columnStore.deleteColumn(id)}
          />
        </div>
      ) : null}
    </DragOverlay>
  )
}
