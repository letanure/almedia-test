import { FormLabel } from "@/components/ui/form"

interface FieldLabelProps {
  label: string
  isRequired?: boolean
  htmlFor?: string
}

export function FieldLabel({
  label,
  isRequired = false,
  htmlFor,
}: FieldLabelProps) {
  // Don't render anything if label is empty
  if (!label) {
    return null
  }

  return (
    <FormLabel htmlFor={htmlFor} className="inline-block min-h-[1.5rem]">
      {label}
      {isRequired && (
        <span className="ml-1 text-destructive font-semibold">*</span>
      )}
    </FormLabel>
  )
}
