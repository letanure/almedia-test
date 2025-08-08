/**
 * Todo feature routes
 *
 * Examples of:
 * - Routes with URL parameters (/todo/task/:id)
 * - Routes that appear in sidebar navigation (with nav property)
 * - Routes that don't appear in sidebar (without nav property)
 */

import { Circle, List } from "lucide-react"
import type { RouteConfig } from "@/config/routes"
import { TodoDetail } from "./components/TodoDetail"
import { TodoList } from "./TodoList"

export const todoRoutes: RouteConfig = {
  path: "/todo",
  layout: "sidebar",
  meta: {
    nav: {
      section: "todo.navigation.section", // "Todo Lists" for breadcrumb
    },
  },
  children: [
    // Main Todo List - shows in sidebar
    {
      path: "",
      component: TodoList,
      meta: {
        disablePageTransitions: true,
        nav: {
          icon: List,
          translationKey: "todo.navigation.all", // Breadcrumb: "All"
          section: "todo.navigation.section",
        },
      },
    },
    // Active filter - shows in sidebar AND breadcrumb
    {
      path: "active",
      component: TodoList,
      meta: {
        disablePageTransitions: true,
        nav: {
          icon: Circle,
          translationKey: "todo.navigation.active", // Breadcrumb: "Active"
          section: "todo.navigation.section",
        },
      },
    },
    // Completed filter - has nav for breadcrumb, hidden from sidebar
    {
      path: "completed",
      component: TodoList,
      meta: {
        disablePageTransitions: true,
        nav: {
          translationKey: "todo.navigation.completed", // Breadcrumb: "Completed"
          hidden: true, // Don't show in sidebar but shows in breadcrumb
        },
      },
    },
    // Task detail - has nav for breadcrumb, hidden from sidebar
    {
      path: "task/:id",
      component: TodoDetail,
      meta: {
        nav: {
          translationKey: "todo.detail.title", // Breadcrumb: dynamic task name
          hidden: true, // Don't show in sidebar but shows in breadcrumb
        },
      },
    },
  ],
} as const
