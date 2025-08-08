import { Trash2 } from "lucide-react"
import { memo, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { FormFieldRenderer } from "../FormFieldRenderer"
import type { FieldArrayConfig } from "../types"

interface FieldArrayItemProps {
  field: FieldArrayConfig
  index: number
  canRemove: boolean
  onRemove: (index: number) => void
}

export const FieldArrayItem = memo(
  ({ field, index, canRemove, onRemove }: FieldArrayItemProps) => {
    const itemFields = useMemo(
      () =>
        field.fields.map((fieldConfig) => ({
          ...fieldConfig,
          name: `${field.name}.${index}.${fieldConfig.name}`,
          label: index === 0 ? fieldConfig.label : "",
        })),
      [field.fields, field.name, index],
    )

    return (
      <div className="flex items-start gap-2">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {itemFields.map((itemField) => (
            <FormFieldRenderer
              key={itemField.name}
              field={itemField}
              isRequired={itemField.required}
            />
          ))}
        </div>
        {canRemove && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemove(index)}
            className="mt-8"
            aria-label={`Remove item ${index + 1}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.field === nextProps.field &&
      prevProps.index === nextProps.index &&
      prevProps.canRemove === nextProps.canRemove &&
      prevProps.onRemove === nextProps.onRemove
    )
  },
)

FieldArrayItem.displayName = "FieldArrayItem"
