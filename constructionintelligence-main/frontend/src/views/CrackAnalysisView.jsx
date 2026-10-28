import React, { useState, useEffect } from 'react';
import { Activity, AlertOctagon, Wrench, ShieldAlert, Ruler, BookOpen, RefreshCw } from 'lucide-react';
import { analyzeCrack } from '../services/api';

export default function CrackAnalysisView() {
  const [loading, setLoading] = useState(false);
  const [crackData, setCrackData] = useState(null);
  const [element, setElement] = useState('Column / Pillar 14');
  const [crackWidth, setCrackWidth] = useState(3.85);

  const sampleCrackUrl = '/samples/crack_column.jpg';

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const data = await analyzeCrack({
        structural_element: element,
        concrete_grade: "M35 / C35-45",
        environmental_exposure: "Exterior Sheltered",
        crack_width_override_mm: parseFloat(crackWidth)
      });
      setCrackData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runAnalysis();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="view-header">
        <div className="view-title-group">
          <h2>
            <Activity size={28} color="var(--rose-danger)" />
            <span>Defect Analysis</span>
          </h2>
          <p className="view-description">
            Structural crack detection and repair recommendations.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={runAnalysis}
          disabled={loading}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          <span>{loading ? 'Analyzing...' : 'Analyze'}</span>
        </button>
      </div>

      <div className="two-col-grid">
        {/* Left Col: High-Res Macro Image & Defect Geometry */}
        <div>
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Ruler size={18} color="var(--amber-400)" />
                <span>Macro Optical Inspection (Pillar 14 Core)</span>
              </h3>
              <span className="badge badge-rose">CRITICAL APERTURE EXCEEDED</span>
            </div>

            <div className="annotator-container" style={{ minHeight: '340px' }}>
              <img 
                src={sampleCrackUrl} 
                alt="Crack defect macro"
                className="annotator-image"
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  background: 'rgba(0,0,0,0.8)',
                  backdropFilter: 'blur(8px)',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-subtle)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--amber-400)'
                }}
              >
                Millimeter Calibration Ruler Detected • Scale: 10mm = 240px
              </div>
            </div>

            {/* Interactive Param Slider */}
            <div style={{ marginTop: '16px', background: 'rgba(0,0,0,0.2)', padding: '14px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.84rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Calibrated Surface Crack Width (mm):</span>
                <span className="mono" style={{ fontWeight: 700, color: 'var(--rose-danger)' }}>{crackWidth} mm</span>
              </div>
              <input 
                type="range" 
                min="0.1" 
                max="8.0" 
                step="0.05"
                value={crackWidth}
                onChange={(e) => setCrackWidth(e.target.value)}
                style={{ width: '100%', accentColor: 'var(--rose-danger)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                <span>0.1mm (Hairline)</span>
                <span>0.3mm (ACI 224R Limit)</span>
                <span>8.0mm (Severe Structural Failure)</span>
              </div>
            </div>
          </div>

          {/* Diagnostic Root Cause */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', color: 'var(--amber-400)' }}>
              ROOT CAUSE DIAGNOSIS & REBAR INTEGRITY
            </h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '12px' }}>
              {crackData?.root_cause_diagnosis}
            </p>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span className="badge badge-rose">Rebar Status:</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{crackData?.rebar_corrosion_risk}</span>
            </div>
          </div>
        </div>

        {/* Right Col: Severity Telemetry, Repair Methods, Codes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Defect Severity Scorecard */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>DEFECT SEVERITY INDEX</span>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--rose-danger)' }}>
                  {crackData?.severity_score || 84}/100
                </div>
              </div>
              <span className="badge badge-rose" style={{ fontSize: '0.82rem' }}>
                {crackData?.structural_risk_level || 'CRITICAL'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', fontSize: '0.8rem' }}>
              <div>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.72rem' }}>ORIENTATION</span>
                <div style={{ fontWeight: 600 }}>{crackData?.geometry?.orientation}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.72rem' }}>LENGTH</span>
                <div style={{ fontWeight: 600 }}>{crackData?.geometry?.estimated_length_cm} cm</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.72rem' }}>DEPTH CLASS</span>
                <div style={{ fontWeight: 600 }}>{crackData?.geometry?.depth_classification}</div>
              </div>
            </div>
          </div>

          {/* Code-Compliant Repair Specifications */}
          <div className="glass-panel" style={{ padding: '24px', flex: 1 }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wrench size={18} color="var(--amber-400)" />
              <span>Recommended Structural Repair Methodologies</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {crackData?.repair_options?.map((opt, i) => (
                <div 
                  key={i}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '14px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--amber-400)' }}>{opt.method_name}</span>
                    <span className="mono badge badge-amber">{opt.estimated_cost_range_usd}</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{opt.applicability}</p>
                  <div style={{ fontSize: '0.75rem', color: 'var(--cyan-accent)', fontFamily: 'var(--font-mono)', marginBottom: '6px' }}>
                    Standard: {opt.astm_aci_standard}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {opt.materials_required.map((mat, mi) => (
                      <span key={mi} style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Applicable Building Codes */}
          <div className="glass-panel" style={{ padding: '18px' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={16} color="var(--cyan-accent)" />
              <span>Governing Engineering Codes</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              {crackData?.relevant_codes?.map((code, ci) => (
                <div key={ci}>• {code}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
