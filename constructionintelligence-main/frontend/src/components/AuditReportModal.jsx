import React from 'react';
import { X, Printer, ShieldCheck, CheckCircle2, AlertOctagon } from 'lucide-react';

export default function AuditReportModal({ isOpen, onClose, reportData }) {
  if (!isOpen || !reportData) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '950px' }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-card)', paddingBottom: '16px', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-amber">OFFICIAL ENGINEERING AUDIT</span>
              <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>ID: {reportData.report_id}</span>
            </div>
            <h2 style={{ fontSize: '1.45rem', marginTop: '4px' }}>Comprehensive Multimodal Site Audit & Compliance Certificate</h2>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-primary btn-sm" onClick={() => window.print()}>
              <Printer size={15} />
              <span>Print / Save PDF</span>
            </button>
            <button className="btn btn-secondary btn-sm" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Audit Metadata Banner */}
        <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          <div>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>PROJECT IDENTIFIER</span>
            <div style={{ fontWeight: 700 }}>{reportData.project_name}</div>
          </div>
          <div>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>CERTIFIED AUDITOR</span>
            <div style={{ fontWeight: 600 }}>{reportData.auditor_name}</div>
          </div>
          <div>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>INSPECTION DATE</span>
            <div className="mono" style={{ fontWeight: 600 }}>{reportData.inspection_date}</div>
          </div>
          <div>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>OVERALL HEALTH INDEX</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--amber-400)' }}>
              {reportData.overall_health_index}/100
            </div>
          </div>
        </div>

        {/* Executive Verdict */}
        <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(245, 158, 11, 0.08)', borderLeft: '4px solid var(--amber-500)', borderRadius: '0 8px 8px 0' }}>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--amber-400)', marginBottom: '4px' }}>EXECUTIVE AUDIT VERDICT</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>{reportData.executive_verdict}</p>
        </div>

        {/* Risk Radar Table */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '12px' }}>Site Risk Radar & Health Dimensions</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
            {reportData.risk_radar.map((dim, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{dim.category}</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: dim.score >= 80 ? 'var(--emerald-success)' : (dim.score >= 60 ? 'var(--amber-400)' : 'var(--rose-danger)') }}>
                  {dim.score}%
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '2px' }}>{dim.status}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Items */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertOctagon size={16} color="var(--rose-danger)" />
            <span>Mandatory Corrective Action Protocol</span>
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {reportData.key_action_items.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-card)' }}>
                <span className="mono" style={{ color: 'var(--amber-400)', fontWeight: 700 }}>0{idx + 1}.</span>
                <span style={{ fontSize: '0.85rem' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cryptographic Verification Seal */}
        <div style={{ padding: '16px', background: '#070B12', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={28} color="var(--emerald-success)" />
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--emerald-success)' }}>
                CRYPTOGRAPHICALLY SEALED AUDIT HASH
              </div>
              <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', wordBreak: 'break-all' }}>
                {reportData.engineer_signoff_hash}
              </div>
            </div>
          </div>
          <span className="badge badge-emerald">SEOR VERIFIED</span>
        </div>
      </div>
    </div>
  );
}
