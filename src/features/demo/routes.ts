import {
  AlertTriangle,
  Code,
  Loader2,
  MessageSquare,
  Square,
} from "lucide-react"
import type { RouteConfig } from "@/config/routes"
import { ApiDemo } from "./ApiDemo"
import { ErrorDemoPage } from "./ErrorDemoPage"
import { LoadingPage } from "./LoadingPage"
import { ModalPage } from "./ModalPage"
import { ToastPage } from "./ToastPage"

export const demoRoutes: RouteConfig = {
  path: "/demo",
  layout: "sidebar",
  meta: {
    nav: {
      section: "demo.navigation.section",
    },
  },
  children: [
    {
      path: "error",
      component: ErrorDemoPage,
      meta: {
        nav: {
          icon: AlertTriangle,
          translationKey: "demo.navigation.errorDemo",
          section: "demo.navigation.section",
        },
      },
    },
    {
      path: "api",
      component: ApiDemo,
      meta: {
        nav: {
          icon: Code,
          translationKey: "demo.navigation.apiIntegration",
          section: "demo.navigation.section",
        },
      },
    },
    {
      path: "loading",
      component: LoadingPage,
      meta: {
        nav: {
          translationKey: "demo.navigation.loading",
          section: "demo.navigation.section",
          icon: Loader2,
        },
      },
    },
    {
      path: "toast",
      component: ToastPage,
      meta: {
        nav: {
          translationKey: "demo.navigation.toast",
          section: "demo.navigation.section",
          icon: MessageSquare,
        },
      },
    },
    {
      path: "modal",
      component: ModalPage,
      meta: {
        nav: {
          translationKey: "demo.navigation.modal",
          section: "demo.navigation.section",
          icon: Square,
        },
      },
    },
  ],
}
