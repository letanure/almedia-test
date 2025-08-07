import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { DatePickerFieldConfig } from "../types"
import { FieldLabel } from "./shared/FieldLabel"

interface DatePickerFieldProps {
  field: DatePickerFieldConfig
  isRequired?: boolean
}

export function DatePickerField({ field, isRequired }: DatePickerFieldProps) {
  const { setValue, watch, formState } = useFormContext()
  const value = watch(field.name)
  const error = formState.errors[field.name]

  const {
    placeholder = "Pick a date",
    disabled,
    className,
    fromDate,
    toDate,
    excludeDates,
    minDate,
    maxDate,
    dateFormat = "PPP",
    showInput = false,
  } = field

  const handleSelect = (date: Date | undefined) => {
    setValue(field.name, date, { shouldValidate: true })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value)
    if (!Number.isNaN(date.getTime())) {
      setValue(field.name, date, { shouldValidate: true })
    }
  }

  return (
    <div className={className}>
      <FieldLabel label={field.label} isRequired={isRequired} />

      {showInput && (
        <div className="mb-2">
          <Input
            type="date"
            value={value ? format(value, "yyyy-MM-dd") : ""}
            onChange={handleInputChange}
            disabled={disabled}
            className={error ? "border-destructive" : ""}
          />
        </div>
      )}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={field.name}
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
              error && "border-destructive",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value
              ? format(value, dateFormat)
              : field.placeholder || placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleSelect}
            startMonth={fromDate}
            endMonth={toDate}
            disabled={(date) => {
              if (
                excludeDates?.some(
                  (excludeDate) => date.getTime() === excludeDate.getTime(),
                )
              )
                return true
              if (minDate && date < minDate) return true
              if (maxDate && date > maxDate) return true
              return false
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {error && (
        <p className="text-sm text-destructive mt-1">
          {error.message as string}
        </p>
      )}
    </div>
  )
}
