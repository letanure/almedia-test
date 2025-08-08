import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ColumnHeader } from "./ColumnHeader"
import { TaskCard } from "./TaskCard"

interface ColumnProps {
  columnId: string
  title: string
}

export const Column = ({ columnId, title }: ColumnProps) => {
  const handleAddTask = () => {
    // TODO: Add task functionality
  }

  return (
    <div className="flex-1 border border-gray-300 rounded-lg flex flex-col group">
      <ColumnHeader columnId={columnId} title={title} />
      <div className="p-3 flex-1">
        <TaskCard
          title="Sample Task 1"
          description="This is a sample task description"
        />
        <TaskCard title="Sample Task 2" />
        <TaskCard
          title="Another Task"
          description="With some description text"
        />
      </div>
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
