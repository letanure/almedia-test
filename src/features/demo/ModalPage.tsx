import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"
import { ModalDemo } from "./components/ModalDemo"

export function ModalPage() {
  return (
    <Stack spacing="lg">
      <Stack spacing="md">
        <Text tag="h1" size="2xl" weight="bold">
          Modal System Demo
        </Text>
        <Text tag="p" variant="muted">
          This demonstrates the modal system with portals, different sizes, and
          confirmation dialogs. Modals are rendered using React portals and
          support various configurations.
        </Text>
      </Stack>

      <ModalDemo />
    </Stack>
  )
}
