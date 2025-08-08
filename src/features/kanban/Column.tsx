import type { ReactNode } from "react"
import { ColumnHeader } from "./components/ColumnHeader"

interface ColumnProps {
  title: string
  children: ReactNode
  onDelete: () => void
}

export const Column = ({ title, children, onDelete }: ColumnProps) => {
  return (
    <div className="flex-1 border border-gray-300 rounded-lg">
      <ColumnHeader title={title} onDelete={onDelete} />
      <div className="p-3">{children}</div>
    </div>
  )
}
