import { memo, useCallback } from "react"
import { useFormContext } from "react-hook-form"
import { useFieldArray } from "../hooks/useFieldArray"
import type { FieldArrayConfig } from "../types"
import { FieldArrayControls } from "./FieldArrayControls"
import { FieldArrayItem } from "./FieldArrayItem"
import { FieldLabel } from "./shared/FieldLabel"

interface FieldArrayProps {
  field: FieldArrayConfig
  isRequired?: boolean
}

export const FieldArray = memo(
  ({ field, isRequired = false }: FieldArrayProps) => {
    const { formState } = useFormContext()
    const {
      fields,
      addRow,
      removeRow,
      canAdd,
      canRemove,
      getValidationStatus,
    } = useFieldArray({
      name: field.name,
      fieldConfig: field,
    })

    const error = formState.errors[field.name]
    const { nonEmptyCount } = getValidationStatus()

    const handleRemove = useCallback(
      (index: number) => {
        removeRow(index)
      },
      [removeRow],
    )

    const handleAdd = useCallback(() => {
      addRow()
    }, [addRow])

    return (
      <div className={field.layout ? `layout-${field.layout}` : ""}>
        <div className="mb-4">
          <FieldLabel label={field.label} isRequired={isRequired} />
          {field.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {field.description}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {fields.map((arrayField, index) => (
            <div key={arrayField.id}>
              <FieldArrayItem
                field={field}
                index={index}
                canRemove={canRemove}
                onRemove={handleRemove}
              />
              {index < fields.length - 1 && (
                <div className="border-b border-border/50 mt-4" />
              )}
            </div>
          ))}
        </div>

        {canAdd && (
          <div className="mt-4">
            <FieldArrayControls
              canAdd={canAdd}
              onAdd={handleAdd}
              addButtonLabel={field.addButtonLabel}
              fieldCount={nonEmptyCount}
              maxItems={field.maxItems}
            />
          </div>
        )}

        {error && (
          <p className="text-sm text-destructive mt-2">
            {error.message as string}
          </p>
        )}

        {fields.length > 0 && field.minItems && (
          <div className="text-sm text-muted-foreground mt-2">
            Minimum {field.minItems} item{field.minItems > 1 ? "s" : ""}{" "}
            required
          </div>
        )}
      </div>
    )
  },
)

FieldArray.displayName = "FieldArray"
