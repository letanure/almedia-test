import { ChevronRight } from "lucide-react"

interface ScrollArrowIndicatorProps {
  show: boolean
}

/**
 * Arrow indicator showing when there are hidden columns to scroll to
 */
export const ScrollArrowIndicator = ({ show }: ScrollArrowIndicatorProps) => {
  if (!show) return null

  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-l-lg shadow-lg border border-r-0 border-gray-200 p-2 pointer-events-none">
      <ChevronRight className="h-5 w-5 text-gray-600 animate-pulse" />
    </div>
  )
}
