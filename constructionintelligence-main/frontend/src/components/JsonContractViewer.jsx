import React, { useState } from 'react';
import { X, Code2, Copy, Check } from 'lucide-react';

export default function JsonContractViewer({ isOpen, onClose }) {
  const [activeSchema, setActiveSchema] = useState('safety');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const contracts = {
    safety: {
      title: "Epic 2: Site Safety Monitoring Contract",
      endpoint: "POST /api/safety/analyze",
      requestSchema: `{
  "project_name": "string (optional)",
  "zone": "string (optional)",
  "image_base64": "string (optional base64 image)",
  "image_filename": "string (optional)",
  "additional_notes": "string (optional)"
}`,
      responseSchema: `{
  "analysis_id": "string (e.g. SAFE-A1B2C3D4)",
  "timestamp": "ISO-8601 string",
  "project_name": "string",
  "zone": "string",
  "overall_safety_score": "int (0 - 100)",
  "risk_level": "LOW | ELEVATED | HIGH | IMMINENT_DANGER",
  "detected_personnel_count": "int",
  "ppe_compliance_rate": "float (0.0 - 100.0)",
  "detections": [
    {
      "label": "string",
      "confidence": "float (0.0 - 1.0)",
      "box_2d": [ymin, xmin, ymax, xmax],
      "status": "compliant | violation | warning",
      "notes": "string"
    }
  ],
  "hazards": [
    {
      "hazard_id": "string",
      "category": "PPE | Fall Protection | Electrical | Scaffolding",
      "title": "string",
      "description": "string",
      "severity": "LOW | MEDIUM | HIGH | CRITICAL",
      "osha_reference": "string (e.g. OSHA 1926.100)",
      "recommended_action": "string"
    }
  ],
  "osha_compliance_summary": "string",
  "immediate_actions_required": ["string"],
  "supervisor_signoff_ready": "boolean"
}`
    },
    crack: {
      title: "Epic 3: Crack Detection & Defect Analysis Contract",
      endpoint: "POST /api/crack/analyze",
      requestSchema: `{
  "structural_element": "Column | Beam | Slab | Wall",
  "concrete_grade": "string (e.g. M35 / C35-45)",
  "age_of_structure_years": "float",
  "image_base64": "string (optional)",
  "environmental_exposure": "string",
  "crack_width_override_mm": "float (optional)"
}`,
      responseSchema: `{
  "analysis_id": "string (e.g. CRK-78A9B0C1)",
  "structural_element": "string",
  "concrete_grade": "string",
  "crack_type": "string (Shear Crack | Flexural | Shrinkage)",
  "geometry": {
    "orientation": "Diagonal | Vertical | Horizontal",
    "estimated_width_mm": "float",
    "estimated_length_cm": "float",
    "depth_classification": "string",
    "exposure_condition": "string"
  },
  "severity_score": "int (0 - 100)",
  "structural_risk_level": "NEGLIGIBLE | MONITOR | REPAIR_SOON | CRITICAL",
  "root_cause_diagnosis": "string",
  "rebar_corrosion_risk": "string",
  "repair_options": [
    {
      "method_name": "string",
      "applicability": "string",
      "materials_required": ["string"],
      "estimated_cost_range_usd": "string",
      "expected_service_life_years": "string",
      "astm_aci_standard": "string"
    }
  ],
  "relevant_codes": ["string"]
}`
    },
    valuation: {
      title: "Epic 4: Real Estate Valuation Contract",
      endpoint: "POST /api/valuation/estimate",
      requestSchema: `{
  "property_title": "string",
  "property_type": "Commercial Office | Residential",
  "built_up_area_sqft": "float (> 0)",
  "location_tier": "Tier 1 Prime CBD | Tier 2 Suburban",
  "construction_grade": "Grade A+ Luxury | Grade A Standard",
  "number_of_floors": "int",
  "parking_bays": "int",
  "smart_building_certification": "LEED Gold | Platinum"
}`,
      responseSchema: `{
  "valuation_id": "string",
  "project_title": "string",
  "estimated_total_value_usd": "float",
  "value_range_min_usd": "float",
  "value_range_max_usd": "float",
  "price_per_sqft_usd": "float",
  "factors_breakdown": [
    {
      "factor_name": "string",
      "weight_percentage": "float",
      "contribution_amount_usd": "float",
      "description": "string"
    }
  ],
  "comparables": [
    {
      "property_name": "string",
      "distance_km": "float",
      "sale_price_usd": "float",
      "price_per_sqft": "float",
      "similarity_index": "float"
    }
  ],
  "roi_projection_5yr_annualized": "float",
  "valuation_verdict": "string"
}`
    },
    audit: {
      title: "Epic 9: Executive Site Audit Report Contract",
      endpoint: "POST /api/report/generate",
      requestSchema: `{
  "project_id": "string",
  "project_name": "string",
  "auditor_name": "string",
  "inspection_date": "string"
}`,
      responseSchema: `{
  "report_id": "string",
  "executive_verdict": "string",
  "overall_health_index": "int (0 - 100)",
  "risk_radar": [
    {
      "category": "string",
      "score": "int",
      "status": "string"
    }
  ],
  "key_action_items": ["string"],
  "engineer_signoff_hash": "64-char SHA256 string"
}`
    }
  };

  const current = contracts[activeSchema];

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(current, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Code2 size={24} color="var(--amber-400)" />
            <div>
              <h2 style={{ fontSize: '1.3rem' }}>Strict JSON Data Contracts</h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Deterministic Pydantic v2 schemas guaranteeing frontend stability and AI integration reliability
              </span>
            </div>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Schema Selector Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border-card)', paddingBottom: '12px' }}>
          {Object.keys(contracts).map(key => (
            <button
              key={key}
              className={`btn btn-sm ${activeSchema === key ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveSchema(key)}
            >
              {key.toUpperCase()} CONTRACT
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div>
            <span style={{ fontWeight: 700, color: 'var(--amber-400)' }}>{current.title}</span>
            <span className="mono" style={{ marginLeft: '12px', fontSize: '0.8rem', color: 'var(--cyan-accent)' }}>{current.endpoint}</span>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={handleCopy}>
            {copied ? <Check size={14} color="var(--emerald-success)" /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy Spec'}</span>
          </button>
        </div>

        <div className="two-col-grid" style={{ gap: '16px' }}>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
              REQUEST JSON SCHEMA
            </div>
            <pre className="mono" style={{ background: '#070B12', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '0.76rem', color: '#38BDF8', overflowX: 'auto', maxHeight: '340px' }}>
              {current.requestSchema}
            </pre>
          </div>

          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
              RESPONSE JSON SCHEMA
            </div>
            <pre className="mono" style={{ background: '#070B12', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '0.76rem', color: '#4ADE80', overflowX: 'auto', maxHeight: '340px' }}>
              {current.responseSchema}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
