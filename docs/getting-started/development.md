# Development Workflow

This guide describes the development workflow for the TTG Consulting Portal.

## Daily Development

### Starting Development

```bash
# Pull latest changes
git pull origin main

# Install/update dependencies
# TBD

# Start development server
# TBD
```

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/STORY-123-description
   ```

2. **Write tests first** (TDD)
   - Unit tests for business logic
   - Integration tests for API endpoints
   - E2E tests only when explicitly required

3. **Implement the feature**
   - Follow code conventions in CLAUDE.md
   - Keep changes focused and atomic

4. **Run tests and quality checks**
   ```bash
   # TBD - test commands
   # TBD - lint commands
   # TBD - type check commands
   ```

5. **Commit changes**
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

## Testing

### Unit Tests

```bash
# Run all unit tests
# TBD

# Run specific test file
# TBD

# Run in watch mode
# TBD
```

### Integration Tests

```bash
# Run integration tests
# TBD
```

### E2E Tests

```bash
# Run E2E tests (only when required)
# TBD
```

## Code Quality

### Linting

```bash
# TBD
```

### Formatting

```bash
# TBD
```

### Type Checking

```bash
# TBD
```

## Git Workflow

### Branch Naming

Follow the convention: `<type>/<story-id>-<description>`

**Types:**
- `feature/` - New features
- `fix/` - Bug fixes
- `hotfix/` - Urgent production fixes
- `chore/` - Maintenance tasks
- `docs/` - Documentation updates
- `refactor/` - Code refactoring

**Examples:**
- `feature/STORY-123-user-authentication`
- `fix/STORY-456-login-error`

### Commit Messages

Follow conventional commits format:

```
<type>(scope): subject line

Body explaining what and why.

Related to STORY-123
```

**The commit-messages skill automatically enforces this format.**

### Pull Requests

1. Push your branch
2. Open PR via GitHub or use `/commit` command
3. Link to Linear story
4. Wait for CI checks and code review
5. Merge when approved

## Linear Integration

### Starting Work

```bash
# Use /get-issue command to gather context
/get-issue STORY-123
```

### Branch → Story Mapping

- Branches are for STORIES, not tasks
- Commits can complete TASKS (with "Fixes TASK-X")
- Commits can do general story work (with "Related to STORY-X")

## Common Commands

### Development

```bash
# TBD
```

### Database

```bash
# TBD
```

### Building

```bash
# TBD
```

---

**Last Updated**: 2026-03-22
