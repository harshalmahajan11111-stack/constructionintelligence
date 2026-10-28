import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse

from backend.routes.safety_routes import router as safety_router
from backend.routes.crack_routes import router as crack_router
from backend.routes.valuation_routes import router as valuation_router
from backend.routes.planning_routes import router as planning_router
from backend.routes.daily_log_routes import router as daily_log_router
from backend.routes.weather_routes import router as weather_router
from backend.routes.knowledge_routes import router as knowledge_router
from backend.routes.report_routes import router as report_router

app = FastAPI(
    title="AI-Powered Multimodal Construction Intelligence Platform",
    description="Full-Stack Decision-Support System for Construction Planning, Execution, and Monitoring.",
    version="2.0.0"
)

# Cross-Origin Resource Sharing (CORS) setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register all 8 epic API routers
api_routers = [
    safety_router,
    crack_router,
    valuation_router,
    planning_router,
    daily_log_router,
    weather_router,
    knowledge_router,
    report_router,
]

# 1. Primary standard registration with /api prefix (e.g. /api/safety/analyze)
for r in api_routers:
    app.include_router(r, prefix="/api")

# 2. Dual direct registration without /api prefix (e.g. /safety/analyze) for backwards/client compatibility
for r in api_routers:
    app.include_router(r)

# Mount sample images directory if present
sample_dir = os.path.join(os.path.dirname(__file__), "sample_data")
if os.path.exists(sample_dir):
    app.mount("/sample_data", StaticFiles(directory=sample_dir), name="sample_data")

# Serve built frontend SPA if available
frontend_dist_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend", "dist")
if not os.path.exists(frontend_dist_dir):
    frontend_dist_dir = os.path.join(os.path.dirname(__file__), "frontend", "dist")

if os.path.exists(frontend_dist_dir):
    assets_dir = os.path.join(frontend_dist_dir, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

@app.get("/health")
@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "AI-Powered Multimodal Construction Intelligence Platform",
        "version": "2.0.0",
        "epics_active": 9,
        "engine_mode": "Multimodal AI + High-Fidelity Domain Engines"
    }

@app.get("/info")
@app.get("/api/info")
async def platform_info():
    return {
        "platform": "Multimodal Construction Intelligence Platform",
        "supported_epics": [
            "Site Safety Monitoring (PPE & Hazard Identification)",
            "Crack & Structural Defect Analysis",
            "Real Estate & Property Valuation",
            "Construction Project Planning & WBS",
            "Daily Site Assistant & Shift Logs",
            "Weather-Aware Construction Advisory",
            "Construction Knowledge & Building Standards Assistant",
            "Multimodal Inspection Studio & Image Annotation",
            "Executive Audit & Certification Reporting"
        ],
        "data_contract_specification": "Strict JSON / Pydantic v2 Validated"
    }

API_ROUTE_PREFIXES = (
    "api/", "safety", "crack", "valuation", "planning",
    "daily-log", "weather", "knowledge", "report", "health", "info"
)

@app.api_route("/{full_path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"], include_in_schema=False)
async def serve_spa_or_fallback(request: Request, full_path: str):
    clean_path = full_path.lstrip("/")
    
    # If this looks like an API route that wasn't matched above, return a clean JSON 404
    if clean_path.startswith("api/") or any(clean_path.startswith(prefix) for prefix in API_ROUTE_PREFIXES):
        return JSONResponse(
            status_code=404,
            content={"error": "Not Found", "message": f"API endpoint /{clean_path} does not exist."}
        )

    # For non-GET requests to web pages, return 405 Method Not Allowed
    if request.method not in ("GET", "HEAD"):
        return JSONResponse(
            status_code=405,
            content={"error": "Method Not Allowed", "message": f"Method {request.method} not allowed for /{clean_path}"}
        )

    if os.path.exists(frontend_dist_dir):
        candidate = os.path.join(frontend_dist_dir, full_path)
        if full_path and os.path.isfile(candidate):
            return FileResponse(candidate)
        index_file = os.path.join(frontend_dist_dir, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)

    return JSONResponse(
        status_code=404,
        content={"error": "Frontend build not found. Run 'npm run build' inside frontend/."}
    )

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"error": "InternalServerError", "message": str(exc)}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
