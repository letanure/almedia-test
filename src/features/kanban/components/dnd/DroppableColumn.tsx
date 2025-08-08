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
    <div
      ref={setNodeRef}
      className={`transition-colors ${
        isOver ? "bg-blue-50 border-blue-300" : ""
      }`}
    >
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <Column columnId={columnId} title={title}>
          {children}
        </Column>
      </SortableContext>
    </div>
  )
}
