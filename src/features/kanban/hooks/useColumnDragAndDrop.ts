import {
  closestCenter,
  type DragEndEvent,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { useState } from "react"
import { useStore } from "@/hooks/useStores"

export const useColumnDragAndDrop = () => {
  const { columnStore } = useStore()
  const [activeColumn, setActiveColumn] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveColumn(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = columnStore.columns.findIndex(
        (column) => column.id === active.id,
      )
      const newIndex = columnStore.columns.findIndex(
        (column) => column.id === over?.id,
      )

      columnStore.reorderColumns(oldIndex, newIndex)
    }

    setActiveColumn(null)
  }

  const draggedColumn = activeColumn
    ? columnStore.columns.find((c) => c.id === activeColumn)
    : null

  return {
    sensors,
    activeColumn,
    draggedColumn,
    handleDragStart,
    handleDragEnd,
    collisionDetection: closestCenter,
  }
}
