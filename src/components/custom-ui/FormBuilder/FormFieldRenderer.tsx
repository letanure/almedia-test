import { memo } from "react"
import { useFormContext } from "react-hook-form"
import { getFieldComponent } from "./mappers/FieldTypeMapper"
import type { FormFieldConfig } from "./types"

interface FormFieldRendererProps {
  field: FormFieldConfig
  isRequired?: boolean
}

export const FormFieldRenderer = memo(
  ({ field, isRequired = false }: FormFieldRendererProps) => {
    const { control } = useFormContext()
    const FieldComponent = getFieldComponent(field.type)

    // Pass control to components that need it
    const needsControl = [
      "checkbox",
      "radio",
      "select",
      "textarea",
      "text",
      "email",
      "password",
      "number",
      "tel",
      "url",
      "search",
    ].includes(field.type)

    if (needsControl) {
      return (
        <FieldComponent
          // biome-ignore lint/suspicious/noExplicitAny: Field components have different prop shapes
          field={field as any}
          control={control}
          isRequired={isRequired}
        />
      )
    }

    return (
      <FieldComponent
        // biome-ignore lint/suspicious/noExplicitAny: Field components have different prop shapes
        field={field as any}
        isRequired={isRequired}
      />
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.field === nextProps.field &&
      prevProps.isRequired === nextProps.isRequired
    )
  },
)

FormFieldRenderer.displayName = "FormFieldRenderer"
