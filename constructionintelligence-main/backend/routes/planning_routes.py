from fastapi import APIRouter
from backend.models.planning_schemas import ProjectPlanningRequest, ProjectPlanningResponse
from backend.services.planner_engine import planner_engine

router = APIRouter(prefix="/planning", tags=["Project Planning & Scheduling"])

@router.post("/generate-plan", response_model=ProjectPlanningResponse)
async def generate_project_plan(request: ProjectPlanningRequest):
    """Generates automated WBS schedule, critical path, and budget breakdown."""
    return planner_engine.generate_plan(request)
