import { expect, type Locator, type Page } from "@playwright/test"

/**
 * Custom helper functions for E2E tests
 */
export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Wait for element to be visible with standard timeout
   */
  async expectVisible(locator: Locator, timeout = 3000) {
    await expect(locator).toBeVisible({ timeout })
  }

  /**
   * Wait for element to not be visible
   */
  async expectNotVisible(locator: Locator, timeout = 3000) {
    await expect(locator).not.toBeVisible({ timeout })
  }

  /**
   * Add a todo item with proper waiting
   */
  async addTodo(text: string) {
    const input = this.page.getByPlaceholder("What needs to be done?")
    const addButton = this.page.getByRole("button", { name: "Add" })

    await input.fill(text)
    await this.page.waitForTimeout(200)
    await addButton.click()
    await this.expectVisible(this.page.getByText(text))
  }

  /**
   * Toggle todo completion
   */
  async toggleTodo(index = 0) {
    const checkbox = this.page.getByRole("checkbox").nth(index)
    await this.expectVisible(checkbox)
    await checkbox.click()
    await this.page.waitForTimeout(200)
  }

  /**
   * Delete a todo
   */
  async deleteTodo(index = 0) {
    const deleteButton = this.page
      .getByRole("button", { name: "Delete" })
      .nth(index)
    await this.expectVisible(deleteButton)
    await deleteButton.click()
    await this.page.waitForTimeout(200)
  }
}
