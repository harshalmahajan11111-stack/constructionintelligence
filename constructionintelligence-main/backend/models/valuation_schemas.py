from pydantic import BaseModel, Field
from typing import List, Optional

class ValuationFactor(BaseModel):
    factor_name: str
    weight_percentage: float
    contribution_amount_usd: float
    description: str

class ComparableProperty(BaseModel):
    property_name: str
    distance_km: float
    built_up_area_sqft: float
    sale_price_usd: float
    price_per_sqft: float
    completion_year: int
    similarity_index: float

class RealEstateValuationRequest(BaseModel):
    property_title: str = Field(..., description="Project / Property Title")
    property_type: str = Field("Commercial Office Tower", description="Residential, Commercial, Industrial, Mixed-Use")
    built_up_area_sqft: float = Field(..., gt=0)
    land_area_sqft: Optional[float] = None
    location_tier: str = Field("Tier 1 Prime CBD", description="Tier 1 Prime CBD, Tier 2 Suburban Hub, Tier 3 Emerging Urban")
    construction_grade: str = Field("Grade A+ Luxury Commercial", description="Grade A+ Luxury Commercial, Grade A Standard, Grade B Semi-Commercial, Grade C Budget")
    current_stage: str = Field("Structural Framework 75% Complete", description="Pre-construction, Earthwork, Structure, MEP & Finishing, Ready for Occupancy")
    number_of_floors: int = Field(28, ge=1)
    parking_bays: int = Field(150, ge=0)
    smart_building_certification: str = Field("LEED Gold Candidate", description="None, LEED Silver, LEED Gold, LEED Platinum, BREEAM")
    target_currency: str = "USD"

class RealEstateValuationResponse(BaseModel):
    valuation_id: str
    project_title: str
    estimated_total_value_usd: float
    value_range_min_usd: float
    value_range_max_usd: float
    price_per_sqft_usd: float
    construction_cost_ratio: float
    land_value_contribution_usd: float
    depreciation_deduction_usd: float
    esg_leed_premium_usd: float
    factors_breakdown: List[ValuationFactor]
    comparables: List[ComparableProperty]
    roi_projection_5yr_annualized: float
    valuation_verdict: str
    risk_assessment: str
