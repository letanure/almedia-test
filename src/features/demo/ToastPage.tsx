import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"
import { ToastDemo } from "./components/ToastDemo"

export function ToastPage() {
  return (
    <Stack spacing="lg">
      <Stack spacing="md">
        <Text tag="h1" size="2xl" weight="bold">
          Toast Notifications Demo
        </Text>
        <Text tag="p" variant="muted">
          This demonstrates different types of toast notifications with
          configurable options. Toasts are displayed in the bottom-right corner
          by default and can be customized.
        </Text>
      </Stack>

      <ToastDemo />
    </Stack>
  )
}
