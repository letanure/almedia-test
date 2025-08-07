/**
 * Centralizes kanban feature exports to provide a single entry point
 * for the root application to consume components, routes, and stores
 */

import type { FeatureRegistry } from "@/types/feature"
import { translations } from "./i18n"
import { KanbanBoard } from "./KanbanBoard"
import { kanbanRoutes } from "./routes"
import { ColumnStore } from "./stores/ColumnStore"

export const kanbanFeature: FeatureRegistry<
  InstanceType<typeof ColumnStore>,
  typeof KanbanBoard
> = {
  component: KanbanBoard,
  routes: kanbanRoutes,
  stores: [ColumnStore],
  translations,
}
