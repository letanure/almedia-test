import type { DefaultValues } from "react-hook-form"
import type { z } from "zod"

export type LayoutWidth = "full" | "half" | "third" | "quarter"

export const layoutWidthClasses = {
  full: "w-full",
  half: "w-full md:w-1/2",
  third: "w-full md:w-1/3",
  quarter: "w-full md:w-1/4",
} as const

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "date"
  | "datetime-local"
  | "time"
  | "month"
  | "week"
  | "calendar"
  | "date-picker"
  | "date-range-picker"
  | "field-array"

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface BaseFieldConfig {
  name: string
  label: string
  placeholder?: string
  defaultValue?: unknown
  required?: boolean
  disabled?: boolean
  description?: string
  layout?: LayoutWidth
  className?: string
  autoComplete?:
    | "off"
    | "on"
    | "name"
    | "given-name"
    | "family-name"
    | "email"
    | "username"
    | "current-password"
    | "new-password"
    | "tel"
    | "street-address"
    | "postal-code"
    | "country"
    | "bday"
    | "cc-name"
    | "cc-number"
    | "cc-exp"
    | "cc-csc"
    | string
}

export interface InputFieldConfig extends BaseFieldConfig {
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "datetime-local"
    | "time"
    | "month"
    | "week"
  min?: number | string
  max?: number | string
  step?: number | string
  pattern?: string
}

export interface TextareaFieldConfig extends BaseFieldConfig {
  type: "textarea"
  rows?: number
  maxLength?: number
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: "select"
  options: SelectOption[]
  multiple?: boolean
}

export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: "checkbox"
  checkedValue?: string | number | boolean
  uncheckedValue?: string | number | boolean
}

export interface RadioFieldConfig extends BaseFieldConfig {
  type: "radio"
  options: SelectOption[]
}

export interface CalendarFieldConfig extends BaseFieldConfig {
  type: "calendar"
  mode?: "single" | "multiple" | "range"
  fromDate?: Date
  toDate?: Date
  excludeDates?: Date[]
  minDate?: Date
  maxDate?: Date
}

export interface DatePickerFieldConfig extends BaseFieldConfig {
  type: "date-picker"
  fromDate?: Date
  toDate?: Date
  excludeDates?: Date[]
  minDate?: Date
  maxDate?: Date
  dateFormat?: string
  showInput?: boolean
}

export interface DateRangePickerFieldConfig extends BaseFieldConfig {
  type: "date-range-picker"
  fromDate?: Date
  toDate?: Date
  excludeDates?: Date[]
  minDate?: Date
  maxDate?: Date
  dateFormat?: string
  numberOfMonths?: number
}

// Define all non-array field configs using discriminated unions
export type BaseFormFieldConfig =
  | InputFieldConfig
  | TextareaFieldConfig
  | SelectFieldConfig
  | CheckboxFieldConfig
  | RadioFieldConfig
  | CalendarFieldConfig
  | DatePickerFieldConfig
  | DateRangePickerFieldConfig

// Type guards for discriminated unions
export function isInputField(
  field: BaseFormFieldConfig,
): field is InputFieldConfig {
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
  ].includes(field.type)
}

export function isSelectField(
  field: BaseFormFieldConfig,
): field is SelectFieldConfig {
  return field.type === "select"
}

export function isCheckboxField(
  field: BaseFormFieldConfig,
): field is CheckboxFieldConfig {
  return field.type === "checkbox"
}

export function isFieldArray(
  field: FormFieldConfig,
): field is FieldArrayConfig {
  return field.type === "field-array"
}

// Field array can contain any of the base field configs
export interface FieldArrayConfig extends BaseFieldConfig {
  type: "field-array"
  fields: BaseFormFieldConfig[]
  addButtonLabel?: string
  removeButtonLabel?: string
  minItems?: number
  maxItems?: number
}

// Complete form field config includes arrays
export type FormFieldConfig = BaseFormFieldConfig | FieldArrayConfig

// Improved generic constraints for better type safety
export interface FormBuilderProps<TSchema extends z.ZodObject<z.ZodRawShape>> {
  fields: FormFieldConfig[]
  schema: TSchema
  defaultValues?: DefaultValues<z.infer<TSchema>>
  onSubmit: (data: z.infer<TSchema>) => void | Promise<void>
  isSubmitting?: boolean
  submitLabel: string
  submittingLabel?: string
  resetLabel: string
  showReset?: boolean
  resetAfterSubmit?: boolean
  className?: string
  autoComplete?: "off" | "on"
  translateMessage?: (key: string) => string
}

// Helper type for form data
export type FormData<TSchema extends z.ZodObject<z.ZodRawShape>> =
  z.infer<TSchema>
