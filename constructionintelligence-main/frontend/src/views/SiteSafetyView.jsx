import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, RefreshCw, Upload, FileText } from 'lucide-react';
import ImageAnnotator from '../components/ImageAnnotator';
import { analyzeSiteSafety } from '../services/api';

export default function SiteSafetyView() {
  const [loading, setLoading] = useState(false);
  const [safetyData, setSafetyData] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const [zone, setZone] = useState('Level 14 Slab & Column Zone');

  const samplePhotoUrl = '/samples/safety_site.jpg';

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const data = await analyzeSiteSafety({
        project_name: "Metropolitan Tower Phase II",
        zone: zone,
        image_filename: "safety_site.jpg"
      });
      setSafetyData(data);
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
            <ShieldAlert size={28} color="var(--amber-400)" />
            <span>Safety Monitoring</span>
          </h2>
          <p className="view-description">
            AI-powered PPE detection and hazard identification system.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn btn-primary"
            onClick={runAnalysis}
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>{loading ? 'Analyzing...' : 'Analyze'}</span>
          </button>
        </div>
      </div>

      {/* Main Analysis Grid */}
      <div className="two-col-grid">
        {/* Left Col: Interactive Image Canvas */}
        <div>
          <ImageAnnotator
            imageUrl={samplePhotoUrl}
            boxes={safetyData?.detections || []}
            selectedBox={selectedBox}
            onSelectBox={setSelectedBox}
            title="Active Inspection Camera (Zone C-4 / Level 14)"
          />

          {/* Selected Bounding Box Details */}
          {selectedBox && (
            <div className="glass-panel" style={{ padding: '16px', marginTop: '16px', borderLeft: '4px solid var(--cyan-accent)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: 'var(--cyan-accent)' }}>{selectedBox.label}</span>
                <span className="mono badge badge-cyan">{Math.round(selectedBox.confidence * 100)}% Confidence</span>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                {selectedBox.notes}
              </p>
            </div>
          )}
        </div>

        {/* Right Col: Safety Telemetry & OSHA Violations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Compliance Scorecard */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>OVERALL COMPLIANCE SCORE</span>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--amber-400)' }}>
                  {safetyData ? `${safetyData.overall_safety_score}/100` : '--'}
                </div>
              </div>
              <span className="badge badge-amber" style={{ fontSize: '0.85rem' }}>
                {safetyData?.risk_level || 'ELEVATED'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'rgba(0,0,0,0.2)', padding: '14px', borderRadius: '8px' }}>
              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>PPE WEAR RATE</span>
                <div style={{ fontWeight: 700, color: 'var(--emerald-success)' }}>
                  {safetyData?.ppe_compliance_rate || 92.5}%
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>ACTIVE CREW IN FRAME</span>
                <div style={{ fontWeight: 700 }}>
                  {safetyData?.detected_personnel_count || 3} Personnel
                </div>
              </div>
            </div>
          </div>

          {/* Active OSHA Hazards List */}
          <div className="glass-panel" style={{ padding: '24px', flex: 1 }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={18} color="var(--rose-danger)" />
              <span>Flagged OSHA 1926 Safety Hazards ({safetyData?.hazards?.length || 0})</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {safetyData?.hazards?.map((h) => (
                <div 
                  key={h.hazard_id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    borderLeft: `4px solid ${h.severity === 'HIGH' ? 'var(--rose-danger)' : 'var(--amber-500)'}`,
                    borderRadius: '0 8px 8px 0',
                    padding: '12px 16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{h.title}</span>
                    <span className={`badge ${h.severity === 'HIGH' ? 'badge-rose' : 'badge-amber'}`}>
                      {h.severity}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px' }}>{h.description}</p>
                  <div style={{ fontSize: '0.74rem', color: 'var(--cyan-accent)', fontFamily: 'var(--font-mono)' }}>
                    {h.osha_reference}
                  </div>
                  <div style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-main)', background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '4px' }}>
                    <strong>Action:</strong> {h.recommended_action}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Immediate Action Checklist */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="var(--emerald-success)" />
              <span>Safety Officer Corrective Signoff Actions</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {safetyData?.immediate_actions_required?.map((action, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '0.82rem' }}>
                  <input type="checkbox" defaultChecked={i === 0} style={{ marginTop: '3px' }} />
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
