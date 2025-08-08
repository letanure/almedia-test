import { Stack } from "@/components/custom-ui/Stack"
import { Card } from "@/components/ui/card"
import type { Column as ColumnType } from "../../schemas"
import { TaskList } from "../task/TaskList"
import { ColumnHeader } from "./ColumnHeader"

interface ColumnProps {
  column: ColumnType
  onUpdateColumn: (id: string, name: string) => void
  onDeleteColumn: (id: string) => void
  dragHandleProps?: Record<string, unknown>
  isDragging?: boolean
}

export const Column = ({
  column,
  onUpdateColumn,
  onDeleteColumn,
  dragHandleProps,
  isDragging,
}: ColumnProps) => {
  return (
    <Card className={`min-w-72 flex-1 p-4 ${isDragging ? "opacity-40" : ""}`}>
      <Stack spacing="md">
        <ColumnHeader
          name={column.name}
          onUpdate={(name) => onUpdateColumn(column.id, name)}
          onDelete={() => onDeleteColumn(column.id)}
          dragHandleProps={dragHandleProps}
          isDragging={isDragging}
        />
        <TaskList columnId={column.id} />
      </Stack>
    </Card>
  )
}
