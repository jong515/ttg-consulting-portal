# CLAUDE.md

## Project Overview

Think Teach Group Consulting Portal — a unified platform for consulting services across TTA, MapleBear, and Macro Academy. Parents access programme content, track student progress, and purchase digital consulting resources.

**Key characteristics:**
- Decoupled SPA frontend (React) + REST API backend (FastAPI)
- Clerk authentication with admin-provisioned accounts (TTA) and self-registration (MapleBear)
- Video library for student recordings with consultant feedback
- Paid DSA resource marketplace with manual provisioning via TTA Shop

## Technology Stack

**Frontend:**
- **Language**: TypeScript 5.9
- **Framework**: React 19.1 with Vite 7.3 (SWC)
- **Routing**: TanStack Router 1.157+ (file-based)
- **Server State**: TanStack Query 5.90+ (stale-while-revalidate)
- **UI**: shadcn/ui (new-york) + Tailwind CSS 4.2
- **Auth**: Clerk React SDK

**Backend:**
- **Language**: Python >=3.10
- **Framework**: FastAPI
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage (video files, documents)
- **Auth**: Clerk JWT validation on all protected routes

**Infrastructure:**
- **CI/CD**: GitHub Actions (lint, Pyright/tsc, tests, Docker build)
- **Registry**: GitHub Container Registry (GHCR)
- **Containerization**: Docker

## Architecture Overview

**Pattern**: Decoupled SPA + REST API

```
frontend/              # React SPA (Vite)
  src/
    routes/            # TanStack Router file-based routes
    components/        # shadcn/ui + custom components
    lib/               # Utilities, API client, query keys
    hooks/             # Custom React hooks
    stores/            # Client-side state (if needed)
    types/             # TypeScript type definitions
backend/               # FastAPI application
  app/
    api/               # Route handlers
    core/              # Config, security, dependencies
    models/            # SQLAlchemy/Supabase models
    schemas/           # Pydantic request/response schemas
    services/          # Business logic
```

**Key Patterns:**
- Frontend routes map to file-based TanStack Router convention
- All API calls go through TanStack Query hooks in `hooks/`
- Clerk JWT validated as FastAPI dependency injection middleware
- Supabase RLS policies enforce data access boundaries

## Development Commands

**Frontend:**
```bash
cd frontend && npm install         # Install dependencies
npm run dev                        # Dev server (localhost:5173)
npm run build                      # Production build
npm run lint                       # ESLint
npm run type-check                 # TypeScript compiler check
```

**Backend:**
```bash
cd backend && pip install -r requirements.txt  # Install deps
uvicorn app.main:app --reload                  # Dev server (localhost:8000)
pytest                                          # Run all tests
pytest tests/unit/                              # Unit tests only
pytest tests/integration/                       # Integration tests only
mypy app/                                       # Type check (or pyright)
```

**Docker:**
```bash
docker compose up                  # Run full stack
docker compose build               # Build images
```

## Code Conventions

**Frontend (TypeScript/React):**
- ES modules, absolute imports with `@/` alias
- Components: PascalCase files, named exports, Props interfaces
- Hooks: `use` prefix (e.g., `useVideos.ts`)
- Routes: file-based per TanStack Router convention

**Backend (Python/FastAPI):**
- snake_case for files, functions, variables
- Pydantic schemas for all request/response validation
- Dependency injection for auth, database sessions
- Type hints on all function signatures

**Import Order (Frontend):**
```typescript
import { useState } from 'react'           // 1. React/external
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'  // 2. Internal absolute
import { formatDate } from './utils'        // 3. Relative
import type { Video } from '@/types'        // 4. Types
```

## Testing Strategy

**Frontend**: Vitest + React Testing Library
**Backend**: pytest + httpx (FastAPI TestClient)

- 70% unit tests: validation, permissions, business logic, components
- 20% integration: API endpoints, auth flow, database queries
- 10% E2E: critical flows only when explicitly requested

**Coverage targets**: 80% business logic, 100% auth/permission checks

## API Integration

**Base URL**: `http://localhost:8000/api` (dev)
**Auth**: Clerk JWT in `Authorization: Bearer <token>` header
**Validation**: FastAPI validates Clerk JWT as dependency before route handler

**Key endpoints:**
- `POST /api/auth/validate` — validate JWT, return user profile
- `GET /api/content` — list content scoped to user's access
- `GET /api/students/{id}/videos` — student video library
- `POST /api/students/{id}/videos` — upload recording (consultant)
- `PUT /api/videos/{id}/feedback` — add/edit feedback (consultant)

## Environment Variables

**Frontend** (`.env.local`):
- `VITE_CLERK_PUBLISHABLE_KEY` — Clerk frontend key
- `VITE_API_URL` — Backend API base URL

**Backend** (`.env`):
- `CLERK_SECRET_KEY` — Clerk backend secret
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_SERVICE_KEY` — Supabase service role key
- `DATABASE_URL` — PostgreSQL connection string (Supabase)

## External Documentation

- [@docs/prd/overview.md](docs/prd/overview.md) — Full product requirements (TTG Consulting Portal MVP)
- `@docs/prd/features/` — Individual feature specifications
- [@docs/architecture/overview.md](docs/architecture/overview.md) — System architecture
- [@docs/api/overview.md](docs/api/overview.md) — API documentation
- [@docs/data/models.md](docs/data/models.md) — Data models and schemas
- [@docs/testing/strategy.md](docs/testing/strategy.md) — Testing approach
- [@docs/deployment/environments.md](docs/deployment/environments.md) — Deployment guides

---

**Created**: 2026-03-22
**Status**: MVP Development
