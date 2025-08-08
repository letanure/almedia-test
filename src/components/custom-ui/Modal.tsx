import { X } from "lucide-react"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Animated, AnimatedGroup } from "@/components/custom-ui/Animated"
import { Button } from "@/components/ui/button"

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  titleKey?: string
  size?: "sm" | "md" | "lg" | "xl" | "xxl"
  closable?: boolean
  overlay?: boolean
  maxHeight?: string
  maxWidth?: string
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  xxl: "max-w-6xl",
}

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  titleKey,
  size = "md",
  closable = true,
  overlay = true,
  maxHeight,
  maxWidth,
}: ModalProps) {
  const { t } = useTranslation()

  const displayTitle = title || (titleKey ? t(titleKey) : "")

  useEffect(() => {
    if (!isOpen || !closable) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, closable, onClose])

  const modalContent = (
    <>
      {/* Overlay with its own animation */}
      <AnimatedGroup>
        {isOpen && overlay && (
          <Animated
            effect="fade"
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={closable ? onClose : undefined}
          >
            <div />
          </Animated>
        )}
      </AnimatedGroup>

      {/* Modal content with its own animation */}
      <AnimatedGroup mode="wait">
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <Animated
              effect="scale"
              transformOrigin="center"
              className={`relative bg-background border rounded-lg shadow-lg w-full pointer-events-auto ${sizeClasses[size]} ${maxHeight ? "flex flex-col" : ""}`}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              style={{
                ...(maxHeight && { maxHeight }),
                ...(maxWidth && { maxWidth }),
              }}
            >
              {(displayTitle || closable) && (
                <div className="flex items-center justify-between p-6 pb-2">
                  {displayTitle && (
                    <h2 className="text-lg font-semibold">{displayTitle}</h2>
                  )}
                  {closable && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
              <div
                className={`p-6 pt-2 ${maxHeight ? "overflow-y-auto min-h-0 flex-1" : ""}`}
              >
                {children}
              </div>
            </Animated>
          </div>
        )}
      </AnimatedGroup>
    </>
  )

  return modalContent
}

export interface ConfirmModalProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  title?: string
  titleKey?: string
  message?: string
  messageKey?: string
  confirmText?: string
  confirmTextKey?: string
  cancelText?: string
  cancelTextKey?: string
  variant?: "default" | "destructive"
}

export function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  title,
  titleKey,
  message,
  messageKey,
  confirmText,
  confirmTextKey = "common.confirm",
  cancelText,
  cancelTextKey = "common.cancel",
  variant = "default",
}: ConfirmModalProps) {
  const { t } = useTranslation()

  const displayMessage = message || (messageKey ? t(messageKey) : "")
  const displayConfirmText = confirmText || t(confirmTextKey)
  const displayCancelText = cancelText || t(cancelTextKey)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      titleKey={titleKey}
      size="sm"
    >
      <div className="space-y-4">
        {displayMessage && (
          <p className="text-sm text-muted-foreground">{displayMessage}</p>
        )}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            {displayCancelText}
          </Button>
          <Button
            variant={variant === "destructive" ? "destructive" : "default"}
            onClick={() => {
              onConfirm()
              onCancel()
            }}
          >
            {displayConfirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
