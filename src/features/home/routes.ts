import type { RouteConfig } from "@/config/routes"
import { Home } from "./Home"

export const homeRoutes: RouteConfig = {
  path: "/",
  layout: "sidebar",
  component: Home,
  meta: { title: "Home" },
}
