import { useEffect } from "react"
import { useModal } from "@/contexts/ModalContext"
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts"
import { KeyboardShortcutsModal } from "./KeyboardShortcutsModal"

export const KeyboardHandler = () => {
  const { isHelpModalOpen, setIsHelpModalOpen } = useKeyboardShortcuts()
  const modal = useModal()

  useEffect(() => {
    if (isHelpModalOpen) {
      modal.open("keyboard-shortcuts", <KeyboardShortcutsModal />, {
        title: "Keyboard Shortcuts",
        size: "xxl",
      })
      // Set it back to false after opening
      setIsHelpModalOpen(false)
    }
  }, [isHelpModalOpen, modal, setIsHelpModalOpen])

  return null
}
