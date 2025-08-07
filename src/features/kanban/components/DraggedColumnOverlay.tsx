import { DragOverlay } from "@dnd-kit/core"
import { useStore } from "@/hooks/useStores"
import type { Column as ColumnType } from "../schemas"
import { Column } from "./Column"

interface DraggedColumnOverlayProps {
  draggedColumn: ColumnType | null | undefined
}

export const DraggedColumnOverlay = ({
  draggedColumn,
}: DraggedColumnOverlayProps) => {
  const { columnStore } = useStore()

  return (
    <DragOverlay style={{ zIndex: 9999 }}>
      {draggedColumn ? (
        <div className="rotate-3 shadow-xl transform-gpu">
          <Column
            column={draggedColumn}
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
