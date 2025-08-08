import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import type { ReactNode } from "react"
import { Column } from "../column/Column"

interface DroppableColumnProps {
  columnId: string
  title: string
  taskIds: string[]
  children: ReactNode
  className?: string
}

export const DroppableColumn = ({
  columnId,
  title,
  taskIds,
  children,
  className = "flex-1",
}: DroppableColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: columnId,
    data: {
      type: "column",
      columnId,
    },
  })

  return (
    <div className={className}>
      <Column columnId={columnId} title={title}>
        <div
          ref={setNodeRef}
          className="min-h-[100px]"
          data-testid="droppable-column"
        >
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
