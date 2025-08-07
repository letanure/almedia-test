/**
 * Main Kanban Board component
 *
 * This is the entry point for the kanban feature.
 * Currently a placeholder - will be implemented in subsequent steps.
 */

import { Container } from "@/components/custom-ui/Container"
import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"

export const KanbanBoard = () => {
  return (
    <Container padding="lg">
      <Stack spacing="lg">
        <Text tag="h1">Kanban Board</Text>
        <Text tag="p" variant="muted">
          Kanban board implementation coming soon...
        </Text>
      </Stack>
    </Container>
  )
}
