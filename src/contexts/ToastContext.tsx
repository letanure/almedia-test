import type React from "react"
import { createContext, useCallback, useContext, useState } from "react"
import {
  type Toast,
  ToastContainer,
  type ToastType,
} from "@/components/custom-ui/Toast"
import { config } from "@/config"

interface ToastOptions {
  messageKey?: string
  message?: string
  duration?: number
  closable?: boolean
}

interface ToastContextType {
  showToast: (type: ToastType, options: ToastOptions) => void
  closeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

interface ToastProviderProps {
  children: React.ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((type: ToastType, options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9)
    const duration = options.duration ?? config.toast.duration

    const newToast: Toast = {
      id,
      type,
      messageKey: options.messageKey,
      message: options.message,
      duration,
      closable: options.closable ?? true,
    }

    setToasts((prev) => {
      const updatedToasts = [newToast, ...prev]
      return updatedToasts.slice(0, config.toast.maxToasts)
    })

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
      }, duration)
    }
  }, [])

  const closeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, closeToast }}>
      {children}
      <ToastContainer
        toasts={toasts}
        position={config.toast.position}
        onClose={closeToast}
      />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  const { showToast } = context

  return {
    success: (options: ToastOptions) => showToast("success", options),
    error: (options: ToastOptions) => showToast("error", options),
    warning: (options: ToastOptions) => showToast("warning", options),
    info: (options: ToastOptions) => showToast("info", options),
    custom: showToast,
  }
}
