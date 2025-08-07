import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"
import { Button } from "@/components/ui/button"
import { useGlobalLoading } from "@/contexts/GlobalLoadingContext"

export function LoadingDemo() {
  const { setLoading } = useGlobalLoading()

  const handleTestLoading = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000)
  }

  return (
    <Stack spacing="md">
      <Text tag="p" variant="muted">
        Shows a global loading overlay with spinner animation using{" "}
        <Text tag="code" variant="code">
          setLoading(true)
        </Text>
      </Text>
      <Button onClick={handleTestLoading}>Show Loading (3s)</Button>
    </Stack>
  )
}
