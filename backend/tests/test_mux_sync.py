from __future__ import annotations

from unittest.mock import MagicMock, patch

from app.models.resource import ResourceItem
from app.services.mux_client import MuxAsset, MuxClient, MuxPlaybackId
from app.services.mux_sync import sync_mux_playback_ids


def _video_resource(
    resource_id: str,
    *,
    access: str = "public",
    mux_asset_id: str | None = None,
) -> ResourceItem:
    return ResourceItem.model_validate(
        {
            "id": resource_id,
            "title": "Test video",
            "type": "video",
            "topic": "dsa-pathways",
            "access": access,
            "description": "Test",
            "duration": "10 min",
            "mux_asset_id": mux_asset_id,
            "created_at": "2026-01-15T08:00:00Z",
            "updated_at": "2026-01-15T08:00:00Z",
        }
    )


def test_sync_mux_updates_matching_passthrough() -> None:
    assets = [
        MuxAsset(
            id="mux-asset-1",
            status="ready",
            passthrough="res-001",
            duration=720.0,
            playback_ids=[MuxPlaybackId(id="playback-public", policy="public")],
        )
    ]
    mock_client = MagicMock(spec=MuxClient)
    mock_client.is_configured = True
    mock_client.list_all_assets.return_value = assets

    video_resources = [_video_resource("res-001")]
    with (
        patch("app.services.mux_sync.list_video_resources", return_value=video_resources),
        patch("app.services.mux_sync.update_mux_playback") as update_mock,
    ):
        result = sync_mux_playback_ids(client=mock_client)

    update_mock.assert_called_once_with(
        "res-001",
        mux_asset_id="mux-asset-1",
        mux_playback_id="playback-public",
        mux_playback_signed=False,
        duration="12 min",
    )
    assert result.updated == ["res-001"]
    assert not result.errors


def test_sync_mux_skips_not_ready_assets() -> None:
    assets = [
        MuxAsset(
            id="mux-asset-2",
            status="preparing",
            passthrough="res-006",
            duration=None,
            playback_ids=[],
        )
    ]
    mock_client = MagicMock(spec=MuxClient)
    mock_client.is_configured = True
    mock_client.list_all_assets.return_value = assets

    video_resources = [_video_resource("res-006")]
    with (
        patch("app.services.mux_sync.list_video_resources", return_value=video_resources),
        patch("app.services.mux_sync.update_mux_playback") as update_mock,
    ):
        result = sync_mux_playback_ids(client=mock_client)

    update_mock.assert_not_called()
    assert result.skipped_not_ready == ["mux-asset-2"]
    assert "res-006" in result.missing_playback
