from fastapi import APIRouter
from backend.models.weather_schemas import WeatherAdvisoryRequest, WeatherAdvisoryResponse
from backend.services.weather_engine import weather_engine

router = APIRouter(prefix="/weather", tags=["Weather-Aware Advisory"])

@router.post("/advisory", response_model=WeatherAdvisoryResponse)
async def get_weather_advisory(request: WeatherAdvisoryRequest):
    """Evaluates environmental factors on concrete pouring, crane lifts, and excavation."""
    return weather_engine.get_weather_advisory(request)
