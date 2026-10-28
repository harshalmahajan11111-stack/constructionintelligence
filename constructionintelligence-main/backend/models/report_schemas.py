from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class RiskRadarDimension(BaseModel):
    category: str
    score: int
    status: str

class SiteAuditReportRequest(BaseModel):
    project_id: str = "PRJ-METRO-2026"
    project_name: str = "Metropolitan Center Phase II"
    auditor_name: str = "Chief Structural Inspector R. Vance, PE, SE"
    inspection_date: str = "2026-10-24"
    include_safety_data: bool = True
    include_crack_data: bool = True
    include_valuation_data: bool = True
    include_planning_data: bool = True
    include_weather_data: bool = True

class SiteAuditReportResponse(BaseModel):
    report_id: str
    project_id: str
    project_name: str
    auditor_name: str
    inspection_date: str
    executive_verdict: str
    overall_health_index: int
    risk_radar: List[RiskRadarDimension]
    safety_summary: Dict[str, Any]
    structural_integrity_summary: Dict[str, Any]
    schedule_variance_summary: Dict[str, Any]
    financial_valuation_summary: Dict[str, Any]
    environmental_weather_risk: Dict[str, Any]
    key_action_items: List[str]
    engineer_signoff_hash: str
