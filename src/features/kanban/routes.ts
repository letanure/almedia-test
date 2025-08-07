/**
 * Kanban feature routes
 *
 * Main kanban board route with sidebar layout
 */

import { Kanban } from "lucide-react"
import type { RouteConfig } from "@/config/routes"
import { KanbanBoard } from "./KanbanBoard"

export const kanbanRoutes: RouteConfig = {
  path: "/kanban",
  layout: "fullscreen",
  meta: {
    nav: {
      section: "kanban.navigation.section",
    },
  },
  children: [
    {
      path: "",
      component: KanbanBoard,
      meta: {
        nav: {
          icon: Kanban,
          translationKey: "kanban.navigation.board",
          section: "kanban.navigation.section",
        },
      },
    },
  ],
} as const
