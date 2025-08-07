import { useTranslation } from "react-i18next"
import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"

export const TaskList = () => {
  const { t } = useTranslation()

  return (
    <Stack spacing="sm" className="min-h-32">
      <Text tag="p" variant="muted" size="sm" align="center" className="py-8">
        {t("kanban.task.noTasks")}
      </Text>
    </Stack>
  )
}
