import { z } from "zod"
import { FormBuilder } from "@/components/custom-ui/FormBuilder"
import { Stack } from "@/components/custom-ui/Stack"
import { Button } from "@/components/ui/button"

const userFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Please enter a valid email"),
})

interface UserFormContentProps {
  onSubmit: (data: { username: string; email: string }) => void
  onCancel: () => void
}

export function UserFormContent({ onSubmit, onCancel }: UserFormContentProps) {
  return (
    <Stack spacing="md">
      <FormBuilder
        fields={[
          {
            name: "username",
            type: "text",
            label: "Username",
            placeholder: "Enter your username",
            layout: "full",
            autoComplete: "username",
          },
          {
            name: "email",
            type: "email",
            label: "Email",
            placeholder: "Enter your email",
            layout: "full",
            autoComplete: "email",
          },
        ]}
        schema={userFormSchema}
        onSubmit={onSubmit}
        submitLabel="Create User"
        resetLabel="Reset"
      />
      <Button variant="outline" onClick={onCancel} className="w-full">
        Cancel
      </Button>
    </Stack>
  )
}
