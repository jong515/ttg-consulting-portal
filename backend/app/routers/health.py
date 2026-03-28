from __future__ import annotations

from fastapi import APIRouter

from app.config import settings
from app.models.schemas import ApiResponse, HealthResponse

router = APIRouter()


@router.get("/health", response_model=ApiResponse[HealthResponse])
async def health_check() -> ApiResponse[HealthResponse]:
    return ApiResponse(
        data=HealthResponse(
            status="ok",
            version=settings.app_version,
            environment=settings.environment,
        )
    )
