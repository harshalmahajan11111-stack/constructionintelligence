from pydantic import BaseModel, Field
from typing import List, Optional

class WeatherWindowSlot(BaseModel):
    time_slot: str
    temperature_celsius: float
    humidity_percent: float
    wind_speed_kmh: float
    precipitation_prob_percent: float
    uv_index: int
    concrete_pour_suitability: str
    crane_lift_status: str
    exterior_paint_adhesion: str
    trench_excavation_risk: str

class WeatherAdvisoryRequest(BaseModel):
    site_location: str = "Downtown High-Density Zone (Metro Core)"
    planned_activities: List[str] = [
        "Concrete Pouring for Level 16 Core Slab",
        "Tower Crane #2 Steel Truss Lifts",
        "Deep Trench Retaining Wall Shoring",
        "Exterior Waterproofing Membrane Application"
    ]
    forecast_override: Optional[List[WeatherWindowSlot]] = None

class WeatherAdvisoryResponse(BaseModel):
    advisory_id: str
    site_location: str
    timestamp: str
    summary_alert: str
    overall_workability_rating: str
    slots: List[WeatherWindowSlot]
    critical_weather_warnings: List[str]
    concrete_hydration_precautions: List[str]
    crane_wind_threshold_protocol: str
    worker_hydration_heat_index: str
    rescheduling_recommendations: List[str]
