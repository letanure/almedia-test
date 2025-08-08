import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { useStore } from "@/hooks/useStores"
import { BoardHeader } from "./components/BoardHeader"
import { Column } from "./components/column/Column"
import { TaskCard } from "./components/task/TaskCard"

export const KanbanBoard = observer(() => {
  const { t } = useTranslation()
  const { columnStore, taskStore, boardStore } = useStore()

  return (
    <div className="h-full p-6">
      <BoardHeader />

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columnStore.columns.map((column) => {
          const taskIds = boardStore.getTaskIdsByColumn(column.id)
          const tasks = taskStore.getTasksByIds(taskIds)

          return (
            <Column key={column.id} columnId={column.id} title={column.name}>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <TaskCard
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
            </Column>
          )
        })}
      </div>
    </div>
  )
})
