import { observer } from "mobx-react-lite"
import { Modal } from "@/components/custom-ui/Modal"
import { useTaskModal } from "../../contexts/TaskModalContext"
import { useTaskModalActions } from "../../hooks/useTaskModalActions"
import { TaskModal } from "./TaskModal"

export const PersistentTaskModal = observer(() => {
  const { taskId, isOpen, closeModal } = useTaskModal()
  const {
    handleUpdateTask,
    handleDeleteTask,
    handleAddComment,
    handleEditComment,
    handleDeleteComment,
    handleReplyComment,
  } = useTaskModalActions(taskId || "")

  if (!taskId || !isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="Task Details" size="xl">
      <TaskModal
        taskId={taskId}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
        onAddComment={handleAddComment}
        onEditComment={handleEditComment}
        onDeleteComment={handleDeleteComment}
        onReplyComment={handleReplyComment}
      />
    </Modal>
  )
})
