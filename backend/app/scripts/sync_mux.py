from __future__ import annotations

import sys

import structlog

from app.services.mux_client import MuxClientError
from app.services.mux_sync import sync_mux_playback_ids

logger = structlog.get_logger()


def main() -> int:
    try:
        result = sync_mux_playback_ids()
    except MuxClientError as exc:
        logger.error("mux_sync_failed", error=str(exc))
        print(f"Mux sync failed: {exc}", file=sys.stderr)
        return 1
    except RuntimeError as exc:
        logger.error("mux_sync_failed", error=str(exc))
        print(f"Mux sync failed: {exc}", file=sys.stderr)
        return 1

    print(f"Updated {len(result.updated)} resource(s): {', '.join(result.updated) or '(none)'}")
    if result.skipped_not_ready:
        print(f"Skipped not-ready assets: {', '.join(result.skipped_not_ready)}")
    if result.unmatched_assets:
        print(f"Unmatched Mux assets: {', '.join(result.unmatched_assets)}")
    if result.missing_playback:
        print(f"Videos still without playback ID: {', '.join(result.missing_playback)}")
    if result.errors:
        print("Errors:")
        for err in result.errors:
            print(f"  - {err}")
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
