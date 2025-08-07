/**
 * Feature Registry Pattern
 *
 * Standardized interface for all features to follow
 */

import type { ComponentType } from "react"
import type { RouteConfig } from "@/config/routes"
import type { StoreConstructor } from "./shared"

export interface FeatureRegistry<
  TStores = never,
  TComponent extends ComponentType = ComponentType,
> {
  component: TComponent

  routes: RouteConfig | RouteConfig[]

  stores?: StoreConstructor<TStores>[]

  translations?: Record<string, unknown>
}
