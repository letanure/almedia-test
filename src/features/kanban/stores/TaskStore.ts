import { makeAutoObservable } from "mobx"
import {
  type CreateTask,
  type Task,
  TaskStoreSchema,
  type UpdateTask,
} from "../schemas"

export type { Task }

export class TaskStore {
  tasks: Map<string, Task> = new Map()

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

    this.tasks.set(task.id, task)
    return task
  }

  updateTask(id: string, data: UpdateTask) {
    const task = this.tasks.get(id)
    if (!task) return

    const updatedTask: Task = {
      ...task,
      title: data.title?.trim() ?? task.title,
      description: data.description?.trim() ?? task.description,
      updatedAt: new Date(),
    }

    this.tasks.set(id, updatedTask)
  }

  deleteTask(id: string) {
    this.tasks.delete(id)
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.get(id)
  }

  getTasksByIds(ids: string[]): Task[] {
    return ids
      .map((id) => this.tasks.get(id))
      .filter((task): task is Task => task !== undefined)
  }

  get totalTasks() {
    return this.tasks.size
  }

  get allTasks(): Task[] {
    return Array.from(this.tasks.values())
  }
}
