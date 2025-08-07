import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { Flex } from "@/components/custom-ui/Flex"
import { FormBuilder } from "@/components/custom-ui/FormBuilder/FormBuilder"
import type { FormFieldConfig } from "@/components/custom-ui/FormBuilder/types"
import { Stack } from "@/components/custom-ui/Stack"
import { Button } from "@/components/ui/button"
import { type ColumnFormData, ColumnFormSchema } from "../../schemas"

interface AddColumnFormProps {
  onAdd: (name: string) => void
  onCancel: () => void
}

export const AddColumnForm = ({ onAdd, onCancel }: AddColumnFormProps) => {
  const { t } = useTranslation()
  const formRef = useRef<HTMLDivElement>(null)

  const fields: FormFieldConfig[] = [
    {
      type: "text",
      name: "name",
      label: "",
      placeholder: t("kanban.column.name"),
      autoComplete: "off",
      layout: "full",
      // Remove autoFocus from field config, we'll handle it manually
    },
  ]

  const handleSubmit = async (data: ColumnFormData) => {
    onAdd(data.name)
  }

  // Focus the input after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      const input = formRef.current?.querySelector(
        'input[name="name"]',
      ) as HTMLInputElement
      if (input) {
        input.focus()
      }
    }, 300) // Wait for animation to complete

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      ref={formRef}
      className="min-w-72 flex-1 p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg"
    >
      <Stack spacing="md">
        <FormBuilder
          fields={fields}
          schema={ColumnFormSchema}
          defaultValues={{ name: "" }}
          onSubmit={handleSubmit}
          submitLabel={t("common.confirm")}
          resetLabel=""
          showReset={false}
          resetAfterSubmit={false}
          translateMessage={t}
        />
        <Flex className="gap-2">
          <Button size="sm" variant="ghost" onClick={onCancel}>
            {t("common.cancel")}
          </Button>
        </Flex>
      </Stack>
    </div>
  )
}
