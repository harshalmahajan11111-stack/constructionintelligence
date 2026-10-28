from fastapi import APIRouter
from backend.models.report_schemas import SiteAuditReportRequest, SiteAuditReportResponse
from backend.services.report_engine import report_engine

router = APIRouter(prefix="/report", tags=["Audit & Executive Reporting"])

@router.post("/generate", response_model=SiteAuditReportResponse)
async def generate_audit_report(request: SiteAuditReportRequest):
    """Generates comprehensive site audit report with risk radar and cryptographic signoff."""
    return report_engine.generate_audit_report(request)
