/**
 * Centralizes demo feature exports to provide a single entry point
 * for the root application to consume components and routes
 */

import type { FeatureRegistry } from "@/types/feature"
import { ErrorDemoPage } from "./ErrorDemoPage"
import { translations } from "./i18n"
import { demoRoutes } from "./routes"

export const demoFeature: FeatureRegistry<never, typeof ErrorDemoPage> = {
  component: ErrorDemoPage,
  routes: demoRoutes,
  translations,
}
