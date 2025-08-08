import { makeAutoObservable } from "mobx"
import {
  type Comment,
  type CommentFormData,
  type CreateTask,
  type Task,
  TaskStoreSchema,
  type UpdateTask,
} from "../schemas"

export type { Task }

export class TaskStore {
  tasks: Task[] = []

  constructor() {
    makeAutoObservable(this)
  }

  static persistenceConfig = {
    enabled: true,
    key: "taskStore",
    schema: TaskStoreSchema,
  }

  createTask(data: CreateTask): string {
    const id = crypto.randomUUID()
    const task: Task = {
      id,
      title: data.title.trim(),
      description: data.description?.trim(),
      comments: [],
      createdAt: new Date(),
    }

    this.tasks.push(task)
    return id // Only exception: return ID for board coordination
  }

  updateTask(id: string, data: UpdateTask) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id)
    if (taskIndex === -1) return

    const task = this.tasks[taskIndex]
    const updatedTask: Task = {
      ...task,
      title: data.title?.trim() ?? task.title,
      description: data.description?.trim() ?? task.description,
      updatedAt: new Date(),
    }

    this.tasks[taskIndex] = updatedTask
  }

  deleteTask(id: string) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id)
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1)
    }
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id)
  }

  getTasksByIds(ids: string[]): Task[] {
    return ids
      .map((id) => this.tasks.find((task) => task.id === id))
      .filter((task): task is Task => task !== undefined)
  }

  get totalTasks() {
    return this.tasks.length
  }

  get allTasks(): Task[] {
    return this.tasks
  }

  // Comment methods
  addComment(taskId: string, data: CommentFormData): void {
    const task = this.getTaskById(taskId)
    if (!task) return

    const comment: Comment = {
      id: crypto.randomUUID(),
      content: data.content.trim(),
      createdAt: new Date(),
    }

    task.comments.push(comment)
  }

  updateComment(taskId: string, commentId: string, content: string): void {
    const task = this.getTaskById(taskId)
    if (!task) return

    const comment = task.comments.find((c) => c.id === commentId)
    if (!comment) return

    comment.content = content.trim()
    comment.updatedAt = new Date()
  }

  deleteComment(taskId: string, commentId: string): void {
    const task = this.getTaskById(taskId)
    if (!task) return

    const commentIndex = task.comments.findIndex((c) => c.id === commentId)
    if (commentIndex === -1) return

    task.comments.splice(commentIndex, 1)
  }
}
