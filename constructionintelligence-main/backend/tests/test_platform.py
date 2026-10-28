import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["epics_active"] == 9

def test_platform_info():
    response = client.get("/api/info")
    assert response.status_code == 200
    assert len(response.json()["supported_epics"]) == 9

def test_safety_analysis():
    payload = {
        "project_name": "Skyline Heights Phase 3",
        "zone": "Grid Line B-2 / Level 10"
    }
    response = client.post("/api/safety/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "overall_safety_score" in data
    assert len(data["detections"]) > 0
    assert len(data["hazards"]) > 0
    assert data["ppe_compliance_rate"] > 0

def test_crack_analysis():
    payload = {
        "structural_element": "Level 2 Shear Column",
        "concrete_grade": "M35",
        "crack_width_override_mm": 3.2
    }
    response = client.post("/api/crack/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["structural_element"] == "Level 2 Shear Column"
    assert data["geometry"]["estimated_width_mm"] == 3.2
    assert len(data["repair_options"]) >= 2

def test_real_estate_valuation():
    payload = {
        "property_title": "Grand Horizon Center",
        "built_up_area_sqft": 150000,
        "location_tier": "Tier 1 Prime CBD",
        "construction_grade": "Grade A+ Luxury Commercial",
        "number_of_floors": 24,
        "parking_bays": 120
    }
    response = client.post("/api/valuation/estimate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["estimated_total_value_usd"] > 0
    assert data["price_per_sqft_usd"] > 0
    assert len(data["factors_breakdown"]) > 0

def test_project_planning():
    payload = {
        "project_title": "Grand Horizon Center",
        "target_duration_months": 18,
        "target_budget_usd": 25000000
    }
    response = client.post("/api/planning/generate-plan", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["calculated_critical_path_days"] > 0
    assert len(data["tasks"]) >= 5
    assert len(data["budget_breakdown"]) > 0

def test_daily_log_processing():
    payload = {
        "log_date": "2026-10-24",
        "shift": "Day Shift",
        "raw_supervisor_notes": "Completed 180 m3 concrete pour on Level 14. 24 rebar ironworkers and 18 carpenters active."
    }
    response = client.post("/api/daily-log/process-log", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["total_manhours_logged"] > 0
    assert len(data["trades_summary"]) > 0

def test_weather_advisory():
    payload = {
        "site_location": "Metropolitan Central District",
        "planned_activities": ["Tower crane lift", "Concrete pouring"]
    }
    response = client.post("/api/weather/advisory", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert len(data["slots"]) > 0
    assert "crane_wind_threshold_protocol" in data

def test_knowledge_query():
    payload = {
        "query": "What is the acceptable concrete slump for heavily reinforced high-rise columns?"
    }
    response = client.post("/api/knowledge/query", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert len(data["citations"]) > 0
    assert len(data["qa_qc_checklist"]) > 0

def test_site_audit_report():
    payload = {
        "project_name": "Metropolitan Center Phase II",
        "auditor_name": "Chief Structural Inspector R. Vance, PE"
    }
    response = client.post("/api/report/generate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert len(data["risk_radar"]) == 5
    assert len(data["engineer_signoff_hash"]) == 64

def test_direct_routes_without_api_prefix():
    # Direct /health
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json()["status"] == "healthy"

    # Direct /safety/analyze
    res = client.post("/safety/analyze", json={"project_name": "P1", "zone": "Z1"})
    assert res.status_code == 200
    assert "overall_safety_score" in res.json()

    # Direct /report/generate
    res = client.post("/report/generate", json={"project_name": "P1", "auditor_name": "Auditor"})
    assert res.status_code == 200
    assert len(res.json()["risk_radar"]) == 5
