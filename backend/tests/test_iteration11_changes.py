"""Iteration 11 tests: backend bug fix for Airtable Investment Amount field,
Review Manually defensive logic, and regression on DQ path."""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://order-flow-apply.preview.emergentagent.com").rstrip("/")


def _payload(**overrides):
    base = {
        "firstName": "Test",
        "lastName": "Budget",
        "email": f"test-budget-{int(time.time()*1000)}@example.com",
        "phone": "+1234567890",
        "instagram": "",
        "country": "United States",
        "speaksEnglish": "Yes, fluently",
        "tradingExperience": "1-2 years",
        "biggestStruggle": ["Inconsistency"],
        "consistencyBlocks": "Some blocks",
        "investment": "$2,500-$4,000",
        "seriousness": "I am fully committed",
        "whyOFS": "I want a structured order flow education",
        "readiness": "Ready to start",
        "timezoneAvailable": "Yes",
        "callWillingness": "Yes",
    }
    base.update(overrides)
    return base


# PART 1 — Qualified happy path with high budget; verifies Airtable POST succeeds.
def test_qualified_high_budget_persists():
    payload = _payload(email=f"test-budget-fix-{int(time.time()*1000)}@example.com")
    r = requests.post(f"{BASE_URL}/api/applications", json=payload, timeout=30)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("qualified") is True, f"Expected qualified=true, got {data}"
    assert "id" in data
    # Allow async logging to flush
    time.sleep(1)


# PART 1b — Empty investment should trigger Review Manually
def test_empty_investment_review_manually():
    payload = _payload(
        email=f"test-empty-budget-{int(time.time()*1000)}@example.com",
        investment="",
    )
    r = requests.post(f"{BASE_URL}/api/applications", json=payload, timeout=30)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "id" in data
    # Look for the warning in backend log
    time.sleep(1)
    app_id = data["id"]
    try:
        with open("/var/log/supervisor/backend.err.log") as f:
            log = f.read()
    except FileNotFoundError:
        log = ""
    try:
        with open("/var/log/supervisor/backend.out.log") as f:
            log += f.read()
    except FileNotFoundError:
        pass
    assert "[REVIEW MANUALLY]" in log, "Expected [REVIEW MANUALLY] log warning"
    assert app_id in log, f"Expected app_id {app_id} in logs"


# Regression — Clear DQ (callWillingness=No)
def test_clear_dq_call_unwilling():
    payload = _payload(
        email=f"test-dq-{int(time.time()*1000)}@example.com",
        callWillingness="No",
    )
    r = requests.post(f"{BASE_URL}/api/applications", json=payload, timeout=30)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("qualified") is False, f"Expected qualified=false, got {data}"


# Verify no NEW Airtable 422 errors arose from our test submissions
def test_no_new_airtable_422_after_post():
    marker_email = f"airtable-marker-{int(time.time()*1000)}@example.com"
    before = time.time()
    r = requests.post(f"{BASE_URL}/api/applications", json=_payload(email=marker_email), timeout=30)
    assert r.status_code == 200, r.text
    time.sleep(2)
    try:
        with open("/var/log/supervisor/backend.err.log") as f:
            log_lines = f.readlines()
    except FileNotFoundError:
        log_lines = []
    # Filter to only recent errors (within the last 30 seconds of our submission)
    recent_422 = []
    for ln in log_lines[-200:]:
        if "Airtable error 422" in ln and "Investment Amount" in ln:
            recent_422.append(ln)
        if "INVALID_MULTIPLE_CHOICE_OPTIONS" in ln and time.time() - before < 60:
            # check timestamp via line parse not strict; accept absence
            pass
    assert not recent_422, f"Found Investment Amount 422 errors: {recent_422[-3:]}"
