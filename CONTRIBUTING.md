# Contributing Guide

## Prerequisites

- **Node.js**: >=22
- **npm**: >=10
- **pnpm**: Recommended package manager

## Quick Start

```bash
# Clone and setup
git clone <repository-url>
cd react-mobx-starter
pnpm install

# Start development
pnpm dev              # Development server at http://localhost:5173
pnpm storybook        # Component development at http://localhost:6006
```

## Scripts Reference

### Development
```bash
pnpm dev              # Start dev server with HMR
pnpm build            # Production build
pnpm build:analyze    # Build with bundle analysis
pnpm preview          # Preview production build
```

### Code Quality
```bash
pnpm check:all        # Run all checks (types, lint, format, tests)
pnpm type:check       # TypeScript validation
pnpm lint             # Check linting issues
pnpm lint:fix         # Fix linting issues
pnpm format           # Apply code formatting
pnpm format:check     # Check code formatting
```

### Testing
```bash
pnpm test             # Unit tests (watch mode)
pnpm test:unit        # Unit tests (single run)
pnpm test:coverage    # Unit tests with coverage
pnpm test:e2e         # End-to-end tests
pnpm test:e2e:ui      # E2E tests with Playwright UI
```

### Bundle Analysis
```bash
pnpm size:check       # Check bundle size limits
pnpm size:why         # Analyze bundle composition
pnpm lint:dead-code   # Find unused code with Knip
```

### Docker Development
```bash
pnpm docker:dev       # Run in development container
pnpm docker:dev:down  # Stop development container
pnpm docker:build:dev # Build development image
```

## Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes
# Run checks before commit
pnpm check:all

# Commit (triggers pre-commit hooks)
git commit -m "feat: add new feature"

# Push (triggers pre-push validation)
git push origin feature/your-feature-name
```

### 2. Git Conventions
- **Branches**: `feature/`, `fix/`, `chore/`, `docs/`
- **Commits**: [Conventional Commits](https://conventionalcommits.org/)
  - `feat:` New features
  - `fix:` Bug fixes
  - `chore:` Maintenance
  - `docs:` Documentation
  - `test:` Testing

### 3. Pre-commit Hooks
Automated checks run before each commit:
- TypeScript compilation
- Code formatting (Biome)
- Linting (Biome)
- Unit tests

### 4. Pre-push Validation
Full validation runs before push:
- All checks (`pnpm check:all`)
- Bundle size verification
- Production build test

## Code Quality Standards

### TypeScript
- **Strict mode**: Enabled for maximum type safety
- **No any**: Use proper typing
- **Export types**: Export only when needed by external consumers

### Biome Configuration
- **Formatting**: 2-space indentation, semicolons, double quotes
- **Linting**: ESLint-compatible rules
- **Import sorting**: Automatic organization

### Bundle Size Limits
- **App Bundle**: <400kB gzipped
- **CSS Bundle**: <25kB gzipped

Monitor with `pnpm size:check`.

### Dead Code Detection
Use Knip to find unused code:
```bash
pnpm lint:dead-code     # Check for unused exports/dependencies
pnpm lint:dead-code:fix # Remove unused code automatically
```

## Feature Development Pattern

### Feature Registry Structure
Every feature must follow this pattern:

```typescript
// src/features/feature-name/index.ts
export const featureName: FeatureRegistry = {
  component: MainComponent,
  routes: featureRoutes, 
  Store
}
```

### Feature folder Files
```
src/features/feature-name/
├── index.ts            # Feature registry (required)
├── MainComponent.tsx   # Entry point component
├── components/         # Internal components
├── store.ts           # MobX store
├── routes.ts          # Route configuration
├── schemas.ts         # Zod validation schemas
└── i18n/              # Translations (optional)
```

### Schema-First Development
Define validation schemas first, then derive types:

```typescript
// schemas.ts
import { z } from "zod"

export const ItemSchema = z.object({
  id: z.string().min(1, "validation.required"),
  name: z.string().min(1, "validation.required"),
  email: z.string().email("validation.invalidEmail")
})

export type Item = z.infer<typeof ItemSchema>
```

## Component Standards

### File Naming
- **Components**: `PascalCase.tsx`
- **Hooks**: `useCamelCase.ts`
- **Utilities**: `camelCase.ts`
- **Types**: `camelCase.ts`

### Component Structure
```typescript
interface Props {
  // Props definition
}

export const ComponentName = ({ prop1, prop2 }: Props) => {
  // Component logic
  return (
    // JSX
  )
}
```

### Testing Requirements
- **Unit tests**: For utilities, hooks, stores
- **Component tests**: For UI components
- **Integration tests**: For feature workflows
- **E2E tests**: For critical user paths

## Storybook Development

### Component Stories
Create stories for reusable components:

```typescript
// Component.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Component } from './Component'

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // props
  }
}
```

## GitHub Actions Integration

### Manual Snapshot Updates
When E2E visual tests fail due to intentional UI changes:

1. Go to GitHub → Actions → "Update E2E Snapshots"
2. Click "Run workflow"
3. Review generated PR with snapshot changes
4. Merge if changes look correct

### CI Pipeline
All pushes trigger:
- TypeScript compilation
- Linting and formatting checks
- Unit tests
- E2E tests
- Bundle size verification
- Visual regression tests

## Performance Considerations

### Bundle Optimization
- **Code splitting**: Features are lazy-loaded
- **Tree shaking**: Enabled by Vite
- **Asset optimization**: Images and fonts compressed

### Development Performance
- **HMR**: Fast refresh during development
- **TypeScript**: Incremental compilation
- **Vite**: Fast build tool with native ESM

## Troubleshooting

### Common Issues

**TypeScript errors after dependency updates**
```bash
# Clear cache and reinstall
rm -rf node_modules .pnpm-store
pnpm install
```

**E2E tests failing with visual differences**
```bash
# Update snapshots locally
pnpm test:e2e:update:local

# Or use GitHub Actions for CI-consistent updates
```

**Bundle size exceeded**
```bash
# Analyze what's causing the increase
pnpm size:why
pnpm build:analyze
```

**Biome formatting/linting conflicts**
```bash
# Apply fixes automatically
pnpm lint:fix
pnpm format
```

## Local Development Tips

### VS Code Setup
Recommended extensions:
- Biome (formatting/linting)
- TypeScript
- Playwright Test for VS Code
- i18n Ally

### Environment Variables
Create `.env.local` for local overrides:
```bash
VITE_API_URL=http://localhost:3001
VITE_DEBUG=true
```

### Docker Development
Use containerized development for consistency:
```bash
# Start development environment
pnpm docker:dev

# Includes: Node.js, dependencies, hot reload
# Access: http://localhost:5173
```

## Release Process

### Semantic Release
Automated versioning based on commit messages:
- `fix:` → patch version
- `feat:` → minor version  
- `BREAKING CHANGE:` → major version

### Manual Release
```bash
pnpm release:dry-run  # Preview changes
pnpm release          # Create release
```

## Getting Help

- Check existing documentation in `docs/`
- Review Storybook for component usage
- Run `pnpm --help` for script details
- Open GitHub issue for bugs or feature requests