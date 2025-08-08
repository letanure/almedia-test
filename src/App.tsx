import { Route, Routes } from "react-router-dom"
import { LayoutWrapper } from "@/components/layout/LayoutWrapper"
import { processedRoutes } from "@/config/routes"
import "./App.css"

function App() {
  // Example: Using environment variables
  if (import.meta.env.VITE_DEBUG) {
    console.log("Example ENV - API URL:", import.meta.env.VITE_API_URL)
  }

  return (
    <Routes>
      {processedRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <LayoutWrapper layout={route.layout}>
              <route.component />
            </LayoutWrapper>
          }
        />
      ))}
    </Routes>
  )
}

export default App
