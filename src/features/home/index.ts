/**
 * Centralizes home feature exports to provide a single entry point
 * for the root application to consume components and routes
 */

import type { FeatureRegistry } from "@/types/feature"
import { Home } from "./Home"
import { homeRoutes } from "./routes"

export const homeFeature: FeatureRegistry<never, typeof Home> = {
  component: Home,
  routes: homeRoutes,
}
