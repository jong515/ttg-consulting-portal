from __future__ import annotations

from fastapi import APIRouter, Depends

from app.dependencies import get_current_user
from app.models.resource import ResourceItem, ResourceProgressItem
from app.models.schemas import ApiResponse, ClerkUser
from app.services.content_repository import demo_progress_for_user, find_resource, list_resources

router = APIRouter()

# Re-export for playback router and tests.
__all__ = ["ResourceItem", "ResourceProgressItem", "find_resource", "router"]


@router.get("/resources", response_model=ApiResponse[list[ResourceItem]])
async def list_resources_endpoint(
    _user: ClerkUser = Depends(get_current_user),
) -> ApiResponse[list[ResourceItem]]:
    return ApiResponse(data=list_resources())


@router.get("/resources/progress", response_model=ApiResponse[list[ResourceProgressItem]])
async def list_resource_progress(
    user: ClerkUser = Depends(get_current_user),
) -> ApiResponse[list[ResourceProgressItem]]:
    return ApiResponse(data=demo_progress_for_user(user.clerk_id))
