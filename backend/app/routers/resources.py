from __future__ import annotations

from typing import Any
from uuid import UUID

import structlog
from fastapi import APIRouter, Depends, HTTPException
from supabase import Client

from app.dependencies import require_dev_bearer_auth
from app.models.schemas import ApiResponse, ResourceOut, SignedUrlOut
from app.services.supabase import get_client as get_supabase_client

logger = structlog.get_logger()

router = APIRouter()


def _extract_signed_url(result: Any) -> str | None:
    if isinstance(result, dict):
        url = result.get("signedURL") or result.get("signedUrl") or result.get("url")
        return url if isinstance(url, str) and url else None
    url = getattr(result, "signed_url", None) or getattr(result, "signedURL", None)
    return url if isinstance(url, str) and url else None


@router.get("/resources", response_model=ApiResponse[list[ResourceOut]])
def list_resources(
    supabase: Client = Depends(get_supabase_client),
    _auth: None = Depends(require_dev_bearer_auth),
    limit: int = 50,
    offset: int = 0,
) -> ApiResponse[list[ResourceOut]]:
    limit = max(1, min(limit, 100))
    offset = max(0, offset)

    try:
        resp = (
            supabase.table("resources")
            .select("id,title,description,category,is_paid,sort_order,created_at")
            .order("sort_order")
            .range(offset, offset + limit - 1)
            .execute()
        )
    except Exception:
        logger.exception("Supabase resources query failed")
        raise HTTPException(status_code=502, detail="Failed to query resources")

    data = getattr(resp, "data", None)
    error = getattr(resp, "error", None)
    if error:
        logger.error("Supabase returned error", error=error)
        raise HTTPException(status_code=502, detail="Failed to query resources")

    if not isinstance(data, list):
        raise HTTPException(status_code=502, detail="Unexpected resources response from Supabase")

    return ApiResponse(data=[ResourceOut.model_validate(row) for row in data])


@router.get("/resources/{resource_id}/url", response_model=ApiResponse[SignedUrlOut])
def get_resource_signed_url(
    resource_id: UUID,
    supabase: Client = Depends(get_supabase_client),
    _auth: None = Depends(require_dev_bearer_auth),
) -> ApiResponse[SignedUrlOut]:
    try:
        resource_resp = (
            supabase.table("resources")
            .select("id,bucket,file_path")
            .eq("id", str(resource_id))
            .limit(1)
            .execute()
        )
    except Exception:
        logger.exception("Supabase resource lookup failed", resource_id=resource_id)
        raise HTTPException(status_code=502, detail="Failed to lookup resource")

    if getattr(resource_resp, "error", None):
        logger.error("Supabase returned error", error=resource_resp.error, resource_id=resource_id)
        raise HTTPException(status_code=502, detail="Failed to lookup resource")

    rows = getattr(resource_resp, "data", None)
    if not isinstance(rows, list) or not rows:
        raise HTTPException(status_code=404, detail="Resource not found")

    row = rows[0]
    if not isinstance(row, dict):
        raise HTTPException(status_code=502, detail="Unexpected resource response from Supabase")

    bucket = row.get("bucket")
    file_path = row.get("file_path")
    if not isinstance(bucket, str) or not bucket or not isinstance(file_path, str) or not file_path:
        raise HTTPException(status_code=500, detail="Resource storage metadata is invalid")

    try:
        signed = supabase.storage.from_(bucket).create_signed_url(file_path, 900)
    except Exception:
        logger.exception(
            "Supabase signed URL generation failed",
            resource_id=resource_id,
            bucket=bucket,
            file_path=file_path,
        )
        raise HTTPException(status_code=502, detail="Failed to generate signed URL")

    url = _extract_signed_url(signed)
    if not url:
        raise HTTPException(status_code=502, detail="Signed URL response was malformed")

    return ApiResponse(data=SignedUrlOut(url=url, expires_in=900))

