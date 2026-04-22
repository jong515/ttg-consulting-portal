from __future__ import annotations

from dataclasses import dataclass
from typing import Any
from uuid import UUID

import pytest
from httpx import AsyncClient

from app.dependencies import require_dev_bearer_auth
from app.main import app
from app.services.supabase import get_client as get_supabase_client


@dataclass
class _FakeResponse:
    data: Any
    error: Any = None


class _FakeQuery:
    def __init__(self, table: str, parent: "_FakeSupabase") -> None:
        self._table = table
        self._parent = parent
        self._filters: dict[str, str] = {}

    def select(self, _cols: str) -> "_FakeQuery":
        return self

    def order(self, _col: str) -> "_FakeQuery":
        return self

    def range(self, _start: int, _end: int) -> "_FakeQuery":
        return self

    def eq(self, key: str, value: str) -> "_FakeQuery":
        self._filters[key] = value
        return self

    def limit(self, _n: int) -> "_FakeQuery":
        return self

    def execute(self) -> _FakeResponse:
        if self._table != "resources":
            return _FakeResponse(data=[], error=None)

        if "id" in self._filters:
            rid = self._filters["id"]
            row = self._parent.resource_by_id.get(rid)
            return _FakeResponse(data=[] if row is None else [row], error=None)

        return _FakeResponse(data=self._parent.resources, error=None)


class _FakeStorageBucket:
    def __init__(self, signed_url: str | None) -> None:
        self._signed_url = signed_url

    def create_signed_url(self, _path: str, _expires: int) -> dict[str, str]:
        if not self._signed_url:
            return {}
        return {"signedURL": self._signed_url}


class _FakeStorage:
    def __init__(self, signed_url: str | None) -> None:
        self._signed_url = signed_url

    def from_(self, _bucket: str) -> _FakeStorageBucket:
        return _FakeStorageBucket(self._signed_url)


class _FakeSupabase:
    def __init__(self) -> None:
        self.resources: list[dict[str, Any]] = []
        self.resource_by_id: dict[str, dict[str, Any]] = {}
        self.storage = _FakeStorage(signed_url="https://example.com/file.pdf?token=abc")

    def table(self, name: str) -> _FakeQuery:
        return _FakeQuery(name, self)


@pytest.mark.asyncio
async def test_resources_requires_dev_token_when_enabled(client: AsyncClient) -> None:
    # Temporarily enable dev auth
    from app.config import settings

    old_allow = settings.allow_dev_bearer_auth
    old_token = settings.dev_bearer_token
    settings.allow_dev_bearer_auth = True
    settings.dev_bearer_token = "test"
    try:
        resp = await client.get("/api/v1/resources")
        assert resp.status_code == 401
        assert resp.json()["error"]["code"] == "http_error"
    finally:
        settings.allow_dev_bearer_auth = old_allow
        settings.dev_bearer_token = old_token


@pytest.mark.asyncio
async def test_list_resources_happy_path(client: AsyncClient) -> None:
    fake = _FakeSupabase()
    fake.resources = [
        {
            "id": "3a59019d-f7c2-44f7-8b5d-03b00ef330d0",
            "title": "Test",
            "description": "Desc",
            "category": "dsa",
            "is_paid": True,
            "sort_order": 0,
            "created_at": "2026-04-22T11:30:00.200761Z",
        }
    ]

    app.dependency_overrides[get_supabase_client] = lambda: fake
    app.dependency_overrides[require_dev_bearer_auth] = lambda: None
    try:
        resp = await client.get("/api/v1/resources?limit=10&offset=0")
        assert resp.status_code == 200
        body = resp.json()
        assert body["error"] is None
        assert isinstance(body["data"], list)
        assert "bucket" not in body["data"][0]
        assert "file_path" not in body["data"][0]
    finally:
        app.dependency_overrides.clear()


@pytest.mark.asyncio
async def test_signed_url_happy_path(client: AsyncClient) -> None:
    fake = _FakeSupabase()
    rid = UUID("3a59019d-f7c2-44f7-8b5d-03b00ef330d0")
    fake.resource_by_id[str(rid)] = {"id": str(rid), "bucket": "b", "file_path": "p.pdf"}

    app.dependency_overrides[get_supabase_client] = lambda: fake
    app.dependency_overrides[require_dev_bearer_auth] = lambda: None
    try:
        resp = await client.get(f"/api/v1/resources/{rid}/url")
        assert resp.status_code == 200
        body = resp.json()
        assert body["error"] is None
        assert body["data"]["expires_in"] == 900
        assert body["data"]["url"].startswith("https://")
    finally:
        app.dependency_overrides.clear()

