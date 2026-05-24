from __future__ import annotations

from unittest.mock import MagicMock

import httpx
import pytest
from fastapi import FastAPI

from app.config import settings
from app.dependencies import get_current_user
from app.models.schemas import ClerkUser
from app.routers import dev_authz
from app.services.edxp_authz import EdxpAuthzError, authorize


def _fake_async_client(post_impl):
    """Return a factory matching `async with httpx.AsyncClient(...) as client`."""

    class _Ctx:
        async def __aenter__(self):
            return self

        async def __aexit__(self, *args: object) -> None:
            return None

        async def post(self, url: str, **kwargs: object):
            return await post_impl(url, **kwargs)

    return lambda *args, **kwargs: _Ctx()


@pytest.mark.asyncio
async def test_authorize_success(monkeypatch: pytest.MonkeyPatch) -> None:
    captured: dict[str, object] = {}

    async def post(url: str, **kwargs: object):
        captured["url"] = url
        captured["json"] = kwargs.get("json")
        captured["headers"] = kwargs.get("headers")
        resp = MagicMock()
        resp.raise_for_status = MagicMock()
        resp.json = MagicMock(return_value={"allowed": True, "roles": ["parent"]})
        return resp

    monkeypatch.setattr(settings, "edxp_authz_url", "http://edxp.test/api/v1")
    monkeypatch.setattr(settings, "edxp_org_id", "org_1")
    monkeypatch.setattr(settings, "edxp_internal_jwt_secret", "u" * 32)
    monkeypatch.setattr(settings, "edxp_service_name", "ttg-portal")
    monkeypatch.setattr("app.services.edxp_authz.httpx.AsyncClient", _fake_async_client(post))

    result = await authorize(
        subject="user_abc",
        provider="clerk",
        action="resource.read",
        org_id="org_1",
    )

    assert result == {"allowed": True, "roles": ["parent"]}
    assert captured["url"] == "http://edxp.test/api/v1/authorize"
    assert captured["json"] == {
        "subject": "user_abc",
        "provider": "clerk",
        "action": "resource.read",
        "org_id": "org_1",
    }
    hdrs = captured["headers"]
    assert isinstance(hdrs, dict)
    assert hdrs.get("Authorization", "").startswith("Bearer ")


@pytest.mark.asyncio
async def test_authorize_raises_when_not_configured(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(settings, "edxp_authz_url", "")
    monkeypatch.setattr(settings, "edxp_org_id", "")
    monkeypatch.setattr(settings, "edxp_internal_jwt_secret", "")

    with pytest.raises(EdxpAuthzError, match="not configured"):
        await authorize(subject="u", provider="clerk", action="a", org_id="o")


@pytest.mark.asyncio
async def test_authorize_http_error_wraps_edxp_authz_error(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    async def post(url: str, **kwargs: object):
        req = httpx.Request("POST", url)
        resp = httpx.Response(403, request=req)
        raise httpx.HTTPStatusError("forbidden", request=req, response=resp)

    monkeypatch.setattr(settings, "edxp_authz_url", "http://edxp.test/api/v1")
    monkeypatch.setattr(settings, "edxp_org_id", "org_1")
    monkeypatch.setattr(settings, "edxp_internal_jwt_secret", "u" * 32)
    monkeypatch.setattr("app.services.edxp_authz.httpx.AsyncClient", _fake_async_client(post))

    with pytest.raises(EdxpAuthzError, match="request failed"):
        await authorize(subject="u", provider="clerk", action="a", org_id="org_1")


@pytest.mark.asyncio
async def test_authorize_malformed_response(monkeypatch: pytest.MonkeyPatch) -> None:
    async def post(url: str, **kwargs: object):
        resp = MagicMock()
        resp.raise_for_status = MagicMock()
        resp.json = MagicMock(return_value=[])
        return resp

    monkeypatch.setattr(settings, "edxp_authz_url", "http://edxp.test/api/v1")
    monkeypatch.setattr(settings, "edxp_org_id", "org_1")
    monkeypatch.setattr(settings, "edxp_internal_jwt_secret", "s" * 32)
    monkeypatch.setattr("app.services.edxp_authz.httpx.AsyncClient", _fake_async_client(post))

    with pytest.raises(EdxpAuthzError, match="malformed"):
        await authorize(subject="u", provider="clerk", action="a", org_id="org_1")


@pytest.mark.asyncio
async def test_dev_authz_authorize_returns_decision(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    async def _fake_authorize(**kwargs: object) -> dict[str, object]:
        assert kwargs["subject"] == "clerk_test"
        assert kwargs["action"] == "demo.action"
        return {"allowed": True, "roles": ["x"], "reason": None, "cache_ttl_seconds": 60}

    monkeypatch.setattr(settings, "environment", "development")
    monkeypatch.setattr("app.routers.dev_authz.edxp_authorize", _fake_authorize)

    mini = FastAPI()
    mini.include_router(dev_authz.router, prefix="/api/v1")

    async def _user() -> ClerkUser:
        return ClerkUser(clerk_id="clerk_test", email="e@e.com")

    mini.dependency_overrides[get_current_user] = _user
    try:
        from httpx import ASGITransport, AsyncClient

        transport = ASGITransport(app=mini)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            response = await ac.post(
                "/api/v1/dev/authz/authorize",
                headers={"Authorization": "Bearer t"},
                json={"action": "demo.action"},
            )
    finally:
        mini.dependency_overrides.pop(get_current_user, None)

    assert response.status_code == 200
    body = response.json()
    assert body["error"] is None
    assert body["data"]["allowed"] is True
    assert body["data"]["roles"] == ["x"]
    assert body["data"]["cache_ttl_seconds"] == 60


@pytest.mark.asyncio
async def test_dev_authz_not_found_outside_development(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(settings, "environment", "staging")

    mini = FastAPI()
    mini.include_router(dev_authz.router, prefix="/api/v1")

    async def _user() -> ClerkUser:
        return ClerkUser(clerk_id="u", email="e@e.com")

    mini.dependency_overrides[get_current_user] = _user
    try:
        from httpx import ASGITransport, AsyncClient

        transport = ASGITransport(app=mini)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            response = await ac.post(
                "/api/v1/dev/authz/authorize",
                headers={"Authorization": "Bearer t"},
                json={"action": "x"},
            )
    finally:
        mini.dependency_overrides.pop(get_current_user, None)

    assert response.status_code == 404
