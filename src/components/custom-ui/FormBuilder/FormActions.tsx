import { Button } from "@/components/ui/button"

interface FormActionsProps {
  isSubmitting: boolean
  submitLabel: string
  submittingLabel: string
  resetLabel: string
  showReset: boolean
  onReset: () => void
}

export function FormActions({
  isSubmitting,
  submitLabel,
  submittingLabel,
  resetLabel,
  showReset,
  onReset,
}: FormActionsProps) {
  return (
    <div className="flex gap-2 pt-4">
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? submittingLabel : submitLabel}
      </Button>
      {showReset && (
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          disabled={isSubmitting}
        >
          {resetLabel}
        </Button>
      )}
    </div>
  )
}
