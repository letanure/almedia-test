import { z } from "zod"

export function isFieldRequired(
  schema: z.ZodTypeAny,
  fieldName: string,
): boolean {
  try {
    // For ZodObject, check if the field is optional
    if ("shape" in schema && schema.shape) {
      const field = (schema.shape as Record<string, z.ZodTypeAny>)[fieldName]
      if (field) {
        // Check if field is optional by safe-parsing undefined
        const parseResult = field.safeParse(undefined)
        if (parseResult.success) {
          return false // Field accepts undefined, so it's optional
        }

        // Check if field is ZodOptional instance
        if (field instanceof z.ZodOptional) {
          return false
        }

        // Default to required if we can't determine
        return true
      }
    }
    return false
  } catch (error) {
    console.error(`Error checking if field ${fieldName} is required:`, error)
    return false
  }
}
