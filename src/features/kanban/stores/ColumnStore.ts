import { makeAutoObservable } from "mobx"
import { type Column, ColumnStoreSchema, type UpdateColumn } from "../schemas"

export type { Column }

export class ColumnStore {
  columns: Column[] = []

  constructor() {
    makeAutoObservable(this)
    this.initializeDefaultColumns()
  }

  static persistenceConfig = {
    enabled: true,
    key: "columnStore",
    schema: ColumnStoreSchema,
  }

  private initializeDefaultColumns() {
    // Only add default columns if none exist (first time or after clear)
    if (this.columns.length === 0) {
      this.addColumn("To Do")
      this.addColumn("In Progress")
      this.addColumn("Done")
    }
  }

  addColumn(name: string) {
    const column: Column = {
      id: crypto.randomUUID(),
      name: name.trim(),
      createdAt: new Date(),
    }
    this.columns.push(column)
  }

  updateColumn(id: string, data: Partial<UpdateColumn>) {
    const columnIndex = this.columns.findIndex((c) => c.id === id)
    if (columnIndex > -1) {
      const column = this.columns[columnIndex]
      if (!column) return

      if (data.name !== undefined) {
        // Create a new column object to ensure MobX detects the change
        this.columns[columnIndex] = {
          id: column.id,
          name: data.name.trim(),
          createdAt: column.createdAt,
          updatedAt: new Date(),
        }
      } else {
        // Only update updatedAt
        this.columns[columnIndex] = {
          id: column.id,
          name: column.name,
          createdAt: column.createdAt,
          updatedAt: new Date(),
        }
      }
    }
  }

  deleteColumn(id: string) {
    const index = this.columns.findIndex((c) => c.id === id)
    if (index > -1) {
      this.columns.splice(index, 1)
    }
  }

  reorderColumns(fromIndex: number, toIndex: number) {
    const [movedColumn] = this.columns.splice(fromIndex, 1)
    if (movedColumn) {
      this.columns.splice(toIndex, 0, movedColumn)
    }
  }

  getColumnById(id: string): Column | undefined {
    return this.columns.find((c) => c.id === id)
  }

  get totalColumns() {
    return this.columns.length
  }
}
