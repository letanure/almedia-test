import { test, expect } from '@playwright/test'

test.describe('Kanban Board E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/kanban/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
    
    // Wait for initial load and animations
    await page.waitForSelector('[data-testid="kanban-board"]', { timeout: 10000 })
    await page.waitForTimeout(1000) // Allow animations to settle
  })

  test('should load with default three columns', async ({ page }) => {
    // Verify default columns exist
    await expect(page.locator('[data-testid="column-header"]')).toHaveCount(3)
    await expect(page.locator('text=To Do')).toBeVisible()
    await expect(page.locator('text=In Progress')).toBeVisible()
    await expect(page.locator('text=Done')).toBeVisible()
    
    // Take initial state snapshot
    await expect(page).toHaveScreenshot('01-initial-load.png', { fullPage: true })
  })

  test('should add a new task and view details', async ({ page }) => {
    // Add task to first column
    await page.locator('[data-testid="add-task-button"]').first().click()
    await page.waitForSelector('[data-testid="task-form"]')
    
    await page.fill('[name="title"]', 'Test Task Title')
    await page.fill('[name="description"]', 'This is a detailed description for testing')
    await page.selectOption('[name="importance"]', 'high')
    await page.selectOption('[name="urgency"]', 'low')
    await page.fill('[name="dueDate"]', '2024-12-31')
    
    await page.click('[type="submit"]')
    await page.waitForTimeout(500) // Animation settle
    
    // Verify task appears in column
    await expect(page.locator('text=Test Task Title')).toBeVisible()
    await expect(page.locator('.bg-blue-100')).toBeVisible() // Schedule badge (high importance, low urgency)
    
    // Take screenshot after adding task
    await expect(page).toHaveScreenshot('02-task-added.png', { fullPage: true })
    
    // Click task to view details
    await page.locator('text=Test Task Title').click()
    await page.waitForSelector('[data-testid="task-modal"]')
    
    // Verify modal content
    await expect(page.locator('h1:has-text("Test Task Title")')).toBeVisible()
    await expect(page.locator('text=This is a detailed description')).toBeVisible()
    await expect(page.locator('text=Schedule')).toBeVisible() // Priority badge
    
    // Take modal screenshot
    await expect(page).toHaveScreenshot('03-task-modal.png', { fullPage: true })
    
    // Close modal
    await page.keyboard.press('Escape')
    await page.waitForTimeout(300)
  })

  test('should edit task and update priority', async ({ page }) => {
    // First add a task
    await page.locator('[data-testid="add-task-button"]').first().click()
    await page.fill('[name="title"]', 'Editable Task')
    await page.selectOption('[name="importance"]', 'low')
    await page.selectOption('[name="urgency"]', 'low')
    await page.click('[type="submit"]')
    await page.waitForTimeout(500)
    
    // Open task modal
    await page.locator('text=Editable Task').click()
    await page.waitForSelector('[data-testid="task-modal"]')
    
    // Click edit button
    await page.locator('button:has-text("Edit")').click()
    await page.waitForSelector('[data-testid="task-form"]')
    
    // Update task details
    await page.fill('[name="title"]', 'Updated Task Title')
    await page.fill('[name="description"]', 'Updated description with more details')
    await page.selectOption('[name="importance"]', 'high')
    await page.selectOption('[name="urgency"]', 'high')
    
    await page.click('button:has-text("Save")')
    await page.waitForTimeout(500)
    
    // Verify updates
    await expect(page.locator('h1:has-text("Updated Task Title")')).toBeVisible()
    await expect(page.locator('text=Updated description with more details')).toBeVisible()
    await expect(page.locator('text=Do Now')).toBeVisible() // High importance + high urgency
    
    // Take screenshot after edit
    await expect(page).toHaveScreenshot('04-task-edited.png', { fullPage: true })
    
    await page.keyboard.press('Escape')
    await page.waitForTimeout(300)
  })

  test('should add comments to task', async ({ page }) => {
    // Add a task first
    await page.locator('[data-testid="add-task-button"]').first().click()
    await page.fill('[name="title"]', 'Task with Comments')
    await page.click('[type="submit"]')
    await page.waitForTimeout(500)
    
    // Open task modal
    await page.locator('text=Task with Comments').click()
    await page.waitForSelector('[data-testid="task-modal"]')
    
    // Add a comment
    await page.fill('[data-testid="comment-input"]', 'This is my first comment')
    await page.click('[data-testid="add-comment-button"]')
    await page.waitForTimeout(300)
    
    // Verify comment appears
    await expect(page.locator('text=This is my first comment')).toBeVisible()
    
    // Add another comment
    await page.fill('[data-testid="comment-input"]', 'This is a second comment for testing')
    await page.click('[data-testid="add-comment-button"]')
    await page.waitForTimeout(300)
    
    // Take screenshot with comments
    await expect(page).toHaveScreenshot('05-comments-added.png', { fullPage: true })
    
    await page.keyboard.press('Escape')
    await page.waitForTimeout(300)
    
    // Verify comment count badge on card
    await expect(page.locator('[data-testid="comment-count"]')).toContainText('2')
  })

  test('should drag and drop tasks between columns', async ({ page }) => {
    // Add tasks to different columns
    const taskTitles = ['Task 1', 'Task 2', 'Task 3']
    
    for (let i = 0; i < 3; i++) {
      await page.locator('[data-testid="add-task-button"]').nth(i).click()
      await page.fill('[name="title"]', taskTitles[i])
      await page.click('[type="submit"]')
      await page.waitForTimeout(300)
    }
    
    // Take screenshot with tasks in all columns
    await expect(page).toHaveScreenshot('06-tasks-in-columns.png', { fullPage: true })
    
    // Drag Task 1 from To Do to In Progress
    const task1 = page.locator('text=Task 1').first()
    const inProgressColumn = page.locator('[data-testid="droppable-column"]').nth(1)
    
    await task1.dragTo(inProgressColumn)
    await page.waitForTimeout(500) // Allow drag animation
    
    // Drag Task 3 from Done to To Do
    const task3 = page.locator('text=Task 3').first()
    const todoColumn = page.locator('[data-testid="droppable-column"]').first()
    
    await task3.dragTo(todoColumn)
    await page.waitForTimeout(500)
    
    // Take screenshot after drag operations
    await expect(page).toHaveScreenshot('07-after-drag-drop.png', { fullPage: true })
    
    // Verify tasks moved correctly
    const todoTasks = page.locator('[data-testid="droppable-column"]').first().locator('[data-testid="task-card"]')
    const inProgressTasks = page.locator('[data-testid="droppable-column"]').nth(1).locator('[data-testid="task-card"]')
    
    await expect(todoTasks).toContainText('Task 3')
    await expect(inProgressTasks).toContainText('Task 1')
  })

  test('should add and delete columns', async ({ page }) => {
    // Add a new column
    await page.locator('[data-testid="add-column-button"]').click()
    await page.waitForSelector('[data-testid="column-form"]')
    
    await page.fill('[name="name"]', 'Testing')
    await page.click('button:has-text("Add Column")')
    await page.waitForTimeout(500)
    
    // Verify new column exists
    await expect(page.locator('text=Testing')).toBeVisible()
    await expect(page.locator('[data-testid="column-header"]')).toHaveCount(4)
    
    // Take screenshot with new column
    await expect(page).toHaveScreenshot('08-column-added.png', { fullPage: true })
    
    // Add a task to the new column
    await page.locator('[data-testid="add-task-button"]').last().click()
    await page.fill('[name="title"]', 'Task in New Column')
    await page.click('[type="submit"]')
    await page.waitForTimeout(300)
    
    // Rename the column
    await page.locator('[data-testid="column-menu-button"]').last().click()
    await page.locator('text=Rename').click()
    await page.waitForSelector('[data-testid="column-form"]')
    
    await page.fill('[name="name"]', 'Review')
    await page.click('button:has-text("Save")')
    await page.waitForTimeout(300)
    
    await expect(page.locator('text=Review')).toBeVisible()
    
    // Take screenshot after rename
    await expect(page).toHaveScreenshot('09-column-renamed.png', { fullPage: true })
    
    // Delete the column (should also delete the task)
    await page.locator('[data-testid="column-menu-button"]').last().click()
    await page.locator('text=Delete').click()
    
    // Confirm deletion in modal
    await page.click('button:has-text("Delete")')
    await page.waitForTimeout(500)
    
    // Verify column and task are gone
    await expect(page.locator('text=Review')).not.toBeVisible()
    await expect(page.locator('text=Task in New Column')).not.toBeVisible()
    await expect(page.locator('[data-testid="column-header"]')).toHaveCount(3)
    
    // Take final screenshot
    await expect(page).toHaveScreenshot('10-column-deleted.png', { fullPage: true })
  })

  test('should test keyboard shortcuts', async ({ page }) => {
    // Add some tasks first
    await page.locator('[data-testid="add-task-button"]').first().click()
    await page.fill('[name="title"]', 'Keyboard Task 1')
    await page.click('[type="submit"]')
    await page.waitForTimeout(300)
    
    await page.locator('[data-testid="add-task-button"]').first().click()
    await page.fill('[name="title"]', 'Keyboard Task 2')
    await page.click('[type="submit"]')
    await page.waitForTimeout(300)
    
    // Test Tab navigation
    await page.keyboard.press('Tab')
    await page.waitForTimeout(200)
    
    // Test Enter to open task
    await page.keyboard.press('Enter')
    await page.waitForSelector('[data-testid="task-modal"]')
    await expect(page.locator('[data-testid="task-modal"]')).toBeVisible()
    
    await page.keyboard.press('Escape')
    await page.waitForTimeout(300)
    
    // Test help shortcut
    await page.keyboard.press('Shift+?')
    await page.waitForSelector('[data-testid="help-modal"]')
    
    // Take screenshot of help modal
    await expect(page).toHaveScreenshot('11-help-modal.png', { fullPage: true })
    
    await page.keyboard.press('Escape')
    await page.waitForTimeout(300)
  })

  test('should persist data across page reloads', async ({ page }) => {
    // Add task with specific data
    await page.locator('[data-testid="add-task-button"]').first().click()
    await page.fill('[name="title"]', 'Persistent Task')
    await page.fill('[name="description"]', 'This task should persist')
    await page.selectOption('[name="importance"]', 'high')
    await page.selectOption('[name="urgency"]', 'high')
    await page.click('[type="submit"]')
    await page.waitForTimeout(500)
    
    // Add a comment
    await page.locator('text=Persistent Task').click()
    await page.waitForSelector('[data-testid="task-modal"]')
    await page.fill('[data-testid="comment-input"]', 'Persistent comment')
    await page.click('[data-testid="add-comment-button"]')
    await page.waitForTimeout(300)
    await page.keyboard.press('Escape')
    
    // Reload the page
    await page.reload()
    await page.waitForSelector('[data-testid="kanban-board"]', { timeout: 10000 })
    await page.waitForTimeout(1000)
    
    // Verify data persisted
    await expect(page.locator('text=Persistent Task')).toBeVisible()
    await expect(page.locator('[data-testid="comment-count"]')).toContainText('1')
    
    // Open task and verify all details
    await page.locator('text=Persistent Task').click()
    await page.waitForSelector('[data-testid="task-modal"]')
    
    await expect(page.locator('h1:has-text("Persistent Task")')).toBeVisible()
    await expect(page.locator('text=This task should persist')).toBeVisible()
    await expect(page.locator('text=Do Now')).toBeVisible()
    await expect(page.locator('text=Persistent comment')).toBeVisible()
    
    // Take final persistence screenshot
    await expect(page).toHaveScreenshot('12-data-persisted.png', { fullPage: true })
  })
})