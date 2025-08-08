# Testing Guide

## Testing Strategy Overview

```
        E2E Tests
      ┌─────────────┐
     │   Playwright  │  ← User workflows, visual regression
    └─────────────────┘
    
    Integration Tests
   ┌───────────────────┐
  │   React Testing   │  ← Feature workflows, component integration  
  │     Library       │
 └─────────────────────┘
 
 Unit Tests
┌─────────────────────────┐
│        Vitest          │  ← Components, hooks, stores, utilities
│   Jest Environment     │
└─────────────────────────┘
```

## Unit Testing

### Framework: Vitest
Fast unit testing with Jest compatibility and native TypeScript support.

### Test Scripts
```bash
pnpm test             # Watch mode for development
pnpm test:unit        # Single run
pnpm test:coverage    # With coverage report
pnpm test:unit:ui     # Interactive UI mode
```

### Component Testing
```typescript
// TodoItem.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { TodoItem } from './TodoItem'

test('toggles completion when checkbox clicked', () => {
  const mockToggle = vi.fn()
  const todo = { id: '1', text: 'Test todo', completed: false }
  
  render(<TodoItem todo={todo} onToggle={mockToggle} />)
  
  fireEvent.click(screen.getByRole('checkbox'))
  expect(mockToggle).toHaveBeenCalledWith('1')
})

test('shows completed state correctly', () => {
  const todo = { id: '1', text: 'Test todo', completed: true }
  
  render(<TodoItem todo={todo} onToggle={vi.fn()} />)
  
  expect(screen.getByRole('checkbox')).toBeChecked()
  expect(screen.getByText('Test todo')).toHaveClass('line-through')
})
```

### Store Testing
```typescript
// TodoStore.test.ts
import { TodoStore } from './TodoStore'

describe('TodoStore', () => {
  let store: TodoStore
  
  beforeEach(() => {
    store = new TodoStore()
  })
  
  test('adds new todo with correct properties', () => {
    store.addTodo('New task')
    
    expect(store.todos).toHaveLength(1)
    expect(store.todos[0]).toMatchObject({
      text: 'New task',
      completed: false,
      id: expect.any(String)
    })
  })
  
  test('computes filtered todos correctly', () => {
    store.addTodo('Task 1')
    store.addTodo('Task 2')
    store.toggleTodo(store.todos[0].id)
    
    store.filter = 'completed'
    expect(store.filteredTodos).toHaveLength(1)
    expect(store.filteredTodos[0].completed).toBe(true)
  })
})
```

### Hook Testing
```typescript
// useCharacter.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { useCharacter } from './useCharacter'

vi.mock('@/services/rickMortyService', () => ({
  getCharacter: vi.fn()
}))

test('fetches character data successfully', async () => {
  const mockCharacter = { id: 1, name: 'Rick', status: 'Alive' }
  vi.mocked(getCharacter).mockResolvedValue({
    error: false,
    data: mockCharacter
  })
  
  const { result } = renderHook(() => useCharacter(1))
  
  expect(result.current.loading).toBe(true)
  
  await waitFor(() => {
    expect(result.current.character).toEqual(mockCharacter)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })
})

test('handles API errors correctly', async () => {
  vi.mocked(getCharacter).mockResolvedValue({
    error: true,
    message: 'Character not found'
  })
  
  const { result } = renderHook(() => useCharacter(999))
  
  await waitFor(() => {
    expect(result.current.error).toBe('Character not found')
    expect(result.current.character).toBeNull()
    expect(result.current.loading).toBe(false)
  })
})
```

## Integration Testing

### Framework: React Testing Library
Testing components as users interact with them.

### Feature Integration Tests
```typescript
// TodoFeature.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { StoreProvider } from '@/providers/StoreProvider'
import { TodoList } from './TodoList'

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <StoreProvider>
    {children}
  </StoreProvider>
)

test('complete todo workflow', async () => {
  render(<TodoList />, { wrapper: TestWrapper })
  
  // Initially shows empty state
  expect(screen.getByText('No todos yet')).toBeInTheDocument()
  
  // Add new todo
  const input = screen.getByPlaceholderText('Add new todo')
  const addButton = screen.getByText('Add')
  
  fireEvent.change(input, { target: { value: 'Test task' } })
  fireEvent.click(addButton)
  
  // Verify todo appears
  expect(screen.getByText('Test task')).toBeInTheDocument()
  expect(screen.queryByText('No todos yet')).not.toBeInTheDocument()
  
  // Mark as completed
  const checkbox = screen.getByRole('checkbox')
  fireEvent.click(checkbox)
  
  // Verify completion state
  await waitFor(() => {
    expect(screen.getByText('1 completed')).toBeInTheDocument()
  })
  
  // Filter by completed
  fireEvent.click(screen.getByText('Completed'))
  expect(screen.getByText('Test task')).toBeInTheDocument()
  
  // Delete todo
  fireEvent.click(screen.getByLabelText('Delete todo'))
  expect(screen.queryByText('Test task')).not.toBeInTheDocument()
})
```

### Form Testing
```typescript
test('form validation works correctly', async () => {
  render(<TodoForm />, { wrapper: TestWrapper })
  
  const input = screen.getByPlaceholderText('Add new todo')
  const submitButton = screen.getByText('Add')
  
  // Try submitting empty form
  fireEvent.click(submitButton)
  
  await waitFor(() => {
    expect(screen.getByText('Todo text is required')).toBeInTheDocument()
  })
  
  // Submit with valid input
  fireEvent.change(input, { target: { value: 'Valid todo' } })
  fireEvent.click(submitButton)
  
  await waitFor(() => {
    expect(screen.queryByText('Todo text is required')).not.toBeInTheDocument()
    expect(input).toHaveValue('')
  })
})
```

## End-to-End Testing

### Framework: Playwright
Full browser automation for testing real user workflows.

### Test Scripts
```bash
pnpm test:e2e                    # Run E2E tests
pnpm test:e2e:ui                 # Run with Playwright UI
pnpm test:e2e:update:local       # Update local snapshots
pnpm test:e2e:update:ci          # Update CI snapshots (Docker)
```

### E2E Test Structure
```
tests/e2e/
├── helpers.ts           # Test utilities
├── todo-app.spec.ts     # Todo feature tests
└── .snapshots-ci/       # CI visual regression baselines
```

### User Workflow Testing
```typescript
// tests/e2e/todo-app.spec.ts
import { test, expect } from '@playwright/test'
import { addTodo, toggleTodo, expectTodoCount } from './helpers'

test('user can manage todo lifecycle', async ({ page }) => {
  await page.goto('/todos')
  
  // Add multiple todos
  await addTodo(page, 'Buy groceries')
  await addTodo(page, 'Walk the dog')
  await addTodo(page, 'Read a book')
  
  await expectTodoCount(page, 3)
  
  // Mark some as completed
  await toggleTodo(page, 0)
  await toggleTodo(page, 2)
  
  // Verify statistics
  await expect(page.locator('[data-testid="stats"]')).toContainText('2 completed, 1 active')
  
  // Filter by active todos
  await page.click('[data-testid="filter-active"]')
  await expectTodoCount(page, 1)
  await expect(page.locator('text=Walk the dog')).toBeVisible()
  
  // Clear completed todos
  await page.click('[data-testid="clear-completed"]')
  await page.click('[data-testid="filter-all"]')
  await expectTodoCount(page, 1)
})

test('todos persist across page refreshes', async ({ page }) => {
  await page.goto('/todos')
  
  // Add todo and mark as completed
  await addTodo(page, 'Persistent task')
  await toggleTodo(page, 0)
  
  // Refresh page
  await page.reload()
  
  // Verify todo and state persisted
  await expect(page.locator('text=Persistent task')).toBeVisible()
  await expect(page.locator('[data-testid="todo-checkbox"]')).toBeChecked()
  await expect(page.locator('[data-testid="stats"]')).toContainText('1 completed')
})
```

### Test Helpers
```typescript
// tests/e2e/helpers.ts
import { Page, expect } from '@playwright/test'

export async function addTodo(page: Page, text: string) {
  await page.fill('[data-testid="todo-input"]', text)
  await page.click('[data-testid="add-button"]')
  await page.waitForSelector(`text=${text}`)
}

export async function toggleTodo(page: Page, index: number = 0) {
  await page.click(`[data-testid="todo-checkbox"]:nth-of-type(${index + 1})`)
}

export async function expectTodoCount(page: Page, count: number) {
  const todos = page.locator('[data-testid="todo-item"]')
  await expect(todos).toHaveCount(count)
}

export async function clearLocalStorage(page: Page) {
  await page.evaluate(() => localStorage.clear())
}
```

## Visual Regression Testing

### Dual Snapshot Strategy
- **Local snapshots** (`.snapshots/`): Development use, git-ignored
- **CI snapshots** (`.snapshots-ci/`): Production use, git-committed

### Playwright Configuration
```typescript
// playwright.config.ts
export default defineConfig({
  reporter: [["html", { outputFolder: "./tests/playwright-report" }]],
  snapshotDir: process.env.CI 
    ? "./tests/e2e/.snapshots-ci" 
    : "./tests/e2e/.snapshots",
  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      threshold: 0.2
    }
  }
})
```

### Visual Tests
```typescript
test.describe('Visual Regression', () => {
  test('desktop screenshots', async ({ page }) => {
    await page.goto('/todos')
    
    // Empty state
    await expect(page).toHaveScreenshot('desktop-01-empty-state.png')
    
    // With todos
    await addTodo(page, 'Sample todo for visual test')
    await expect(page).toHaveScreenshot('desktop-02-with-one-item.png')
    
    // Completed state
    await toggleTodo(page, 0)
    await expect(page).toHaveScreenshot('desktop-03-item-completed.png')
    
    // With statistics
    await addTodo(page, 'Second todo')
    await addTodo(page, 'Third todo')
    await toggleTodo(page, 1)
    await expect(page).toHaveScreenshot('desktop-04-with-statistics.png')
  })
  
  test('responsive design', async ({ page }) => {
    await page.goto('/todos')
    await addTodo(page, 'Mobile test todo')
    
    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page).toHaveScreenshot('mobile-01-responsive.png')
  })
})
```

### Snapshot Management

#### Manual Update via GitHub Actions
1. Go to **GitHub → Actions → "Update E2E Snapshots"**
2. Click **"Run workflow"** button
3. Optionally provide reason for update
4. Review auto-generated PR with snapshot changes
5. Merge if changes are acceptable

#### Local Updates
```bash
# Update local snapshots (development)
pnpm test:e2e:update:local

# Update CI snapshots (uses Docker for consistency)  
pnpm test:e2e:update:ci
```

## Mock Service Worker (MSW)

### Setup
```typescript
// src/test/mocks/browser.ts
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
```

### API Mocking
```typescript
// src/test/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/characters/:id', ({ params }) => {
    const character = {
      id: Number(params.id),
      name: 'Rick Sanchez',
      status: 'Alive'
    }
    return HttpResponse.json(character)
  }),
  
  http.get('/api/characters', () => {
    return HttpResponse.json({
      results: [
        { id: 1, name: 'Rick', status: 'Alive' },
        { id: 2, name: 'Morty', status: 'Alive' }
      ]
    })
  })
]
```

### Using in Tests
```typescript
test('handles API error correctly', async () => {
  // Override handler for this test
  server.use(
    http.get('/api/characters/:id', () => {
      return new HttpResponse(null, { status: 404 })
    })
  )
  
  const { result } = renderHook(() => useCharacter(999))
  
  await waitFor(() => {
    expect(result.current.error).toBeTruthy()
  })
})
```

## Testing Best Practices

### Test Organization
- **Co-location**: Place tests near the code they test
- **Descriptive names**: Clear test descriptions
- **Single responsibility**: One behavior per test
- **AAA pattern**: Arrange, Act, Assert

### Mock Strategy
- **Mock external dependencies**: APIs, third-party services
- **Keep business logic real**: Don't mock your stores/components
- **Mock UI dependencies**: Window, localStorage, timers when needed

### Data Management
```typescript
// Test data builders
export const createMockTodo = (overrides = {}) => ({
  id: nanoid(),
  text: 'Default todo text',
  completed: false,
  createdAt: new Date(),
  ...overrides
})

// Usage
const todo = createMockTodo({ text: 'Specific test todo', completed: true })
```

### Performance
- **Parallel execution**: Tests run in parallel by default
- **Smart watching**: Only relevant files watched during development
- **Efficient mocks**: Lightweight mocks for external dependencies

### Debugging Tests
```bash
# Debug specific test
npx vitest run --reporter=verbose TodoStore.test.ts

# Debug E2E with browser UI
npx playwright test --debug

# Visual test debugging
npx playwright show-report
```

## CI Integration

### GitHub Actions Pipeline
Tests run automatically on:
- **Every push** to any branch
- **Pull requests** to main branch
- **Manual triggers** for snapshot updates

### Test Execution Order
1. **Unit tests** (fastest feedback)
2. **Integration tests** (feature validation)
3. **Build verification** (production readiness)
4. **E2E tests** (full user workflows)
5. **Visual regression** (UI consistency)

### Failure Handling
- **Test failures** block merge to main
- **Visual differences** require manual approval
- **Artifacts uploaded** for debugging (reports, screenshots, videos)

### Performance Monitoring
- Test execution time tracked
- Flaky test detection
- Coverage reporting to Codecov

## Maintenance

### Regular Tasks
- **Review flaky tests**: Fix or remove unreliable tests
- **Update snapshots**: Keep visual baselines current
- **Cleanup test data**: Remove obsolete test files
- **Monitor coverage**: Ensure critical paths are tested

### Snapshot Management
- **Local development**: Use local snapshots for rapid iteration
- **CI validation**: Use CI snapshots for consistency
- **Update workflow**: Use GitHub Actions for CI snapshot updates
- **Review changes**: Always verify snapshot changes make sense