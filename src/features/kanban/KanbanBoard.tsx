import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core"
import { observer } from "mobx-react-lite"
import { useStore } from "@/hooks/useStores"
import { BoardHeader } from "./components/BoardHeader"
import { ColumnList } from "./components/ColumnList"
import { DragPreview } from "./components/DragPreview"
import { KeyboardHandler } from "./components/KeyboardHandler"
import { ScrollArrowIndicator } from "./components/ScrollArrowIndicator"
import { PersistentTaskModal } from "./components/task/PersistentTaskModal"
import { KeyboardNavigationProvider } from "./contexts/KeyboardNavigationContext"
import { TaskModalProvider } from "./contexts/TaskModalContext"
import { useColumnLayout } from "./hooks/useColumnLayout"
import { useDragAndDrop } from "./hooks/useDragAndDrop"
import { useDragPreview } from "./hooks/useDragPreview"

export const KanbanBoard = observer(() => {
  const { columnStore } = useStore()
  const { handleDragEnd } = useDragAndDrop()

  // Custom hooks for clean separation of concerns
  const { activeTask, handleDragStart, clearActiveTask } = useDragPreview()
  const { scrollContainerRef, getColumnWidthClass, shouldShowArrow } =
    useColumnLayout(columnStore.columns.length)

  // Handle drag end - clear preview and process drop
  const handleDragEndWithPreview = (event: DragEndEvent) => {
    clearActiveTask()
    handleDragEnd(event)
  }

  return (
    <KeyboardNavigationProvider>
      <TaskModalProvider>
        <KeyboardHandler />
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEndWithPreview}
        >
          <div className="h-full p-6" data-testid="kanban-board">
            <BoardHeader />

            <div className="relative">
              <ColumnList
                ref={scrollContainerRef}
                getColumnWidthClass={getColumnWidthClass}
                activeTaskId={activeTask?.id}
              />

              <ScrollArrowIndicator show={shouldShowArrow} />
            </div>
          </div>

          <DragPreview activeTask={activeTask} />
          <PersistentTaskModal />
        </DndContext>
      </TaskModalProvider>
    </KeyboardNavigationProvider>
  )
})
