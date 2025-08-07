/**
 * Dynamic Breadcrumb Component
 *
 * Traverses the route tree structure to build breadcrumbs
 */

import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { matchPath, useLocation, useParams } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import type { RouteConfig } from "@/config/routes"
import { routeConfigs } from "@/config/routes"
import { useStore } from "@/hooks/useStores"

export const DynamicBreadcrumb = observer(() => {
  const location = useLocation()
  const params = useParams()
  const { t } = useTranslation()
  const stores = useStore()

  const joinPaths = (base: string, path: string): string => {
    if (path === "") return base
    if (base === "") return path
    if (base.endsWith("/")) return base + path
    if (path.startsWith("/")) return base + path
    return `${base}/${path}`
  }

  const findRouteMatches = (
    routes: RouteConfig[],
    currentPath: string,
    basePath = "",
  ): RouteConfig[] => {
    for (const route of routes) {
      const fullPath = joinPaths(basePath, route.path)

      // For routes with children, check if the base path matches first
      if (route.children && currentPath.startsWith(fullPath)) {
        // Try to match children
        const childMatches = findRouteMatches(
          route.children,
          currentPath,
          fullPath,
        )
        if (childMatches.length > 0) {
          return [route, ...childMatches]
        }
        // If no child matches but base path matches, include just the parent
        if (currentPath === fullPath) {
          return [route]
        }
      }

      // Check if current path exactly matches this route (for leaf routes)
      if (!route.children) {
        const match = matchPath({ path: fullPath, end: true }, currentPath)
        if (match) {
          return [route]
        }
      }
    }

    return []
  }

  const getBreadcrumbItems = () => {
    const path = location.pathname
    const matchedRoutes = findRouteMatches(routeConfigs, path)

    if (matchedRoutes.length === 0) {
      return [{ label: "Application", href: "/", isPage: true }]
    }

    const breadcrumbs: Array<{ label: string; href: string; isPage: boolean }> =
      []
    let currentPath = ""

    matchedRoutes.forEach((route, index) => {
      currentPath = joinPaths(currentPath, route.path)
      const isLastRoute = index === matchedRoutes.length - 1

      const nav = route.meta?.nav
      if (!nav) return

      // Get label from nav configuration
      const label =
        nav.section && index === 0
          ? t(nav.section)
          : nav.translationKey
            ? t(nav.translationKey)
            : nav.title || ""

      if (!label) return

      // For dynamic routes with params, get specific names
      const finalLabel =
        route.path.includes(":id") &&
        params.id &&
        currentPath.includes("/todo/task/")
          ? stores.todoStore.todos.find((todo) => todo.id === params.id)
              ?.text || label
          : label

      breadcrumbs.push({
        label: finalLabel,
        href: currentPath,
        isPage: isLastRoute,
      })
    })

    return breadcrumbs
  }

  const breadcrumbItems = getBreadcrumbItems()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <div key={`${item.href}-${index}`} className="flex items-center">
            {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
            <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
              {item.isPage ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
})
