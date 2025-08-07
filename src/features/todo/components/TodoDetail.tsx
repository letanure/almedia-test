/**
 * Todo Detail View - shows individual todo item with full details
 */

import { ArrowLeft, Calendar, CheckCircle, Circle } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { Link, Navigate, useParams } from "react-router-dom"
import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"
import { Button } from "@/components/ui/button"
import { useStore } from "@/hooks/useStores"

export const TodoDetail = observer(() => {
  const { id } = useParams<{ id: string }>()
  const { todoStore } = useStore()
  const { t } = useTranslation()

  if (!id) {
    return <Navigate to="/todo" replace />
  }

  const todo = todoStore.todos.find((t) => t.id === id)

  if (!todo) {
    return (
      <Stack spacing="lg">
        <Link to="/todo">
          <Button variant="ghost" className="w-fit">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("todo.navigation.all")}
          </Button>
        </Link>
        <Text tag="h1">{t("todo.detail.notFound")}</Text>
        <Text tag="p">{t("todo.detail.notFoundDescription")}</Text>
      </Stack>
    )
  }

  return (
    <Stack spacing="lg">
      <Link to="/todo">
        <Button variant="ghost" className="w-fit">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("todo.navigation.all")}
        </Button>
      </Link>

      <Stack spacing="md">
        <div className="flex items-start gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => todoStore.toggleTodo(todo.id)}
            className="mt-1"
          >
            {todo.completed ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <Circle className="h-5 w-5" />
            )}
          </Button>
          <div className="flex-1">
            <Text
              tag="h1"
              className={
                todo.completed ? "line-through text-muted-foreground" : ""
              }
            >
              {todo.text}
            </Text>
          </div>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <Text tag="small">
            {t("todo.detail.created")}:{" "}
            {new Date(todo.createdAt).toLocaleDateString()}
          </Text>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              todo.completed
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
            }`}
          >
            {todo.completed
              ? t("todo.stats.completed")
              : t("todo.stats.active")}
          </div>
        </div>
      </Stack>

      <div className="flex gap-2">
        <Button
          onClick={() => todoStore.toggleTodo(todo.id)}
          variant={todo.completed ? "outline" : "default"}
        >
          {todo.completed
            ? t("todo.detail.markAsActive")
            : t("todo.detail.markAsComplete")}
        </Button>
        <Button
          onClick={() => {
            todoStore.deleteTodo(todo.id)
            // Navigate back after deletion
            window.history.back()
          }}
          variant="destructive"
        >
          {t("todo.delete")}
        </Button>
      </div>
    </Stack>
  )
})
