import { observer } from "mobx-react-lite"
import { useStore } from "@/hooks/useStores"
import { BoardHeader } from "./components/BoardHeader"
import { Column } from "./components/column/Column"
import { TaskCard } from "./components/task/TaskCard"

export const KanbanBoard = observer(() => {
  const { columnStore } = useStore()

  return (
    <div className="h-full p-6">
      <BoardHeader />

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columnStore.columns.map((column) => (
          <Column key={column.id} columnId={column.id} title={column.name}>
            <TaskCard
              title="Sample Task 1"
              description="This is a sample task description"
            />
            <TaskCard title="Sample Task 2" />
            <TaskCard
              title="Another Task"
              description="With some description text"
            />
          </Column>
        ))}
      </div>
    </div>
  )
})
