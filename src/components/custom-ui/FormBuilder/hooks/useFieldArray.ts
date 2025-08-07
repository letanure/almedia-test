import { useCallback, useEffect } from "react"
import {
  useFormContext,
  useFieldArray as useRHFFieldArray,
} from "react-hook-form"
import type { FieldArrayConfig } from "../types"
import { useFieldArrayValidation } from "./useFieldArrayValidation"

export interface UseFieldArrayOptions {
  name: string
  fieldConfig: FieldArrayConfig
}

export function useFieldArray({ name, fieldConfig }: UseFieldArrayOptions) {
  const { control, trigger } = useFormContext()
  const { fields, append, remove } = useRHFFieldArray({ control, name })

  // Create default value for new rows
  const createDefaultValue = useCallback((): Record<string, unknown> => {
    const defaultValue: Record<string, unknown> = {}

    fieldConfig.fields.forEach((fieldConfig) => {
      let fieldDefault: unknown = ""

      switch (fieldConfig.type) {
        case "number":
          fieldDefault = 0
          break
        case "checkbox":
          fieldDefault = false
          break
        case "select":
          fieldDefault = fieldConfig.multiple ? [] : ""
          break
        default:
          fieldDefault = fieldConfig.defaultValue ?? ""
      }

      defaultValue[fieldConfig.name] = fieldDefault
    })

    return defaultValue
  }, [fieldConfig.fields])

  // Check if a row is empty (all fields have default/empty values)
  const isRowEmpty = useCallback(
    (index: number): boolean => {
      const formValues = control._formValues
      const arrayValues = formValues[name]
      if (!arrayValues || !arrayValues[index]) return true

      const rowData = arrayValues[index]

      return fieldConfig.fields.every((fieldConfig) => {
        const value = rowData[fieldConfig.name]

        if (fieldConfig.type === "number") {
          return value === 0 || value === "" || value == null
        }
        if (fieldConfig.type === "checkbox") {
          return value === false
        }
        if (fieldConfig.type === "select" && fieldConfig.multiple) {
          return !value || value.length === 0
        }
        if (
          [
            "date",
            "datetime-local",
            "time",
            "month",
            "week",
            "date-picker",
            "calendar",
            "date-range-picker",
          ].includes(fieldConfig.type)
        ) {
          return value == null || value === ""
        }

        return value === "" || value == null
      })
    },
    [control, name, fieldConfig.fields],
  )

  // Get indices of non-empty rows
  const getNonEmptyRowIndices = useCallback(() => {
    return fields.map((_, index) => index).filter((index) => !isRowEmpty(index))
  }, [fields, isRowEmpty])

  // Use validation hook for form validation logic
  const { getValidationStatus } = useFieldArrayValidation({
    name,
    fieldConfig,
    getNonEmptyRowIndices,
  })

  // Always ensure there's an empty row at the bottom for adding
  useEffect(() => {
    if (fields.length === 0) {
      append(createDefaultValue())
    }
  }, [append, createDefaultValue, fields.length])

  // Add new row
  const addRow = useCallback(async () => {
    const { canAdd } = getValidationStatus()

    if (!canAdd) {
      return
    }

    // Trigger validation for existing rows before adding a new one
    const isValid = await trigger(name)
    if (!isValid) return

    append(createDefaultValue())
  }, [getValidationStatus, trigger, name, append, createDefaultValue])

  // Remove row
  const removeRow = useCallback(
    (index: number) => {
      remove(index)
    },
    [remove],
  )

  // Check if we can remove items (always allow removing if more than 1 item)
  const canRemove = useCallback(() => {
    return fields.length > 1
  }, [fields.length])

  const { canAdd } = getValidationStatus()

  return {
    fields,
    append,
    remove,
    addRow,
    removeRow,
    canAdd,
    canRemove: canRemove(),
    isRowEmpty,
    getNonEmptyRowIndices,
    createDefaultValue,
    getValidationStatus,
  }
}
