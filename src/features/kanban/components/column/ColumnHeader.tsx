import { Edit, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useColumnActions } from "../../hooks/useColumnActions"
import { useTaskActions } from "../../hooks/useTaskActions"
import { TaskForm } from "../task/TaskForm"
import { ColumnForm } from "./ColumnForm"

interface ColumnHeaderProps {
  columnId: string
  title: string
}

export const ColumnHeader = ({ columnId, title }: ColumnHeaderProps) => {
  const { openEditModal, updateColumn, handleDelete } = useColumnActions(
    columnId,
    title,
  )
  const { openAddTaskModal, addTask } = useTaskActions(columnId)

  const handleEdit = () => {
    openEditModal(
      <ColumnForm initialData={{ name: title }} onSubmit={updateColumn} />,
    )
  }

  const handleAddTask = () => {
    openAddTaskModal(<TaskForm onSubmit={addTask} />)
  }

  return (
    <div
      className="p-3 border-b border-gray-300 flex justify-between items-center group"
      data-testid="column-header"
    >
      <h3 className="font-medium">{title}</h3>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddTask}
          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-40 hover:opacity-100 transition-opacity"
          data-testid="add-task-button"
        >
          <Plus className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleEdit}
          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-40 hover:opacity-100 transition-opacity"
          data-testid="column-menu-button"
        >
          <Edit className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-40 hover:opacity-100 transition-opacity"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
