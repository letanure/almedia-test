import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import type { ReactNode } from "react"
import { Column } from "../column/Column"

interface DroppableColumnProps {
  columnId: string
  title: string
  taskIds: string[]
  children: ReactNode
}

export const DroppableColumn = ({
  columnId,
  title,
  taskIds,
  children,
}: DroppableColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: columnId,
    data: {
      type: "column",
      columnId,
    },
  })

  return (
    <div className="flex-1">
      <Column columnId={columnId} title={title}>
        <div ref={setNodeRef} className="min-h-[100px]">
          <SortableContext
            items={taskIds}
            strategy={verticalListSortingStrategy}
          >
            {children}

            {/* Drop indicator at the bottom when hovering over empty space */}
            {isOver && taskIds.length === 0 && (
              <div className="bg-gray-200 border-2 border-dashed border-gray-400 rounded p-4 mx-2 mt-2 opacity-60 flex items-center justify-center">
                <div className="text-gray-500 text-sm">Drop here</div>
              </div>
            )}
          </SortableContext>
        </div>
      </Column>
    </div>
  )
}
