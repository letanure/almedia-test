/**
 * Layout Wrapper Component
 *
 * Dynamically renders the appropriate layout based on route configuration.
 * This component is used by the route processor to wrap components with their layouts.
 */

import type { ReactNode } from "react"
import { FullscreenLayout } from "./FullscreenLayout"
import type { LayoutType } from "./index"
import { SidebarLayout } from "./SidebarLayout"

interface LayoutWrapperProps {
  layout: LayoutType
  children: ReactNode
}

const layouts = {
  fullscreen: FullscreenLayout,
  sidebar: SidebarLayout,
} as const

export function LayoutWrapper({ layout, children }: LayoutWrapperProps) {
  const LayoutComponent = layouts[layout]

  if (!LayoutComponent) {
    console.warn(`Layout "${layout}" not found, falling back to fullscreen`)
    return <FullscreenLayout>{children}</FullscreenLayout>
  }

  return <LayoutComponent>{children}</LayoutComponent>
}
