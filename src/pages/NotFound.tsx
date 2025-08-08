import { useNavigate } from "react-router-dom"
import { Animated } from "@/components/custom-ui/Animated"
import { Flex } from "@/components/custom-ui/Flex"
import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function NotFound() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate("/")
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
              <div className="text-6xl mb-2">🔍</div>

              <Stack spacing="sm" align="center">
                <Text tag="h1" size="2xl" weight="bold">
                  Page Not Found
                </Text>
                <Text tag="p" variant="muted">
                  The page you're looking for doesn't exist or has been moved.
                </Text>
              </Stack>

              <Flex gap="sm" justify="center">
                <Button onClick={handleGoHome} size="sm">
                  Go Home
                </Button>
                <Button onClick={handleGoBack} variant="outline" size="sm">
                  Go Back
                </Button>
              </Flex>

              <Text tag="small" variant="muted" size="sm">
                Error Code: 404
              </Text>
            </Stack>
          </CardContent>
        </Card>
      </Animated>
    </div>
  )
}
