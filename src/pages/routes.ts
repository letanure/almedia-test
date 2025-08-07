import type { RouteConfig } from "@/config/routes"
import { NotFound } from "./NotFound"
import { ServerError } from "./ServerError"

export const errorRoutes: RouteConfig = {
  path: "",
  layout: "fullscreen",
  children: [
    {
      path: "/error",
      component: ServerError,
      layout: "fullscreen",
      meta: {
        title: "Server Error",
      },
    },
    {
      path: "*",
      component: NotFound,
      layout: "fullscreen",
      meta: {
        title: "Page Not Found",
      },
    },
  ],
}
