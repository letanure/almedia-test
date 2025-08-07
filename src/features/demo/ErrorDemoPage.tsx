import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"
import { ErrorDemo } from "./ErrorDemo"

export function ErrorDemoPage() {
  return (
    <Stack spacing="lg">
      <Text tag="h1" size="2xl" weight="bold">
        Error Demo
      </Text>
      <Text tag="p" variant="muted">
        This page demonstrates error boundary functionality and error handling
        patterns.
      </Text>
      <ErrorDemo />
    </Stack>
  )
}
