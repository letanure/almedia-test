/**
 * English locale translations aggregated from features
 */

import { demoFeature } from "@/features/demo"
import { kanbanFeature } from "@/features/kanban"
import { todoFeature } from "@/features/todo"

export const en = {
  todo: todoFeature.translations?.en,
  kanban: kanbanFeature.translations?.en,
  demo: demoFeature.translations?.en,
  app: {
    name: "Almedia Kanban",
    subtitle: "Task Management Board",
  },
  theme: {
    toggle: "Toggle theme",
    light: "Light",
    dark: "Dark",
    system: "System",
  },
  time: {
    justNow: "just now",
    minutesAgo_one: "{{count}} minute ago",
    minutesAgo_other: "{{count}} minutes ago",
    hoursAgo_one: "{{count}} hour ago",
    hoursAgo_other: "{{count}} hours ago",
    daysAgo_one: "{{count}} day ago",
    daysAgo_other: "{{count}} days ago",
  },
  common: {
    loading: "Loading...",
    save: "Save",
    confirm: "Confirm",
    cancel: "Cancel",
    delete: "Delete",
    confirmDelete: "Confirm Delete",
    confirmDeleteMessage:
      "Are you sure you want to delete this item? This action cannot be undone.",
  },
  validation: {
    required: "This field is required",
    requiredSelect: "Please select an option",
    email: "Please enter a valid email address",
    minLength: "Must be at least {{min}} characters long",
    maxLength: "Must be at most {{max}} characters long",
    minNumber: "Must be at least {{min}}",
    maxNumber: "Must be at most {{max}}",
    invalidFormat: "Invalid format",
    url: "Please enter a valid URL",
    phone: "Please enter a valid phone number",
    positiveNumber: "Must be a positive number",
    integer: "Must be a whole number",
    invalid_type: "This field is required",
    array: {
      minItems: "At least {{min}} items are required",
      maxItems: "At most {{max}} items are allowed",
    },
  },
}
