import { useMemo } from "react"
import type { FormFieldConfig } from "../types"

const getLayoutWeight = (layout?: string) => {
  switch (layout) {
    case "quarter":
      return 1
    case "third":
      return 2
    case "half":
      return 2
    default:
      return 4 // "full"
  }
}

export function useLayoutCalculation(fields: FormFieldConfig[]) {
  return useMemo(() => {
    const rows: FormFieldConfig[][] = []
    let currentRow: FormFieldConfig[] = []
    let currentRowWeight = 0

    for (const field of fields) {
      const fieldWeight = getLayoutWeight(field.layout)

      // If adding this field would exceed capacity, start new row
      if (currentRowWeight + fieldWeight > 4 && currentRow.length > 0) {
        rows.push([...currentRow])
        currentRow = []
        currentRowWeight = 0
      }

      currentRow.push(field)
      currentRowWeight += fieldWeight

      // If this field takes full width, end the row
      if (fieldWeight === 4) {
        rows.push([...currentRow])
        currentRow = []
        currentRowWeight = 0
      }
    }

    // Add any remaining fields
    if (currentRow.length > 0) {
      rows.push(currentRow)
    }

    return rows
  }, [fields])
}
