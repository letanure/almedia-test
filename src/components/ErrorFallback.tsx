import { AlertCircle } from "lucide-react"
import type { FallbackProps } from "react-error-boundary"
import { Flex } from "@/components/custom-ui/Flex"
import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Error Fallback Component
 *
 * This component is displayed when an error boundary catches an error.
 * It provides a user-friendly error message and a retry button.
 *
 * Following community standards:
 * - Uses react-error-boundary library
 * - Provides retry mechanism
 * - Shows user-friendly error message
 * - Uses design system components
 */

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Flex justify="center" align="center" className="min-h-96" role="alert">
      <Stack spacing="md" className="max-w-lg w-full">
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            <Stack spacing="sm" align="start">
              <Text tag="p">
                We're sorry, but something unexpected happened. Please try
                again.
              </Text>
              <Button
                onClick={resetErrorBoundary}
                variant="destructive"
                size="sm"
              >
                Try again
              </Button>
            </Stack>
          </AlertDescription>
        </Alert>

        {import.meta.env.DEV && (
          <Card className="border-muted">
            <CardHeader>
              <CardTitle className="text-sm">
                Error details (development only)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Stack spacing="sm">
                <div>
                  <Text tag="p" weight="semibold" size="sm">
                    Message:
                  </Text>
                  <Text tag="pre" variant="code" size="sm">
                    {error.message}
                  </Text>
                </div>
                {error.stack && (
                  <div>
                    <Text tag="p" weight="semibold" size="sm">
                      Stack Trace:
                    </Text>
                    <Text tag="pre" variant="code" size="xs">
                      {error.stack}
                    </Text>
                  </div>
                )}
              </Stack>
            </CardContent>
          </Card>
        )}
      </Stack>
    </Flex>
  )
}
