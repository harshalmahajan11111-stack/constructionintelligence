import uuid
import hashlib
import datetime
from backend.models.report_schemas import (
    SiteAuditReportRequest,
    SiteAuditReportResponse,
    RiskRadarDimension
)
from backend.services.safety_engine import safety_engine
from backend.services.crack_analyzer import crack_analyzer
from backend.services.valuation_engine import valuation_engine
from backend.services.planner_engine import planner_engine
from backend.services.weather_engine import weather_engine
from backend.models.safety_schemas import SiteSafetyAnalysisRequest
from backend.models.crack_schemas import CrackAnalysisRequest
from backend.models.valuation_schemas import RealEstateValuationRequest
from backend.models.planning_schemas import ProjectPlanningRequest
from backend.models.weather_schemas import WeatherAdvisoryRequest

class ReportEngine:
    def generate_audit_report(self, request: SiteAuditReportRequest) -> SiteAuditReportResponse:
        report_id = f"AUDIT-{uuid.uuid4().hex[:8].upper()}"
        inspection_date = request.inspection_date or datetime.date.today().isoformat()

        # Gather modular intelligence
        safety_resp = safety_engine.analyze_site_safety(SiteSafetyAnalysisRequest(project_name=request.project_name))
        crack_resp = crack_analyzer.analyze_crack(CrackAnalysisRequest(structural_element="Pillar 14 - Level 2 Shear Column"))
        val_resp = valuation_engine.estimate_valuation(RealEstateValuationRequest(property_title=request.project_name, built_up_area_sqft=185000))
        plan_resp = planner_engine.generate_plan(ProjectPlanningRequest(project_title=request.project_name))
        weather_resp = weather_engine.get_weather_advisory(WeatherAdvisoryRequest(site_location="Downtown Metropolitan Project Site"))

        # Risk Radar Dimensions (Score 0-100, where higher is healthier/safer)
        risk_radar = [
            RiskRadarDimension(category="Site Safety & PPE", score=safety_resp.overall_safety_score, status="GOOD (88/100)"),
            RiskRadarDimension(category="Structural Integrity", score=100 - crack_resp.severity_score, status="ATTENTION (16/100 - Critical Shear Crack)"),
            RiskRadarDimension(category="Schedule Adherence", score=82, status="ON_TRACK (Critical Path 465d)"),
            RiskRadarDimension(category="Financial & Valuation", score=91, status="EXCELLENT ($91.4M Est)"),
            RiskRadarDimension(category="Weather & Environmental", score=74, status="MODERATE (Afternoon Crane Hold)")
        ]

        overall_health = round(sum(d.score for d in risk_radar) / len(risk_radar))

        exec_verdict = (
            f"Project '{request.project_name}' exhibits strong economic metrics and high PPE compliance ({safety_resp.ppe_compliance_rate}%), "
            f"but requires IMMEDIATE STRUCTURAL REMEDIATION on Pillar 14 due to a 3.85mm diagonal shear crack. "
            f"Overall construction health score is {overall_health}/100 (CONDITIONAL APPROVAL)."
        )

        actions = [
            "Issue emergency shoring order for Column 14 (Level 2) and execute carbon-fiber/epoxy injection per ACI 546R.",
            "Weather-vane Tower Cranes 1 & 2 prior to 15:00 wind gust window (forecast 42 km/h).",
            "Route trailing air hoses through protected cable ramps to resolve OSHA 1926.25(a) trip violation.",
            "Maintain continuous wet burlap misting on newly stripped Level 14 core shear walls (ACI 308R)."
        ]

        # Generate cryptographic verification sign-off hash
        hash_seed = f"{report_id}:{request.project_id}:{request.auditor_name}:{inspection_date}:{overall_health}"
        signoff_hash = hashlib.sha256(hash_seed.encode("utf-8")).hexdigest()

        return SiteAuditReportResponse(
            report_id=report_id,
            project_id=request.project_id,
            project_name=request.project_name,
            auditor_name=request.auditor_name,
            inspection_date=inspection_date,
            executive_verdict=exec_verdict,
            overall_health_index=overall_health,
            risk_radar=risk_radar,
            safety_summary={
                "safety_score": safety_resp.overall_safety_score,
                "ppe_rate": safety_resp.ppe_compliance_rate,
                "active_hazards_count": len(safety_resp.hazards),
                "osha_status": "Conditional Compliance"
            },
            structural_integrity_summary={
                "defect_element": crack_resp.structural_element,
                "defect_type": crack_resp.crack_type,
                "measured_aperture_mm": crack_resp.geometry.estimated_width_mm,
                "severity_score": crack_resp.severity_score,
                "risk_classification": crack_resp.structural_risk_level
            },
            schedule_variance_summary={
                "critical_path_days": plan_resp.calculated_critical_path_days,
                "total_budget_usd": plan_resp.calculated_total_budget_usd,
                "contingency_fund_usd": plan_resp.contingency_fund_usd,
                "total_milestones": len(plan_resp.tasks)
            },
            financial_valuation_summary={
                "estimated_value_usd": val_resp.estimated_total_value_usd,
                "price_per_sqft_usd": val_resp.price_per_sqft_usd,
                "roi_projection_5yr": val_resp.roi_projection_5yr_annualized
            },
            environmental_weather_risk={
                "overall_workability": weather_resp.overall_workability_rating,
                "active_weather_alerts_count": len(weather_resp.critical_weather_warnings),
                "crane_lift_status_current": weather_resp.slots[0].crane_lift_status
            },
            key_action_items=actions,
            engineer_signoff_hash=signoff_hash
        )

report_engine = ReportEngine()
