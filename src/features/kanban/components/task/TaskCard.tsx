import { GripVertical, MessageCircle, Trash2 } from "lucide-react"
import { observer } from "mobx-react-lite"
import { Button } from "@/components/ui/button"
import { useStore } from "@/hooks/useStores"
import { useKeyboardNavigation } from "../../contexts/KeyboardNavigationContext"
import { useTaskModal } from "../../contexts/TaskModalContext"
import { useTaskActions } from "../../hooks/useTaskActions"
import { TaskPriorityBadge } from "./TaskPriorityBadge"

interface TaskCardProps {
  taskId: string
  columnId: string
  title: string
  dragListeners?: Record<string, unknown>
}

export const TaskCard = observer(
  ({ taskId, columnId, title, dragListeners }: TaskCardProps) => {
    const { handleDeleteTask } = useTaskActions(columnId)
    const { openModal } = useTaskModal()
    const { isTaskSelected, selectTask } = useKeyboardNavigation()
    const { taskStore } = useStore()

    const isSelected = isTaskSelected(taskId)
    const task = taskStore.getTaskById(taskId)
    const commentCount = task?.comments?.length || 0

    const handleClick = () => {
      // First select the task for keyboard navigation
      selectTask(taskId, columnId)
      // Then open modal
      openModal(taskId)
    }

    const handleDeleteClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      handleDeleteTask(taskId, title)
    }

    return (
      <div className="relative group/card mb-2">
        <div
          className={`border rounded transition-colors ${
            isSelected
              ? "border-blue-500 bg-blue-50 shadow-sm"
              : "hover:border-gray-400 hover:bg-gray-50"
          }`}
        >
          {/* Drag handle */}
          <div
            className={`drag-handle absolute left-1 top-1 h-full flex items-center transition-opacity cursor-grab active:cursor-grabbing z-10 ${
              isSelected
                ? "opacity-60 hover:opacity-100"
                : "opacity-0 group-hover/card:opacity-60 hover:opacity-100"
            }`}
            data-drag-handle="true"
            {...(dragListeners || {})}
          >
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>

          {/* Card content */}
          <button
            type="button"
            className="w-full transition-colors text-left flex flex-col h-full"
            onClick={handleClick}
          >
            {/* Main content area */}
            <div className="p-2 pl-6 pr-8 flex-1">
              <div className="text-sm font-medium leading-relaxed">{title}</div>
            </div>

            {/* Bottom section with separator */}
            {(commentCount > 0 || task) && (
              <div className="border-t border-gray-100 px-2 py-1.5 pl-6 pr-8 bg-gray-50/50">
                <div className="flex items-center justify-between">
                  {/* Left side - Comments */}
                  <div className="flex items-center">
                    {commentCount > 0 && (
                      <div className="flex items-center text-xs text-gray-500">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        <span>{commentCount}</span>
                      </div>
                    )}
                  </div>

                  {/* Right side - Priority badges */}
                  {task && (
                    <div className="flex items-center">
                      <TaskPriorityBadge
                        importance={task.importance}
                        urgency={task.urgency}
                        dueDate={task.dueDate}
                        discrete={false}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </button>

          {/* Delete button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDeleteClick}
            className={`absolute top-1 right-1 h-5 w-5 p-0 transition-opacity ${
              isSelected
                ? "opacity-40 hover:opacity-100"
                : "opacity-0 group-hover/card:opacity-40 hover:opacity-100"
            }`}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    )
  },
)
