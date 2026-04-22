from __future__ import annotations

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(".env", ".env.local"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # Supabase — validated at usage time so the server starts without credentials
    supabase_url: str = ""
    supabase_service_key: str = ""

    # Clerk — validated at usage time so the server starts without credentials
    clerk_jwks_url: str = ""
    clerk_issuer: str = ""
    clerk_audience: str = ""

    # App
    frontend_url: str = "http://localhost:5173"
    log_level: str = "INFO"
    environment: str = "development"
    app_version: str = "0.1.0"

    # Dev-only auth (temporary; replaces Clerk in development/testing)
    allow_dev_bearer_auth: bool = False
    dev_bearer_token: str = ""

    @property
    def is_development(self) -> bool:
        return self.environment == "development"


settings = Settings()
