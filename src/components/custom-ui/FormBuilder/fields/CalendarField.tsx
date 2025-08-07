import { useFormContext } from "react-hook-form"
import { Calendar } from "@/components/ui/calendar"
import type { CalendarFieldConfig } from "../types"
import { FieldLabel } from "./shared/FieldLabel"

interface CalendarFieldProps {
  field: CalendarFieldConfig
  isRequired?: boolean
}

export function CalendarField({ field, isRequired }: CalendarFieldProps) {
  const { setValue, watch, formState } = useFormContext()
  const value = watch(field.name)
  const error = formState.errors[field.name]

  const handleSelect = (
    date: Date | Date[] | { from?: Date; to?: Date } | undefined,
  ) => {
    setValue(field.name, date, { shouldValidate: true })
  }

  return (
    <div>
      <FieldLabel label={field.label} isRequired={isRequired} />
      <div className="border rounded-md p-3">
        {field.mode === "range" ? (
          <Calendar
            mode="range"
            selected={value}
            onSelect={handleSelect}
            fromDate={field.fromDate}
            toDate={field.toDate}
            disabled={field.disabled || field.excludeDates}
            className="w-fit"
            required={true}
          />
        ) : field.mode === "multiple" ? (
          <Calendar
            mode="multiple"
            selected={value}
            onSelect={handleSelect}
            fromDate={field.fromDate}
            toDate={field.toDate}
            disabled={field.disabled || field.excludeDates}
            className="w-fit"
            required={true}
          />
        ) : (
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleSelect}
            fromDate={field.fromDate}
            toDate={field.toDate}
            disabled={field.disabled || field.excludeDates}
            className="w-fit"
          />
        )}
      </div>
      {error && (
        <p className="text-sm text-destructive mt-1">
          {error.message as string}
        </p>
      )}
    </div>
  )
}
