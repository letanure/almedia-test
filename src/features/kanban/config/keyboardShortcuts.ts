export type ShortcutAction =
  | "SELECT_FIRST_OR_NEXT"
  | "PREVIOUS_TASK"
  | "NEXT_TASK"
  | "PREVIOUS_COLUMN"
  | "NEXT_COLUMN"
  | "CLEAR_SELECTION"
  | "OPEN_TASK"
  | "DELETE_TASK"
  | "MOVE_TASK_LEFT"
  | "MOVE_TASK_RIGHT"
  | "MOVE_TASK_UP"
  | "MOVE_TASK_DOWN"
  | "SHOW_HELP"

export interface KeyboardShortcut {
  id: string
  keys: string[]
  action: ShortcutAction
  category: "navigation" | "task" | "help"
  descriptionKey: string
  requiresSelection?: boolean
  withShift?: boolean
}

export const keyboardShortcuts: KeyboardShortcut[] = [
  // Navigation
  {
    id: "tab-navigate",
    keys: ["Tab"],
    action: "SELECT_FIRST_OR_NEXT",
    category: "navigation",
    descriptionKey: "kanban.shortcuts.navigation.tab",
  },
  {
    id: "previous-task",
    keys: ["ArrowUp", "k"],
    action: "PREVIOUS_TASK",
    category: "navigation",
    descriptionKey: "kanban.shortcuts.navigation.previousTask",
  },
  {
    id: "next-task",
    keys: ["ArrowDown", "j"],
    action: "NEXT_TASK",
    category: "navigation",
    descriptionKey: "kanban.shortcuts.navigation.nextTask",
  },
  {
    id: "previous-column",
    keys: ["ArrowLeft", "h"],
    action: "PREVIOUS_COLUMN",
    category: "navigation",
    descriptionKey: "kanban.shortcuts.navigation.previousColumn",
  },
  {
    id: "next-column",
    keys: ["ArrowRight", "l"],
    action: "NEXT_COLUMN",
    category: "navigation",
    descriptionKey: "kanban.shortcuts.navigation.nextColumn",
  },
  {
    id: "clear-selection",
    keys: ["Escape"],
    action: "CLEAR_SELECTION",
    category: "navigation",
    descriptionKey: "kanban.shortcuts.navigation.clearSelection",
  },

  // Task Actions
  {
    id: "open-task",
    keys: ["Enter", "o", " "],
    action: "OPEN_TASK",
    category: "task",
    descriptionKey: "kanban.shortcuts.task.open",
    requiresSelection: true,
  },
  {
    id: "delete-task",
    keys: ["Delete"],
    action: "DELETE_TASK",
    category: "task",
    descriptionKey: "kanban.shortcuts.task.delete",
    requiresSelection: true,
  },
  {
    id: "move-task-left",
    keys: ["ArrowLeft"],
    action: "MOVE_TASK_LEFT",
    category: "task",
    descriptionKey: "kanban.shortcuts.task.moveLeft",
    requiresSelection: true,
    withShift: true,
  },
  {
    id: "move-task-right",
    keys: ["ArrowRight"],
    action: "MOVE_TASK_RIGHT",
    category: "task",
    descriptionKey: "kanban.shortcuts.task.moveRight",
    requiresSelection: true,
    withShift: true,
  },
  {
    id: "move-task-up",
    keys: ["ArrowUp"],
    action: "MOVE_TASK_UP",
    category: "task",
    descriptionKey: "kanban.shortcuts.task.moveUp",
    requiresSelection: true,
    withShift: true,
  },
  {
    id: "move-task-down",
    keys: ["ArrowDown"],
    action: "MOVE_TASK_DOWN",
    category: "task",
    descriptionKey: "kanban.shortcuts.task.moveDown",
    requiresSelection: true,
    withShift: true,
  },

  // Help
  {
    id: "show-help",
    keys: ["?"],
    action: "SHOW_HELP",
    category: "help",
    descriptionKey: "kanban.shortcuts.help.show",
  },
]

export const getShortcutsByCategory = () => {
  const categories = {
    navigation: [] as KeyboardShortcut[],
    task: [] as KeyboardShortcut[],
    help: [] as KeyboardShortcut[],
  }

  keyboardShortcuts.forEach((shortcut) => {
    categories[shortcut.category].push(shortcut)
  })

  return categories
}

export const findShortcutByKey = (
  key: string,
  shiftKey: boolean,
): KeyboardShortcut | undefined => {
  return keyboardShortcuts.find(
    (shortcut) =>
      shortcut.keys.includes(key) &&
      (shortcut.withShift === shiftKey || (!shortcut.withShift && !shiftKey)),
  )
}
