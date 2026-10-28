from pydantic import BaseModel, Field
from typing import List, Optional

class BoundingBox(BaseModel):
    label: str = Field(..., description="Detected item: hardhat, vest, boots, harness, worker, unprotected_edge, etc.")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Detection confidence score")
    box_2d: List[float] = Field(..., description="[ymin, xmin, ymax, xmax] normalized coordinates (0 to 1000)")
    status: str = Field("compliant", description="compliant, violation, or warning")
    notes: Optional[str] = None

class SafetyHazard(BaseModel):
    hazard_id: str
    category: str = Field(..., description="PPE, Fall Protection, Electrical, Scaffolding, Housekeeping, Trenching")
    title: str
    description: str
    severity: str = Field(..., description="LOW, MEDIUM, HIGH, CRITICAL")
    osha_reference: str = Field(..., description="Applicable OSHA 1926 Standard (e.g., 1926.100, 1926.501)")
    recommended_action: str

class SiteSafetyAnalysisRequest(BaseModel):
    project_name: Optional[str] = "Metropolitan Tower Phase II"
    zone: Optional[str] = "Grid Line C-4 / Level 14 Slab"
    image_base64: Optional[str] = None
    image_filename: Optional[str] = None
    additional_notes: Optional[str] = None

class SiteSafetyAnalysisResponse(BaseModel):
    analysis_id: str
    timestamp: str
    project_name: str
    zone: str
    overall_safety_score: int = Field(..., ge=0, le=100, description="Safety Compliance Score 0-100")
    risk_level: str = Field(..., description="LOW, ELEVATED, HIGH, IMMINENT_DANGER")
    detected_personnel_count: int
    ppe_compliance_rate: float = Field(..., ge=0.0, le=100.0, description="Percentage of required PPE worn")
    detections: List[BoundingBox]
    hazards: List[SafetyHazard]
    osha_compliance_summary: str
    immediate_actions_required: List[str]
    supervisor_signoff_ready: bool
