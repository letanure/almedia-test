/**
 * Main Kanban Board component
 *
 * Displays the kanban board with columns and provides column management
 */

import { observer } from "mobx-react-lite"
import { useEffect, useRef, useState } from "react"
import { Animated, AnimatedGroup } from "@/components/custom-ui/Animated"
import { Container } from "@/components/custom-ui/Container"
import { Flex } from "@/components/custom-ui/Flex"
import { Stack } from "@/components/custom-ui/Stack"
import { useStore } from "@/hooks/useStores"
import { AddColumnForm } from "./components/AddColumnForm"
import { BoardHeader } from "./components/BoardHeader"
import { Column } from "./components/Column"

export const KanbanBoard = observer(() => {
  const { columnStore } = useStore()
  const [isAddingColumn, setIsAddingColumn] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleAddColumn = (name: string) => {
    columnStore.addColumn(name)
    setIsAddingColumn(false)
  }

  const handleCancelAdd = () => {
    setIsAddingColumn(false)
  }

  const handleStartAddColumn = () => {
    setIsAddingColumn(true)
  }

  // Auto-scroll to show the add form when it appears
  useEffect(() => {
    if (isAddingColumn && scrollContainerRef.current) {
      // Wait for animation to start, then scroll smoothly
      setTimeout(() => {
        scrollContainerRef.current?.scrollTo({
          left: scrollContainerRef.current.scrollWidth,
          behavior: "smooth",
        })
      }, 100)
    }
  }, [isAddingColumn])

  // Determine if we should scroll (5+ total items including add form)
  const totalItems = columnStore.totalColumns + (isAddingColumn ? 1 : 0)
  const shouldScroll = totalItems > 4

  return (
    <Container size="full" padding="md">
      <Stack spacing="lg">
        <BoardHeader
          totalColumns={columnStore.totalColumns}
          onAddColumn={handleStartAddColumn}
          disableAddButton={isAddingColumn}
        />

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
                className="flex-shrink-0"
              >
                <Column
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
              <AddColumnForm
                onAdd={handleAddColumn}
                onCancel={handleCancelAdd}
              />
            </Animated>
          )}
        </Flex>
      </Stack>
    </Container>
  )
})
