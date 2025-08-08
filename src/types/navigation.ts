/**
 * Navigation Type Definitions
 *
 * Shared types for the navigation system across all features.
 */

export interface NavigationItem {
  title: string
  url: string
  icon?: React.ComponentType<{ className?: string }>
  translationKey?: string
}

export interface NavigationSection {
  section: string
  items: NavigationItem[]
}
