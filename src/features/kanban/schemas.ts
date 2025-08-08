import { z } from "zod"

// ============================================================================
// COLUMN SCHEMAS
// ============================================================================

// Column schema
export const ColumnSchema = z.object({
  id: z.string().min(1, "validation.required"),
  name: z.string().min(1, "validation.required").trim(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
})

// Create column schema (omit auto-generated fields)
export const CreateColumnSchema = ColumnSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

// Update column schema (partial + required id)
export const UpdateColumnSchema = ColumnSchema.partial().extend({
  id: z.string().min(1, "validation.required"),
  updatedAt: z.coerce.date(),
})

// Form schema (for form validation)
export const ColumnFormSchema = z.object({
  name: z.string().min(1, "validation.required").trim(),
})

// Store schema (for persistence validation)
export const ColumnStoreSchema = z.object({
  columns: z.array(ColumnSchema),
})

// Inferred types from schemas
export type Column = z.infer<typeof ColumnSchema>
export type CreateColumn = z.infer<typeof CreateColumnSchema>
export type UpdateColumn = z.infer<typeof UpdateColumnSchema>
export type ColumnFormData = z.infer<typeof ColumnFormSchema>
export type ColumnStoreData = z.infer<typeof ColumnStoreSchema>

// ============================================================================
// TASK SCHEMAS
// ============================================================================

// Task schema (independent of columns)
export const TaskSchema = z.object({
  id: z.string().min(1, "validation.required"),
  title: z.string().min(1, "validation.required").trim(),
  description: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
})

// Create task schema
export const CreateTaskSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

// Update task schema
export const UpdateTaskSchema = TaskSchema.partial()

// Form schema for tasks
export const TaskFormSchema = z.object({
  title: z.string().min(1, "validation.required").trim(),
  description: z.string().optional(),
})

// Store schema for tasks (Map structure)
export const TaskStoreSchema = z.object({
  tasks: z.map(z.string(), TaskSchema),
})

// Inferred task types
export type Task = z.infer<typeof TaskSchema>
export type CreateTask = z.infer<typeof CreateTaskSchema>
export type UpdateTask = z.infer<typeof UpdateTaskSchema>
export type TaskFormData = z.infer<typeof TaskFormSchema>
export type TaskStoreData = z.infer<typeof TaskStoreSchema>

// ============================================================================
// BOARD SCHEMAS (manages column-task relationships)
// ============================================================================

// Board schema for managing task positions in columns
export const BoardSchema = z.object({
  // Map of columnId to array of taskIds (in order)
  columnTasks: z.map(z.string(), z.array(z.string())),
})

// Inferred board types
export type BoardData = z.infer<typeof BoardSchema>
