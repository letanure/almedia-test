import { Plus } from "lucide-react"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { useTaskActions } from "../../hooks/useTaskActions"
import { TaskForm } from "../task/TaskForm"
import { ColumnHeader } from "./ColumnHeader"

interface ColumnProps {
  columnId: string
  title: string
  children: ReactNode
}

export const Column = ({ columnId, title, children }: ColumnProps) => {
  const { openAddTaskModal, addTask } = useTaskActions(columnId)

  const handleAddTask = () => {
    openAddTaskModal(<TaskForm onSubmit={addTask} />)
  }

  return (
    <div className="flex-1 border border-gray-300 rounded-lg flex flex-col group">
      <ColumnHeader columnId={columnId} title={title} />
      <div className="p-3 flex-1">{children}</div>
      <div className="p-3 pt-0">
        <Button
          variant="ghost"
          onClick={handleAddTask}
          className="w-full justify-start text-gray-600 hover:text-black opacity-0 group-hover:opacity-40 hover:opacity-100 transition-opacity"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a task
        </Button>
      </div>
    </div>
  )
}
