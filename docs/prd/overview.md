# PRD: Think Teach Group Consulting Portal MVP

**Version**: 1.1
**Component**: Full-stack
**Status**: In Development
**Last Updated**: 2026-03-27
**Related**: [@docs/architecture/overview.md](../architecture/overview.md), [@docs/data/models.md](../data/models.md)

---

## 1. Overview

### What & Why

The Think Teach Group Consulting Portal is a unified, membership-style platform housing all consulting services across Think Teach Academy (TTA), MapleBear Collaboration Programmes, and Macro Academy. It serves as both a service delivery and resource marketplace, enabling parents to access programme content, track student progress, and purchase low-cost digital consulting materials.

The education consulting market lacks centralized platforms combining service delivery, resource access, and parent engagement. Parents and students currently interact through fragmented touchpoints across multiple Think Teach Group entities.

### Scope

- **In scope (MVP)**:
  - Phase 1: TTA Consulting Portal (auth, content dashboard, landing page, admin provisioning)
  - Phase 2: MapleBear Parent Experience (video library, consultant feedback, upload interface)
  - Phase 3: DSA Resource Portal (free content hub, paid resource purchase flow)
- **Out of scope**:
  - Macro Base Camp / University Consulting portals
  - Automated payment integration (manual grants in MVP)
  - Multi-tier resource packages
  - Individual student consulting portals with personalized dashboards
  - Progress tracking with milestones/metrics
  - Subscription tiers / full membership platform

### Living Document

This PRD is a living document that will evolve during development:
- Update as requirements are refined
- Document learnings from implementation
- Track scope changes with justification
- Version with dates when major changes occur

### Non-Functional Requirements

- **Performance**: Screen transitions <2s, API responses <500ms
- **Security**: PII encrypted in transit (HTTPS) and at rest. Clerk JWT validation on all protected routes
- **Accessibility**: WCAG 2.1 AA minimum
- **Scalability**: Support 1,000+ concurrent users, horizontal scaling capability
- **Platform**: Responsive web application optimized for mobile and desktop browsers

---

## 2. User Stories

### Phase 1: TTA Consulting Portal

**US-1.1: First-Time Visitor & Paywall**
**As a** parent visiting the portal
**I want** to see the portal's value proposition and available resources
**So that** I understand what's offered before purchasing access

**US-1.2: Post-Purchase Account Provisioning**
**As a** TTA admin
**I want** to provision portal access after a purchase is confirmed in TTA Shop
**So that** only paying customers can access premium content

**US-1.3: First Login After Purchase**
**As a** newly provisioned client
**I want** to log in using the credentials I received by email
**So that** I can access the DSA content I purchased

**US-1.4: Returning User Login**
**As a** returning client
**I want** to sign in quickly and be taken directly to my content
**So that** I can pick up where I left off without friction

### Phase 2: MapleBear Parent Experience

**US-2.1: Parent Account Creation**
**As a** MapleBear parent
**I want** to create a secure account with my email and password
**So that** I can access my child's programme portal securely

**US-2.2: Parent Login**
**As a** returning MapleBear parent
**I want** to log in quickly using my credentials
**So that** I can access my child's recordings and progress without hassle

**US-2.3: View Child's Video Library**
**As a** MapleBear parent
**I want** to see all my child's public speaking recordings organized by date
**So that** I can track their improvement over time

**US-2.4: View Consultant Feedback**
**As a** MapleBear parent
**I want** to read qualitative feedback from my child's teacher for each session
**So that** I understand what they're working on and how they're progressing

**US-2.5: Upload Student Recording**
**As a** consultant/teacher
**I want** to upload video recordings for individual students quickly
**So that** parents can access their child's class recordings without delay

**US-2.6: Add and Edit Feedback**
**As a** consultant/teacher
**I want** to add qualitative feedback to each student recording
**So that** parents understand their child's progress and areas for improvement

### Phase 3: DSA Resource Portal

**US-3.1: Browse Free DSA Content**
**As a** parent researching DSA
**I want** to access informational videos and articles without creating an account
**So that** I can learn about the process before investing in paid resources

**US-3.2: Purchase Resource Access**
**As a** parent interested in DSA resources
**I want** to purchase access to the paid resource library through TTA Shop
**So that** I can access premium interview preparation materials

**US-3.3: Access Paid Resources**
**As a** parent who purchased resource access
**I want** to log in and access my purchased materials
**So that** I can begin preparing my child for DSA interviews

---

## 3. Acceptance Criteria (Gherkin)

### Scenario: Returning User Login (US-1.4)
```gherkin
Given a provisioned user with valid credentials
When they enter their email and password on the Auth Page
Then Clerk authenticates the user
And FastAPI validates the session token
And the user is redirected to the Content Dashboard
```

### Scenario: Failed Login
```gherkin
Given a user with incorrect credentials
When they attempt to log in
Then a clear error message is displayed ("Incorrect email or password")
And the user remains on the Auth Page
And a "Forgot Password" link is available triggering Clerk's reset flow
```

### Scenario: First Login Password Change (US-1.3)
```gherkin
Given a newly provisioned client logging in for the first time
When they authenticate successfully
Then they are prompted to change their password
And after changing, they are redirected to the Content Dashboard
And their session persists for 7 days unless they log out
```

### Scenario: Admin Provisions Access (US-1.2)
```gherkin
Given a purchase is confirmed in TTA Shop
When the admin receives the purchase notification
Then the admin creates the user account via Clerk admin panel
And the new user receives an email with login credentials and portal link
And the user cannot access content until provisioning is complete
```

### Scenario: Parent Views Video Library (US-2.3)
```gherkin
Given a logged-in MapleBear parent
When they navigate to their child's video library
Then they see recordings organized by date
And each entry shows: date recorded, session title/topic, video duration
And videos play directly in-browser without download
And they can only see videos for their own child
```

### Scenario: Consultant Uploads Recording (US-2.5)
```gherkin
Given a logged-in consultant on the student management dashboard
When they select a student and upload a video file
And they fill in required fields (session date, session title/topic)
Then a success confirmation is shown
And the video is immediately available in the parent's library
```

### Scenario: Browse Free DSA Content (US-3.1)
```gherkin
Given a visitor on the public DSA homepage
When they browse the free content library
Then they see DSA overview videos, webinar clips, and general DSA information
And content is organized by topic (pathways, interview prep, timelines)
And a clear CTA "Access Premium DSA Resources" is visible
And no login is required
```

---

## 4. Functional Requirements

### Core Behavior

**Authentication**: Clerk handles all auth (sign-up, sign-in, password reset, session management). No self-serve sign-up for TTA consulting portal — accounts are admin-provisioned only. MapleBear parents can self-register.

**Content Access**: Strictly scoped — users only see content their account is provisioned for. Videos play in-browser. Resources remain accessible indefinitely (one-time purchase, lifetime access).

**Payment**: All payments processed through existing TTA Shop infrastructure. Portal does not handle payment directly.

### States & Transitions

| State | Description | Transitions To |
|-------|-------------|----------------|
| Visitor | Unauthenticated user browsing public pages | Registered (MapleBear self-serve) or Provisioned (admin) |
| Registered | MapleBear parent with unverified email | Active (after email verification) |
| Provisioned | TTA client account created by admin | Active (after first login + password change) |
| Active | Authenticated user with valid session | Logged Out, Suspended |
| Logged Out | Session expired or user logged out | Active (re-login) |

### Business Rules

1. TTA consulting accounts are admin-provisioned only — no self-serve registration
2. MapleBear parent accounts support self-registration with email verification
3. Sessions persist for 7 days unless user explicitly logs out
4. Password requirements: minimum 8 characters, at least one number and one letter
5. Email verification required before account activation
6. Parents can only access videos for their own child (strict access control)
7. Consultant feedback is read-only for parents, editable by consultants
8. Feedback text field supports up to 500 characters
9. Admin grants access within 24 hours of purchase during business days
10. Paid resources have lifetime access (one-time purchase)

### Permissions

| Role | Capabilities |
|------|-------------|
| **Visitor** | Browse public pages, view free DSA content |
| **MapleBear Parent** | View own child's video library and feedback |
| **TTA Client** | Access purchased DSA content and resources |
| **Consultant/Teacher** | Upload videos, add/edit feedback for assigned students |
| **Admin** | Provision accounts, manage users, manage all content |

---

## 5. Technical Specification

### Architecture Pattern

Decoupled frontend (React SPA) + backend API (FastAPI) with Supabase for database/storage and Clerk for authentication.

**Rationale**: Separation of frontend/backend allows independent scaling and deployment. FastAPI provides fast Python API development with automatic OpenAPI docs. Clerk offloads auth complexity. Supabase provides managed PostgreSQL + storage.

### Technology Stack

**Frontend:**
- React 19.1 + TypeScript 5.7
- Vite 6.x (SWC bundler via @vitejs/plugin-react-swc)
- TanStack Router 1.114+ (file-based routing via @tanstack/router-plugin)
- TanStack Query 5.75+ (server state, stale-while-revalidate)
- shadcn/ui (new-york) + Tailwind CSS 4.1
- ESLint 9 (flat config) with typescript-eslint, react-hooks, react-refresh plugins

**Backend:**
- FastAPI (Python >=3.10)
- Supabase (PostgreSQL database + file storage)
- Clerk JWT validation on all protected endpoints

**Auth:** Clerk (sign-up, sign-in, user management, JWT)

**Deployment:**
- Docker images pushed to GitHub Container Registry (GHCR)
- GitHub Actions CI/CD (lint, type-check via Pyright/tsc, tests, image build)

### API Endpoints (Phase 1 — TTA Consulting)

#### `POST /api/auth/validate`
**Purpose**: Validate Clerk JWT and return user profile

**Request**: Clerk JWT in Authorization header

**Response** (200 OK):
```json
{
  "user_id": "uuid",
  "email": "string",
  "role": "CLIENT | CONSULTANT | ADMIN",
  "first_name": "string",
  "provisioned_content": ["content-id-1", "content-id-2"]
}
```

**Errors**:
- `401`: Invalid or expired token
- `403`: Account not provisioned

#### `GET /api/content`
**Purpose**: List content available to authenticated user

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "type": "video | article | download",
      "topic": "dsa-pathways | interview-prep | timelines",
      "completion_status": "not_started | in_progress | completed",
      "thumbnail_url": "string",
      "duration_seconds": 120
    }
  ]
}
```

#### `GET /api/students/{student_id}/videos`
**Purpose**: Get video library for a specific student (MapleBear)

#### `POST /api/students/{student_id}/videos`
**Purpose**: Upload a video recording for a student (consultant only)

#### `PUT /api/videos/{video_id}/feedback`
**Purpose**: Add or update feedback on a video (consultant only)

### Data Models

```typescript
interface User {
  id: string;                    // UUID (Clerk user ID)
  email: string;
  firstName: string;
  lastName: string;
  role: 'PARENT' | 'CLIENT' | 'CONSULTANT' | 'ADMIN';
  status: 'PENDING_VERIFICATION' | 'ACTIVE' | 'SUSPENDED';
  createdAt: string;             // ISO8601
  updatedAt: string;
}

interface Student {
  id: string;                    // UUID
  firstName: string;
  lastName: string;
  programme: 'MAPLEBEAR_SC' | 'MAPLEBEAR_YE';
  parentId: string;              // FK to User
  consultantId: string;          // FK to User
  createdAt: string;
}

interface Video {
  id: string;                    // UUID
  studentId: string;             // FK to Student
  title: string;
  sessionDate: string;           // ISO8601
  fileUrl: string;               // Supabase Storage URL
  durationSeconds: number;
  feedback: string | null;       // Max 500 chars, editable by consultant
  uploadedById: string;          // FK to User (consultant)
  createdAt: string;
}

interface Content {
  id: string;                    // UUID
  title: string;
  type: 'video' | 'article' | 'download';
  topic: 'dsa-pathways' | 'interview-prep' | 'timelines';
  fileUrl: string;
  thumbnailUrl: string | null;
  durationSeconds: number | null;
  isPublic: boolean;             // Free vs paid
  createdAt: string;
}

interface UserContentAccess {
  userId: string;                // FK to User
  contentId: string;             // FK to Content
  grantedAt: string;
  grantedById: string;           // FK to User (admin)
}
```

---

## 6. Integration Points

### Dependencies

- **Internal**: TTA Shop (payment processing, purchase confirmation)
- **External**: Clerk (authentication, user management), Supabase (database, file storage)
- **Libraries**:
  - Frontend: React 19.1, TanStack Router 1.114+, TanStack Query 5.75+, shadcn/ui, Tailwind CSS 4.1, ESLint 9
  - Backend: FastAPI, Supabase Python client, PyJWT (Clerk validation)

### Events/Webhooks

| Event | Trigger | Payload | Consumers |
|-------|---------|---------|-----------|
| Purchase confirmed | TTA Shop payment success | Order details, customer email | Admin notification |
| Account provisioned | Admin creates Clerk user | User ID, email, role | Welcome email with credentials |
| Video uploaded | Consultant uploads recording | Video ID, student ID | Parent notification (future) |

---

## 7. UX Specifications

### Key Pages

**1. Landing & Promotional Home Page** (public)
- Publicly accessible, no login required
- Primary CTA with clear links to services
- Displays all visible products clearly
- Fully responsive on desktop and mobile

**2. Auth Page** (single entry point)
- Email + password fields
- "Sign In" primary CTA
- "Forgot Password" secondary link
- No self-serve sign-up option (admin-only account creation for TTA)
- TTA/consulting portal branding
- Responsive across desktop and mobile

**3. Content Dashboard** (authenticated)
- Personalized greeting ("Welcome back, [First Name]")
- Organized library: videos, modules, downloadable materials
- Content grouped by topic (DSA Pathways, Interview Prep, Timelines & Deadlines)
- Each item shows: title, type (video/article/download), completion status
- Videos play in-browser
- Navigation: Dashboard, Resources, Account Settings, Logout
- Access scoped to provisioned content only

**4. MapleBear Parent Dashboard** (authenticated)
- Child's name and programme displayed
- Video library with all recordings
- Each entry: date, session title/topic, duration
- In-browser video playback
- Consultant feedback below each video (or "Feedback pending")

**5. Consultant Dashboard** (authenticated)
- Student management view showing all assigned students
- Upload interface with student dropdown
- Required fields: session date, session title/topic
- Feedback text field (500 char limit) — add during upload or edit later

### Key UI States

1. **Loading**: Skeleton loaders matching content layout
2. **Empty**: "No content available yet" with helpful context
3. **Error**: User-friendly message + retry action
4. **Success**: Confirmation toast for uploads and actions

### Responsive Behavior
- **Desktop**: Full sidebar navigation, multi-column content grid
- **Mobile**: Bottom navigation, single-column stack, touch-optimized video player

---

## 8. Implementation Guidance

### Recommended Approach

1. ~~**Scaffold frontend + backend**: Vite React app + FastAPI project with Docker setup~~ **Done** — Frontend scaffold complete (Vite, TanStack Router, TanStack Query, Tailwind CSS, shadcn/ui, Clerk provider, typed API client, mock data layer, ESLint)
2. **Integrate Clerk**: Auth pages, JWT middleware for FastAPI
3. **Set up Supabase**: Database schema, storage buckets for videos/files
4. **Build Phase 1** (TTA Consulting): ~~Landing page~~, auth, content dashboard, admin provisioning — Landing page complete with navbar, hero, stats, programmes, CTA, footer
5. **Build Phase 2** (MapleBear): Parent dashboard, video library, consultant upload
6. **Build Phase 3** (DSA Resources): Public content hub, purchase flow integration

### Security Considerations

- All protected FastAPI routes validate Clerk JWT before processing
- Supabase Row Level Security (RLS) policies enforce data access boundaries
- Video URLs use signed/expiring links from Supabase Storage
- PII encrypted at rest in Supabase (database-level encryption)
- CORS configured to allow only portal domain origins
- Rate limiting on auth endpoints

### Performance Optimization

- TanStack Query stale-while-revalidate minimizes unnecessary network calls
- Video streaming via Supabase Storage (not full download before playback)
- Lazy-load content items below the fold
- Image/thumbnail optimization via CDN

### Observability

- **Logs**: Auth events, content access, video uploads, admin actions
- **Metrics**: API response times, error rates, active sessions, content views
- **Alerts**: Auth failures >5% rate, API p95 >500ms, upload failures

---

## 9. Testing Strategy

### Unit Tests
- [ ] Clerk JWT validation middleware
- [ ] Content access permission logic
- [ ] User role/permission checks
- [ ] Video metadata validation
- [ ] Feedback character limit enforcement

### Integration Tests
- [ ] Auth flow: Clerk JWT -> FastAPI validation -> user profile response
- [ ] Content API: List content scoped to user's provisioned access
- [ ] Video upload: Consultant uploads -> parent can view
- [ ] Feedback CRUD: Consultant adds/edits, parent sees read-only

### E2E Tests (when requested)
- [ ] Full login flow -> content dashboard -> video playback
- [ ] Consultant upload -> parent views recording + feedback
- [ ] Public DSA content browsing -> purchase CTA flow

### Manual Verification
- [ ] **AC: Auth Page**: Login, failed login, forgot password all work
- [ ] **AC: Content Dashboard**: Shows only provisioned content
- [ ] **AC: Video Library**: Parent sees only own child's videos
- [ ] **AC: Upload**: Consultant uploads and feedback appears for parent
- [ ] **AC: Public Page**: Free DSA content accessible without login

---

## 10. Risks & Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Manual provisioning doesn't scale | M | H | Design admin panel for efficiency; automate in Phase 2 |
| Video storage costs grow quickly | H | M | Monitor Supabase storage usage; set file size limits; compress on upload |
| Clerk pricing at scale | M | L | Evaluate usage tiers; Clerk free tier supports 10K MAU |
| TTA Shop integration fragile (manual) | M | M | Document clear admin workflow; build webhook receiver for future automation |
| Parent confusion between MapleBear and TTA portals | M | M | Clear branding and navigation separation; distinct URLs or routes |

---

## 11. References

### Technology Documentation
- React 19.1: Component patterns, hooks
- TanStack Router: File-based routing configuration
- TanStack Query: Stale-while-revalidate, query invalidation
- FastAPI: Dependency injection, middleware, OpenAPI generation
- Clerk: JWT validation, user management, webhooks
- Supabase: PostgreSQL, Storage, Row Level Security
- shadcn/ui: Component library (new-york theme)
- Tailwind CSS 4.2: Utility-first styling

### Business Context
- Think Teach Academy (TTA): DSA consulting services
- MapleBear Collaboration Programmes: Student Care, Young Explorers
- Macro Academy: Base Camp, University Consulting (future phases)

---

## Quality Checklist

- [x] Self-contained with full context
- [x] INVEST user stories
- [x] Complete Gherkin ACs (happy + edge + errors)
- [x] API contracts with schemas
- [x] Error handling defined
- [x] Data models documented
- [x] Security addressed
- [x] Performance specified
- [x] Testing strategy outlined
- [x] Out-of-scope listed
- [x] References populated
- [x] Quantifiable requirements (no vague terms)

---

## Appendix: Target Audience Personas

### MapleBear Parent ("Maria")
- **Demographics**: 35-45, Singapore, children aged 4-8 in MapleBear Student Care / Young Explorers
- **Needs**: Transparency in enrichment classes, evidence of progress, convenient digital access to recordings
- **Goals**: Track child's public speaking development, feel confident about programme value

### DSA-Curious Parent ("David")
- **Demographics**: 38-48, child in Primary 4-5, researching secondary school options
- **Needs**: Structured expert information at accessible price, clarity on DSA process
- **Goals**: Understand DSA pathways without expensive commitment, assess child's competitiveness

### Consultant ("Catherine")
- **Demographics**: Experienced education consultant/teacher, manages multiple students
- **Needs**: Centralized upload system, reduce admin burden, enhance perceived service value
- **Goals**: Streamline administrative work, provide transparent progress tracking

---

## Change Log

### 2026-03-27 v1.1
- Status: In Development
- Changes:
  - Updated Technology Stack to reflect actual installed package versions (Vite 6.x, TypeScript 5.7, TanStack Router 1.114+, TanStack Query 5.75+, Tailwind CSS 4.1)
  - Added ESLint 9 (flat config with typescript-eslint, react-hooks, react-refresh) to tech stack
  - Updated Implementation Guidance to track Phase 1 frontend progress: scaffold complete, landing page complete
  - Updated Integration Points library versions to match installed dependencies
