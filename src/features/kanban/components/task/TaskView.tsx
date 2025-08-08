import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/hooks/useStores"
import { useCommentActions } from "../../hooks/useCommentActions"
import type { Comment } from "../../schemas"
import { CommentList } from "../comments/CommentList"
import { TaskPriorityBadge } from "./TaskPriorityBadge"

interface TaskViewProps {
  taskId: string
  title: string
  description?: string
  comments: Comment[]
  onEdit: () => void
  onDelete: () => void
}

export const TaskView = ({
  taskId,
  title,
  description,
  comments,
  onEdit,
  onDelete,
}: TaskViewProps) => {
  const { taskStore } = useStore()
  const { addComment, editComment, deleteComment, replyToComment } =
    useCommentActions(taskId)

  const task = taskStore.getTaskById(taskId)

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header Section */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-start justify-between">
          {/* Title and metadata */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-semibold text-gray-900 mb-3 break-words leading-tight">
              {title}
            </h1>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 ml-4 flex-shrink-0">
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm" onClick={onDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        {/* Priority badges row */}
        {task && (
          <div className="mt-3">
            <TaskPriorityBadge
              importance={task.importance}
              urgency={task.urgency}
              dueDate={task.dueDate}
              discrete={false}
            />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Description */}
        {description && (
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Description
            </h3>
            <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
              {description}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="flex-1 min-h-0 px-6 py-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 flex items-center">
              Comments
              <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-normal">
                {comments.length}
              </span>
            </h3>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto">
            <CommentList
              comments={comments}
              onAddComment={addComment}
              onEditComment={editComment}
              onDeleteComment={deleteComment}
              onReplyComment={replyToComment}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
