import { createContext, useContext } from "react"
import type { z } from "zod"
import { Stack } from "@/components/custom-ui/Stack"
import { Form } from "@/components/ui/form"
import { FormActions } from "./FormActions"
import { FormLayout } from "./FormLayout"
import { useFormBuilder } from "./hooks/useFormBuilder"
import type { FormBuilderProps } from "./types"

const FormBuilderContext = createContext<{
  translateMessage?: (key: string) => string
}>({})

export const useFormBuilderContext = () => useContext(FormBuilderContext)

export function FormBuilder<TSchema extends z.ZodObject<z.ZodRawShape>>({
  fields,
  schema,
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel,
  submittingLabel = submitLabel,
  resetLabel,
  showReset = false,
  resetAfterSubmit = false,
  className,
  autoComplete = "on",
  translateMessage,
}: FormBuilderProps<TSchema>) {
  const { form, handleSubmit, handleReset } = useFormBuilder({
    schema,
    defaultValues,
    onSubmit,
    resetAfterSubmit,
  })

  return (
    <FormBuilderContext.Provider value={{ translateMessage }}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data: z.infer<TSchema>) =>
            handleSubmit(data, fields),
          )}
          className={className}
          autoComplete={autoComplete}
          noValidate
        >
          <Stack spacing="lg">
            <FormLayout fields={fields} schema={schema} />

            <FormActions
              isSubmitting={isSubmitting}
              submitLabel={submitLabel}
              submittingLabel={submittingLabel}
              resetLabel={resetLabel}
              showReset={showReset}
              onReset={handleReset}
            />
          </Stack>
        </form>
      </Form>
    </FormBuilderContext.Provider>
  )
}
