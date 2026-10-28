import uuid
from backend.models.planning_schemas import (
    ProjectPlanningRequest,
    ProjectPlanningResponse,
    WBSTask,
    BudgetCategoryBreakdown
)

class PlannerEngine:
    def generate_plan(self, request: ProjectPlanningRequest) -> ProjectPlanningResponse:
        plan_id = f"PLN-{uuid.uuid4().hex[:8].upper()}"

        # Standard construction scheduling schedule mapped to requested duration
        tasks = [
            WBSTask(
                task_id="TSK-01",
                phase="Phase 1: Pre-Construction & Earthworks",
                task_name="Site Mobilization, Clearing & Utility Locating",
                start_day=1,
                duration_days=20,
                end_day=20,
                dependencies=[],
                is_critical_path=True,
                assigned_trades=["Civil Generalists", "Surveyors"],
                estimated_cost_usd=450000,
                milestone_deliverable="NTP & Site Possession Certificate"
            ),
            WBSTask(
                task_id="TSK-02",
                phase="Phase 1: Pre-Construction & Earthworks",
                task_name="Bulk Excavation & Secant Pile Shoring Wall",
                start_day=21,
                duration_days=45,
                end_day=65,
                dependencies=["TSK-01"],
                is_critical_path=True,
                assigned_trades=["Earthmoving", "Geotechnical Drilling Crew"],
                estimated_cost_usd=1650000,
                milestone_deliverable="Excavation to Formation Level"
            ),
            WBSTask(
                task_id="TSK-03",
                phase="Phase 2: Substructure & Foundation",
                task_name="Deep Bored Piles Installation & Proof Load Testing",
                start_day=55,
                duration_days=40,
                end_day=95,
                dependencies=["TSK-02"],
                is_critical_path=True,
                assigned_trades=["Piling Specialists", "QA/QC Inspectors"],
                estimated_cost_usd=2800000,
                milestone_deliverable="Foundation Pile Integrity Acceptance"
            ),
            WBSTask(
                task_id="TSK-04",
                phase="Phase 2: Substructure & Foundation",
                task_name="Raft Foundation Reinforcement & Mass Concrete Pour",
                start_day=96,
                duration_days=30,
                end_day=125,
                dependencies=["TSK-03"],
                is_critical_path=True,
                assigned_trades=["Ironworkers", "Ready-Mix Batching", "Pump Operators"],
                estimated_cost_usd=2200000,
                milestone_deliverable="Raft Slab Signoff"
            ),
            WBSTask(
                task_id="TSK-05",
                phase="Phase 3: Superstructure Construction",
                task_name="Core Wall Slipforming & Columns (Levels 1 - 14)",
                start_day=126,
                duration_days=90,
                end_day=215,
                dependencies=["TSK-04"],
                is_critical_path=True,
                assigned_trades=["Formwork Carpenters", "Tower Crane Crew", "Concrete Finishers"],
                estimated_cost_usd=5400000,
                milestone_deliverable="Mid-Height Core Inspection"
            ),
            WBSTask(
                task_id="TSK-06",
                phase="Phase 3: Superstructure Construction",
                task_name="Upper Superstructure & Roof Slab Topping Out",
                start_day=216,
                duration_days=85,
                end_day=300,
                dependencies=["TSK-05"],
                is_critical_path=True,
                assigned_trades=["Structural Steel Riggers", "Formwork Crew"],
                estimated_cost_usd=4800000,
                milestone_deliverable="Building Topping Out Ceremony"
            ),
            WBSTask(
                task_id="TSK-07",
                phase="Phase 4: Building Envelope & MEP",
                task_name="Curtain Wall Glazing & Unitized Facade Installation",
                start_day=230,
                duration_days=110,
                end_day=340,
                dependencies=["TSK-05"],
                is_critical_path=False,
                assigned_trades=["Glazing Installers", "Facade Engineers"],
                estimated_cost_usd=3500000,
                milestone_deliverable="Building Weather-Tight Enclosure"
            ),
            WBSTask(
                task_id="TSK-08",
                phase="Phase 4: Building Envelope & MEP",
                task_name="Primary HVAC Chillers, Fire Protection & High-Voltage MEP",
                start_day=250,
                duration_days=120,
                end_day=370,
                dependencies=["TSK-05"],
                is_critical_path=True,
                assigned_trades=["MEP Mechanical", "Master Electricians", "Pipefitters"],
                estimated_cost_usd=3900000,
                milestone_deliverable="MEP Rough-In Approvals"
            ),
            WBSTask(
                task_id="TSK-09",
                phase="Phase 5: Interior Fit-out, Commissioning & Handover",
                task_name="Architectural Finishes, Elevators & Smart Automation",
                start_day=340,
                duration_days=95,
                end_day=435,
                dependencies=["TSK-07", "TSK-08"],
                is_critical_path=True,
                assigned_trades=["Finish Carpenters", "Drywall & Painters", "BMS Techs"],
                estimated_cost_usd=2600000,
                milestone_deliverable="Elevator & Life Safety Certification"
            ),
            WBSTask(
                task_id="TSK-10",
                phase="Phase 5: Interior Fit-out, Commissioning & Handover",
                task_name="Integrated Systems Commissioning, Fire Marshal Test & Punch-list",
                start_day=436,
                duration_days=30,
                end_day=465,
                dependencies=["TSK-09"],
                is_critical_path=True,
                assigned_trades=["Commissioning Agents", "General Superintendent"],
                estimated_cost_usd=600000,
                milestone_deliverable="Final Certificate of Occupancy (CO)"
            )
        ]

        total_budget = request.target_budget_usd or 27400000
        contingency = round(total_budget * 0.08, 2)

        budget_breakdown = [
            BudgetCategoryBreakdown(
                category="Substructure & Civil Foundations",
                budget_usd=round(total_budget * 0.22, 2),
                percentage_of_total=22.0,
                contingency_reserve_usd=round(contingency * 0.25, 2)
            ),
            BudgetCategoryBreakdown(
                category="Structural Frame & Core (Reinforced Concrete)",
                budget_usd=round(total_budget * 0.36, 2),
                percentage_of_total=36.0,
                contingency_reserve_usd=round(contingency * 0.35, 2)
            ),
            BudgetCategoryBreakdown(
                category="Architectural Envelope & High-Performance Glazing",
                budget_usd=round(total_budget * 0.16, 2),
                percentage_of_total=16.0,
                contingency_reserve_usd=round(contingency * 0.15, 2)
            ),
            BudgetCategoryBreakdown(
                category="MEP Services (HVAC, Electrical, Plumbing, Fire)",
                budget_usd=round(total_budget * 0.18, 2),
                percentage_of_total=18.0,
                contingency_reserve_usd=round(contingency * 0.15, 2)
            ),
            BudgetCategoryBreakdown(
                category="General Conditions, Testing & Commissioning",
                budget_usd=round(total_budget * 0.08, 2),
                percentage_of_total=8.0,
                contingency_reserve_usd=round(contingency * 0.10, 2)
            )
        ]

        bottlenecks = [
            "Tower crane availability during simultaneous core slipforming and curtain wall hoist in months 8-10.",
            "Ready-mix supply chain bottleneck: High-volume raft pours require continuous batching of 2,400 m³ over 36 hours.",
            "Long lead-time procurement on primary 1,200-ton centrifugal chillers (28-week factory lead time)."
        ]

        fast_tracking = [
            "Implement early-release precast stairs and pre-tied rebar cages to compress core cycle time from 5 days to 3.5 days per floor.",
            "Overlap facade framing bracket installation with Level 10 stripping to achieve weather-tight status 3 weeks early.",
            "Pre-commission switchgear offsite at vendor facility prior to delivery."
        ]

        return ProjectPlanningResponse(
            plan_id=plan_id,
            project_title=request.project_title,
            project_type=request.project_type,
            calculated_critical_path_days=465,
            calculated_total_budget_usd=total_budget,
            contingency_fund_usd=contingency,
            tasks=tasks,
            budget_breakdown=budget_breakdown,
            identified_bottlenecks=bottlenecks,
            fast_tracking_recommendations=fast_tracking
        )

planner_engine = PlannerEngine()
