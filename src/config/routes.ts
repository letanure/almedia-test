/**
 * Application routes configuration
 */

import type { LayoutType } from "@/components/layout"
import { demoFeature } from "@/features/demo"
import { homeFeature } from "@/features/home"
import { kanbanFeature } from "@/features/kanban"
import { todoFeature } from "@/features/todo"
import { processRoutes } from "@/lib/routeProcessor"
import { errorRoutes } from "@/pages/routes"

export interface RouteConfig {
  path: string
  component?: React.ComponentType
  layout?: LayoutType
  meta?: {
    title?: string
    disablePageTransitions?: boolean
    nav?: {
      title?: string
      icon?: React.ComponentType<{ className?: string }>
      translationKey?: string
      section?: string
      hidden?: boolean
    }
  }
  children?: RouteConfig[]
}

// Helper to normalize routes from features (handles RouteConfig | RouteConfig[])
const normalizeRoutes = (
  routes: RouteConfig | RouteConfig[],
): RouteConfig[] => {
  return Array.isArray(routes) ? routes : [routes]
}

export const routeConfigs: RouteConfig[] = [
  // Feature routes
  ...normalizeRoutes(homeFeature.routes),
  ...normalizeRoutes(kanbanFeature.routes),
  ...normalizeRoutes(todoFeature.routes),
  ...normalizeRoutes(demoFeature.routes),

  // Error routes
  ...normalizeRoutes(errorRoutes),
]

export const processedRoutes = processRoutes(routeConfigs)
