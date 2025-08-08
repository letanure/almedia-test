import { useEffect, useRef, useState } from "react"
import { useStore } from "@/hooks/useStores"

export const useAddColumn = () => {
  const { columnStore } = useStore()
  const [isAddingColumn, setIsAddingColumn] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleAddColumn = (name: string) => {
    columnStore.addColumn(name)
    setIsAddingColumn(false)
  }

  const handleCancelAdd = () => {
    setIsAddingColumn(false)
  }

  const handleStartAddColumn = () => {
    setIsAddingColumn(true)
  }

  // Auto-scroll to show the add form when it appears
  useEffect(() => {
    if (isAddingColumn && scrollContainerRef.current) {
      // Wait for animation to start, then scroll smoothly
      setTimeout(() => {
        scrollContainerRef.current?.scrollTo({
          left: scrollContainerRef.current.scrollWidth,
          behavior: "smooth",
        })
      }, 100)
    }
  }, [isAddingColumn])

  // Determine if we should scroll (5+ total items including add form)
  const totalItems = columnStore.totalColumns + (isAddingColumn ? 1 : 0)
  const shouldScroll = totalItems > 4

  return {
    isAddingColumn,
    shouldScroll,
    scrollContainerRef,
    handleAddColumn,
    handleCancelAdd,
    handleStartAddColumn,
  }
}
