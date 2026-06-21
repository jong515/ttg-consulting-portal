from __future__ import annotations

import re

from app.models.portal import PortalCoursePreviewOut
from app.models.resource import ResourceItem
from app.services.content_repository import list_resources

PREVIEW_TITLE_PREFIX = "[PREV] TTA H DSA"
PREVIEW_LIMIT = 3
_PREVIEW_NUMBER_RE = re.compile(r"^\[PREV\] TTA H DSA (\d+)")


def _preview_number(title: str) -> int | None:
    match = _PREVIEW_NUMBER_RE.match(title.strip())
    if not match:
        return None
    return int(match.group(1))


def _is_portal_preview_candidate(item: ResourceItem) -> bool:
    if item.type != "video":
        return False
    if not item.title.startswith(PREVIEW_TITLE_PREFIX):
        return False
    if (item.access or "public") != "public":
        return False
    if not item.mux_playback_id or item.mux_playback_signed:
        return False
    return _preview_number(item.title) is not None


def list_portal_course_previews() -> list[PortalCoursePreviewOut]:
    """
    Return up to three public Mux preview clips for the portal marketing page.

    Matches Supabase rows whose titles start with ``[PREV] TTA H DSA``,
    sorted by the numeric suffix (1, 2, 3, …).
    """
    ranked: list[tuple[int, ResourceItem]] = []
    for item in list_resources():
        if not _is_portal_preview_candidate(item):
            continue
        number = _preview_number(item.title)
        assert number is not None
        ranked.append((number, item))

    ranked.sort(key=lambda pair: pair[0])

    return [
        PortalCoursePreviewOut(
            id=item.id,
            title=item.title,
            mux_playback_id=item.mux_playback_id or "",
            duration=item.duration or "",
        )
        for _, item in ranked[:PREVIEW_LIMIT]
    ]
