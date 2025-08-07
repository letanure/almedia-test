import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
// No BaseFieldProps import needed
import { FieldLabel } from "./shared/FieldLabel"

interface DateRangePickerFieldProps {
  name: string
  label: string
  placeholder?: string
  required?: boolean
  className?: string
  fromDate?: Date
  toDate?: Date
  disabled?: Date[] | ((date: Date) => boolean)
  dateFormat?: string
  numberOfMonths?: number
}

export function DateRangePickerField({
  name,
  label,
  placeholder = "Pick a date range",
  required,
  className,
  fromDate,
  toDate,
  disabled,
  dateFormat = "LLL dd, y",
  numberOfMonths = 2,
}: DateRangePickerFieldProps) {
  const { setValue, watch, formState } = useFormContext()
  const value: DateRange | undefined = watch(name)
  const error = formState.errors[name]

  const handleSelect = (dateRange: DateRange | undefined) => {
    setValue(name, dateRange, { shouldValidate: true })
  }

  return (
    <div className={className}>
      <FieldLabel label={label} isRequired={required} htmlFor={name} />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={name}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
              error && "border-destructive",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, dateFormat)} -{" "}
                  {format(value.to, dateFormat)}
                </>
              ) : (
                format(value.from, dateFormat)
              )
            ) : (
              placeholder
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={handleSelect}
            numberOfMonths={numberOfMonths}
            startMonth={fromDate}
            endMonth={toDate}
            disabled={disabled}
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
