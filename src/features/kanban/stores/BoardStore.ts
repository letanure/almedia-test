import { makeAutoObservable } from "mobx"
import { BoardSchema } from "../schemas"

export class BoardStore {
  // Object mapping columnId to array of taskIds (preserves order)
  columnTasks: Record<string, string[]> = {}

  constructor() {
    makeAutoObservable(this)
  }

  static persistenceConfig = {
    enabled: true,
    key: "boardStore",
    schema: BoardSchema,
  }

  // Add a task to a column at a specific position
  addTaskToColumn(taskId: string, columnId: string, position?: number) {
    // Remove from previous column if exists
    const previousColumnId = this.getColumnForTask(taskId)
    if (previousColumnId) {
      this.removeTaskFromColumn(taskId, previousColumnId)
    }

    // Ensure column exists in columnTasks
    if (!this.columnTasks[columnId]) {
      this.columnTasks[columnId] = []
    }

    // Add to new column
    const tasks = this.columnTasks[columnId]
    const insertPosition = position ?? tasks.length

    tasks.splice(insertPosition, 0, taskId)
    this.columnTasks[columnId] = [...tasks] // Create new array to trigger reactivity
  }

  // Remove a task from its column
  removeTaskFromColumn(taskId: string, columnId?: string) {
    const colId = columnId || this.getColumnForTask(taskId)
    if (!colId) return

    const tasks = this.columnTasks[colId]
    if (tasks) {
      const filtered = tasks.filter((id) => id !== taskId)
      this.columnTasks[colId] = filtered
    }
  }

  // Move a task within the same column or to a different column
  moveTask(taskId: string, targetColumnId: string, targetPosition: number) {
    const sourceColumnId = this.getColumnForTask(taskId)
    if (!sourceColumnId) return

    // Remove from source column
    this.removeTaskFromColumn(taskId, sourceColumnId)

    // Add to target column at position
    this.addTaskToColumn(taskId, targetColumnId, targetPosition)
  }

  // Get all task IDs in a column (in order)
  getTaskIdsByColumn(columnId: string): string[] {
    return this.columnTasks[columnId] || []
  }

  // Get the column ID for a task
  getColumnForTask(taskId: string): string | undefined {
    for (const [columnId, taskIds] of Object.entries(this.columnTasks)) {
      if (taskIds.includes(taskId)) {
        return columnId
      }
    }
    return undefined
  }

  // Remove all tasks from a column (when column is deleted)
  removeAllTasksFromColumn(columnId: string): string[] {
    const tasks = this.columnTasks[columnId] || []
    delete this.columnTasks[columnId]
    return tasks
  }

  // Delete a task completely
  deleteTask(taskId: string) {
    const columnId = this.getColumnForTask(taskId)
    if (columnId) {
      this.removeTaskFromColumn(taskId, columnId)
    }
  }

  // Get count of tasks in a column
  getTaskCountInColumn(columnId: string): number {
    return (this.columnTasks[columnId] || []).length
  }

  // Get all unassigned task IDs (tasks without a column)
  getUnassignedTaskIds(allTaskIds: string[]): string[] {
    const assignedTaskIds = new Set<string>()
    for (const taskIds of Object.values(this.columnTasks)) {
      taskIds.forEach((id) => assignedTaskIds.add(id))
    }
    return allTaskIds.filter((id) => !assignedTaskIds.has(id))
  }
}
