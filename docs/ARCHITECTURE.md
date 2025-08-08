# Architecture Guide

## Core Stack

- **React 18** + TypeScript for components
- **Vite** for fast builds and development
- **MobX** for reactive state management
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for consistent design system

## Project Structure

```
src/
├── components/           # Shared UI components
│   ├── ui/               # shadcn/ui components
│   ├── custom-ui/        # Custom reusable components
│   └── layout/           # Layout components
├── features/             # Business features (domain-driven)
│   └── [feature]/
│       ├── index.ts      # Feature registry
│       ├── Component.tsx # Main component
│       ├── components/   # Feature-specific components
│       ├── store.ts      # Feature store
│       ├── routes.ts     # Route configuration
│       ├── schemas.ts    # Zod validation
│       └── i18n/         # Translations
├── stores/               # Global stores
├── services/             # API and external services  
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and shared logic
├── types/                # Global TypeScript types
└── providers/            # React context providers
```

## Architecture Principles

### 1. Feature-Based Organization
Features are self-contained business domains with everything needed:
- Components, stores, routes, types, translations
- Minimal dependencies between features
- Clear boundaries and interfaces

### 2. Dependency Inversion
- Higher-level modules don't depend on lower-level modules
- Services use interfaces for external dependencies
- Components receive data through props and hooks
- Stores are injected through providers

### 3. Single Responsibility
- Components handle UI rendering and interaction
- Stores manage business logic and state
- Services handle external communication
- Hooks encapsulate reusable logic

### 4. Composition Over Inheritance
- Complex components built from simple components
- Feature composition through registries
- Provider composition for app setup

## Feature Registry Pattern

Every feature follows a standardized pattern for consistency:

```typescript
// src/features/todo/index.ts
import type { FeatureRegistry } from '@/types/feature'

export const todoFeature: FeatureRegistry = {
  component: TodoList,        # Main UI component
  routes: todoRoutes,         # Route configuration
  Store: TodoStore           # MobX store class
}
```

### Feature Structure
```
features/todo/
├── index.ts              # Feature registry (entry point)
├── TodoList.tsx          # Main component
├── components/           # Internal components
│   ├── TodoItem.tsx
│   ├── TodoForm.tsx
│   └── TodoStats.tsx
├── store.ts             # TodoStore class
├── routes.ts            # Route definitions
├── schemas.ts           # Zod validation schemas
└── i18n/                # Feature translations
    ├── en.ts
    └── pt.ts
```

### Benefits
- **Consistent structure** across all features
- **Easy integration** into root application
- **Type safety** with TypeScript generics
- **Clear boundaries** between features

## State Management with MobX

### Store Composition
```typescript
// stores/RootStore.ts
export class RootStore {
  todoStore = new TodoStore()
  userStore = new UserStore()
  
  constructor() {
    makeAutoObservable(this)
  }
}
```

### Observable State & Actions
```typescript
class TodoStore {
  todos: Todo[] = []
  filter: 'all' | 'active' | 'completed' = 'all'
  
  constructor() {
    makeAutoObservable(this)
  }
  
  // Actions
  addTodo(text: string) {
    this.todos.push({
      id: nanoid(),
      text,
      completed: false,
      createdAt: new Date()
    })
  }
  
  // Computed values
  get filteredTodos() {
    switch (this.filter) {
      case 'active': return this.todos.filter(t => !t.completed)
      case 'completed': return this.todos.filter(t => t.completed)
      default: return this.todos
    }
  }
}
```

### Component Integration
```typescript
export const TodoList = observer(() => {
  const { todoStore } = useStores()
  
  return (
    <div>
      {todoStore.filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
})
```

## Schema-First Development

Define validation schemas first, derive types:

```typescript
// schemas.ts
import { z } from "zod"

export const TodoSchema = z.object({
  id: z.string().min(1, "validation.required"),
  text: z.string().min(1, "validation.required"),
  completed: z.boolean(),
  createdAt: z.date()
})

// Types derived from schemas (single source of truth)
export type Todo = z.infer<typeof TodoSchema>
```

### Benefits
- **Single source of truth** for data structure
- **Runtime validation** at all boundaries
- **Consistent validation** across forms, API, storage
- **i18n support** with validation keys

## Data Flow Architecture

```
User Action → Component → Hook/Store → Service → External API
     ↓
UI Update ← Observer ← State Change ← Response ← API Response
```

1. **User interaction** triggers component event
2. **Component** calls hook or store method
3. **Store** updates state, may call service
4. **Service** communicates with external APIs
5. **MobX** notifies observers of state changes
6. **Components** automatically re-render

## Component Architecture

### Component Hierarchy
```typescript
// Layout Components
<LayoutWrapper>
  <SidebarLayout>
    <FeatureComponent />
  </SidebarLayout>
</LayoutWrapper>

// Feature Components
<TodoList>
  <TodoStats />
  <TodoForm />
  <TodoItem />
</TodoList>
```

### Custom UI Components
Built on top of shadcn/ui with additional functionality:
- **FormBuilder**: Dynamic forms with Zod validation
- **Layout System**: Responsive sidebar and fullscreen layouts
- **Animation**: Framer Motion integration
- **Accessibility**: ARIA compliance and keyboard navigation

### Component Patterns
```typescript
// Props interface
interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

// Component with proper typing
export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className={todo.completed ? 'line-through' : ''}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  )
}
```

## Routing System

### Route Configuration
```typescript
// features/todo/routes.ts
export const todoRoutes = {
  path: "/todos",
  component: lazy(() => import('./TodoList')),
  layout: "sidebar",
  meta: {
    title: "Todo List",
    requiresAuth: false
  }
}
```

### Route Processing
Routes are automatically collected and processed:
```typescript
// lib/routeProcessor.ts
export function processFeatureRoutes() {
  const routes = []
  // Automatically discover and register feature routes
  return routes
}
```

## Error Handling

### Error Boundaries
```typescript
<ErrorBoundary fallback={<ErrorFallback />}>
  <App />
</ErrorBoundary>
```

### Service Layer Errors
```typescript
export async function fetchTodos(): Promise<Todo[]> {
  try {
    const response = await api.get('/todos')
    return response.data
  } catch (error) {
    // Transform to application-specific error
    throw new ApplicationError('Failed to fetch todos', error)
  }
}
```

### Form Validation
```typescript
const form = useForm({
  schema: TodoSchema,
  onSubmit: async (values) => {
    try {
      await todoStore.addTodo(values.text)
    } catch (error) {
      form.setError('text', error.message)
    }
  }
})
```

## Performance Optimizations

### Code Splitting
```typescript
// Feature lazy loading
const TodoFeature = lazy(() => import('./features/todo'))

// Route-based splitting
const routes = [
  {
    path: '/todos',
    component: lazy(() => import('./features/todo'))
  }
]
```

### MobX Reactivity
- **Fine-grained updates**: Only affected components re-render
- **Computed caching**: Expensive calculations cached until dependencies change
- **Action batching**: Multiple state changes batched in single update

### Bundle Optimization
- **Tree shaking**: Unused code automatically removed
- **Asset optimization**: Images and fonts compressed
- **Chunk splitting**: Vendor code separated from application code

## Internationalization (i18n)

### Feature-Level Translations
```typescript
// features/todo/i18n/en.ts
export const todoTranslations = {
  addTodo: "Add Todo",
  completedTasks: "Completed: {{count}}",
  validation: {
    required: "This field is required",
    minLength: "Must be at least {{min}} characters"
  }
}
```

### Global Translations
```typescript
// i18n/locales/en.ts
export const globalTranslations = {
  common: {
    save: "Save",
    cancel: "Cancel",
    loading: "Loading..."
  }
}
```

## Testing Architecture

### Component Testing
```typescript
// Unit test with mock store
const mockTodoStore = {
  todos: [],
  addTodo: vi.fn(),
  filteredTodos: []
}

test('TodoList renders empty state', () => {
  render(<TodoList />, {
    wrapper: ({ children }) => (
      <StoreProvider value={{ todoStore: mockTodoStore }}>
        {children}
      </StoreProvider>
    )
  })
})
```

### Integration Testing
```typescript
// Test with real stores
test('complete todo workflow', () => {
  render(<TodoFeature />, { wrapper: AppProviders })
  
  // Test full user interaction
  fireEvent.click(screen.getByText('Add'))
  expect(screen.getByText('New todo')).toBeInTheDocument()
})
```

## Security Considerations

### Input Validation
- **Schema validation** on all data boundaries
- **XSS prevention** through proper escaping
- **Type safety** prevents injection vulnerabilities

### API Security
- **Environment variables** for sensitive configuration
- **Error handling** without exposing internal details
- **Request validation** with Zod schemas

## Development Workflow

### Hot Module Replacement
- **Fast refresh** for React components
- **State preservation** during development
- **Error recovery** without page reload

### Type Safety
- **Strict TypeScript** configuration
- **Schema-derived types** ensure consistency
- **Compile-time validation** prevents runtime errors

This architecture provides a scalable foundation that grows from simple features to complex applications while maintaining consistency and developer productivity.