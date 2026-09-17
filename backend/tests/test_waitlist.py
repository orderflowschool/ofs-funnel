"""Backend tests for /api/waitlist endpoint (closed-enrollment early-access flow)."""
import os
import time
import uuid
import requests
import pytest

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://order-flow-apply.preview.emergentagent.com').rstrip('/')


def _payload(email=None, **overrides):
    body = {
        "firstName": "TestBE",
        "lastName": "Suite",
        "email": email or f"be-waitlist-{uuid.uuid4().hex[:10]}@e2e.test",
        "tradingExperience": "Less than 6 months",
        "mainMarket": "Futures (ES, NQ, MES, MNQ, etc.)",
        "reason": "I want to learn order flow properly and stop losing money on eval accounts.",
    }
    body.update(overrides)
    return body


class TestWaitlist:
    def test_submit_success(self):
        body = _payload()
        r = requests.post(f"{BASE_URL}/api/waitlist", json=body, timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("status") == "ok"
        assert isinstance(data.get("id"), str) and len(data["id"]) > 0

    def test_submit_duplicate_within_1h_returns_429(self):
        email = f"be-waitlist-dup-{uuid.uuid4().hex[:10]}@e2e.test"
        r1 = requests.post(f"{BASE_URL}/api/waitlist", json=_payload(email=email), timeout=20)
        assert r1.status_code == 200, r1.text
        time.sleep(1)
        r2 = requests.post(f"{BASE_URL}/api/waitlist", json=_payload(email=email), timeout=20)
        assert r2.status_code == 429, r2.text
        detail = r2.json().get("detail", "")
        assert "already on the list" in detail.lower() or "waitlist" in detail.lower() or "intake" in detail.lower()

    def test_missing_required_fields_returns_422(self):
        # Missing tradingExperience and reason
        body = {
            "firstName": "TestBE",
            "email": f"be-waitlist-missing-{uuid.uuid4().hex[:6]}@e2e.test",
            "mainMarket": "Futures (ES, NQ, MES, MNQ, etc.)",
        }
        r = requests.post(f"{BASE_URL}/api/waitlist", json=body, timeout=20)
        assert r.status_code == 422, r.text

    def test_missing_email_returns_422(self):
        body = _payload()
        body.pop("email")
        r = requests.post(f"{BASE_URL}/api/waitlist", json=body, timeout=20)
        assert r.status_code == 422, r.text


class TestPreservedRoutes:
    """Ensure existing endpoints still work."""

    def test_root_alive(self):
        r = requests.get(f"{BASE_URL}/api/", timeout=15)
        assert r.status_code == 200

    def test_application_endpoint_still_exists(self):
        # 422 acceptable since we're not sending a full payload — just verifying route is mounted
        r = requests.post(f"{BASE_URL}/api/applications", json={}, timeout=15)
        assert r.status_code in (422, 400)
