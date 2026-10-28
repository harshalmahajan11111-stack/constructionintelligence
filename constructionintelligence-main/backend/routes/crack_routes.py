from fastapi import APIRouter, UploadFile, File, Form
from typing import Optional
import base64
from backend.models.crack_schemas import CrackAnalysisRequest, CrackAnalysisResponse
from backend.services.crack_analyzer import crack_analyzer

router = APIRouter(prefix="/crack", tags=["Crack Detection & Analysis"])

@router.post("/analyze", response_model=CrackAnalysisResponse)
async def analyze_crack(request: CrackAnalysisRequest):
    """Analyzes concrete crack defect from structured parameters or image."""
    img_bytes = None
    if request.image_base64:
        try:
            clean_b64 = request.image_base64.split(",")[-1]
            img_bytes = base64.b64decode(clean_b64)
        except Exception:
            pass
    return crack_analyzer.analyze_crack(request, img_bytes)

@router.post("/upload-and-analyze", response_model=CrackAnalysisResponse)
async def upload_and_analyze_crack(
    file: UploadFile = File(...),
    structural_element: Optional[str] = Form("Column / Pillar"),
    concrete_grade: Optional[str] = Form("M35 / C35-45"),
    environmental_exposure: Optional[str] = Form("Exterior Sheltered"),
    crack_width_override_mm: Optional[float] = Form(None)
):
    """Direct file upload for structural crack severity and repair diagnostics."""
    contents = await file.read()
    request = CrackAnalysisRequest(
        structural_element=structural_element,
        concrete_grade=concrete_grade,
        environmental_exposure=environmental_exposure,
        crack_width_override_mm=crack_width_override_mm,
        image_filename=file.filename
    )
    return crack_analyzer.analyze_crack(request, contents)
