import type { LayoutType } from "@/components/layout"
import type { RouteConfig } from "@/config/routes"

interface FlatRoute {
  path: string
  component: React.ComponentType
  layout: LayoutType
  meta?: RouteConfig["meta"]
}

/**
 * Processes nested route configurations into flat routes for React Router
 * @param routeConfigs - Nested route configurations from features
 * @returns Flat array of routes with inherited layouts
 */
export function processRoutes(routeConfigs: RouteConfig[]): FlatRoute[] {
  const flatRoutes: FlatRoute[] = []

  function processRoute(
    route: RouteConfig,
    parentPath = "",
    parentLayout: LayoutType = "fullscreen",
  ) {
    const fullPath = parentPath + route.path
    const layout = route.layout || parentLayout

    if (route.component) {
      flatRoutes.push({
        path: fullPath,
        component: route.component,
        layout,
        meta: route.meta,
      })
    }

    route.children?.forEach((child) =>
      processRoute(
        child,
        fullPath.endsWith("/") ? fullPath : `${fullPath}/`,
        layout,
      ),
    )
  }

  routeConfigs.forEach((config) => processRoute(config))
  return flatRoutes
}
