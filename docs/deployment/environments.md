# Deployment & Environments

## TTG Consulting Portal - Deployment Guide

**Last Updated**: 2026-03-28
**Status**: Draft

---

## Environments

### Development

**Purpose**: Local development

**URLs**:
- Frontend: `http://localhost:5173` (Vite dev server)
- Backend: `http://localhost:8000` (FastAPI with uvicorn)
- API docs: `http://localhost:8000/docs` (Swagger)

**Configuration**:
- Frontend: `.env.local` with Clerk publishable key + API URL
- Backend: `.env` with Clerk secret, Supabase credentials
- Hot reloading on both frontend and backend
- Debug logging enabled

**Database**: Supabase project (dev instance)

---

### Staging

**Purpose**: Pre-production testing and QA

**URL**: TBD

**Configuration**:
- Mirrors production environment
- Uses staging Supabase project
- Connected to staging Clerk instance

**Access**: Internal team and stakeholders

---

### Production

**Purpose**: Live production environment

**URL**: TBD

**Configuration**:
- Optimized build (Vite production build)
- Production Supabase project
- Production Clerk instance
- Error monitoring enabled

**Access**: Public users (portal clients and parents)

---

## Infrastructure

**Hosting**: TBD (Docker-based — Railway, Fly.io, AWS ECS, GCP Cloud Run)

**Components**:
- Frontend: Static SPA served via CDN or container
- Backend: FastAPI in Docker container
- Database: Supabase managed PostgreSQL
- File storage: Supabase Storage
- Auth: Clerk (managed service)

---

## Deployment Process

### CI/CD Pipeline (GitHub Actions)

**Triggers**:
- PR opened/updated -> Run lint, type-check, tests, Docker build
- Push to `main` -> Deploy to staging
- Tag release -> Deploy to production

**Pipeline Stages**:
1. **Lint** — ESLint (frontend) + Ruff (backend)
2. **Type Check** — tsc (frontend) + Pyright (backend)
3. **Test** — Vitest (frontend) + pytest (backend)
4. **Build** — Docker image build
5. **Push** — Push to GitHub Container Registry (GHCR)
6. **Deploy** — Deploy to target environment
7. **Smoke Test** — Verify `/api/v1/health` endpoint

---

## Build & Deploy Commands

### Frontend
```bash
cd frontend
npm run build              # Production build (dist/)
```

### Backend
```bash
cd backend
# No separate build step — runs directly via uvicorn
```

### Docker
```bash
docker compose build       # Build all images
docker compose up          # Run full stack locally
docker compose up -d       # Run detached
```

### Push to GHCR
```bash
# Handled by GitHub Actions, but manual:
docker build -t ghcr.io/[org]/ttg-portal-frontend:latest frontend/
docker build -t ghcr.io/[org]/ttg-portal-backend:latest backend/
docker push ghcr.io/[org]/ttg-portal-frontend:latest
docker push ghcr.io/[org]/ttg-portal-backend:latest
```

---

## Environment Variables

### Frontend (`.env.local`)
```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### Backend (`.env`)
```bash
SUPABASE_URL=https://[project].supabase.co
SUPABASE_SERVICE_KEY=eyJ...
CLERK_JWKS_URL=https://[clerk-instance].clerk.accounts.dev/.well-known/jwks.json
CLERK_ISSUER=https://[clerk-instance].clerk.accounts.dev
CLERK_AUDIENCE=                         # Optional in dev; required in staging/production
FRONTEND_URL=http://localhost:5173      # CORS origin
LOG_LEVEL=INFO
ENVIRONMENT=development                 # development | staging | production
```

**Security**:
- Never commit `.env` files to git
- Use hosting provider's secret management for staging/production
- Rotate secrets regularly
- `CLERK_AUDIENCE` **must** be set in staging/production to prevent cross-client token acceptance
- `SUPABASE_SERVICE_KEY` bypasses RLS — handle with care; endpoints must scope queries by user

---

## Database Migrations

**Strategy**: Supabase migrations

```bash
# Create new migration
supabase migration new [migration_name]

# Run migrations locally
supabase db reset

# Push to remote Supabase project
supabase db push
```

---

## Health Check

**Endpoint**: `GET /api/v1/health`

**Response** (`ApiResponse[HealthResponse]` envelope):
```json
{
  "data": {
    "status": "ok",
    "version": "0.1.0",
    "environment": "production"
  },
  "error": null
}
```

---

## Monitoring & Logging

**Error Tracking**: TBD (Sentry recommended)
**Logging**: Structured JSON logs from FastAPI
**Metrics**: API response times, error rates, active sessions

**Log Levels**:
- ERROR: Critical issues requiring attention
- WARNING: Potential problems
- INFO: General request/response logging
- DEBUG: Development only

---

## Rollback Strategy

1. Identify issue via monitoring/alerts
2. Revert to previous Docker image tag
3. Verify `/api/v1/health` and key flows
4. Investigate root cause
5. Fix, test, redeploy

---

## Deployment Checklist

- [ ] All tests passing (frontend + backend)
- [ ] Type checks passing (tsc + Pyright)
- [ ] Lint passing (ESLint + Ruff)
- [ ] Docker images build successfully
- [ ] Database migrations tested
- [ ] Environment variables configured
- [ ] Health check verified
- [ ] Rollback plan prepared

---

## Related Documentation

- [Runbooks](../runbooks/incidents.md)
- [Architecture Overview](../architecture/overview.md)
- [Testing Strategy](../testing/strategy.md)
