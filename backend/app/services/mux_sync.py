from __future__ import annotations

from dataclasses import dataclass, field

import structlog

from app.models.resource import ResourceItem
from app.services.content_repository import list_video_resources, update_mux_playback
from app.services.mux_client import (
    MuxAsset,
    MuxClient,
    MuxClientError,
    format_duration_label,
    resolve_playback,
)

logger = structlog.get_logger()


@dataclass
class MuxSyncResult:
    updated: list[str] = field(default_factory=list)
    skipped_not_ready: list[str] = field(default_factory=list)
    unmatched_assets: list[str] = field(default_factory=list)
    missing_playback: list[str] = field(default_factory=list)
    errors: list[str] = field(default_factory=list)


def _match_resource(
    asset: MuxAsset,
    resources: list[ResourceItem],
) -> ResourceItem | None:
    by_id = {item.id: item for item in resources}
    by_asset_id = {item.mux_asset_id: item for item in resources if item.mux_asset_id}

    if asset.passthrough and asset.passthrough in by_id:
        return by_id[asset.passthrough]
    if asset.id in by_asset_id:
        return by_asset_id[asset.id]
    return None


def sync_mux_playback_ids(*, client: MuxClient | None = None) -> MuxSyncResult:
    """
    Pull Mux assets and write playback IDs onto matching Supabase resource rows.

    Matching order: asset passthrough → resources.id, else resources.mux_asset_id → asset.id.
    """
    mux = client or MuxClient()
    if not mux.is_configured:
        raise MuxClientError("MUX_TOKEN_ID and MUX_TOKEN_SECRET must be set")

    result = MuxSyncResult()
    video_resources = list_video_resources()
    assets = mux.list_all_assets()

    matched_resource_ids: set[str] = set()

    for asset in assets:
        if not asset.id:
            continue

        if asset.status != "ready":
            result.skipped_not_ready.append(asset.id)
            continue

        resource = _match_resource(asset, video_resources)
        if not resource:
            label = asset.passthrough or asset.id
            result.unmatched_assets.append(label)
            continue

        access = resource.access or "public"
        try:
            playback_id, signed = resolve_playback(asset, access)
        except MuxClientError as exc:
            result.errors.append(f"{resource.id}: {exc}")
            result.missing_playback.append(resource.id)
            continue

        duration_label = format_duration_label(asset.duration)
        try:
            update_mux_playback(
                resource.id,
                mux_asset_id=asset.id,
                mux_playback_id=playback_id,
                mux_playback_signed=signed,
                duration=duration_label,
            )
        except Exception as exc:
            result.errors.append(f"{resource.id}: {exc}")
            continue

        matched_resource_ids.add(resource.id)
        result.updated.append(resource.id)
        logger.info(
            "mux_sync_updated",
            resource_id=resource.id,
            mux_asset_id=asset.id,
            mux_playback_id=playback_id,
            signed=signed,
        )

    for resource in video_resources:
        if resource.id not in matched_resource_ids and not resource.mux_playback_id:
            result.missing_playback.append(resource.id)

    return result
