/**
 * Home/Landing Page
 */

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to the Starter Kit
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          A modern React application with TypeScript, MobX, and shadcn/ui
          components.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 border rounded-lg">
          <h2 className="font-semibold mb-2">Todo Lists</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Manage your tasks with a clean, intuitive interface.
          </p>
          <Button asChild>
            <Link to="/todo">View Todo Lists</Link>
          </Button>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="font-semibold mb-2">Examples</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Explore API integration and error handling examples.
          </p>
          <Button asChild variant="outline">
            <Link to="/demo">View Examples</Link>
          </Button>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="font-semibold mb-2">Features</h2>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• TypeScript + React</li>
            <li>• MobX state management</li>
            <li>• shadcn/ui components</li>
            <li>• i18n internationalization</li>
            <li>• Feature-based architecture</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
