from __future__ import annotations

import pytest

from app.services.mux_client import (
    MuxAsset,
    MuxClientError,
    MuxPlaybackId,
    format_duration_label,
    resolve_playback,
)


def test_format_duration_label_rounds_to_minutes() -> None:
    assert format_duration_label(125.0) == "2 min"
    assert format_duration_label(None) is None


def test_resolve_playback_public_access() -> None:
    asset = MuxAsset(
        id="asset-1",
        status="ready",
        passthrough="res-001",
        duration=600.0,
        playback_ids=[
            MuxPlaybackId(id="pub-id", policy="public"),
            MuxPlaybackId(id="signed-id", policy="signed"),
        ],
    )
    playback_id, signed = resolve_playback(asset, "public")
    assert playback_id == "pub-id"
    assert signed is False


def test_resolve_playback_paid_access() -> None:
    asset = MuxAsset(
        id="asset-2",
        status="ready",
        passthrough="res-009",
        duration=2520.0,
        playback_ids=[MuxPlaybackId(id="signed-id", policy="signed")],
    )
    playback_id, signed = resolve_playback(asset, "paid")
    assert playback_id == "signed-id"
    assert signed is True


def test_resolve_playback_missing_policy_raises() -> None:
    asset = MuxAsset(
        id="asset-3",
        status="ready",
        passthrough="res-001",
        duration=60.0,
        playback_ids=[MuxPlaybackId(id="signed-id", policy="signed")],
    )
    with pytest.raises(MuxClientError, match="public"):
        resolve_playback(asset, "public")
