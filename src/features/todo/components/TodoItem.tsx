import { Eye, Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Flex } from "@/components/custom-ui/Flex"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { getRelativeTime } from "@/utils"
import type { Todo } from "../store"

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const { t } = useTranslation()

  return (
    <Flex
      align="center"
      gap="md"
      className="py-3 px-1 border-b last:border-0 hover:bg-muted/50 transition-colors"
    >
      <Checkbox
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={cn(
          "flex-1 cursor-pointer",
          todo.completed && "line-through opacity-50",
        )}
      >
        {todo.text}
      </label>
      <Badge variant="secondary" className="text-xs">
        {getRelativeTime(todo.createdAt, t)}
      </Badge>
      <Link to={`/todo/task/${todo.id}`}>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Eye className="h-4 w-4" />
          <span className="sr-only">{t("todo.detail.viewDetails")}</span>
        </Button>
      </Link>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        className="h-8 w-8"
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">{t("todo.delete")}</span>
      </Button>
    </Flex>
  )
}
