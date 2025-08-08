import { Loader2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Animated, AnimatedGroup } from "@/components/custom-ui/Animated"

interface LoadingOverlayProps {
  isVisible: boolean
  messageKey?: string
  message?: string
}

export function LoadingOverlay({
  isVisible,
  messageKey = "common.loading",
  message,
}: LoadingOverlayProps) {
  const { t } = useTranslation()

  const displayMessage = message || t(messageKey)

  return (
    <AnimatedGroup>
      {isVisible && (
        <Animated
          effect="fade"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          aria-live="polite"
          aria-label={displayMessage}
        >
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">{displayMessage}</p>
          </div>
        </Animated>
      )}
    </AnimatedGroup>
  )
}
