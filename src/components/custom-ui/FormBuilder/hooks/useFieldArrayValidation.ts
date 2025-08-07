import { useCallback, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import type { FieldArrayConfig } from "../types"

export interface UseFieldArrayValidationOptions {
  name: string
  fieldConfig: FieldArrayConfig
  getNonEmptyRowIndices: () => number[]
}

export function useFieldArrayValidation({
  name,
  fieldConfig,
  getNonEmptyRowIndices,
}: UseFieldArrayValidationOptions) {
  const { formState, setError, clearErrors } = useFormContext()

  // Validate array length against minItems requirement
  const validateMinItems = useCallback(() => {
    const nonEmptyCount = getNonEmptyRowIndices().length
    const hasMinItemsError =
      fieldConfig.minItems && nonEmptyCount < fieldConfig.minItems

    if (formState.isSubmitted) {
      if (hasMinItemsError) {
        setError(name, {
          type: "minItems",
          message: `Minimum ${fieldConfig.minItems} items required (currently ${nonEmptyCount})`,
        })
      } else {
        clearErrors(name)
      }
    }
  }, [
    getNonEmptyRowIndices,
    fieldConfig.minItems,
    formState.isSubmitted,
    setError,
    clearErrors,
    name,
  ])

  // Validate maxItems constraint
  const validateMaxItems = useCallback(
    (nonEmptyCount?: number) => {
      const count = nonEmptyCount ?? getNonEmptyRowIndices().length
      return !fieldConfig.maxItems || count < fieldConfig.maxItems
    },
    [fieldConfig.maxItems, getNonEmptyRowIndices],
  )

  // Check if adding new items is allowed
  const canAddItems = useCallback(() => {
    return validateMaxItems()
  }, [validateMaxItems])

  // Get validation status
  const getValidationStatus = useCallback(() => {
    const nonEmptyCount = getNonEmptyRowIndices().length
    const hasMinItemsError =
      fieldConfig.minItems && nonEmptyCount < fieldConfig.minItems
    const hasMaxItemsError =
      fieldConfig.maxItems && nonEmptyCount > fieldConfig.maxItems

    return {
      isValid: !hasMinItemsError && !hasMaxItemsError,
      hasMinItemsError,
      hasMaxItemsError,
      nonEmptyCount,
      canAdd: canAddItems(),
    }
  }, [
    getNonEmptyRowIndices,
    fieldConfig.minItems,
    fieldConfig.maxItems,
    canAddItems,
  ])

  // Run validation when dependencies change
  useEffect(() => {
    validateMinItems()
  }, [validateMinItems])

  return {
    validateMinItems,
    validateMaxItems,
    canAddItems,
    getValidationStatus,
  }
}
