# Architecture Overview

## TTG Consulting Portal - System Architecture

**Last Updated**: 2026-03-22
**Status**: Draft

---

## System Architecture

### High-Level Architecture

```
+----------------------------------+
|        Browser (Client)          |
|   React 19.1 + TypeScript 5.9   |
|   Vite 7.3 / TanStack Router    |
+----------------+-----------------+
                 | HTTPS
                 v
+----------------------------------+
|          Clerk (Auth)            |
|   JWT tokens, user management   |
+----------------+-----------------+
                 | JWT
                 v
+----------------------------------+
|      FastAPI (Backend API)       |
|   Python >=3.10                  |
|   JWT validation, business logic |
+-----------+----------+-----------+
            |          |
            v          v
+---------------+  +----------------+
|  Supabase DB  |  | Supabase       |
|  PostgreSQL   |  | Storage        |
|  + RLS        |  | (videos/files) |
+---------------+  +----------------+
```

**Pattern**: Decoupled SPA + REST API

---

## Frontend Architecture

**Framework**: React 19.1 + TypeScript 5.9, bundled with Vite 7.3 (SWC)

**Key Technologies:**
- TanStack Router 1.157+ — file-based routing
- TanStack Query 5.90+ — server state (stale-while-revalidate)
- shadcn/ui (new-york) — component library
- Tailwind CSS 4.2 — utility-first styling
- Clerk React SDK — authentication UI components

**Directory Structure:**
```
frontend/src/
  routes/              # File-based TanStack Router pages
  components/
    ui/                # shadcn/ui components
    layout/            # Layout components (sidebar, nav)
    features/          # Feature-specific components
  hooks/               # Custom hooks (useVideos, useContent, etc.)
  lib/                 # API client, query keys, utilities
  types/               # TypeScript type definitions
```

**Key Patterns:**
- All API data fetching through TanStack Query hooks
- Clerk's `<SignIn/>`, `<UserButton/>` components for auth UI
- Route guards via TanStack Router's `beforeLoad` for protected routes
- shadcn/ui components customized via Tailwind, not CSS overrides

---

## Backend Architecture

**Framework**: FastAPI (Python >=3.10)

**Directory Structure:**
```
backend/app/
  api/
    routes/            # Route handlers (auth, content, videos, students)
    deps.py            # Dependency injection (auth, db session)
  core/
    config.py          # Settings and environment variables
    security.py        # Clerk JWT validation
  models/              # Database models / Supabase table definitions
  schemas/             # Pydantic request/response schemas
  services/            # Business logic layer
  main.py              # FastAPI app entry point
```

**Key Patterns:**
- Clerk JWT validation as FastAPI dependency (`Depends(get_current_user)`)
- Pydantic schemas for all request/response validation
- Service layer separates business logic from route handlers
- Supabase client injected via dependency injection

---

## Database Architecture

**Database**: PostgreSQL via Supabase

**Core Tables:** `users`, `students`, `videos`, `content`, `user_content_access`

**See**: [@docs/data/models.md](../data/models.md) for full schema with SQL

**Row Level Security (RLS):** Enforced at database level — parents see only own children, consultants see assigned students, clients see provisioned content.

---

## Security Architecture

**Authentication**: Clerk (managed service)
- JWT-based, admin-provisioned (TTA) or self-registration (MapleBear)
- 7-day session persistence

**Authorization**: Role-based (PARENT, CLIENT, CONSULTANT, ADMIN)
- Enforced at API layer (FastAPI deps) + database layer (Supabase RLS)

**Data Protection:**
- HTTPS in transit, Supabase encryption at rest
- Signed/expiring URLs for video/file access
- CORS restricted to portal domain

---

## Integration Architecture

| Service | Purpose | Integration Method |
|---------|---------|-------------------|
| Clerk | Auth, user management | JWT, React SDK, webhooks |
| Supabase | Database, file storage | Python client, JS client |
| TTA Shop | Payment processing | Manual (MVP), webhook (future) |
| GHCR | Docker image registry | GitHub Actions push |

---

## Infrastructure

**CI/CD**: GitHub Actions — lint, type-check (tsc + Pyright), tests, Docker build + push to GHCR

**Hosting**: TBD (Docker-based — Railway, Fly.io, AWS ECS, or GCP Cloud Run)

**Monitoring**: TBD (Sentry recommended for error tracking)

---

## Pending ADRs

- ADR-001: Choose Clerk over self-hosted auth
- ADR-002: Choose Supabase over raw PostgreSQL + S3
- ADR-003: Choose FastAPI over Node.js/Express backend
- ADR-004: Choose TanStack Router over React Router

---

## Related Documentation

- [Data Models](../data/models.md)
- [API Overview](../api/overview.md)
- [Deployment Guide](../deployment/environments.md)
- [PRD Overview](../prd/overview.md)
