# API Mocking with MSW

This directory contains Mock Service Worker (MSW) configuration for testing and development.

## Files

- **`handlers.ts`** - Mock API responses for external and internal APIs
- **`browser.ts`** - MSW setup for browser/development mode  
- **`node.ts`** - MSW setup for Node.js/testing

## Usage

### Development Mode
Enable mocking by setting environment variable:
```bash
VITE_ENABLE_API_MOCKS=true npm run dev
```

### Testing
MSW is automatically enabled for all tests via `src/test/setup.ts`.

## Adding New Mocks

Add new handlers to `handlers.ts`:

```typescript
http.get('/api/your-endpoint', () => {
  return HttpResponse.json({ data: 'mock response' })
})
```

## Benefits

- ✅ Test API integration without external dependencies
- ✅ Develop with predictable data
- ✅ Same API format in mocks and real services
- ✅ No changes needed in application code