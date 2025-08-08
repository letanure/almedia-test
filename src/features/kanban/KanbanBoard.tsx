import { closestCenter, DndContext, DragOverlay } from "@dnd-kit/core"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { useStore } from "@/hooks/useStores"
import { BoardHeader } from "./components/BoardHeader"
import { DraggableTaskCard } from "./components/dnd/DraggableTaskCard"
import { DroppableColumn } from "./components/dnd/DroppableColumn"
import { PersistentTaskModal } from "./components/task/PersistentTaskModal"
import { TaskModalProvider } from "./contexts/TaskModalContext"
import { useDragAndDrop } from "./hooks/useDragAndDrop"

export const KanbanBoard = observer(() => {
  const { t } = useTranslation()
  const { columnStore, taskStore, boardStore } = useStore()
  const { handleDragEnd } = useDragAndDrop()

  return (
    <TaskModalProvider>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
                  {tasks.length > 0 ? (
                    tasks.map((task) => (
                      <DraggableTaskCard
                        key={task.id}
                        taskId={task.id}
                        columnId={column.id}
                        title={task.title}
                        description={task.description}
                      />
                    ))
                  ) : (
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
          {/* We can add a drag overlay here if needed */}
        </DragOverlay>

        <PersistentTaskModal />
      </DndContext>
    </TaskModalProvider>
  )
})
