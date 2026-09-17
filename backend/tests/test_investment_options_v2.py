"""
Tests for NEW investment options - Order Flow School Application funnel (Iteration 3)

Tests the new investment options:
- $0-$500 → qualified: false
- $500-$1,000 → qualified: true  
- $1,000-$2,500 → qualified: true
- $2,500-$4,000 → qualified: true (NEW)
- $4,000+ → qualified: true (NEW)
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestNewInvestmentOptions:
    """Tests for the 5 investment options in /api/applications"""
    
    def test_investment_0_500_not_qualified(self):
        """Investment '$0-$500' should return qualified: false"""
        payload = {
            "firstName": "TEST_NotQualified",
            "email": "notqualified@test.com",
            "phone": "1234567890",
            "investment": "$0-$500"
        }
        response = requests.post(f"{BASE_URL}/api/applications", json=payload)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert "id" in data
        assert data["qualified"] is False, f"Expected qualified=False for $0-$500, got {data['qualified']}"
        print(f"✓ '$0-$500' returns qualified=False - PASSED")
    
    def test_investment_500_1000_qualified(self):
        """Investment '$500-$1,000' should return qualified: true"""
        payload = {
            "firstName": "TEST_Qualified500",
            "email": "qual500@test.com",
            "phone": "1234567890",
            "investment": "$500-$1,000"
        }
        response = requests.post(f"{BASE_URL}/api/applications", json=payload)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert "id" in data
        assert data["qualified"] is True, f"Expected qualified=True for $500-$1,000, got {data['qualified']}"
        print(f"✓ '$500-$1,000' returns qualified=True - PASSED")
    
    def test_investment_1000_2500_qualified(self):
        """Investment '$1,000-$2,500' should return qualified: true"""
        payload = {
            "firstName": "TEST_Qualified1000",
            "email": "qual1000@test.com",
            "phone": "1234567890",
            "investment": "$1,000-$2,500"
        }
        response = requests.post(f"{BASE_URL}/api/applications", json=payload)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert "id" in data
        assert data["qualified"] is True, f"Expected qualified=True for $1,000-$2,500, got {data['qualified']}"
        print(f"✓ '$1,000-$2,500' returns qualified=True - PASSED")
    
    def test_investment_2500_4000_qualified(self):
        """NEW: Investment '$2,500-$4,000' should return qualified: true"""
        payload = {
            "firstName": "TEST_Qualified2500",
            "email": "qual2500@test.com",
            "phone": "1234567890",
            "investment": "$2,500-$4,000"
        }
        response = requests.post(f"{BASE_URL}/api/applications", json=payload)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert "id" in data
        assert data["qualified"] is True, f"Expected qualified=True for $2,500-$4,000, got {data['qualified']}"
        print(f"✓ '$2,500-$4,000' returns qualified=True - PASSED (NEW OPTION)")
    
    def test_investment_4000_plus_qualified(self):
        """NEW: Investment '$4,000+' should return qualified: true"""
        payload = {
            "firstName": "TEST_Qualified4000",
            "email": "qual4000@test.com",
            "phone": "1234567890",
            "investment": "$4,000+"
        }
        response = requests.post(f"{BASE_URL}/api/applications", json=payload)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert "id" in data
        assert data["qualified"] is True, f"Expected qualified=True for $4,000+, got {data['qualified']}"
        print(f"✓ '$4,000+' returns qualified=True - PASSED (NEW OPTION)")


class TestHealthEndpoint:
    """Verify API is accessible"""
    
    def test_api_health(self):
        """GET /api/ should return 200"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200, f"API not accessible: {response.status_code}"
        print(f"✓ API health check PASSED")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
