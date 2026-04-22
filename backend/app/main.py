from __future__ import annotations

from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

import structlog
from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, RedirectResponse

from app.config import settings
from app.middleware.logging import LoggingMiddleware, configure_logging
from app.models.schemas import ApiError, ApiResponse
from app.routers import health, resources
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
app.include_router(resources.router, prefix="/api/v1", tags=["resources"])


@app.exception_handler(HTTPException)
async def http_exception_handler(_request: Request, exc: HTTPException) -> JSONResponse:
    message = exc.detail if isinstance(exc.detail, str) else "Request failed"
    return JSONResponse(
        status_code=exc.status_code,
        content=ApiResponse(error=ApiError(message=message, code="http_error")).model_dump(),
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    _request: Request,
    _exc: RequestValidationError,
) -> JSONResponse:
    return JSONResponse(
        status_code=422,
        content=ApiResponse(
            error=ApiError(message="Request validation failed", code="validation_error")
        ).model_dump(),
    )


@app.get("/", include_in_schema=False)
async def root_redirect() -> RedirectResponse:
    return RedirectResponse(url="/api/v1/health")
