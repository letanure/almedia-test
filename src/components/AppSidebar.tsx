"use client"

import { Command } from "lucide-react"
import * as React from "react"
import { useTranslation } from "react-i18next"
import { Link, useLocation } from "react-router-dom"
import { LanguageSwitch } from "@/components/LanguageSwitch"
import { ThemeToggle } from "@/components/ThemeToggle"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { getNavigationConfig } from "@/config/navigation"
import { useFeatureFlags } from "@/contexts/FeatureFlagsContext"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()
  const { t } = useTranslation()
  const { isFeatureEnabled } = useFeatureFlags()

  // Get navigation sections from central config
  const navigationSections = React.useMemo(() => getNavigationConfig(t), [t])

  return (
    <Sidebar variant="sidebar" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">{t("app.name")}</span>
                  <span className="text-xs">{t("app.subtitle")}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navigationSections.map((section) => (
          <SidebarGroup key={section.section}>
            <SidebarGroupLabel>{section.section}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.url}
                    >
                      <Link
                        to={item.url}
                        className={`font-medium relative flex items-center gap-2 ${
                          location.pathname === item.url
                            ? "text-sidebar-primary-foreground bg-sidebar-primary"
                            : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }`}
                      >
                        {location.pathname === item.url && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-sidebar-primary-foreground rounded-r-full" />
                        )}
                        {item.icon && <item.icon className="size-4" />}
                        <span className="relative z-10">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {isFeatureEnabled("enableThemeSwitch") && (
            <SidebarMenuItem>
              <div className="flex items-center justify-between p-2">
                <span className="text-sm font-medium">{t("theme.toggle")}</span>
                <ThemeToggle />
              </div>
            </SidebarMenuItem>
          )}
          {isFeatureEnabled("enableLanguageSwitch") && (
            <SidebarMenuItem>
              <div className="flex items-center justify-between p-2">
                <span className="text-sm font-medium">Language</span>
                <LanguageSwitch />
              </div>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
