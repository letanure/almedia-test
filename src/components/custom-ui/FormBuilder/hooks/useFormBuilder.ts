import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import type { BaseFormFieldConfig, FormBuilderProps } from "../types"
import { isFieldArray as checkIsFieldArray } from "../types"

export interface UseFormBuilderOptions<
  TSchema extends z.ZodObject<z.ZodRawShape>,
> {
  schema: TSchema
  defaultValues?: FormBuilderProps<TSchema>["defaultValues"]
  onSubmit: FormBuilderProps<TSchema>["onSubmit"]
  resetAfterSubmit?: boolean
}

export function useFormBuilder<TSchema extends z.ZodObject<z.ZodRawShape>>({
  schema,
  defaultValues,
  onSubmit,
  resetAfterSubmit = false,
}: UseFormBuilderOptions<TSchema>) {
  const form = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  // Helper to check if a row is empty in field arrays using type guards
  const isRowEmpty = useCallback(
    (rowData: Record<string, unknown>, fieldConfigs: BaseFormFieldConfig[]) => {
      return fieldConfigs.every((fieldConfig) => {
        const value = rowData[fieldConfig.name]

        if (fieldConfig.type === "number") {
          return value === 0 || value === "" || value == null
        }

        if (fieldConfig.type === "checkbox") {
          return value === false
        }

        if (fieldConfig.type === "select" && fieldConfig.multiple) {
          return !value || (Array.isArray(value) && value.length === 0)
        }

        if (
          fieldConfig.type === "date" ||
          fieldConfig.type === "datetime-local" ||
          fieldConfig.type === "time" ||
          fieldConfig.type === "month" ||
          fieldConfig.type === "week"
        ) {
          return value == null || value === ""
        }

        if (
          fieldConfig.type === "date-picker" ||
          fieldConfig.type === "calendar"
        ) {
          return value == null || value === ""
        }

        return value === "" || value == null
      })
    },
    [],
  )

  // Filter empty rows from field arrays before submission using type guards
  const processFormData = useCallback(
    (
      data: Record<string, unknown>,
      fields: FormBuilderProps<TSchema>["fields"],
    ) => {
      const processedData = { ...data }

      fields.forEach((field) => {
        if (
          checkIsFieldArray(field) &&
          Array.isArray(processedData[field.name])
        ) {
          const arrayData = processedData[field.name] as Record<
            string,
            unknown
          >[]
          processedData[field.name] = arrayData.filter(
            (rowData) => !isRowEmpty(rowData, field.fields),
          )
        }
      })

      return processedData
    },
    [isRowEmpty],
  )

  const handleSubmit = useCallback(
    async (
      data: z.infer<TSchema>,
      fields: FormBuilderProps<TSchema>["fields"],
    ) => {
      try {
        const processedData = processFormData(
          data as Record<string, unknown>,
          fields,
        )
        await onSubmit(processedData as z.infer<TSchema>)
        if (resetAfterSubmit) {
          form.reset()
        }
      } catch (error) {
        console.error("Form submission error:", error)
      }
    },
    [onSubmit, processFormData, resetAfterSubmit, form],
  )

  const handleReset = useCallback(() => {
    form.reset()
  }, [form])

  return {
    form,
    handleSubmit,
    handleReset,
    processFormData,
    isRowEmpty,
  }
}
