import { makeAutoObservable } from "mobx"
import {
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
}
