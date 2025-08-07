import { Plus } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Flex } from "@/components/custom-ui/Flex"
import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"
import { Button } from "@/components/ui/button"

interface BoardHeaderProps {
  totalColumns: number
  onAddColumn: () => void
  disableAddButton?: boolean
}

export const BoardHeader = ({
  totalColumns,
  onAddColumn,
  disableAddButton = false,
}: BoardHeaderProps) => {
  const { t } = useTranslation()

  return (
    <Flex justify="between" align="center">
      <Stack spacing="xs">
        <Text tag="h1">{t("kanban.board.title")}</Text>
        <Text tag="small" variant="muted">
          {totalColumns} columns
        </Text>
      </Stack>

      <Button onClick={onAddColumn} disabled={disableAddButton}>
        <Plus className="h-4 w-4 mr-2" />
        {t("kanban.board.addColumn")}
      </Button>
    </Flex>
  )
}
