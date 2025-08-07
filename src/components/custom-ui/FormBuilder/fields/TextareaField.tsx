import { memo } from "react"
import type { Control } from "react-hook-form"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { FormBuilderMessage } from "../FormBuilderMessage"
import type { TextareaFieldConfig } from "../types"
import { FieldLabel } from "./shared/FieldLabel"

interface TextareaFieldProps {
  field: TextareaFieldConfig
  control: Control
  isRequired?: boolean
}

export const TextareaField = memo(
  ({ field, control, isRequired }: TextareaFieldProps) => {
    return (
      <FormField
        control={control}
        name={field.name}
        render={({ field: formField }) => (
          <FormItem>
            <FieldLabel label={field.label} isRequired={isRequired} />
            <FormControl>
              <Textarea
                {...formField}
                placeholder={field.placeholder}
                disabled={field.disabled}
                rows={field.rows || 3}
                maxLength={field.maxLength}
                autoComplete={field.autoComplete}
              />
            </FormControl>
            {field.description && (
              <FormDescription>{field.description}</FormDescription>
            )}
            <FormBuilderMessage />
          </FormItem>
        )}
      />
    )
  },
)

TextareaField.displayName = "TextareaField"
