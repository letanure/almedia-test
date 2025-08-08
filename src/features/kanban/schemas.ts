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

// Comment schema
export const CommentSchema = z.object({
  id: z.string().min(1, "validation.required"),
  content: z.string().min(1, "validation.required").trim(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional(),
  replyTo: z.string().optional(), // ID of parent comment if this is a reply
})

// Priority and importance enums
export const ImportanceLevel = z.enum(["low", "high"])
export const UrgencyLevel = z.enum(["low", "high"])

// Task schema (independent of columns)
export const TaskSchema = z.object({
  id: z.string().min(1, "validation.required"),
  title: z.string().min(1, "validation.required").trim(),
  description: z.string().optional(),
  dueDate: z.coerce.date().optional(),
  importance: ImportanceLevel.default("low"),
  urgency: UrgencyLevel.default("low"),
  comments: z.array(CommentSchema).default([]),
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
  dueDate: z.coerce.date().optional(),
  importance: ImportanceLevel.optional(),
  urgency: UrgencyLevel.optional(),
})

// Store schema for tasks (array structure)
export const TaskStoreSchema = z.object({
  tasks: z.array(TaskSchema),
})

// Comment form schema
export const CommentFormSchema = z.object({
  content: z.string().min(1, "validation.required").trim(),
})

// Inferred comment types
export type Comment = z.infer<typeof CommentSchema>
export type CommentFormData = z.infer<typeof CommentFormSchema>

// Eisenhower Matrix quadrants
export type EisenhowerQuadrant = "do" | "schedule" | "delegate" | "eliminate"

// Inferred types
export type ImportanceLevel = z.infer<typeof ImportanceLevel>
export type UrgencyLevel = z.infer<typeof UrgencyLevel>
export type Task = z.infer<typeof TaskSchema>
export type CreateTask = z.infer<typeof CreateTaskSchema>
export type UpdateTask = z.infer<typeof UpdateTaskSchema>
export type TaskFormData = z.infer<typeof TaskFormSchema>
export type TaskStoreData = z.infer<typeof TaskStoreSchema>

// Utility functions for Eisenhower Matrix
export const getEisenhowerQuadrant = (
  importance: ImportanceLevel,
  urgency: UrgencyLevel,
): EisenhowerQuadrant => {
  if (importance === "high" && urgency === "high") return "do"
  if (importance === "high" && urgency === "low") return "schedule"
  if (importance === "low" && urgency === "high") return "delegate"
  return "eliminate" // low importance, low urgency
}

export const getQuadrantConfig = (quadrant: EisenhowerQuadrant) => {
  const configs = {
    do: {
      label: "Do Now",
      color: "red",
      bgColor: "bg-red-100",
      textColor: "text-red-800",
      borderColor: "border-red-200",
      description: "Important & Urgent",
    },
    schedule: {
      label: "Schedule",
      color: "blue",
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
      borderColor: "border-blue-200",
      description: "Important & Not Urgent",
    },
    delegate: {
      label: "Delegate",
      color: "yellow",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800",
      borderColor: "border-yellow-200",
      description: "Not Important & Urgent",
    },
    eliminate: {
      label: "Eliminate",
      color: "gray",
      bgColor: "bg-gray-100",
      textColor: "text-gray-800",
      borderColor: "border-gray-200",
      description: "Not Important & Not Urgent",
    },
  }
  return configs[quadrant]
}

export const isTaskOverdue = (dueDate?: Date): boolean => {
  if (!dueDate) return false
  return new Date() > dueDate
}

// ============================================================================
// BOARD SCHEMAS (manages column-task relationships)
// ============================================================================

// Board schema for managing task positions in columns
export const BoardSchema = z.object({
  // Object mapping columnId to array of taskIds (in order)
  columnTasks: z.record(z.string(), z.array(z.string())),
})

// Inferred board types
export type BoardData = z.infer<typeof BoardSchema>
