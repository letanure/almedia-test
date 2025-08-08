import type { Meta, StoryObj } from "@storybook/react"
import { z } from "zod"
import { FormBuilder } from "./FormBuilder"
import type { FormFieldConfig } from "./types"

const meta: Meta<typeof FormBuilder> = {
  title: "Custom UI/FormBuilder/Date Fields",
  component: FormBuilder,
  parameters: {
    layout: "padded",
  },
}

// Helper to show form data
const showFormData = (data: unknown) => {
  console.log("Form Data:", data)
  const formatted = JSON.stringify(data, null, 2)

  const overlay = document.createElement("div")
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; bottom: 0; 
    background: rgba(0,0,0,0.8); z-index: 9999;
    display: flex; align-items: center; justify-content: center;
    font-family: ui-monospace, Monaco, monospace;
  `

  const modal = document.createElement("div")
  modal.style.cssText = `
    background: white; padding: 2rem; border-radius: 0.5rem;
    max-width: 90vw; max-height: 90vh; overflow: auto;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  `

  const title = document.createElement("h3")
  title.textContent = "Form Data Submitted"
  title.style.cssText =
    "margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;"

  const pre = document.createElement("pre")
  pre.textContent = formatted
  pre.style.cssText = `
    margin: 0; padding: 1rem; background: #f8f9fa; 
    border-radius: 0.25rem; font-size: 0.875rem; 
    overflow: auto; white-space: pre-wrap;
  `

  const closeBtn = document.createElement("button")
  closeBtn.textContent = "Close"
  closeBtn.style.cssText = `
    margin-top: 1rem; padding: 0.5rem 1rem; 
    background: #007bff; color: white; border: none; 
    border-radius: 0.25rem; cursor: pointer;
  `
  closeBtn.onclick = () => document.body.removeChild(overlay)

  modal.appendChild(title)
  modal.appendChild(pre)
  modal.appendChild(closeBtn)
  overlay.appendChild(modal)
  document.body.appendChild(overlay)

  overlay.onclick = (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay)
    }
  }
}

export default meta
type Story = StoryObj<typeof FormBuilder>

// Individual field schemas and configs
const dateFieldSchema = z.object({
  selectedDate: z.date().optional(),
})

const datetimeLocalFieldSchema = z.object({
  selectedDateTime: z.date().optional(),
})

const timeFieldSchema = z.object({
  selectedTime: z.date().optional(),
})

const monthFieldSchema = z.object({
  selectedMonth: z.date().optional(),
})

const weekFieldSchema = z.object({
  selectedWeek: z.date().optional(),
})

const dateField: FormFieldConfig[] = [
  {
    type: "date",
    name: "selectedDate",
    label: "Date Field",
    placeholder: "Select a date",
    layout: "full",
  },
]

const datetimeLocalField: FormFieldConfig[] = [
  {
    type: "datetime-local",
    name: "selectedDateTime",
    label: "DateTime Local Field",
    placeholder: "Select date and time",
    layout: "full",
  },
]

const timeField: FormFieldConfig[] = [
  {
    type: "time",
    name: "selectedTime",
    label: "Time Field",
    placeholder: "Select time",
    layout: "full",
  },
]

const monthField: FormFieldConfig[] = [
  {
    type: "month",
    name: "selectedMonth",
    label: "Month Field",
    placeholder: "Select month",
    layout: "full",
  },
]

const weekField: FormFieldConfig[] = [
  {
    type: "week",
    name: "selectedWeek",
    label: "Week Field",
    placeholder: "Select week",
    layout: "full",
  },
]

const calendarSingleSchema = z.object({
  selectedDate: z.date().optional(),
})

const calendarMultipleSchema = z.object({
  selectedDates: z.array(z.date()).optional(),
})

const calendarRangeSchema = z.object({
  selectedRange: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
})

const datePickerSchema = z.object({
  selectedDate: z.date().optional(),
})

const datePickerRequiredSchema = z.object({
  selectedDate: z.date().min(new Date("1900-01-01"), {
    message: "Date is required",
  }),
})

const dateRangePickerSchema = z.object({
  selectedRange: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
})

const calendarSingleField: FormFieldConfig[] = [
  {
    type: "calendar",
    name: "selectedDate",
    label: "Calendar Single Date",
    mode: "single",
    layout: "full",
  },
]

const calendarMultipleField: FormFieldConfig[] = [
  {
    type: "calendar",
    name: "selectedDates",
    label: "Calendar Multiple Dates",
    mode: "multiple",
    layout: "full",
  },
]

const calendarRangeField: FormFieldConfig[] = [
  {
    type: "calendar",
    name: "selectedRange",
    label: "Calendar Date Range",
    mode: "range",
    layout: "full",
  },
]

const datePickerField: FormFieldConfig[] = [
  {
    type: "date-picker",
    name: "selectedDate",
    label: "Date Picker",
    placeholder: "Choose a date",
    showInput: true,
    layout: "full",
  },
]

const datePickerRequiredField: FormFieldConfig[] = [
  {
    type: "date-picker",
    name: "selectedDate",
    label: "Date Picker (Required)",
    placeholder: "Select date",
    required: true,
    dateFormat: "MMM dd, yyyy",
    layout: "full",
  },
]

const dateRangePickerField: FormFieldConfig[] = [
  {
    type: "date-range-picker",
    name: "selectedRange",
    label: "Date Range Picker",
    placeholder: "Select date range",
    numberOfMonths: 2,
    dateFormat: "PP",
    layout: "full",
  },
]

// Native HTML5 Date Field Stories
export const DateField: Story = {
  args: {
    fields: dateField,
    schema: dateFieldSchema,
    onSubmit: showFormData,
    submitLabel: "Submit",
    resetLabel: "Reset",
    showReset: true,
  },
}

export const DateTimeLocalField: Story = {
  args: {
    fields: datetimeLocalField,
    schema: datetimeLocalFieldSchema,
    onSubmit: showFormData,
    submitLabel: "Submit",
    resetLabel: "Reset",
    showReset: true,
  },
}

export const TimeField: Story = {
  args: {
    fields: timeField,
    schema: timeFieldSchema,
    onSubmit: showFormData,
    submitLabel: "Submit",
    resetLabel: "Reset",
    showReset: true,
  },
}

export const MonthField: Story = {
  args: {
    fields: monthField,
    schema: monthFieldSchema,
    onSubmit: showFormData,
    submitLabel: "Submit",
    resetLabel: "Reset",
    showReset: true,
  },
}

export const WeekField: Story = {
  args: {
    fields: weekField,
    schema: weekFieldSchema,
    onSubmit: showFormData,
    submitLabel: "Submit",
    resetLabel: "Reset",
    showReset: true,
  },
}

// shadcn Calendar Field Stories
export const CalendarSingleDate: Story = {
  args: {
    fields: calendarSingleField,
    schema: calendarSingleSchema,
    onSubmit: showFormData,
    submitLabel: "Submit",
    resetLabel: "Reset",
    showReset: true,
  },
}

export const CalendarMultipleDates: Story = {
  args: {
    fields: calendarMultipleField,
    schema: calendarMultipleSchema,
    onSubmit: showFormData,
    submitLabel: "Submit",
    resetLabel: "Reset",
    showReset: true,
  },
}

export const CalendarDateRange: Story = {
  args: {
    fields: calendarRangeField,
    schema: calendarRangeSchema,
    onSubmit: showFormData,
    submitLabel: "Submit",
    resetLabel: "Reset",
    showReset: true,
  },
}

// Date Picker Field Stories
export const DatePickerField: Story = {
  args: {
    fields: datePickerField,
    schema: datePickerSchema,
    onSubmit: showFormData,
    submitLabel: "Submit",
    resetLabel: "Reset",
    showReset: true,
  },
}

export const DatePickerRequired: Story = {
  args: {
    fields: datePickerRequiredField,
    schema: datePickerRequiredSchema,
    onSubmit: showFormData,
    submitLabel: "Submit",
    resetLabel: "Reset",
    showReset: true,
  },
}

export const DateRangePickerField: Story = {
  args: {
    fields: dateRangePickerField,
    schema: dateRangePickerSchema,
    onSubmit: showFormData,
    submitLabel: "Submit",
    resetLabel: "Reset",
    showReset: true,
  },
}
