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

  createTask(data: CreateTask): Task {
    const task: Task = {
      id: crypto.randomUUID(),
      title: data.title.trim(),
      description: data.description?.trim(),
      comments: [],
      createdAt: new Date(),
    }

    this.tasks.push(task)
    return task
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
  addComment(taskId: string, data: CommentFormData): Comment | undefined {
    const task = this.getTaskById(taskId)
    if (!task) return undefined

    const comment: Comment = {
      id: crypto.randomUUID(),
      content: data.content.trim(),
      createdAt: new Date(),
    }

    task.comments.push(comment)
    return comment
  }

  updateComment(taskId: string, commentId: string, content: string): boolean {
    const task = this.getTaskById(taskId)
    if (!task) return false

    const comment = task.comments.find((c) => c.id === commentId)
    if (!comment) return false

    comment.content = content.trim()
    comment.updatedAt = new Date()
    return true
  }

  deleteComment(taskId: string, commentId: string): boolean {
    const task = this.getTaskById(taskId)
    if (!task) return false

    const commentIndex = task.comments.findIndex((c) => c.id === commentId)
    if (commentIndex === -1) return false

    task.comments.splice(commentIndex, 1)
    return true
  }
}
