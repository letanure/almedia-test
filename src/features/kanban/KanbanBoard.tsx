import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
} from "@dnd-kit/core"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useStore } from "@/hooks/useStores"
import { BoardHeader } from "./components/BoardHeader"
import { DraggableTaskCard } from "./components/dnd/DraggableTaskCard"
import { DroppableColumn } from "./components/dnd/DroppableColumn"
import { PersistentTaskModal } from "./components/task/PersistentTaskModal"
import { TaskCard } from "./components/task/TaskCard"
import { TaskModalProvider } from "./contexts/TaskModalContext"
import { useDragAndDrop } from "./hooks/useDragAndDrop"

export const KanbanBoard = observer(() => {
  const { t } = useTranslation()
  const { columnStore, taskStore, boardStore } = useStore()
  const { handleDragEnd } = useDragAndDrop()
  const [activeTask, setActiveTask] = useState<{
    id: string
    title: string
    description?: string
    columnId: string
  } | null>(null)

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const task = taskStore.getTaskById(active.id as string)
    const columnId = boardStore.getColumnForTask(active.id as string)
    if (task && columnId) {
      setActiveTask({
        id: task.id,
        title: task.title,
        description: task.description,
        columnId,
      })
    }
  }

  const handleDragEndWithPreview = (event: DragEndEvent) => {
    setActiveTask(null)
    handleDragEnd(event)
  }

  return (
    <TaskModalProvider>
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEndWithPreview}
      >
        <div className="h-full p-6">
          <BoardHeader />

          <div className="flex gap-4 overflow-x-auto pb-4">
            {columnStore.columns.map((column) => {
              const taskIds = boardStore.getTaskIdsByColumn(column.id)
              const tasks = taskStore.getTasksByIds(taskIds)

              return (
                <DroppableColumn
                  key={column.id}
                  columnId={column.id}
                  title={column.name}
                  taskIds={taskIds}
                >
                  {tasks.length > 0
                    ? tasks.map((task) => (
                        <DraggableTaskCard
                          key={task.id}
                          taskId={task.id}
                          columnId={column.id}
                          title={task.title}
                          description={task.description}
                        />
                      ))
                    : !activeTask && (
                        <div className="text-center text-gray-500 text-sm py-4">
                          {t("kanban.column.emptyColumn")}
                        </div>
                      )}
                </DroppableColumn>
              )
            })}
          </div>
        </div>

        <DragOverlay>
          {activeTask && (
            <div className="transform rotate-2 shadow-2xl">
              <TaskCard
                taskId={activeTask.id}
                columnId={activeTask.columnId}
                title={activeTask.title}
                description={activeTask.description}
              />
            </div>
          )}
        </DragOverlay>

        <PersistentTaskModal />
      </DndContext>
    </TaskModalProvider>
  )
})
