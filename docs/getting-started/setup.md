# Setup Guide

## Prerequisites

**Required:**
- Node.js 20+ and npm
- Python 3.10+
- Docker and Docker Compose
- Git 2.40+
- Supabase CLI (`npm install -g supabase`)

**Accounts needed:**
- [Clerk](https://clerk.com) account (authentication)
- [Supabase](https://supabase.com) project (database + storage)

**Recommended:**
- VS Code with Python + TypeScript extensions
- Claude Code CLI

---

## Installation

### 1. Clone the Repository

```bash
git clone [repository-url]
cd ttg-consulting-portal
```

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
```

Edit `.env.local`:
```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
VITE_API_URL=http://localhost:8000/api
```

### 3. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate          # Linux/Mac
# or: venv\Scripts\activate       # Windows
pip install -r requirements.txt
cp .env.example .env
```

Edit `.env`:
```bash
CLERK_SECRET_KEY=sk_test_your_key_here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=eyJ_your_key_here
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
CORS_ORIGINS=http://localhost:5173
```

### 4. Database Setup

```bash
# Link to your Supabase project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push

# (Optional) Seed development data
python scripts/seed.py
```

### 5. Start Development

**Option A: Run individually**
```bash
# Terminal 1 - Frontend
cd frontend && npm run dev

# Terminal 2 - Backend
cd backend && uvicorn app.main:app --reload
```

**Option B: Docker Compose**
```bash
docker compose up
```

### 6. Verify Installation

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/docs (Swagger UI)
- Health check: http://localhost:8000/api/health

---

## Troubleshooting

### Clerk JWT validation failing
- Verify `CLERK_SECRET_KEY` in backend `.env`
- Ensure Clerk publishable key matches the same Clerk application
- Check Clerk dashboard for correct allowed origins

### Supabase connection errors
- Verify `SUPABASE_URL` and `SUPABASE_SERVICE_KEY`
- Ensure your IP is allowed in Supabase project settings
- Run `supabase db push` to ensure migrations are applied

### CORS errors in browser
- Verify `CORS_ORIGINS` in backend `.env` includes `http://localhost:5173`
- Ensure frontend `VITE_API_URL` points to the correct backend URL

---

## Next Steps

- Read the [Development Guide](./development.md)
- Review [Contributing Guidelines](./contributing.md)
- Check the [Architecture Overview](../architecture/overview.md)
- Review the [PRD](../prd/overview.md) for feature requirements

---

**Last Updated**: 2026-03-22
