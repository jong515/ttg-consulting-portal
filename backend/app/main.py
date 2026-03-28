from __future__ import annotations

from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

import structlog
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from app.config import settings
from app.middleware.logging import LoggingMiddleware, configure_logging
from app.routers import health
from app.services.supabase import get_client


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    configure_logging(settings.log_level)
    logger = structlog.get_logger()

    if settings.supabase_url and settings.supabase_service_key:
        get_client()
        logger.info("Supabase client initialised")
    else:
        logger.warning("Supabase credentials not configured — skipping client init")

    logger.info("Application started", version=settings.app_version, env=settings.environment)
    yield
    logger.info("Application shutting down")


app = FastAPI(
    title="TTG Consulting Portal API",
    version=settings.app_version,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(LoggingMiddleware)

app.include_router(health.router, prefix="/api/v1", tags=["health"])


@app.get("/", include_in_schema=False)
async def root_redirect() -> RedirectResponse:
    return RedirectResponse(url="/api/v1/health")
