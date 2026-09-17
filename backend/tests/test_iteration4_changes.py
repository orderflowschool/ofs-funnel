"""
Test suite for Iteration 4 - 7 Precise Changes to OFS Website
Tests:
- CHANGE 3: POST /api/applications/partial endpoint saves contact data
- CHANGE 4: timezoneAvailable field in application submission
- Backend API health and application submission
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestPartialContactEndpoint:
    """CHANGE 3: Test POST /api/applications/partial endpoint"""
    
    def test_partial_contact_save_success(self):
        """Test that partial contact data is saved and returns {status: saved}"""
        test_email = f"TEST_partial_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "firstName": "TEST_John",
            "lastName": "Doe",
            "email": test_email,
            "phone": "+1 555-123-4567",
            "instagram": "@testuser"
        }
        
        response = requests.post(f"{BASE_URL}/api/applications/partial", json=payload)
        
        # Status code assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertion - verify response structure
        data = response.json()
        assert "status" in data, f"Response missing 'status' field: {data}"
        assert data["status"] == "saved", f"Expected status='saved', got {data['status']}"
    
    def test_partial_contact_minimal_fields(self):
        """Test partial save with only required fields"""
        test_email = f"TEST_minimal_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "firstName": "TEST_Jane",
            "email": test_email,
            "phone": "+1 555-987-6543"
        }
        
        response = requests.post(f"{BASE_URL}/api/applications/partial", json=payload)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data["status"] == "saved"
    
    def test_partial_contact_missing_required_field(self):
        """Test partial save fails without required fields"""
        payload = {
            "firstName": "TEST_Missing",
            # Missing email and phone
        }
        
        response = requests.post(f"{BASE_URL}/api/applications/partial", json=payload)
        
        # Should return 422 validation error
        assert response.status_code == 422, f"Expected 422 for missing fields, got {response.status_code}"


class TestApplicationWithTimezone:
    """CHANGE 4: Test application submission with timezoneAvailable field"""
    
    def test_application_with_timezone_yes(self):
        """Test full application with timezoneAvailable='Yes'"""
        test_email = f"TEST_tz_yes_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "firstName": "TEST_Timezone",
            "lastName": "Yes",
            "email": test_email,
            "phone": "+1 555-111-2222",
            "instagram": "@tzyes",
            "tradingExperience": "1–2 years",
            "tradingAssets": ["Futures", "Options"],
            "biggestStruggle": ["Risk management", "Consistency"],
            "consistencyBlocks": "Need better discipline",
            "seriousness": "I'm fully committed to becoming consistently profitable",
            "whyOFS": "Want to learn order flow",
            "readiness": "Fully ready",
            "timezoneAvailable": "Yes",
            "investment": "$1,000-$2,500",
            "callWillingness": "Yes"
        }
        
        response = requests.post(f"{BASE_URL}/api/applications", json=payload)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert "id" in data, "Response missing 'id' field"
        assert "qualified" in data, "Response missing 'qualified' field"
        assert data["qualified"] == True, f"Expected qualified=True for $1,000-$2,500 investment"
    
    def test_application_with_timezone_no(self):
        """Test application with timezoneAvailable='No' (DQ scenario)"""
        test_email = f"TEST_tz_no_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "firstName": "TEST_Timezone",
            "lastName": "No",
            "email": test_email,
            "phone": "+1 555-333-4444",
            "instagram": "@tzno",
            "tradingExperience": "2+ years",
            "tradingAssets": ["Futures"],
            "biggestStruggle": ["Psychology"],
            "seriousness": "I'm serious and ready to put in the work",
            "readiness": "Ready to commit",
            "timezoneAvailable": "No",
            "investment": "",  # Not filled due to DQ
            "callWillingness": ""  # Not filled due to DQ
        }
        
        response = requests.post(f"{BASE_URL}/api/applications", json=payload)
        
        # Should still accept the application (DQ is frontend logic)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert "id" in data


class TestAPIHealth:
    """Basic API health checks"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
    
    def test_status_endpoint(self):
        """Test status endpoint"""
        response = requests.get(f"{BASE_URL}/api/status")
        assert response.status_code == 200


class TestApplicationQualification:
    """Test qualification logic based on investment amount"""
    
    def test_low_investment_not_qualified(self):
        """$0-$500 investment should result in qualified=false"""
        test_email = f"TEST_low_inv_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "firstName": "TEST_Low",
            "lastName": "Investment",
            "email": test_email,
            "phone": "+1 555-555-5555",
            "tradingExperience": "Less than 6 months",
            "tradingAssets": ["Stocks"],
            "biggestStruggle": ["Entries / timing"],
            "seriousness": "I'm serious and ready to put in the work",
            "readiness": "Ready to commit",
            "timezoneAvailable": "Yes",
            "investment": "$0-$500",
            "callWillingness": "Yes"
        }
        
        response = requests.post(f"{BASE_URL}/api/applications", json=payload)
        
        assert response.status_code == 200
        data = response.json()
        assert data["qualified"] == False, f"Expected qualified=False for $0-$500, got {data['qualified']}"
    
    def test_high_investment_qualified(self):
        """$4,000+ investment should result in qualified=true"""
        test_email = f"TEST_high_inv_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "firstName": "TEST_High",
            "lastName": "Investment",
            "email": test_email,
            "phone": "+1 555-666-7777",
            "tradingExperience": "2+ years",
            "tradingAssets": ["Futures", "Options"],
            "biggestStruggle": ["Trade management"],
            "seriousness": "I'm fully committed to becoming consistently profitable",
            "readiness": "Fully ready",
            "timezoneAvailable": "Yes",
            "investment": "$4,000+",
            "callWillingness": "Yes"
        }
        
        response = requests.post(f"{BASE_URL}/api/applications", json=payload)
        
        assert response.status_code == 200
        data = response.json()
        assert data["qualified"] == True, f"Expected qualified=True for $4,000+, got {data['qualified']}"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
