/** biome-ignore-all lint/correctness/noUnreachable: false positive */
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
import {
  Animated,
  AnimatedGroup,
  AnimatedLayout,
} from "@/components/custom-ui/Animated"
import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"
import { useStore } from "@/hooks/useStores"
import { TodoEmpty } from "./components/TodoEmpty"
import { TodoForm } from "./components/TodoForm"
import { TodoItem } from "./components/TodoItem"
import { TodoStats } from "./components/TodoStats"

export const TodoList = observer(() => {
  const { todoStore } = useStore()
  const location = useLocation()
  const { t } = useTranslation()

  const filteredTodos = (() => {
    switch (location.pathname) {
      case "/todo/active":
        return todoStore.todos.filter((todo) => !todo.completed)
      case "/todo/completed":
        return todoStore.todos.filter((todo) => todo.completed)
      default:
        return todoStore.todos
    }
  })()

  return (
    <Stack spacing="lg">
      <Stack spacing="xs">
        <Text tag="h1">{t("todo.title")}</Text>
        <Text tag="small">
          {t("todo.description", { count: todoStore.totalCount })}
        </Text>
      </Stack>

      <TodoForm onSubmit={(text) => todoStore.addTodo(text)} />

      <Stack spacing="xs">
        {filteredTodos.length === 0 && (
          <Animated effect="fade" delay={0.2}>
            <TodoEmpty />
          </Animated>
        )}
        <AnimatedLayout>
          <AnimatedGroup mode="sync">
            {filteredTodos.map((todo) => (
              <Animated
                key={todo.id}
                in="slideUp"
                out="slideRight"
                duration="fast"
                layout
              >
                <TodoItem
                  todo={todo}
                  onToggle={(id) => todoStore.toggleTodo(id)}
                  onDelete={(id) => todoStore.deleteTodo(id)}
                />
              </Animated>
            ))}
          </AnimatedGroup>
        </AnimatedLayout>
      </Stack>

      {todoStore.totalCount > 0 && (
        <Animated effect="fade" delay={0.3} transformOrigin="bottom-center">
          <TodoStats
            activeCount={todoStore.activeCount}
            completedCount={todoStore.completedCount}
            onClearCompleted={() => todoStore.clearCompleted()}
          />
        </Animated>
      )}
    </Stack>
  )
})
