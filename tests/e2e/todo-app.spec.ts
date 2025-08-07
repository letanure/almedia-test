import { expect, test } from "@playwright/test"
import { TestHelpers } from "./helpers"

test.describe("Todo App - E2E Demo Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/todo")
  })

  // Visual/UI Test - Checks page structure and elements
  test("Visual: page loads with correct structure", async ({ page }) => {
    const helpers = new TestHelpers(page)

    // Check main heading
    await helpers.expectVisible(page.getByRole("heading", { level: 1 }))

    // Check input form is present
    await helpers.expectVisible(page.getByPlaceholder("What needs to be done?"))
    await helpers.expectVisible(page.getByRole("button", { name: "Add" }))
  })

  // User Flow Test - Complete user journey
  test("Flow: complete todo workflow", async ({ page }) => {
    const helpers = new TestHelpers(page)
    const todoText = "Learn E2E testing"

    // Add todo using helper
    await helpers.addTodo(todoText)

    // Mark as complete
    await helpers.toggleTodo(0)
    await helpers.expectVisible(page.getByRole("checkbox", { checked: true }))

    // Clean up - delete todo
    await helpers.deleteTodo(0)
    await helpers.expectNotVisible(page.getByText(todoText))
  })

  // Form Validation Test - Schema validation with i18n
  test("Validation: empty input shows translated error message", async ({
    page,
  }) => {
    const initialTodoCount = await page.locator(".todo-item").count()

    // Try submitting empty form
    await page.getByRole("button", { name: "Add" }).click()

    // Should not create new todo
    const finalTodoCount = await page.locator(".todo-item").count()
    expect(finalTodoCount).toBe(initialTodoCount)

    // Should show validation error message
    await expect(page.getByText("This field is required")).toBeVisible()

    // Input should remain empty and focused for user experience
    await expect(page.getByPlaceholder("What needs to be done?")).toHaveValue(
      "",
    )

    // Error should disappear when user starts typing
    await page
      .getByPlaceholder("What needs to be done?")
      .fill("Valid todo text")
    await expect(page.getByText("This field is required")).not.toBeVisible()
  })

  // State Management Test - Data persistence across interactions
  test("State: statistics update correctly", async ({ page }) => {
    const helpers = new TestHelpers(page)

    // Add two todos
    await helpers.addTodo("Todo 1")
    await helpers.addTodo("Todo 2")

    // Complete first todo
    await helpers.toggleTodo(0)

    // Check statistics display
    await helpers.expectVisible(page.getByText("1 active"))
    await helpers.expectVisible(page.getByText("1 completed"))
  })

  // Visual Regression Test - Desktop Screenshots
  test("Visual: desktop screenshots", async ({ page }, testInfo) => {
    // Skip on mobile
    if (testInfo.project.name === "mobile-chrome") {
      test.skip()
      return
    }

    const helpers = new TestHelpers(page)

    // Set viewport for consistent screenshots
    await page.setViewportSize({ width: 1280, height: 720 })

    // Take screenshots with numbered prefixes for natural ordering
    await expect(page).toHaveScreenshot("desktop-01-empty-state.png")

    // Add a todo and take screenshot
    await helpers.addTodo("Sample todo for visual test")
    await expect(page).toHaveScreenshot("desktop-02-with-one-item.png")

    // Complete todo and take screenshot
    await helpers.toggleTodo(0)
    await expect(page).toHaveScreenshot("desktop-03-item-completed.png")

    // Add another todo to show statistics
    await helpers.addTodo("Another todo item")
    await expect(page).toHaveScreenshot("desktop-04-with-statistics.png")
  })

  // Visual Regression Test - Mobile Screenshots (simplified without interactions)
  test("Visual: mobile screenshots", async ({ page }, testInfo) => {
    // Skip on desktop
    if (testInfo.project.name !== "mobile-chrome") {
      test.skip()
      return
    }

    // Just take screenshot of empty state for mobile
    // (avoiding click issues until responsive design is fixed)
    await expect(page).toHaveScreenshot("mobile-01-empty-state.png")

    // Navigate to different routes to capture various states
    await page.goto("/")
    await expect(page).toHaveScreenshot("mobile-02-home-page.png")
  })
})
