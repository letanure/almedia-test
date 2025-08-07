/**
 * API Integration Demo Page
 *
 * Demonstrates the API patterns implemented in this starter kit.
 * Moved from todo feature to keep examples organized in the demo section.
 */

import { ApiExample } from "./ApiExample"

export function ApiDemo() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          API Integration Demo
        </h1>
        <p className="text-muted-foreground mt-2">
          This example demonstrates how to integrate external APIs using the
          standardized patterns in this starter kit.
        </p>
      </div>

      <ApiExample />
    </div>
  )
}
