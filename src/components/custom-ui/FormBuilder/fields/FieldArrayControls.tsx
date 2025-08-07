import { Plus } from "lucide-react"
import { memo } from "react"
import { Button } from "@/components/ui/button"

interface FieldArrayControlsProps {
  canAdd: boolean
  onAdd: () => void
  addButtonLabel?: string
  fieldCount: number
  maxItems?: number
}

export const FieldArrayControls = memo(
  ({
    canAdd,
    onAdd,
    addButtonLabel = "Add Item",
    fieldCount,
    maxItems,
  }: FieldArrayControlsProps) => {
    return (
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAdd}
          disabled={!canAdd}
        >
          <Plus className="h-4 w-4 mr-2" />
          {addButtonLabel}
        </Button>
        {maxItems && (
          <span className="text-sm text-muted-foreground">
            {fieldCount} / {maxItems} items
          </span>
        )}
      </div>
    )
  },
)

FieldArrayControls.displayName = "FieldArrayControls"
