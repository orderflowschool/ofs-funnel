"""Backend tests for POST /api/masterclass/register (Order Flow Masterclass)."""
import os
import time
import pytest
import requests

BASE_URL = os.environ['REACT_APP_BACKEND_URL'].rstrip('/') if os.environ.get('REACT_APP_BACKEND_URL') else 'https://order-flow-apply.preview.emergentagent.com'
ENDPOINT = f"{BASE_URL}/api/masterclass/register"


def _unique_email(tag: str = 'mc-be') -> str:
    return f"TEST_{tag}-{int(time.time()*1000)}@e2e.test"


def _valid_payload(email: str | None = None, country: str = 'Canada', country_code: str | None = 'CA') -> dict:
    return {
        "firstName": "MC",
        "lastName": "Backend",
        "email": email or _unique_email(),
        "country": country,
        "countryCode": country_code,
        "tradingExperience": "6–12 months",
        "funnelStage": "masterclass_registration",
        "masterclassId": "ofs-masterclass-2026",
        "utm_source": "twitter",
        "utm_medium": "post",
        "utm_campaign": "mc-launch",
        "referrer": "https://x.com/edgar",
        "landingPath": "/",
    }


class TestMasterclassRegister:
    def test_valid_registration_returns_200_with_id(self):
        payload = _valid_payload()
        resp = requests.post(ENDPOINT, json=payload, timeout=30)
        assert resp.status_code == 200, resp.text
        data = resp.json()
        assert data.get("status") == "ok"
        assert isinstance(data.get("id"), str) and len(data["id"]) > 8
        assert data.get("confirmationPath") == "/masterclass-confirmed"

    def test_duplicate_within_1h_returns_429(self):
        email = _unique_email("dup")
        p1 = _valid_payload(email=email)
        r1 = requests.post(ENDPOINT, json=p1, timeout=30)
        assert r1.status_code == 200, r1.text

        r2 = requests.post(ENDPOINT, json=p1, timeout=30)
        assert r2.status_code == 429, r2.text
        detail = r2.json().get("detail", "")
        assert "already" in detail.lower() or "registered" in detail.lower()

    def test_missing_required_firstName_returns_422(self):
        payload = _valid_payload()
        payload.pop("firstName")
        resp = requests.post(ENDPOINT, json=payload, timeout=30)
        assert resp.status_code == 422

    def test_missing_email_returns_422(self):
        payload = _valid_payload()
        payload.pop("email")
        resp = requests.post(ENDPOINT, json=payload, timeout=30)
        assert resp.status_code == 422

    def test_missing_country_returns_422(self):
        payload = _valid_payload()
        payload.pop("country")
        resp = requests.post(ENDPOINT, json=payload, timeout=30)
        assert resp.status_code == 422

    def test_missing_tradingExperience_returns_422(self):
        payload = _valid_payload()
        payload.pop("tradingExperience")
        resp = requests.post(ENDPOINT, json=payload, timeout=30)
        assert resp.status_code == 422

    def test_optional_lastName_and_countryCode_ok(self):
        payload = _valid_payload()
        payload["lastName"] = ""
        payload["countryCode"] = None
        resp = requests.post(ENDPOINT, json=payload, timeout=30)
        assert resp.status_code == 200, resp.text


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
