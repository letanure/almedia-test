import type { ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { AppSidebar } from "@/components/AppSidebar"
import { Animated, AnimatedGroup } from "@/components/custom-ui/Animated"
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { processedRoutes } from "@/config/routes"

interface SidebarLayoutProps {
  children: ReactNode
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const location = useLocation()

  // Find current route config to check if transitions should be disabled
  const currentRoute = processedRoutes.find(
    (route) => route.path === location.pathname,
  )
  const shouldAnimate = !currentRoute?.meta?.disablePageTransitions

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "280px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <DynamicBreadcrumb />
        </header>
        <div className="flex-1 relative">
          {shouldAnimate ? (
            <AnimatedGroup mode="sync">
              <Animated
                key={location.pathname}
                effect="fade"
                className="absolute inset-0 flex flex-col gap-4 p-4 overflow-auto"
              >
                {children}
              </Animated>
            </AnimatedGroup>
          ) : (
            <div className="absolute inset-0 flex flex-col gap-4 p-4 overflow-auto">
              {children}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
