import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"
import { LoadingDemo } from "./components/LoadingDemo"

export function LoadingPage() {
  return (
    <Stack spacing="lg">
      <Stack spacing="md">
        <Text tag="h1" size="2xl" weight="bold">
          Global Loading Demo
        </Text>
        <Text tag="p" variant="muted">
          This demonstrates the global loading overlay system with spinner
          animation. The loading state is managed globally and can be triggered
          from anywhere in the app.
        </Text>
      </Stack>

      <LoadingDemo />
    </Stack>
  )
}
