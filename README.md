# TTG Consulting Portal

A unified platform for Think Teach Group's consulting services across TTA, MapleBear, and Macro Academy. Parents access programme content, track student progress, and purchase digital consulting resources.

## Features

- **TTA Consulting Portal** — Admin-provisioned access to paid DSA preparation resources
- **MapleBear Parent Experience** — Video library with student recordings and consultant feedback
- **DSA Resource Portal** — Free content hub with paid resource marketplace

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19.1, TypeScript 5.9, Vite 7.3, TanStack Router, TanStack Query, shadcn/ui, Tailwind CSS 4.2 |
| Backend | FastAPI (Python ≥3.10) |
| Database | Supabase (PostgreSQL) |
| Storage | Supabase Storage |
| Auth | Clerk (JWT) |
| CI/CD | GitHub Actions, Docker, GHCR |

## Getting Started

### Prerequisites

- Node.js 20+
- Python 3.10+
- Docker (optional)

### Frontend

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload   # http://localhost:8000
```

### Full Stack (Docker)

```bash
docker compose up
```

## Environment Variables

Copy `.env.example` files and fill in values:

**Frontend** (`.env.local`):
- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_API_URL`

**Backend** (`.env`):
- `CLERK_SECRET_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `DATABASE_URL`

## Documentation

- [Product Requirements](docs/prd/overview.md)
- [Architecture](docs/architecture/overview.md)
- [API Documentation](docs/api/overview.md)
- [Data Models](docs/data/models.md)
- [Testing Strategy](docs/testing/strategy.md)
- [Deployment](docs/deployment/environments.md)

## License

Private — Think Teach Group
