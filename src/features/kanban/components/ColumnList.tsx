import { observer } from "mobx-react-lite"
import { forwardRef } from "react"
import { useTranslation } from "react-i18next"
import { useStore } from "@/hooks/useStores"
import { DraggableTaskCard } from "./dnd/DraggableTaskCard"
import { DroppableColumn } from "./dnd/DroppableColumn"

interface ColumnListProps {
  getColumnWidthClass: (count: number) => string
  activeTaskId?: string
}

/**
 * List of all kanban columns with their tasks
 */
export const ColumnList = observer(
  forwardRef<HTMLDivElement, ColumnListProps>(
    ({ getColumnWidthClass, activeTaskId }, ref) => {
      const { t } = useTranslation()
      const { columnStore, taskStore, boardStore } = useStore()

      return (
        <div
          ref={ref}
          className="flex gap-4 overflow-x-auto overflow-y-hidden pb-4"
          style={{ scrollbarWidth: "thin" }}
        >
          {columnStore.columns.map((column) => {
            const taskIds = boardStore.getTaskIdsByColumn(column.id)
            const tasks = taskStore.getTasksByIds(taskIds)
            const columnCount = columnStore.columns.length

            return (
              <DroppableColumn
                key={column.id}
                columnId={column.id}
                title={column.name}
                taskIds={taskIds}
                className={getColumnWidthClass(columnCount)}
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
                  : !activeTaskId && (
                      <div className="text-center text-gray-500 text-sm py-4">
                        {t("kanban.column.emptyColumn")}
                      </div>
                    )}
              </DroppableColumn>
            )
          })}
        </div>
      )
    },
  ),
)
