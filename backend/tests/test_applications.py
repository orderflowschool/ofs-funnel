"""
Tests for /api/applications endpoint - Order Flow School Application funnel

Tests:
- Qualified lead flow (investment > $0-$500 → qualified: true)
- Non-qualified lead flow (investment $0-$500 → qualified: false)
- Validation errors for missing required fields
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestApplicationsEndpoint:
    """Tests for POST /api/applications endpoint"""
    
    def test_qualified_lead_high_investment(self):
        """Applications with investment '$1000–$3000' should return qualified: true"""
        payload = {
            "firstName": "TEST_QualifiedUser",
            "email": "qualified@test.com",
            "phone": "1234567890",
            "investment": "$1000–$3000"
        }
        response = requests.post(f"{BASE_URL}/api/applications", json=payload)
        
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["qualified"] is True
        assert isinstance(data["id"], str)
        assert len(data["id"]) > 0
        print(f"✓ Qualified lead test passed - ID: {data['id']}, qualified: {data['qualified']}")
    
    def test_non_qualified_lead_low_investment(self):
        """Applications with investment '$0–$500' should return qualified: false"""
        payload = {
            "firstName": "TEST_NonQualifiedUser",
            "email": "nonqualified@test.com",
            "phone": "1234567890",
            "investment": "$0–$500"
        }
        response = requests.post(f"{BASE_URL}/api/applications", json=payload)
        
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["qualified"] is False
        assert isinstance(data["id"], str)
        assert len(data["id"]) > 0
        print(f"✓ Non-qualified lead test passed - ID: {data['id']}, qualified: {data['qualified']}")

    def test_qualified_lead_medium_investment(self):
        """Applications with investment '$500–$1000' should return qualified: true (not $0-$500)"""
        payload = {
            "firstName": "TEST_MediumInvestor",
            "email": "medium@test.com",
            "phone": "1234567890",
            "investment": "$500–$1000"
        }
        response = requests.post(f"{BASE_URL}/api/applications", json=payload)
        
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["qualified"] is True
        print(f"✓ Medium investment qualified test passed - ID: {data['id']}, qualified: {data['qualified']}")

    def test_qualified_lead_over_3000(self):
        """Applications with investment '$3000+' should return qualified: true"""
        payload = {
            "firstName": "TEST_HighInvestor",
            "email": "high@test.com",
            "phone": "1234567890",
            "investment": "$3000+"
        }
        response = requests.post(f"{BASE_URL}/api/applications", json=payload)
        
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["qualified"] is True
        print(f"✓ High investment qualified test passed - ID: {data['id']}, qualified: {data['qualified']}")

    def test_missing_required_fields_returns_422(self):
        """Missing firstName, email, phone should return 422 validation error"""
        payload = {
            "lastName": "Test",
            "investment": "$1000–$3000"
        }
        response = requests.post(f"{BASE_URL}/api/applications", json=payload)
        
        assert response.status_code == 422
        data = response.json()
        assert "detail" in data
        
        # Check that all three required fields are mentioned in errors
        error_locs = [err["loc"][-1] for err in data["detail"]]
        assert "firstName" in error_locs
        assert "email" in error_locs
        assert "phone" in error_locs
        print(f"✓ Validation error test passed - Missing fields reported: {error_locs}")

    def test_missing_firstname_returns_422(self):
        """Missing firstName alone should return 422"""
        payload = {
            "email": "test@example.com",
            "phone": "1234567890",
            "investment": "$1000–$3000"
        }
        response = requests.post(f"{BASE_URL}/api/applications", json=payload)
        
        assert response.status_code == 422
        data = response.json()
        error_fields = [err["loc"][-1] for err in data["detail"]]
        assert "firstName" in error_fields
        print(f"✓ Missing firstName validation test passed")

    def test_missing_email_returns_422(self):
        """Missing email alone should return 422"""
        payload = {
            "firstName": "TEST_NoEmail",
            "phone": "1234567890",
            "investment": "$1000–$3000"
        }
        response = requests.post(f"{BASE_URL}/api/applications", json=payload)
        
        assert response.status_code == 422
        data = response.json()
        error_fields = [err["loc"][-1] for err in data["detail"]]
        assert "email" in error_fields
        print(f"✓ Missing email validation test passed")

    def test_missing_phone_returns_422(self):
        """Missing phone alone should return 422"""
        payload = {
            "firstName": "TEST_NoPhone",
            "email": "nophone@test.com",
            "investment": "$1000–$3000"
        }
        response = requests.post(f"{BASE_URL}/api/applications", json=payload)
        
        assert response.status_code == 422
        data = response.json()
        error_fields = [err["loc"][-1] for err in data["detail"]]
        assert "phone" in error_fields
        print(f"✓ Missing phone validation test passed")

    def test_complete_application_with_all_optional_fields(self):
        """Test complete application with all optional fields populated"""
        payload = {
            "firstName": "TEST_CompleteUser",
            "lastName": "TestLast",
            "email": "complete@test.com",
            "phone": "1234567890",
            "instagram": "@testuser",
            "tradingExperience": "1-2 years",
            "tradingAssets": ["Futures", "Stocks"],
            "futuresExperience": "Some experience",
            "biggestStruggle": ["Consistency", "Risk management"],
            "consistencyBlocks": "Emotional trading",
            "seriousness": "Very serious",
            "whyOFS": "Want to improve",
            "readiness": "Ready now",
            "investment": "$1000–$3000",
            "callWillingness": "Yes"
        }
        response = requests.post(f"{BASE_URL}/api/applications", json=payload)
        
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["qualified"] is True
        print(f"✓ Complete application test passed - ID: {data['id']}")


class TestHealthEndpoint:
    """Tests for root endpoint"""
    
    def test_root_endpoint(self):
        """GET /api/ should return Hello World"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert data.get("message") == "Hello World"
        print("✓ Root endpoint test passed")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
