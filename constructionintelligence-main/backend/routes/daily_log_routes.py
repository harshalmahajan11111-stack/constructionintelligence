from fastapi import APIRouter
from backend.models.daily_log_schemas import DailySiteLogRequest, DailySiteLogResponse
from backend.services.daily_log_engine import daily_log_engine

router = APIRouter(prefix="/daily-log", tags=["Daily Site Assistance"])

@router.post("/process-log", response_model=DailySiteLogResponse)
async def process_daily_log(request: DailySiteLogRequest):
    """Processes daily site notes into structured shift logs and subcontractor summaries."""
    return daily_log_engine.process_daily_log(request)
