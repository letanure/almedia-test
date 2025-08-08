import { useTranslation } from "react-i18next"
import {
  getShortcutsByCategory,
  type KeyboardShortcut,
} from "../config/keyboardShortcuts"

const formatKey = (key: string): string => {
  const keyMap: Record<string, string> = {
    ArrowUp: "↑",
    ArrowDown: "↓",
    ArrowLeft: "←",
    ArrowRight: "→",
    Escape: "Esc",
    " ": "Space",
  }
  return keyMap[key] || key
}

const formatShortcutKeys = (shortcut: KeyboardShortcut): string[] => {
  const keys = shortcut.keys.map(formatKey)
  if (shortcut.withShift) {
    return keys.map((key) => `Shift+${key}`)
  }
  return keys
}

export const KeyboardShortcutsModal = () => {
  const { t } = useTranslation()
  const categories = getShortcutsByCategory()
  const categoryOrder: Array<"navigation" | "task" | "board" | "help"> = [
    "navigation",
    "task",
    "board",
    "help",
  ]

  return (
    <div className="space-y-6 min-w-[600px]">
      {categoryOrder.map((category) => (
        <div key={category}>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            {t(`kanban.shortcuts.categories.${category}`)}
          </h3>
          <div className="space-y-2">
            <table className="w-full">
              <tbody>
                {categories[category].map((shortcut) => {
                  const keys = formatShortcutKeys(shortcut)
                  return (
                    <tr
                      key={shortcut.id}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="py-2 pr-8 whitespace-nowrap">
                        <div className="flex gap-1 items-center">
                          {keys.map((key, keyIndex) => (
                            <span
                              key={`${shortcut.id}-${keyIndex}`}
                              className="flex items-center"
                            >
                              {keyIndex > 0 && (
                                <span className="text-gray-400 mx-2">or</span>
                              )}
                              <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded">
                                {key}
                              </kbd>
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-2 text-sm text-gray-600">
                        {t(shortcut.descriptionKey)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}
