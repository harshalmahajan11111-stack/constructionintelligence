# BuildIQ Analytics Platform

A smart construction intelligence platform for safety monitoring, structural analysis, property valuation, and project planning. Powered by a **FastAPI (Python)** backend and a **React.js** frontend with **AI-powered analytics** and strict **JSON/Pydantic v2 data contracts**.

---

## 🏗️ System Architecture & Stack

```
AI-Powered Multimodal Construction Intelligence Platform
├── Frontend (React.js + Vite + Lucide + Chart.js)
│   ├── Industrial Dark Architectural Design System (Vanilla CSS + Outfit/Inter/JetBrains Mono)
│   ├── Interactive Image Annotator & Bounding Box Visualizer
│   ├── Critical Path Gantt Chart Scheduler
│   ├── Live JSON Contract Inspector Modal
│   └── Executive Audit Report & Digital Certificate Studio
│
└── Backend (FastAPI + Pydantic v2 + Pillow + Uvicorn)
    ├── Multimodal LLM Service (Dual-engine: Live Gemini API + Deterministic AI Vision Diagnostics)
    ├── 8 Modular REST Routers
    ├── 7 Engineering Domain Engines
    └── 10 Automated Integration Tests (100% Pass)
```

---

## 🎯 9 Core Epics & 18 Tasks Implemented

### **Epic 1: System Foundation & Multimodal Engine (Core Infrastructure)**
- **Task 1: Core FastAPI Service Architecture:** REST API with CORS, structured envelopes, and Pydantic v2 schemas.
- **Task 2: Multimodal LLM Integration Layer:** Ingests base64/multipart construction imagery and generates structured engineering diagnostics.

### **Epic 2: Construction Site Safety Monitoring (PPE & Hazard Intelligence)**
- **Task 3: Visual PPE & Edge Protection Analyzer:** Detects ANSI Z89.1 hardhats, Class 2 hi-vis vests, full-body harnesses, and calculates compliance rates.
- **Task 4: Interactive Safety Dashboard:** Renders normalized `[ymin, xmin, ymax, xmax]` bounding boxes, OSHA 1926 hazard tags, and instant corrective protocols.

### **Epic 3: Crack Detection & Structural Defect Analysis**
- **Task 5: Structural Defect Diagnostics:** Classifies diagonal shear cracks vs flexural vs shrinkage, calibrates millimeter apertures (e.g. 3.85mm), and scores severity (0–100).
- **Task 6: Code-Compliant Repair Methodology Generator:** Outputs specifications for high-modulus epoxy pressure injection (ASTM C881), carbon-fiber wrap (ACI 440.2R), and Avongard tell-tale monitoring.

### **Epic 4: Real Estate & Construction Valuation Estimator**
- **Task 7: Algorithmic Valuation Engine:** Evaluates location tiers, construction grade multipliers (Grade A+ Luxury to Grade C), stage completion, and LEED Gold bonuses.
- **Task 8: Valuation Studio & Sensitivity Matrix:** Calculates total asset valuation, price/sqft, 5-year annualized ROI, and comps table.

### **Epic 5: Construction Project Planning & Scheduling (WBS & CPM)**
- **Task 9: Automated WBS Schedule Generator:** Multi-phase breakdown (Earthworks, Substructure, Superstructure, Envelope/MEP, Commissioning).
- **Task 10: Interactive Gantt Visualizer & Critical Path:** Calculates 465-day critical path, dependencies, bottleneck alerts, and contingency fund allocations.

### **Epic 6: Daily Site Assistant & Operational Log Manager**
- **Task 11: Shift Log & Trade Workforce Tracker:** Records man-hours, active subcontractor trades, heavy machinery uptime, and material delivery tickets.
- **Task 12: Natural Language Note Parser:** Automatically parses unstructured supervisor voice/text dictation into structured executive shift reports.

### **Epic 7: Weather-Aware Construction Advisory**
- **Task 13: Environmental Micro-Climate Risk Engine:** Hourly workability index evaluating temperature, wind gusts, humidity, and rainfall.
- **Task 14: Predictive Weather Safety Alert Center:** ASME B30.3 crane 38 km/h wind cut-off warnings and ACI 305R hot-weather concrete hydration precautions.

### **Epic 8: Construction Knowledge & Building Standards Hub**
- **Task 15: AI Building Code Q&A Assistant:** Searchable standards base with verified citations (IBC 2024, ACI 318, OSHA 1926, IS 456, Eurocodes).
- **Task 16: Interactive QA/QC Compliance Checker:** Slump tolerances, cylinder sampling rates, and formwork stripping criteria.

### **Epic 9: Unified Multimodal Inspection Studio & Audit Reporting**
- **Task 17: Multimodal Inspection Canvas:** Multi-angle image switcher, custom photo upload, and instant inference.
- **Task 18: Executive Audit Certificate Generator:** Official printable report with 5-axis site risk radar and a cryptographic SHA-256 engineer sign-off hash.

---

## 🚀 Quick Start Guide

### 1. Launch Platform with 1 Click
Double-click `start_platform.bat` in the project root:
```bat
start_platform.bat
```
This automatically starts both the FastAPI backend (`http://localhost:8000`) and the React Vite frontend (`http://localhost:5173`) and launches your browser.

### 2. Manual Launch

**Backend (FastAPI):**
```bash
run_backend.bat
# Or manually:
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```
Swagger API Documentation is available at: [http://localhost:8000/docs](http://localhost:8000/docs)

**Frontend (React Vite):**
```bash
run_frontend.bat
# Or manually:
cd frontend
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Running Automated Tests

Run the complete 10-test suite verifying all 9 epics and strict JSON data contracts:
```bash
python -m pytest backend/tests/test_platform.py -v
```
**Test Results: 10 / 10 PASSED (100% Success Rate)**
- `test_health_check` PASSED
- `test_platform_info` PASSED
- `test_safety_analysis` PASSED
- `test_crack_analysis` PASSED
- `test_real_estate_valuation` PASSED
- `test_project_planning` PASSED
- `test_daily_log_processing` PASSED
- `test_weather_advisory` PASSED
- `test_knowledge_query` PASSED
- `test_site_audit_report` PASSED

---

## 📜 Strict JSON Data Contracts Overview

All requests and responses conform to strict Pydantic v2 schemas. Live contracts can be inspected directly in the UI via the **"JSON Contracts"** button on the navigation bar.

Sample Contract (Site Safety):
```json
{
  "analysis_id": "SAFE-8B7C9D2E",
  "project_name": "Metropolitan Tower Phase II",
  "overall_safety_score": 88,
  "risk_level": "ELEVATED",
  "ppe_compliance_rate": 92.5,
  "detections": [
    {
      "label": "White Hardhat (ANSI Z89.1)",
      "confidence": 0.96,
      "box_2d": [528, 575, 574, 624],
      "status": "compliant"
    }
  ],
  "hazards": [
    {
      "category": "Housekeeping & Trip Risks",
      "severity": "MEDIUM",
      "osha_reference": "OSHA 1926.25(a) Housekeeping",
      "recommended_action": "Install yellow heavy-duty crossover cable ramps."
    }
  ]
}
```
