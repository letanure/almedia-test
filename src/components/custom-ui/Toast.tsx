import { AlertCircle, CheckCircle, Info, X, XCircle } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Animated, AnimatedGroup } from "@/components/custom-ui/Animated"

export type ToastType = "success" | "error" | "warning" | "info"

export interface Toast {
  id: string
  type: ToastType
  messageKey?: string
  message?: string
  duration?: number
  closable?: boolean
}

interface ToastItemProps extends Toast {
  onClose: (id: string) => void
}

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

const toastStyles = {
  success:
    "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200",
  error:
    "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200",
  warning:
    "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-200",
  info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200",
}

export function ToastItem({
  id,
  type,
  messageKey,
  message,
  onClose,
  closable = true,
}: ToastItemProps) {
  const { t } = useTranslation()
  const Icon = toastIcons[type]
  const displayMessage = message || (messageKey ? t(messageKey) : "")

  return (
    <Animated
      effect="slideUp"
      className={`flex items-center gap-3 p-4 border rounded-lg shadow-sm ${toastStyles[type]}`}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{displayMessage}</p>
      {closable && (
        <button
          type="button"
          onClick={() => onClose(id)}
          className="flex-shrink-0 p-1 rounded hover:bg-black/5 dark:hover:bg-white/5"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </Animated>
  )
}

interface ToastContainerProps {
  toasts: Toast[]
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  onClose: (id: string) => void
}

const positionStyles = {
  "top-left": "top-4 left-4",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-right": "bottom-4 right-4",
}

export function ToastContainer({
  toasts,
  position,
  onClose,
}: ToastContainerProps) {
  return (
    <div
      className={`fixed ${positionStyles[position]} z-50 space-y-2 max-w-sm w-full`}
    >
      <AnimatedGroup mode="sync">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} {...toast} onClose={onClose} />
        ))}
      </AnimatedGroup>
    </div>
  )
}
