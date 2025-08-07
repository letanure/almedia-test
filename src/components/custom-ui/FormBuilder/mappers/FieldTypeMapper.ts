import type { ComponentType } from "react"
import {
  CalendarField,
  CheckboxField,
  DatePickerField,
  DateRangePickerField,
  FieldArray,
  InputField,
  RadioField,
  SelectField,
  TextareaField,
} from "../fields"
import type { FormFieldConfig } from "../types"

// Using ComponentType<any> is necessary here because each field component
// has different prop interfaces that cannot be unified without excessive complexity
// biome-ignore lint/suspicious/noExplicitAny: Field components have varied prop structures
export const fieldTypeMap: Record<string, ComponentType<any>> = {
  "field-array": FieldArray,
  checkbox: CheckboxField,
  radio: RadioField,
  select: SelectField,
  textarea: TextareaField,
  calendar: CalendarField,
  "date-picker": DatePickerField,
  "date-range-picker": DateRangePickerField,
  // Input field types
  text: InputField,
  email: InputField,
  password: InputField,
  number: InputField,
  tel: InputField,
  url: InputField,
  search: InputField,
  date: InputField,
  "datetime-local": InputField,
  time: InputField,
  month: InputField,
  week: InputField,
}

export function getFieldComponent(
  type: FormFieldConfig["type"],
  // biome-ignore lint/suspicious/noExplicitAny: Return type must match the map above
): ComponentType<any> {
  return fieldTypeMap[type] || InputField
}

export function isInputFieldType(type: string): boolean {
  return [
    "text",
    "email",
    "password",
    "number",
    "tel",
    "url",
    "search",
    "date",
    "datetime-local",
    "time",
    "month",
    "week",
  ].includes(type)
}
