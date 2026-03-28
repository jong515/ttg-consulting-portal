# TTG Consulting Portal — Backend

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -e ".[dev]"
   ```

3. Copy and fill in environment variables:
   ```bash
   cp .env.example .env
   ```

4. Run the dev server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

5. Verify:
   ```bash
   curl http://localhost:8000/api/v1/health
   ```

## Testing

```bash
pytest -v
```

## Linting & Type Checking

```bash
ruff check .
pyright
```
