import { useTranslation } from "react-i18next"
import { Flex } from "@/components/custom-ui/Flex"
import { Button } from "@/components/ui/button"

interface TodoStatsProps {
  activeCount: number
  completedCount: number
  onClearCompleted: () => void
}

export function TodoStats({
  activeCount,
  completedCount,
  onClearCompleted,
}: TodoStatsProps) {
  const { t } = useTranslation()

  return (
    <Flex align="center" justify="between" className="border-t pt-4">
      <Flex gap="md" className="text-sm text-muted-foreground">
        <span>
          {activeCount} {t("todo.stats.active")}
        </span>
        <span>
          {completedCount} {t("todo.stats.completed")}
        </span>
      </Flex>
      {completedCount > 0 && (
        <Button variant="outline" size="sm" onClick={onClearCompleted}>
          {t("todo.clearCompleted")}
        </Button>
      )}
    </Flex>
  )
}
