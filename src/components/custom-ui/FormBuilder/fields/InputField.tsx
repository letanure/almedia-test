import { memo } from "react"
import type { Control } from "react-hook-form"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormBuilderMessage } from "../FormBuilderMessage"
import type { InputFieldConfig } from "../types"
import { FieldLabel } from "./shared/FieldLabel"

interface InputFieldProps {
  field: InputFieldConfig
  control: Control
  isRequired?: boolean
}

export const InputField = memo(
  ({ field, control, isRequired }: InputFieldProps) => {
    return (
      <FormField
        control={control}
        name={field.name}
        render={({ field: formField }) => (
          <FormItem>
            <FieldLabel label={field.label} isRequired={isRequired} />
            <FormControl>
              <Input
                {...formField}
                type={field.type}
                placeholder={field.placeholder}
                disabled={field.disabled}
                min={field.min}
                max={field.max}
                step={field.step}
                pattern={field.pattern}
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

InputField.displayName = "InputField"
