from pydantic import BaseModel, Field
from typing import List, Optional

class WBSTask(BaseModel):
    task_id: str
    phase: str
    task_name: str
    start_day: int
    duration_days: int
    end_day: int
    dependencies: List[str]
    is_critical_path: bool
    assigned_trades: List[str]
    estimated_cost_usd: float
    milestone_deliverable: Optional[str] = None

class BudgetCategoryBreakdown(BaseModel):
    category: str
    budget_usd: float
    percentage_of_total: float
    contingency_reserve_usd: float

class ProjectPlanningRequest(BaseModel):
    project_title: str
    project_type: str = Field("Commercial High-Rise", description="Residential High-Rise, Commercial High-Rise, Industrial Warehouse, Highway Interchange")
    total_built_area_sqft: float = 185000
    target_duration_months: int = 18
    target_budget_usd: float = 24500000
    foundation_type: str = "Deep Bored Piles with Raft Cap"
    structural_system: str = "Reinforced Post-Tensioned Concrete + Steel Core"
    key_constraints: Optional[List[str]] = ["Monsoon window in months 4-6", "Restricted night noise permits", "Urban delivery curfew"]

class ProjectPlanningResponse(BaseModel):
    plan_id: str
    project_title: str
    project_type: str
    calculated_critical_path_days: int
    calculated_total_budget_usd: float
    contingency_fund_usd: float
    tasks: List[WBSTask]
    budget_breakdown: List[BudgetCategoryBreakdown]
    identified_bottlenecks: List[str]
    fast_tracking_recommendations: List[str]
