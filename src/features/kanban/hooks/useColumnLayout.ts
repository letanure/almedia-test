import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Hook to manage responsive column layout and scroll arrow visibility
 */
export const useColumnLayout = (columnCount: number) => {
  const [showScrollArrow, setShowScrollArrow] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  /**
   * Calculate CSS class for column width based on count and device
   * Desktop:
   * - 1-4 columns: equal width distribution
   * - 5+ columns: fixed width with horizontal scrolling
   * Mobile:
   * - Always nearly full width with horizontal scrolling
   */
  const getColumnWidthClass = useCallback(
    (count: number) => {
      // Mobile: always use nearly full width
      if (isMobile) {
        return "w-[calc(100vw-3rem)] flex-shrink-0" // Nearly full screen width minus padding
      }

      // Desktop behavior
      if (count <= 4) {
        return "flex-1 min-w-0"
      }
      return "w-72 flex-shrink-0"
    },
    [isMobile],
  )

  /**
   * Handle scroll events to show/hide arrow indicator
   */
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container
    const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 5 // Small tolerance
    setShowScrollArrow(!isAtEnd)
  }, [])

  /**
   * Handle window resize to detect mobile/desktop
   */
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIsMobile()

    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  /**
   * Setup scroll event listener and initial state
   */
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Initial check
    handleScroll()

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return {
    scrollContainerRef,
    showScrollArrow,
    getColumnWidthClass,
    shouldShowArrow: (columnCount > 4 || isMobile) && showScrollArrow,
  }
}
