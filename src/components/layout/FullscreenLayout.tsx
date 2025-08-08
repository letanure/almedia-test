import type { ReactNode } from "react"

interface FullscreenLayoutProps {
  children: ReactNode
}

export function FullscreenLayout({ children }: FullscreenLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
