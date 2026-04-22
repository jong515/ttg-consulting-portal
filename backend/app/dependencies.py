from __future__ import annotations

import secrets
import time
from dataclasses import dataclass, field

import httpx
import jwt
import structlog
from fastapi import Depends, HTTPException, Request
from jwt.algorithms import RSAAlgorithm
from pydantic import ValidationError
from supabase import Client

from app.config import settings
from app.models.schemas import ClerkUser
from app.services.supabase import get_client as get_supabase_client

logger = structlog.get_logger()


@dataclass
class JWKSCache:
    keys: list[dict[str, object]] = field(default_factory=list)
    fetched_at: float = 0.0
    ttl: float = 3600.0

    @property
    def is_expired(self) -> bool:
        return not self.keys or (time.time() - self.fetched_at) > self.ttl


_jwks_cache = JWKSCache()


async def _fetch_jwks() -> list[dict[str, object]]:
    if not _jwks_cache.is_expired:
        return _jwks_cache.keys

    async with httpx.AsyncClient(timeout=httpx.Timeout(10.0)) as client:
        response = await client.get(settings.clerk_jwks_url)
        response.raise_for_status()
        data = response.json()

    if not isinstance(data, dict) or "keys" not in data or not isinstance(data["keys"], list):
        raise ValueError("JWKS response missing or malformed 'keys' field")

    _jwks_cache.keys = data["keys"]
    _jwks_cache.fetched_at = time.time()
    return _jwks_cache.keys


def _find_matching_key(keys: list[dict[str, object]], token: str) -> object:
    unverified_header = jwt.get_unverified_header(token)
    kid = unverified_header.get("kid")

    for key in keys:
        if key.get("kid") == kid:
            return RSAAlgorithm.from_jwk(key)

    raise HTTPException(status_code=401, detail="Invalid or expired token")


async def get_current_user(request: Request) -> ClerkUser:
    if not settings.clerk_jwks_url or not settings.clerk_issuer:
        logger.error("Clerk authentication is not configured")
        raise HTTPException(
            status_code=503,
            detail="Authentication service unavailable",
        )

    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing authorization header")

    token = auth_header.removeprefix("Bearer ")

    try:
        keys = await _fetch_jwks()
        public_key = _find_matching_key(keys, token)

        decode_options: dict[str, object] = {
            "algorithms": ["RS256"],
            "issuer": settings.clerk_issuer,
        }
        # SEC-002: When CLERK_AUDIENCE is unset, audience verification is skipped.
        # This is acceptable in development but CLERK_AUDIENCE should be configured
        # in staging/production to prevent cross-client token acceptance.
        if settings.clerk_audience:
            decode_options["audience"] = settings.clerk_audience
        else:
            decode_options["options"] = {"verify_aud": False}

        payload = jwt.decode(token, public_key, **decode_options)  # type: ignore[arg-type]

        sub = payload.get("sub")
        if not sub:
            raise HTTPException(status_code=401, detail="Token missing required 'sub' claim")

        return ClerkUser(
            clerk_id=sub,
            email=payload.get("email"),
            first_name=payload.get("first_name"),
            last_name=payload.get("last_name"),
        )
    except HTTPException:
        raise
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    except httpx.HTTPError:
        logger.exception("Failed to fetch JWKS")
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    except ValueError:
        logger.exception("JWKS response validation failed")
        raise HTTPException(status_code=401, detail="Authentication service error")
    except ValidationError:
        logger.exception("JWT claims failed schema validation")
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    except Exception:
        logger.exception("Unexpected error during authentication")
        raise HTTPException(status_code=401, detail="Authentication failed")


def get_supabase(
    _user: ClerkUser = Depends(get_current_user),  # noqa: ARG001
) -> Client:
    return get_supabase_client()


def require_dev_bearer_auth(request: Request) -> None:
    if not settings.allow_dev_bearer_auth:
        return

    if not settings.dev_bearer_token:
        logger.error("Dev bearer auth enabled but DEV_BEARER_TOKEN is not configured")
        raise HTTPException(status_code=503, detail="Dev authentication is not configured")

    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing authorization header")

    token = auth_header.removeprefix("Bearer ")
    if not secrets.compare_digest(token, settings.dev_bearer_token):
        raise HTTPException(status_code=401, detail="Invalid token")
