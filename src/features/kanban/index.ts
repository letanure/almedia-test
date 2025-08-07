/**
 * Centralizes kanban feature exports to provide a single entry point
 * for the root application to consume components, routes, and stores
 */

import type { FeatureRegistry } from "@/types/feature"
import { translations } from "./i18n"
import { KanbanBoard } from "./KanbanBoard"
import { kanbanRoutes } from "./routes"

export const kanbanFeature: FeatureRegistry<never, typeof KanbanBoard> = {
  component: KanbanBoard,
  routes: kanbanRoutes,
  translations,
}
