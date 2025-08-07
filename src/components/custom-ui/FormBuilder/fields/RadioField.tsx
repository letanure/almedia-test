import { memo, useMemo } from "react"
import type { Control } from "react-hook-form"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FormBuilderMessage } from "../FormBuilderMessage"
import type { RadioFieldConfig } from "../types"
import { FieldLabel } from "./shared/FieldLabel"

interface RadioFieldProps {
  field: RadioFieldConfig
  control: Control
  isRequired?: boolean
}

export const RadioField = memo(
  ({ field, control, isRequired }: RadioFieldProps) => {
    const radioOptions = useMemo(
      () =>
        field.options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`${field.name}-${option.value}`}
              disabled={option.disabled}
            />
            <Label htmlFor={`${field.name}-${option.value}`}>
              {option.label}
            </Label>
          </div>
        )),
      [field.options, field.name],
    )
    return (
      <FormField
        control={control}
        name={field.name}
        render={({ field: formField }) => (
          <FormItem>
            <FieldLabel label={field.label} isRequired={isRequired} />
            <FormControl>
              <RadioGroup
                onValueChange={formField.onChange}
                value={formField.value}
                disabled={field.disabled}
                className="flex flex-col space-y-1"
              >
                {radioOptions}
              </RadioGroup>
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

RadioField.displayName = "RadioField"
