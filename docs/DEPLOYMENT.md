# Deployment Guide

## Production Build

### Build Process
```bash
pnpm build              # TypeScript compilation + Vite build
pnpm preview            # Test production build locally
pnpm build:analyze      # Build with bundle visualization
```

### Build Output
```
dist/
├── index.html                    # Entry point
├── assets/
│   ├── index-[hash].css         # Styles (gzipped: ~13kB)
│   ├── index-[hash].js          # Main bundle (gzipped: ~134kB) 
│   ├── [chunk]-[hash].js        # Code-split chunks
│   └── icons/                   # Optimized assets
└── vite.svg                     # Static assets
```

### Performance Targets
- **Main Bundle**: <400kB gzipped (currently ~134kB)
- **CSS Bundle**: <25kB gzipped (currently ~13kB)
- **First Load**: <2.5s LCP on 3G
- **Interactivity**: <200ms INP

## Docker Deployment

### Production Container
```bash
# Build optimized production image
pnpm docker:build

# Run production container
pnpm docker:prod

# Access at http://localhost:3000
```

### Container Features
- **Multi-stage build**: Node.js build → Nginx serving
- **Security**: Non-root user, security headers
- **Performance**: Gzip compression, static caching
- **Size**: ~50MB final image
- **Health checks**: `/health` endpoint

### Docker Compose Production
```bash
# Production profile
docker-compose -f docker/docker-compose.yml --profile production up

# Services:
# - app-prod: Nginx serving on port 3000
# - Health monitoring enabled
```

## GitHub Actions CI/CD

### Automated Pipeline
```yaml
# Triggers on push to main, pull requests
- Build & test
- Bundle size check
- E2E testing
- Visual regression testing
- Security scanning
```

### Manual Workflows

#### Snapshot Updates
1. **GitHub → Actions → "Update E2E Snapshots"**
2. Click **"Run workflow"**
3. Review generated PR
4. Merge if acceptable

#### Release Process
```bash
# Semantic versioning based on commits
pnpm release:dry-run    # Preview release
pnpm release           # Create release

# Automated changelog and version bumping
```

## Environment Configuration

### Environment Variables
```bash
# Production
NODE_ENV=production
VITE_API_URL=https://api.yourapp.com
VITE_ENABLE_PERFORMANCE_MONITORING=true

# Development
NODE_ENV=development  
VITE_API_URL=http://localhost:3001
VITE_DEBUG=true
```

### Build-Time Configuration
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-checkbox'],
          state: ['mobx', 'mobx-react-lite']
        }
      }
    }
  }
})
```

## Cloud Platform Deployment

### Vercel
```json
// vercel.json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "framework": "vite",
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

### Netlify
```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### AWS S3 + CloudFront
```bash
# Build and deploy
pnpm build
aws s3 sync dist/ s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### Docker Platforms
```bash
# Build for deployment
docker build -f docker/Dockerfile -t myapp:latest .

# Deploy to:
# - AWS ECS/Fargate
# - Google Cloud Run
# - Azure Container Instances  
# - DigitalOcean App Platform
# - Railway, Render, Fly.io
```

## Performance Monitoring

### Core Web Vitals Tracking
- **LCP** (Largest Contentful Paint): ≤2.5s
- **INP** (Interaction to Next Paint): ≤200ms
- **CLS** (Cumulative Layout Shift): ≤0.1
- **FCP** (First Contentful Paint)
- **TTFB** (Time to First Byte)

### Bundle Analysis
```bash
pnpm build:analyze     # Interactive bundle analyzer
pnpm size:check        # Bundle size limits
pnpm size:why          # Bundle composition analysis
```

### Production Monitoring
```typescript
// Enable performance monitoring
VITE_ENABLE_PERFORMANCE_MONITORING=true

// Send metrics to analytics
performanceMonitor.setAnalytics({
  sendToAnalytics: (metric) => {
    // Google Analytics, Sentry, etc.
    gtag('event', 'web_vitals', {
      event_label: metric.name,
      value: Math.round(metric.value)
    })
  }
})
```

## Security Configuration

### Nginx Security Headers
```nginx
# docker/nginx.conf
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy strict-origin-when-cross-origin;
add_header Content-Security-Policy "default-src 'self'";
```

### Build Security
```bash
# No secrets in build output
# Environment variables prefixed with VITE_ only
# Source maps disabled in production
```

## Content Delivery

### Static Asset Optimization
- **Images**: Compressed and optimized
- **Fonts**: Preloaded and cached
- **JavaScript**: Minified and gzipped
- **CSS**: Purged unused styles

### Caching Strategy
```nginx
# Static assets: 1 year cache
location /assets/ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

# HTML: No cache (for updates)
location / {
  try_files $uri $uri/ /index.html;
  add_header Cache-Control "no-cache";
}
```

## Rollback Strategy

### Version Management
```bash
# Semantic release creates git tags
git tag -l                    # List versions
git checkout v1.4.0           # Rollback to version

# Docker image tagging
docker build -t myapp:v1.5.0 .
docker tag myapp:v1.5.0 myapp:latest
```

### Zero-Downtime Deployment
```bash
# Blue-green deployment with Docker
docker-compose up -d app-new
# Test new version
docker-compose stop app-old
docker-compose rm app-old
```

## Monitoring & Alerting

### Health Checks
```bash
# Container health
curl http://localhost:3000/health

# Application metrics
curl http://localhost:3000/api/health
```

### Production Monitoring
- **Uptime monitoring**: UptimeRobot, Pingdom
- **Error tracking**: Sentry, Bugsnag
- **Performance**: Google Analytics, Web Vitals
- **Logs**: CloudWatch, DataDog, New Relic

### Alerting Setup
```typescript
// Error boundary reporting
componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  Sentry.captureException(error, {
    contexts: { errorInfo }
  })
}
```

## Database & Backend

### API Integration
```typescript
// Environment-specific API URLs
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// Retry logic and error handling
export const apiClient = {
  get: async (url: string) => {
    const response = await fetch(`${API_BASE_URL}${url}`)
    if (!response.ok) throw new ApplicationError('API Error', response)
    return response.json()
  }
}
```

### State Persistence
```typescript
// Automatic state persistence to localStorage
class TodoStore {
  static persistenceConfig = {
    key: 'todoStore',
    version: 1,
    migrate: (data: any, version: number) => data
  }
}
```

## Troubleshooting

### Build Issues
```bash
# Clear build cache
rm -rf dist node_modules .pnpm-store
pnpm install

# TypeScript issues
pnpm type:check

# Bundle size exceeded
pnpm build:analyze
pnpm size:why
```

### Performance Issues
```bash
# Analyze bundle
pnpm build:analyze

# Check Core Web Vitals
# - Use Chrome DevTools Lighthouse
# - Enable performance monitoring in prod

# Optimize images
# - Use next-gen formats (WebP, AVIF)
# - Implement lazy loading
```

### Docker Issues
```bash
# Clear Docker cache
docker system prune -a

# Rebuild from scratch
docker-compose build --no-cache

# Check container health
docker ps
docker logs <container_id>
```

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Bundle size within limits
- [ ] Security headers configured
- [ ] Environment variables set
- [ ] Performance monitoring enabled

### Post-Deployment
- [ ] Health checks passing
- [ ] Core Web Vitals meeting targets
- [ ] Error monitoring active
- [ ] Analytics tracking working
- [ ] Rollback plan tested

### Maintenance
- [ ] Regular security updates
- [ ] Performance monitoring review
- [ ] Bundle size monitoring
- [ ] Error rate monitoring
- [ ] User experience metrics

## Cost Optimization

### Bundle Size
- **Code splitting**: Lazy load features
- **Tree shaking**: Remove unused code
- **Dead code detection**: Use Knip regularly
- **Dependency analysis**: Avoid large libraries

### CDN Usage
- **Static assets**: Serve from CDN
- **Geographic distribution**: Reduce latency
- **Edge caching**: Cache at edge locations
- **Bandwidth optimization**: Compress assets

### Monitoring Costs
- **Resource usage**: Monitor container resources
- **Bandwidth**: Optimize asset delivery
- **API calls**: Cache frequently accessed data
- **Third-party services**: Monitor usage limits