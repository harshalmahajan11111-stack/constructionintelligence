import uuid
import datetime
from backend.models.weather_schemas import (
    WeatherAdvisoryRequest,
    WeatherAdvisoryResponse,
    WeatherWindowSlot
)

class WeatherAdvisoryEngine:
    def get_weather_advisory(self, request: WeatherAdvisoryRequest) -> WeatherAdvisoryResponse:
        advisory_id = f"WTH-{uuid.uuid4().hex[:8].upper()}"
        timestamp = datetime.datetime.now().isoformat()

        # Construction forecast hourly slots (Morning, Mid-day, Afternoon, Evening, Night)
        slots = request.forecast_override or [
            WeatherWindowSlot(
                time_slot="06:00 - 09:00",
                temperature_celsius=21.5,
                humidity_percent=68.0,
                wind_speed_kmh=12.0,
                precipitation_prob_percent=5.0,
                uv_index=2,
                concrete_pour_suitability="OPTIMAL (Cool ambient temp prevents flash set)",
                crane_lift_status="GREEN - All clear for full structural loads",
                exterior_paint_adhesion="GOOD - Low moisture evaporation rate",
                trench_excavation_risk="LOW - Stable soil moisture"
            ),
            WeatherWindowSlot(
                time_slot="09:00 - 12:00",
                temperature_celsius=27.0,
                humidity_percent=55.0,
                wind_speed_kmh=18.5,
                precipitation_prob_percent=10.0,
                uv_index=6,
                concrete_pour_suitability="FAVORABLE (Ensure evaporative retarders ready)",
                crane_lift_status="GREEN - Wind well under 38 km/h threshold",
                exterior_paint_adhesion="OPTIMAL - Rapid curing",
                trench_excavation_risk="LOW"
            ),
            WeatherWindowSlot(
                time_slot="12:00 - 15:00",
                temperature_celsius=32.8,
                humidity_percent=42.0,
                wind_speed_kmh=31.0,
                precipitation_prob_percent=15.0,
                uv_index=9,
                concrete_pour_suitability="CAUTION (High evaporation; apply wet burlap curing)",
                crane_lift_status="YELLOW (Approaching 35 km/h gust limit; limit wide sail panels)",
                exterior_paint_adhesion="CAUTION - Risk of skinning / blistering in direct sun",
                trench_excavation_risk="LOW"
            ),
            WeatherWindowSlot(
                time_slot="15:00 - 18:00",
                temperature_celsius=29.2,
                humidity_percent=60.0,
                wind_speed_kmh=42.0,
                precipitation_prob_percent=45.0,
                uv_index=4,
                concrete_pour_suitability="POOR (Wind speed & incoming rain squall)",
                crane_lift_status="RED - EXCEEDS 38 km/h TOWER CRANE CUT-OFF LIMIT",
                exterior_paint_adhesion="HALTED - Dew point & wind turbulence risk",
                trench_excavation_risk="ELEVATED - Cover open excavations with heavy tarps"
            ),
            WeatherWindowSlot(
                time_slot="18:00 - 22:00",
                temperature_celsius=24.0,
                humidity_percent=82.0,
                wind_speed_kmh=22.0,
                precipitation_prob_percent=65.0,
                uv_index=0,
                concrete_pour_suitability="UNFAVORABLE (Rain showers expected)",
                crane_lift_status="YELLOW - Wet rigging precautions",
                exterior_paint_adhesion="HALTED",
                trench_excavation_risk="MODERATE - Sump dewatering pumps required on standby"
            )
        ]

        warnings = [
            "GUST ALERT: Sustained wind speeds expected to peak at 42 km/h between 15:30 and 17:30. Tower Crane 1 & 2 must weather-vane by 15:00.",
            "HEAT & EVAPORATION ALERT: Peak ambient temperature 32.8°C at 13:00 with low relative humidity (42%) triggers high ACI 305R plastic shrinkage risk.",
            "RAIN SQUALL INBOUND: 65% probability of localized 15mm precipitation starting at 18:30. Ensure fresh concrete is protected with polyethylene sheeting."
        ]

        hydration_precautions = [
            "According to ACI 305R-20 (Guide to Hot Weather Concreting), maintain concrete delivery temperature below 32°C using chilled mixing water.",
            "Apply aliphatic alcohol evaporation retarder spray immediately after bull-floating.",
            "Commence 7-day wet cure with continuous fog spray or saturated geotextile mats as soon as initial set occurs."
        ]

        crane_protocol = (
            "Per ASME B30.3 and OSHA 1926.1431: Strict crane shut-down and hook dogging mandatory when sustained winds "
            "exceed 38 km/h (20.5 knots) or gusts exceed 45 km/h. Slew brakes must be released into free-weathervane mode."
        )

        rescheduling = [
            "Complete all high-altitude crane tandem lifts before 13:30.",
            "Reschedule Level 14 perimeter facade panel hoisting from 16:00 to tomorrow morning at 07:00.",
            "Station two 3-inch submersible dewatering pumps in basement sump pit prior to 18:00 rainfall."
        ]

        return WeatherAdvisoryResponse(
            advisory_id=advisory_id,
            site_location=request.site_location,
            timestamp=timestamp,
            summary_alert="CRANE WIND CUT-OFF AT 15:00 & HOT WEATHER CONCRETE CURING PROTOCOL ACTIVE",
            overall_workability_rating="MODERATE (Actionable Morning Window, Afternoon Weather Holds)",
            slots=slots,
            critical_weather_warnings=warnings,
            concrete_hydration_precautions=hydration_precautions,
            crane_wind_threshold_protocol=crane_protocol,
            worker_hydration_heat_index="HEAT CATEGORY 3: Mandatory 10-minute water break every 50 minutes under sun exposure.",
            rescheduling_recommendations=rescheduling
        )

weather_engine = WeatherAdvisoryEngine()
