from pydantic import BaseModel, Field
from typing import List, Optional

class CrackDefectGeometry(BaseModel):
    orientation: str = Field(..., description="Diagonal, Vertical, Horizontal, Stepped, Network/Map")
    estimated_width_mm: float = Field(..., description="Maximum crack aperture width in mm")
    estimated_length_cm: float = Field(..., description="Estimated surface length in cm")
    depth_classification: str = Field(..., description="Surface / Hairline, Medium Depth, Deep / Full Depth Structural")
    exposure_condition: str = Field("Aggressive Industrial", description="Standard, Marine, Industrial, High Humidity")

class RepairMethodology(BaseModel):
    method_name: str
    applicability: str
    materials_required: List[str]
    estimated_cost_range_usd: str
    expected_service_life_years: str
    astm_aci_standard: str

class CrackAnalysisRequest(BaseModel):
    structural_element: str = Field(..., description="Column, Beam, Retaining Wall, Foundation Slab, Pre-cast Facade")
    concrete_grade: Optional[str] = "M35 / C35-45"
    age_of_structure_years: Optional[float] = 4.5
    image_base64: Optional[str] = None
    image_filename: Optional[str] = None
    environmental_exposure: Optional[str] = "Exterior Sheltered"
    crack_width_override_mm: Optional[float] = None

class CrackAnalysisResponse(BaseModel):
    analysis_id: str
    structural_element: str
    concrete_grade: str
    crack_type: str = Field(..., description="Shear Crack, Flexural Tension Crack, Plastic Shrinkage, Thermal Contraction, Rebar Corrosion Spalling")
    geometry: CrackDefectGeometry
    severity_score: int = Field(..., ge=0, le=100, description="Defect severity index from 0 to 100")
    structural_risk_level: str = Field(..., description="NEGLIGIBLE, MONITOR, REPAIR_SOON, CRITICAL_STRUCTURAL_INTERVENTION")
    root_cause_diagnosis: str
    rebar_corrosion_risk: str
    repair_options: List[RepairMethodology]
    monitoring_recommendations: List[str]
    relevant_codes: List[str]
