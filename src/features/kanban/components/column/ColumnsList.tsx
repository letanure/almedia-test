import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable"
import { observer } from "mobx-react-lite"
import type { RefObject } from "react"
import { Animated, AnimatedGroup } from "@/components/custom-ui/Animated"
import { Flex } from "@/components/custom-ui/Flex"
import { useStore } from "@/hooks/useStores"
import { ColumnForm } from "./ColumnForm"
import { SortableColumn } from "./SortableColumn"

interface ColumnsListProps {
  scrollContainerRef: RefObject<HTMLDivElement | null>
  shouldScroll: boolean
  isAddingColumn: boolean
  onAddColumn: (name: string) => void
  onCancelAdd: () => void
}

export const ColumnsList = observer(
  ({
    scrollContainerRef,
    shouldScroll,
    isAddingColumn,
    onAddColumn,
    onCancelAdd: _onCancelAdd,
  }: ColumnsListProps) => {
    const { columnStore } = useStore()

    return (
      <SortableContext
        items={columnStore.columns.map((column) => column.id)}
        strategy={horizontalListSortingStrategy}
      >
        <Flex
          ref={scrollContainerRef}
          className={`gap-6 pb-4 ${shouldScroll ? "overflow-x-auto scroll-smooth" : "overflow-x-hidden"}`}
        >
          <AnimatedGroup mode="sync">
            {columnStore.columns.map((column) => (
              <Animated
                key={column.id}
                in="slideUp"
                out="slideLeft"
                duration="fast"
                layout
              >
                <SortableColumn
                  column={column}
                  onUpdateColumn={(id, name) =>
                    columnStore.updateColumn(id, { name })
                  }
                  onDeleteColumn={(id) => columnStore.deleteColumn(id)}
                />
              </Animated>
            ))}
          </AnimatedGroup>

          {isAddingColumn && (
            <Animated effect="fade" duration="fast" className="flex-shrink-0">
              <ColumnForm onSubmit={onAddColumn} />
            </Animated>
          )}
        </Flex>
      </SortableContext>
    )
  },
)
