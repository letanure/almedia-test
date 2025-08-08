import type { ReactNode } from "react"

interface ColumnProps {
  title: string
  children: ReactNode
}

export const Column = ({ title, children }: ColumnProps) => {
  return (
    <div className="flex-1 border border-gray-300 rounded-lg">
      <div className="p-3 border-b border-gray-300">
        <h3 className="font-medium">{title}</h3>
      </div>
      <div className="p-3">{children}</div>
    </div>
  )
}
