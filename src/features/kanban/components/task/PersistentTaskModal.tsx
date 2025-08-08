import { observer } from "mobx-react-lite"
import { Modal } from "@/components/custom-ui/Modal"
import { useTaskModal } from "../../contexts/TaskModalContext"
import { TaskModal } from "./TaskModal"

export const PersistentTaskModal = observer(() => {
  const { taskId, isOpen, closeModal } = useTaskModal()

  if (!taskId || !isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="Task Details" size="xl">
      <TaskModal taskId={taskId} />
    </Modal>
  )
})
