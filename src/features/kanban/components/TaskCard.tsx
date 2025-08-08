interface TaskCardProps {
  title: string
  description?: string
}

export const TaskCard = ({ title, description }: TaskCardProps) => {
  return (
    <div className="mb-2 p-2 border cursor-pointer">
      <div className="text-sm">{title}</div>
      {description && (
        <div className="text-xs text-gray-600">{description}</div>
      )}
    </div>
  )
}
