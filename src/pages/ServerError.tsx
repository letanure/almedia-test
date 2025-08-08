import { useNavigate } from "react-router-dom"
import { Animated } from "@/components/custom-ui/Animated"
import { Flex } from "@/components/custom-ui/Flex"
import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function ServerError() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate("/")
  }

  const handleRetry = () => {
    window.location.reload()
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Animated effect="fade">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-6">
            <Stack spacing="lg" align="center">
              <div className="text-6xl mb-2">⚠️</div>

              <Stack spacing="sm" align="center">
                <Text tag="h1" size="2xl" weight="bold">
                  Something Went Wrong
                </Text>
                <Text tag="p" variant="muted">
                  We're experiencing technical difficulties. Please try again in
                  a moment.
                </Text>
              </Stack>

              <Stack spacing="sm" align="center">
                <Button onClick={handleRetry} size="sm">
                  Try Again
                </Button>
                <Flex gap="sm" justify="center">
                  <Button onClick={handleGoHome} variant="outline" size="sm">
                    Go Home
                  </Button>
                  <Button onClick={handleGoBack} variant="outline" size="sm">
                    Go Back
                  </Button>
                </Flex>
              </Stack>

              <Stack spacing="xs" align="center">
                <Text tag="small" variant="muted" size="sm">
                  Error Code: 500
                </Text>
                <Text tag="small" variant="muted" size="xs">
                  If the problem persists, please contact support
                </Text>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Animated>
    </div>
  )
}
