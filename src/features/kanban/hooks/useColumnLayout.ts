import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Hook to manage responsive column layout and scroll arrow visibility
 */
export const useColumnLayout = (columnCount: number) => {
  const [showScrollArrow, setShowScrollArrow] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  /**
   * Calculate CSS class for column width based on count
   * - 1-4 columns: equal width distribution
   * - 5+ columns: fixed width with horizontal scrolling
   */
  const getColumnWidthClass = useCallback((count: number) => {
    if (count <= 4) {
      return "flex-1 min-w-0"
    }
    return "w-72 flex-shrink-0"
  }, [])

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
    shouldShowArrow: columnCount > 4 && showScrollArrow,
  }
}
