/**
 * Centralizes kanban feature exports to provide a single entry point
 * for the root application to consume components, routes, and stores
 */

import type { FeatureRegistry } from "@/types/feature"
import { translations } from "./i18n"
import { KanbanBoard } from "./KanbanBoard"
import { kanbanRoutes } from "./routes"
import { BoardStore } from "./stores/BoardStore"
import { ColumnStore } from "./stores/ColumnStore"
import { TaskStore } from "./stores/TaskStore"

export const kanbanFeature: FeatureRegistry<
  | InstanceType<typeof ColumnStore>
  | InstanceType<typeof TaskStore>
  | InstanceType<typeof BoardStore>,
  typeof KanbanBoard
> = {
  component: KanbanBoard,
  routes: kanbanRoutes,
  stores: [ColumnStore, TaskStore, BoardStore],
  translations,
}
