import { z } from "zod"

// Todo schema for validation at data boundaries
export const TodoSchema = z.object({
  id: z.string().min(1, "validation.required"),
  text: z.string().min(1, "validation.required").trim(),
  completed: z.boolean(),
  createdAt: z.coerce.date(),
})

// Schema for creating a new todo (without id and createdAt)
export const CreateTodoSchema = TodoSchema.omit({
  id: true,
  createdAt: true,
})

// Schema for updating an existing todo
export const UpdateTodoSchema = TodoSchema.partial().extend({
  id: z.string().min(1, "validation.required"),
})

// Schema for todo text input validation
export const TodoTextSchema = z.string().min(1, "validation.required").trim()

// Schema for todo form validation (used in forms)
export const TodoFormSchema = z.object({
  text: TodoTextSchema,
})

// Schema for validating the entire todo store state during hydration
export const TodoStoreSchema = z.object({
  todos: z.array(TodoSchema),
})

// Inferred types from schemas
export type Todo = z.infer<typeof TodoSchema>
export type CreateTodo = z.infer<typeof CreateTodoSchema>
export type UpdateTodo = z.infer<typeof UpdateTodoSchema>
export type TodoFormData = z.infer<typeof TodoFormSchema>
export type TodoStoreData = z.infer<typeof TodoStoreSchema>
