from __future__ import annotations

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class PortalCoursePreviewOut(BaseModel):
    """Public portal marketing preview clip (Mux public playback only)."""

    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    id: str
    title: str
    mux_playback_id: str
    duration: str = ""
