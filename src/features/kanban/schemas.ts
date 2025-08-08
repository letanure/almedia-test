import { z } from "zod"

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
