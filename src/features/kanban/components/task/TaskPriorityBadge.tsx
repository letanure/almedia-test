import { Clock } from "lucide-react"
import {
  getEisenhowerQuadrant,
  getQuadrantConfig,
  type ImportanceLevel,
  isTaskOverdue,
  type UrgencyLevel,
} from "../../schemas"

interface TaskPriorityBadgeProps {
  importance: ImportanceLevel
  urgency: UrgencyLevel
  dueDate?: Date
  showOverdue?: boolean
  discrete?: boolean
}

export const TaskPriorityBadge = ({
  importance,
  urgency,
  dueDate,
  showOverdue = true,
  discrete = false,
}: TaskPriorityBadgeProps) => {
  const quadrant = getEisenhowerQuadrant(importance, urgency)
  const config = getQuadrantConfig(quadrant)
  const overdue = dueDate && isTaskOverdue(dueDate)

  if (discrete) {
    return (
      <div className="flex items-center gap-1">
        {/* Discrete Priority Indicator */}
        <div
          className={`w-3 h-3 rounded-full ${config.bgColor.replace("-100", "-500")}`}
          title={`${config.description} - ${config.label}`}
        />

        {/* Due Date - minimal */}
        {dueDate && (
          <span
            className={`text-xs font-medium ${
              overdue && showOverdue ? "text-red-600" : "text-gray-600"
            }`}
          >
            {overdue && showOverdue ? "!" : formatDueDate(dueDate)}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1">
      {/* Priority Badge */}
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full border ${config.bgColor} ${config.textColor} ${config.borderColor}`}
      >
        {config.label}
      </span>

      {/* Due Date Badge */}
      {dueDate && (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full border flex items-center gap-1 ${
            overdue && showOverdue
              ? "bg-red-100 text-red-800 border-red-200"
              : "bg-gray-100 text-gray-600 border-gray-200"
          }`}
        >
          <Clock className="h-3 w-3" />
          {overdue && showOverdue ? "Overdue" : formatDueDate(dueDate)}
        </span>
      )}
    </div>
  )
}

const formatDueDate = (date: Date): string => {
  const now = new Date()
  const diffTime = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Tomorrow"
  if (diffDays === -1) return "Yesterday"
  if (diffDays > 0) return `${diffDays}d left`
  return `${Math.abs(diffDays)}d ago`
}
