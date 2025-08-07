import { Grid } from "@/components/custom-ui/Grid"
import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"
import { Button } from "@/components/ui/button"
import { useToast } from "@/contexts/ToastContext"

export function ToastDemo() {
  const toast = useToast()

  return (
    <Stack spacing="md">
      <Text tag="p" variant="muted">
        Displays different types of toast notifications using{" "}
        <Text tag="code" variant="code">
          toast.success()
        </Text>
        ,{" "}
        <Text tag="code" variant="code">
          toast.error()
        </Text>
        , etc.
      </Text>

      <Grid cols={2} gap="sm" className="md:grid-cols-4">
        <Button
          onClick={() =>
            toast.success({ message: "Success! Operation completed." })
          }
          variant="default"
        >
          Success
        </Button>
        <Button
          onClick={() =>
            toast.error({ message: "Error! Something went wrong." })
          }
          variant="destructive"
        >
          Error
        </Button>
        <Button
          onClick={() =>
            toast.warning({ message: "Warning! Please check your input." })
          }
          variant="outline"
        >
          Warning
        </Button>
        <Button
          onClick={() =>
            toast.info({ message: "Info: Here's some information." })
          }
          variant="secondary"
        >
          Info
        </Button>
      </Grid>
    </Stack>
  )
}
