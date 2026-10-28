from fastapi import APIRouter, UploadFile, File, Form
from typing import Optional
import base64
from backend.models.safety_schemas import SiteSafetyAnalysisRequest, SiteSafetyAnalysisResponse
from backend.services.safety_engine import safety_engine

router = APIRouter(prefix="/safety", tags=["Site Safety Monitoring"])

@router.post("/analyze", response_model=SiteSafetyAnalysisResponse)
async def analyze_site_safety(request: SiteSafetyAnalysisRequest):
    """Performs multimodal AI safety monitoring from JSON payload or base64."""
    img_bytes = None
    if request.image_base64:
        try:
            clean_b64 = request.image_base64.split(",")[-1]
            img_bytes = base64.b64decode(clean_b64)
        except Exception:
            pass
    return safety_engine.analyze_site_safety(request, img_bytes)

@router.post("/upload-and-analyze", response_model=SiteSafetyAnalysisResponse)
async def upload_and_analyze_site_safety(
    file: UploadFile = File(...),
    project_name: Optional[str] = Form("Metropolitan Tower Phase II"),
    zone: Optional[str] = Form("Level 14 Slab")
):
    """Direct file upload endpoint for visual PPE & hazard inspection."""
    contents = await file.read()
    request = SiteSafetyAnalysisRequest(
        project_name=project_name,
        zone=zone,
        image_filename=file.filename
    )
    return safety_engine.analyze_site_safety(request, contents)
