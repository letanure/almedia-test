import type { ReactNode } from "react"
import { ColumnHeader } from "./components/ColumnHeader"

interface ColumnProps {
  columnId: string
  title: string
  children: ReactNode
}

export const Column = ({ columnId, title, children }: ColumnProps) => {
  return (
    <div className="flex-1 border border-gray-300 rounded-lg">
      <ColumnHeader columnId={columnId} title={title} />
      <div className="p-3">{children}</div>
    </div>
  )
}
