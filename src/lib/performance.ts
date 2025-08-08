import { type Metric, onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals"

interface PerformanceAnalytics {
  sendToAnalytics: (metric: Metric) => void
}

/**
 * Performance monitoring service using Core Web Vitals
 * Tracks: LCP, INP, CLS, FCP, TTFB
 */
export class PerformanceMonitor {
  private analytics: PerformanceAnalytics | null = null
  private isInitialized = false

  constructor(analytics?: PerformanceAnalytics) {
    this.analytics = analytics || null
  }

  init(): void {
    if (this.isInitialized) return

    // Only track in production or when explicitly enabled
    if (
      import.meta.env.DEV &&
      !import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING
    ) {
      return
    }

    this.isInitialized = true

    // Core Web Vitals
    onLCP(this.handleMetric.bind(this))
    onINP(this.handleMetric.bind(this))
    onCLS(this.handleMetric.bind(this))
    onFCP(this.handleMetric.bind(this))
    onTTFB(this.handleMetric.bind(this))

    console.log("🚀 Performance monitoring initialized")
  }

  /**
   * Handle performance metrics
   */
  private handleMetric(metric: Metric): void {
    const { name, value, rating, delta } = metric

    // Log to console in development
    if (import.meta.env.DEV) {
      console.log(`📊 ${name}: ${value}ms (${rating})`, {
        metric,
        delta,
        attribution: "attribution" in metric ? metric.attribution : undefined,
      })
    }

    // Send to analytics service
    if (this.analytics) {
      this.analytics.sendToAnalytics(metric)
    }

    // Send to console for now (can be replaced with real analytics)
    this.sendToConsole(metric)
  }

  /**
   * Default console logger for metrics
   */
  private sendToConsole(metric: Metric): void {
    // In production, you'd send this to your analytics service
    // Examples: Google Analytics, Sentry, LogRocket, etc.
    console.info("Performance Metric:", {
      name: metric.name,
      value: Math.round(metric.value),
      rating: metric.rating,
      timestamp: Date.now(),
      url: window.location.href,
    })
  }

  /**
   * Set custom analytics provider
   */
  setAnalytics(analytics: PerformanceAnalytics): void {
    this.analytics = analytics
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor()

/**
 * Utility to measure custom performance marks
 */
export const measurePerformance = {
  /**
   * Start measuring a custom metric
   */
  start(name: string): void {
    performance.mark(`${name}-start`)
  },

  /**
   * End measuring and return duration
   */
  end(name: string): number {
    const endMark = `${name}-end`
    const measureName = `${name}-duration`

    performance.mark(endMark)
    performance.measure(measureName, `${name}-start`, endMark)

    const measure = performance.getEntriesByName(measureName)[0]
    const duration = measure?.duration || 0

    console.log(`⏱️ ${name}: ${Math.round(duration)}ms`)

    // Clean up marks
    performance.clearMarks(`${name}-start`)
    performance.clearMarks(endMark)
    performance.clearMeasures(measureName)

    return duration
  },
}

/**
 * React hook for measuring component render performance
 */
export const usePerformanceTrace = (componentName: string) => {
  const startTrace = () => measurePerformance.start(componentName)
  const endTrace = () => measurePerformance.end(componentName)

  return { startTrace, endTrace }
}
