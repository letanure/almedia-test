import { memo } from "react"
import type { z } from "zod"
import { Flex } from "@/components/custom-ui/Flex"
import { cn } from "@/lib/utils"
import { FormFieldRenderer } from "../FormFieldRenderer"
import { type FormFieldConfig, layoutWidthClasses } from "../types"
import { isFieldRequired } from "../utils/formFieldUtils"

interface FormRowProps {
  fields: FormFieldConfig[]
  schema: z.ZodObject<z.ZodRawShape>
  rowIndex: number
}

export const FormRow = memo(({ fields, schema, rowIndex }: FormRowProps) => {
  // Single field in row
  if (fields.length === 1) {
    const field = fields[0]
    if (!field) return null

    const widthClass = layoutWidthClasses[field.layout || "full"]

    return (
      <div key={`${rowIndex}-${field.name}`} className={cn(widthClass)}>
        <FormFieldRenderer
          field={field}
          isRequired={isFieldRequired(schema, field.name)}
        />
      </div>
    )
  }

  // Multiple fields in row
  return (
    <Flex
      key={`row-${rowIndex}-${fields.map((f) => f.name).join("-")}`}
      gap="md"
      align="start"
    >
      {fields.map((field) => {
        const widthClass = layoutWidthClasses[field.layout || "full"]

        return (
          <div key={field.name} className={cn(widthClass, "min-w-0")}>
            <FormFieldRenderer
              field={field}
              isRequired={isFieldRequired(schema, field.name)}
            />
          </div>
        )
      })}
    </Flex>
  )
})

FormRow.displayName = "FormRow"
