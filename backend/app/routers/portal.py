from __future__ import annotations

from fastapi import APIRouter

from app.models.portal import PortalCoursePreviewOut
from app.models.schemas import ApiResponse
from app.services.portal_previews import list_portal_course_previews

router = APIRouter()


@router.get("/portal/course-previews", response_model=ApiResponse[list[PortalCoursePreviewOut]])
async def portal_course_previews() -> ApiResponse[list[PortalCoursePreviewOut]]:
    """Public Mux preview clips for the /portal marketing page (no auth)."""
    return ApiResponse(data=list_portal_course_previews())
