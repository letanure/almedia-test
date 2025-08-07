import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { useFormBuilderContext } from "../FormBuilder"
import { FieldLabel } from "./shared/FieldLabel"

interface NativeDateFieldProps {
  name: string
  label: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  type: "date" | "datetime-local" | "time" | "month" | "week"
  className?: string
  autoComplete?: string
  min?: string
  max?: string
  step?: string
}

export function NativeDateField({
  name,
  label,
  type = "date",
  placeholder,
  disabled,
  required,
  className,
  autoComplete,
  min,
  max,
  step,
}: NativeDateFieldProps) {
  const { register, formState } = useFormContext()
  const { translateMessage } = useFormBuilderContext()
  const error = formState.errors[name]

  const errorMessage = error?.message
    ? translateMessage
      ? translateMessage(String(error.message))
      : String(error.message)
    : null

  return (
    <div className={className}>
      <FieldLabel htmlFor={name} label={label} isRequired={required} />
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        min={min}
        max={max}
        step={step}
        className={error ? "border-destructive" : ""}
        {...register(name)}
      />
      {errorMessage && (
        <p className="text-sm text-destructive mt-1">{errorMessage}</p>
      )}
    </div>
  )
}
