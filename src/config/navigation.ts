/**
 * Central Navigation Configuration
 *
 * Extracts navigation from route configurations to maintain single source of truth.
 * Navigation items are derived from route metadata rather than separate configs.
 */

import type { TFunction } from "i18next"
import type { NavigationItem, NavigationSection } from "@/types/navigation"
import { type RouteConfig, routeConfigs } from "./routes"

/**
 * Extract navigation items from route configurations
 */
function extractNavigationFromRoutes(
  routes: RouteConfig[],
  t: TFunction,
): NavigationItem[] {
  const items: NavigationItem[] = []

  function processRoute(route: RouteConfig, parentPath = "") {
    const fullPath = parentPath + route.path

    if (route.component && route.meta?.nav && !route.meta.nav.hidden) {
      const nav = route.meta.nav
      items.push({
        title: nav.translationKey
          ? t(nav.translationKey)
          : nav.title || "Untitled",
        url: fullPath,
        icon: nav.icon,
        translationKey: nav.translationKey,
      })
    }

    route.children?.forEach((child) => {
      const childPath = fullPath.endsWith("/") ? fullPath : `${fullPath}/`
      processRoute(child, childPath)
    })
  }

  routes.forEach((route) => processRoute(route))
  return items
}

/**
 * Get all navigation sections for the application
 * @param t - Translation function
 * @returns Array of navigation sections
 */
export const getNavigationConfig = (t: TFunction): NavigationSection[] => {
  const items = extractNavigationFromRoutes(routeConfigs, t)

  // Group items by section
  const sections = new Map<string, NavigationItem[]>()

  items.forEach((item) => {
    // Find the section from route metadata
    const route = findRouteByUrl(item.url)
    const sectionName = route?.meta?.nav?.section || "General"

    if (!sections.has(sectionName)) {
      sections.set(sectionName, [])
    }
    sections.get(sectionName)?.push(item)
  })

  return Array.from(sections.entries()).map(([section, items]) => ({
    section: section.includes(".") ? t(section) : section,
    items,
  }))
}

/**
 * Find route configuration by URL
 */
function findRouteByUrl(url: string): RouteConfig | null {
  function search(routes: RouteConfig[], parentPath = ""): RouteConfig | null {
    for (const route of routes) {
      const fullPath = parentPath + route.path

      if (fullPath === url && route.component) {
        return route
      }

      if (route.children) {
        const childPath = fullPath.endsWith("/") ? fullPath : `${fullPath}/`
        const found = search(route.children, childPath)
        if (found) return found
      }
    }
    return null
  }

  return search(routeConfigs)
}
