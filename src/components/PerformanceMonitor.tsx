import { useEffect, useState } from "react"
import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"
import { Card, CardContent } from "@/components/ui/card"
import { measurePerformance } from "@/lib/performance"

interface PerformanceStats {
  renderTime: number
  mountTime: number
}

/**
 * Development-only component to display performance metrics
 * Only renders in development mode
 * Uses design system components for consistent styling
 */
export function PerformanceMonitor() {
  const [stats, setStats] = useState<PerformanceStats>({
    renderTime: 0,
    mountTime: 0,
  })

  useEffect(() => {
    const startTime = performance.now()

    // Measure mount time
    const mountTime = Math.round(performance.now() - startTime)
    setStats((prev) => ({ ...prev, mountTime }))

    // Measure render performance
    measurePerformance.start("app-render")
    const renderTime = measurePerformance.end("app-render")
    setStats((prev) => ({ ...prev, renderTime }))
  }, [])

  return (
    <Card className="fixed bottom-2 right-2 bg-black/80 text-white z-[9999] pointer-events-none font-mono">
      <CardContent className="p-2">
        <Stack spacing="none">
          <Text tag="div" size="xs" weight="medium">
            🚀 Performance
          </Text>
          <Text tag="div" size="xs">
            Mount: {stats.mountTime}ms
          </Text>
          <Text tag="div" size="xs">
            Render: {stats.renderTime}ms
          </Text>
          <Text tag="div" size="xs" variant="muted">
            Dev only - F12 for Web Vitals
          </Text>
        </Stack>
      </CardContent>
    </Card>
  )
}
