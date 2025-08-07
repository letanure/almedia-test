/**
 * Main Kanban Board component
 *
 * Displays the kanban board with columns and provides column management
 */

import { DndContext } from "@dnd-kit/core"
import { observer } from "mobx-react-lite"
import { Container } from "@/components/custom-ui/Container"
import { Stack } from "@/components/custom-ui/Stack"
import { useStore } from "@/hooks/useStores"
import { BoardHeader } from "./components/board/BoardHeader"
import { ColumnOverlay } from "./components/column/ColumnOverlay"
import { ColumnsList } from "./components/column/ColumnsList"
import { useAddColumn } from "./hooks/useAddColumn"
import { useColumnDragAndDrop } from "./hooks/useColumnDragAndDrop"

export const KanbanBoard = observer(() => {
  const { columnStore } = useStore()

  const {
    isAddingColumn,
    shouldScroll,
    scrollContainerRef,
    handleAddColumn,
    handleCancelAdd,
    handleStartAddColumn,
  } = useAddColumn()

  const {
    sensors,
    draggedColumn,
    handleDragStart,
    handleDragEnd,
    collisionDetection,
  } = useColumnDragAndDrop()

  return (
    <Container size="full" padding="md">
      <Stack spacing="lg">
        <BoardHeader
          totalColumns={columnStore.totalColumns}
          onAddColumn={handleStartAddColumn}
          disableAddButton={isAddingColumn}
        />

        <DndContext
          sensors={sensors}
          collisionDetection={collisionDetection}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <ColumnsList
            scrollContainerRef={scrollContainerRef}
            shouldScroll={shouldScroll}
            isAddingColumn={isAddingColumn}
            onAddColumn={handleAddColumn}
            onCancelAdd={handleCancelAdd}
          />

          <ColumnOverlay column={draggedColumn} />
        </DndContext>
      </Stack>
    </Container>
  )
})
