import { memo, useMemo } from "react"
import type { Control } from "react-hook-form"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormBuilderMessage } from "../FormBuilderMessage"
import type { SelectFieldConfig } from "../types"
import { FieldLabel } from "./shared/FieldLabel"

interface SelectFieldProps {
  field: SelectFieldConfig
  control: Control
  isRequired?: boolean
}

export const SelectField = memo(
  ({ field, control, isRequired }: SelectFieldProps) => {
    const optionElements = useMemo(
      () =>
        field.options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </SelectItem>
        )),
      [field.options],
    )

    return (
      <FormField
        control={control}
        name={field.name}
        render={({ field: formField }) => (
          <FormItem>
            <FieldLabel label={field.label} isRequired={isRequired} />
            <Select
              onValueChange={formField.onChange}
              value={formField.value || ""}
              disabled={field.disabled}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>{optionElements}</SelectContent>
            </Select>
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

SelectField.displayName = "SelectField"
