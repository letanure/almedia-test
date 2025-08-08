import { AlertCircle } from "lucide-react"
import { Component, type ErrorInfo, type ReactNode } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Types
interface Props {
  children?: ReactNode
  fallback?: ReactNode
  variant?: "default" | "minimal" | "detailed"
  showRetry?: boolean
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  // Static methods
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  // Lifecycle methods
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
    this.setState({ errorInfo })
    this.props.onError?.(error, errorInfo)
  }

  // Event handlers
  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  // Render methods
  renderErrorContent() {
    const { variant = "default", showRetry = true } = this.props
    const { error, errorInfo } = this.state

    const variantConfig = {
      minimal: {
        wrapper: "max-w-md mx-auto",
        buttonVariant: "outline" as const,
        showDescription: false,
        errorCard: "",
      },
      detailed: {
        wrapper: "max-w-2xl mx-auto",
        buttonVariant: "destructive" as const,
        showDescription: true,
        errorCard: "border-destructive",
      },
      default: {
        wrapper: "max-w-lg mx-auto",
        buttonVariant: "outline" as const,
        showDescription: true,
        errorCard: "",
      },
    }

    const config = variantConfig[variant] || variantConfig.default

    const isMinimal = variant === "minimal"
    const isDetailed = variant === "detailed"
    const showErrorDetails = isDetailed && error

    const classes = {
      wrapper: "flex flex-col gap-4",
      alertDescription: "flex flex-col gap-3 items-start",
      cardContent: "space-y-3",
      cardTitle: "text-sm",
      errorLabel: "font-semibold text-sm",
      errorText: "text-sm",
      stackTrace: "text-xs whitespace-pre-wrap bg-muted p-2 rounded",
    }

    return (
      <div className={classes.wrapper}>
        <Alert variant="destructive" className={config.wrapper}>
          <AlertCircle />
          <AlertTitle>
            {isMinimal ? "Error" : "Something went wrong"}
          </AlertTitle>
          <AlertDescription className={classes.alertDescription}>
            {config.showDescription && (
              <p>
                An unexpected error occurred. Please try refreshing the page.
              </p>
            )}
            {showRetry && (
              <Button
                type="button"
                onClick={this.handleRetry}
                variant={config.buttonVariant}
                size="sm"
              >
                Try again
              </Button>
            )}
          </AlertDescription>
        </Alert>

        {showErrorDetails && (
          <Card className={`${config.wrapper} ${config.errorCard}`.trim()}>
            <CardHeader>
              <CardTitle className={classes.cardTitle}>Error Details</CardTitle>
            </CardHeader>
            <CardContent className={classes.cardContent}>
              <div>
                <p className={classes.errorLabel}>Error:</p>
                <p className={classes.errorText}>{error.toString()}</p>
              </div>
              {errorInfo?.componentStack && (
                <div>
                  <p className={classes.errorLabel}>Component Stack:</p>
                  <pre className={classes.stackTrace}>
                    {errorInfo.componentStack}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || this.renderErrorContent()
    }

    return this.props.children
  }
}
