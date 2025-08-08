import { Stack } from "@/components/custom-ui/Stack"
import { Card } from "@/components/ui/card"
import type { Column as ColumnType } from "../schemas"
import { ColumnHeader } from "./ColumnHeader"
import { TaskList } from "./TaskList"

interface ColumnProps {
  column: ColumnType
  onUpdateColumn: (id: string, name: string) => void
  onDeleteColumn: (id: string) => void
}

export const Column = ({
  column,
  onUpdateColumn,
  onDeleteColumn,
}: ColumnProps) => {
  return (
    <Card className="min-w-72 flex-1 p-4">
      <Stack spacing="md">
        <ColumnHeader
          name={column.name}
          onUpdate={(name) => onUpdateColumn(column.id, name)}
          onDelete={() => onDeleteColumn(column.id)}
        />
        <TaskList />
      </Stack>
    </Card>
  )
}
