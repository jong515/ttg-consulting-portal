# API Documentation

## TTG Consulting Portal API

**Version**: 1.0
**Last Updated**: 2026-03-22
**Status**: Draft

---

## Overview

RESTful API built with FastAPI (Python >=3.10). All protected endpoints require a valid Clerk JWT.

**Base URL**:
- Development: `http://localhost:8000/api`
- Staging: TBD
- Production: TBD

**Auto-generated docs**: FastAPI provides OpenAPI docs at `/docs` (Swagger) and `/redoc`.

---

## Authentication

**Method**: Clerk JWT (Bearer token)

**Header**:
```
Authorization: Bearer <clerk-jwt>
```

**Flow**: Client authenticates via Clerk SDK -> receives JWT -> passes to FastAPI -> FastAPI validates JWT via Clerk's JWKS endpoint -> grants access.

**Session**: 7-day persistence unless user logs out.

---

## Common Response Format

### Success Response
```json
{
  "data": { },
  "meta": {
    "timestamp": "2026-03-22T10:00:00Z"
  }
}
```

### Error Response
```json
{
  "detail": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

---

## Status Codes

- `200 OK` — Successful GET, PUT, PATCH
- `201 Created` — Successful POST
- `204 No Content` — Successful DELETE
- `400 Bad Request` — Invalid request data
- `401 Unauthorized` — Missing or invalid JWT
- `403 Forbidden` — Insufficient role/permissions
- `404 Not Found` — Resource not found
- `422 Unprocessable Entity` — Pydantic validation error
- `429 Too Many Requests` — Rate limit exceeded
- `500 Internal Server Error` — Server error

---

## Core Endpoints

### Authentication

```
POST   /api/auth/validate          # Validate JWT, return user profile
```

**Response** (200):
```json
{
  "user_id": "uuid",
  "email": "user@example.com",
  "role": "CLIENT",
  "first_name": "David",
  "provisioned_content": ["content-id-1"]
}
```

### Content (DSA Resources)

```
GET    /api/content                # List content (scoped to user's access)
GET    /api/content/public         # List free/public content (no auth)
GET    /api/content/:id            # Get specific content item
```

**Query Parameters** (GET /api/content):
- `topic` — Filter: `dsa-pathways`, `interview-prep`, `timelines`
- `type` — Filter: `video`, `article`, `download`

**Response** (200):
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "DSA Interview Preparation Guide",
      "type": "video",
      "topic": "interview-prep",
      "completion_status": "not_started",
      "thumbnail_url": "https://...",
      "duration_seconds": 720
    }
  ]
}
```

### Students (MapleBear)

```
GET    /api/students               # List students (parent: own children, consultant: assigned)
GET    /api/students/:id           # Get student details
```

### Videos (MapleBear Recordings)

```
GET    /api/students/:id/videos    # List videos for a student
POST   /api/students/:id/videos    # Upload video (consultant only)
PUT    /api/videos/:id/feedback    # Add/edit feedback (consultant only)
```

**POST /api/students/:id/videos** — multipart form:
- `file` — Video file
- `title` — Session title (required)
- `session_date` — Date of session (required, ISO format)

**PUT /api/videos/:id/feedback**:
```json
{
  "feedback": "Great progress on eye contact today. Work on slowing down pace."
}
```
- Max 500 characters

### Users (Admin)

```
GET    /api/users                  # List users (admin only)
GET    /api/users/me               # Get current user profile
POST   /api/users/provision        # Provision content access (admin only)
```

**POST /api/users/provision**:
```json
{
  "user_id": "uuid",
  "content_ids": ["content-id-1", "content-id-2"]
}
```

### Health

```
GET    /api/health                 # Health check (no auth)
```

**Response**:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2026-03-22T10:00:00Z"
}
```

---

## Pagination

**Query Parameters** (list endpoints):
- `page` — Page number (default: 1)
- `limit` — Items per page (default: 20, max: 100)

**Response meta**:
```json
{
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "total_pages": 3
  }
}
```

---

## Rate Limiting

- Authenticated: 100 requests/minute
- Anonymous: 20 requests/minute

---

## Security

- HTTPS only in production
- CORS: portal domain only
- Clerk JWT validated on every protected request
- Supabase RLS as secondary access control layer
- Input validation via Pydantic schemas
- Signed/expiring URLs for file access

---

## API Contract First

When adding new endpoints:
1. Design Pydantic schemas (request/response)
2. Add endpoint to FastAPI router
3. FastAPI auto-generates OpenAPI spec at `/docs`
4. Write tests based on contract
5. Document in `endpoints/` directory

---

## Related Documentation

- [Architecture Overview](../architecture/overview.md)
- [Data Models](../data/models.md)
- [Testing Strategy](../testing/strategy.md)
- [PRD Overview](../prd/overview.md)
