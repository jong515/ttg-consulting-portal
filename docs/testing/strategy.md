# Testing Strategy

## TTG Consulting Portal - Testing Approach

**Last Updated**: 2026-03-28
**Status**: Draft

---

## Overview

**Philosophy**: Test-Driven Development (TDD) — write tests before implementation.

**Frontend Testing**: Vitest + React Testing Library
**Backend Testing**: pytest + pytest-asyncio + httpx (AsyncClient via ASGITransport)

---

## Testing Pyramid

```
         /\
        /  \  10% E2E (Playwright, critical flows only)
       /    \
      /------\  20% Integration (API endpoints, DB queries)
     /        \
    /----------\  70% Unit (business logic, components, utils)
```

---

## Unit Tests (70%)

### Frontend (Vitest + React Testing Library)

**What to test:**
- Component rendering and interactions
- Custom hooks (useVideos, useContent, etc.)
- Utility functions and data transformations
- Form validation logic
- Permission/role checks

**File Location**: Co-located — `Button.tsx` -> `Button.test.tsx`

**Naming**:
```typescript
describe('VideoLibrary', () => {
  it('should display videos sorted by date', () => { })
  it('should show "Feedback pending" when no feedback exists', () => { })
})
```

### Backend (pytest)

**What to test:**
- Pydantic schema validation
- Service layer business logic
- Permission/role checking functions
- JWT validation logic
- Data transformation utilities
- Negative paths (404 for unknown routes, 405 for wrong HTTP methods)

**File Location**: `backend/tests/` (flat structure for now; split into `unit/` and `integration/` as the suite grows)

**Naming**:
```python
class TestContentAccessService:
    def test_user_can_access_provisioned_content(self): ...
    def test_user_cannot_access_unprovisioned_content(self): ...
    def test_feedback_exceeding_500_chars_rejected(self): ...
```

**Negative path pattern** — every router should include tests for:
- Unknown route under the prefix returns 404
- Wrong HTTP method on a known route returns 405

---

## Integration Tests (20%)

### Frontend

- TanStack Query hooks with mocked API responses (MSW)
- Route navigation and guards
- Clerk auth integration with mock provider

### Backend (pytest + httpx)

**What to test:**
- API endpoint request/response flows
- Auth dependency (valid JWT, invalid JWT, missing JWT, missing `sub` claim)
- JWKS fetch failures (timeout, malformed response)
- Database operations via Supabase client
- Content access scoping (parent sees only own child's data)
- Video upload flow

**File Location**: `backend/tests/` (integration tests will move to `backend/tests/integration/` as suite grows)

**Example**:
```python
async def test_parent_can_only_see_own_childs_videos(client, parent_token, other_parent_token):
    # Parent A's child's videos visible to Parent A
    response = await client.get("/api/students/child-a/videos", headers=auth(parent_token))
    assert response.status_code == 200

    # Parent B cannot see Parent A's child's videos
    response = await client.get("/api/students/child-a/videos", headers=auth(other_parent_token))
    assert response.status_code == 403
```

---

## E2E Tests (10%)

**Framework**: Playwright (when explicitly requested)

**Critical flows to test:**
- Login -> content dashboard -> video playback (TTA client)
- Login -> video library -> view feedback (MapleBear parent)
- Consultant upload -> parent sees new video + feedback
- Public DSA content browsing (no login)

**File Location**: `tests/e2e/`

**Run only when explicitly requested** — E2E tests are slow and expensive.

---

## Coverage Targets

| Area | Target |
|------|--------|
| Overall | 80% minimum |
| Auth/permissions | 100% |
| Business logic (services/) | 90% |
| API endpoints | 85% |
| UI components | 70% |

---

## Mocking Strategy

**Frontend:**
- MSW (Mock Service Worker) for API mocking
- Clerk test provider for auth state
- TanStack Query test wrapper

**Backend:**
- Supabase client mocked for unit tests
- Real Supabase instance for integration tests (test project)
- Clerk JWT mocked via test fixtures
- Environment variables set via `conftest.py` (`os.environ.setdefault`) before app import
- `ENVIRONMENT` set to `"testing"` in test configuration; health tests assert this value

---

## Test Commands

### Frontend
```bash
cd frontend
npm test                          # Run all tests (Vitest)
npm run test:watch                # Watch mode
npm test -- path/to/test.test.tsx # Specific file
npm run test:coverage             # Coverage report
```

### Backend
```bash
cd backend
pytest                            # Run all tests
pytest tests/unit/                # Unit tests only
pytest tests/integration/         # Integration tests only
pytest tests/unit/test_content.py # Specific file
pytest -k "test_name_pattern"     # Pattern match
pytest --cov=app                  # Coverage report
```

### E2E (when requested)
```bash
npx playwright test               # Run all E2E tests
npx playwright test --headed      # With browser visible
npx playwright test auth.spec.ts  # Specific test
```

---

## TDD Workflow

1. **Clarify requirements** — read acceptance criteria from PRD
2. **Write failing test(s)** — define expected behavior
3. **Write minimal code** — just enough to pass
4. **Run tests** — verify green
5. **Refactor** — improve while keeping tests green
6. **Repeat** — add edge cases

---

## CI/CD Integration

GitHub Actions pipeline runs on every PR:
1. Frontend: `npm run lint` -> `npm run type-check` -> `npm test`
2. Backend: `ruff check` -> `pyright` -> `pytest`
3. Docker image build (verify it builds)
4. Block merge if any step fails

**Performance targets:**
- Unit tests: <30 seconds
- Integration tests: <2 minutes
- E2E tests: <10 minutes

---

## Related Documentation

- [Contributing Guidelines](../getting-started/contributing.md)
- [Development Workflow](../getting-started/development.md)
- [PRD Overview](../prd/overview.md)
