import { memo } from "react"
import type { z } from "zod"
import { Stack } from "@/components/custom-ui/Stack"
import { FormRow } from "./components/FormRow"
import { useLayoutCalculation } from "./hooks/useLayoutCalculation"
import type { FormFieldConfig } from "./types"

interface FormLayoutProps {
  fields: FormFieldConfig[]
  schema: z.ZodObject<z.ZodRawShape>
}

export const FormLayout = memo(({ fields, schema }: FormLayoutProps) => {
  const rows = useLayoutCalculation(fields)

  return (
    <Stack spacing="md">
      {rows.map((rowFields, rowIndex) => (
        <FormRow
          key={`row-${rowFields.map((f) => f.name).join("-")}`}
          fields={rowFields}
          schema={schema}
          rowIndex={rowIndex}
        />
      ))}
    </Stack>
  )
})

FormLayout.displayName = "FormLayout"
