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
        size: "lg",
        onClose: () => {
          setIsHelpModalOpen(false)
          modal.close("keyboard-shortcuts")
        },
      })
    }
  }, [isHelpModalOpen, modal, setIsHelpModalOpen])

  return null
}
