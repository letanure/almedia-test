import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"

export function BasicModalContent() {
  return (
    <Stack spacing="md">
      <Text tag="p">This is a basic modal with some content.</Text>
      <Text tag="p" size="sm" variant="muted">
        Click outside or use the X button to close.
      </Text>
    </Stack>
  )
}
