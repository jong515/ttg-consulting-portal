from __future__ import annotations

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Prefer `.env.local` for dev while keeping `.env` as a fallback.
    # This matches the frontend convention and prevents "credentials not configured"
    # when developers only populate `.env.local`.
    model_config = SettingsConfigDict(env_file=(".env.local", ".env"), env_file_encoding="utf-8")

    # Supabase — validated at usage time so the server starts without credentials
    supabase_url: str = ""
    supabase_service_key: str = ""

    # Clerk — validated at usage time so the server starts without credentials
    clerk_jwks_url: str = ""
    clerk_issuer: str = ""
    clerk_audience: str = ""

    # App
    frontend_url: str = "http://localhost:5173"
    frontend_url_regex: str = ""
    log_level: str = "INFO"
    environment: str = "development"
    app_version: str = "0.1.0"

    # Development-only auth bypass (for local testing without Clerk)
    allow_dev_bearer_auth: bool = False
    dev_bearer_token: str = ""

    @property
    def is_development(self) -> bool:
        return self.environment == "development"


settings = Settings()
