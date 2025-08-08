import { useCallback, useEffect, useState } from "react"
import { findShortcutByKey } from "../config/keyboardShortcuts"
import { useTaskModal } from "../contexts/TaskModalContext"
import { useKeyboardActionHandlers } from "./useKeyboardActionHandlers"

/**
 * Main keyboard shortcuts hook - coordinates keyboard events with actions
 * Uses configuration from keyboardShortcuts.ts instead of hardcoded switch statements
 */
export const useKeyboardShortcuts = () => {
  const { isOpen } = useTaskModal()
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)
  const { executeAction } = useKeyboardActionHandlers()

  // Check if user is currently typing in an input field
  const isInInputField = useCallback(() => {
    const activeElement = document.activeElement
    if (!activeElement) return false

    const tagName = activeElement.tagName.toLowerCase()
    const isContentEditable =
      activeElement.getAttribute("contenteditable") === "true"

    return tagName === "input" || tagName === "textarea" || isContentEditable
  }, [])

  // Check if shortcuts should be disabled
  const shouldIgnoreKeyboard = useCallback(() => {
    // Don't interfere when user is typing in input fields
    if (isInInputField()) return true

    // Don't interfere when any modal is open
    if (isOpen || isHelpModalOpen) return true

    // Check for any other modals in the DOM
    const hasOpenModal = document.querySelector('[role="dialog"]')
    if (hasOpenModal) return true

    return false
  }, [isInInputField, isOpen, isHelpModalOpen])

  // Handle keyboard events using configuration
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Ignore if keyboard interaction should be disabled
      if (shouldIgnoreKeyboard()) return

      // Find the shortcut configuration for this key
      const shortcut = findShortcutByKey(e.key, e.shiftKey)
      if (!shortcut) return

      // Prevent default behavior for recognized shortcuts
      e.preventDefault()

      // Execute the action through our action handler
      const result = executeAction(shortcut.action)

      // Handle special actions that need to be handled at this level
      if (result === "SHOW_HELP") {
        setIsHelpModalOpen(true)
      }
    },
    [shouldIgnoreKeyboard, executeAction],
  )

  //Set up keyboard event listeners
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return {
    isHelpModalOpen,
    setIsHelpModalOpen,
  }
}
