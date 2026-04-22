from __future__ import annotations

from supabase import Client, create_client

from app.config import settings

_client: Client | None = None


def get_client() -> Client:
    global _client
    if _client is None:
        if not settings.supabase_url or not settings.supabase_service_key:
            raise RuntimeError(
                "SUPABASE_URL and SUPABASE_SERVICE_KEY must be set. "
                "Copy .env.example to .env and fill in the values."
            )
        url = settings.supabase_url.strip()
        if url.endswith("/rest/v1"):
            url = url.removesuffix("/rest/v1")
        if url.endswith("/rest/v1/"):
            url = url.removesuffix("/rest/v1/")
        _client = create_client(url, settings.supabase_service_key)
    return _client
