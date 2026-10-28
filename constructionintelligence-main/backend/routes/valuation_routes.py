from fastapi import APIRouter
from backend.models.valuation_schemas import RealEstateValuationRequest, RealEstateValuationResponse
from backend.services.valuation_engine import valuation_engine

router = APIRouter(prefix="/valuation", tags=["Real Estate Valuation"])

@router.post("/estimate", response_model=RealEstateValuationResponse)
async def estimate_valuation(request: RealEstateValuationRequest):
    """Calculates comprehensive real estate valuation and financial breakdown."""
    return valuation_engine.estimate_valuation(request)
