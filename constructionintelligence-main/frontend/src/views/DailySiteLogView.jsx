import React, { useState, useEffect } from 'react';
import { ClipboardList, Sparkles, Users, Truck, Wrench, ArrowRight, CheckCircle } from 'lucide-react';
import { processDailyLog } from '../services/api';

export default function DailySiteLogView() {
  const [loading, setLoading] = useState(false);
  const [logData, setLogData] = useState(null);
  const [date, setDate] = useState('2026-10-24');
  const [shift, setShift] = useState('Day Shift (07:00 - 16:30)');
  const [rawNotes, setRawNotes] = useState(
    'Day shift executed smoothly with 76 total workers on site. ' +
    'Successfully poured 240 m³ of C35/45 concrete for Level 14 core shear walls. ' +
    'Apex Formwork completed deck formwork. SteelCore placed 42.5 tons of Grade 60 rebar. ' +
    'Tower Crane 1 completed 42 hoist cycles without fault. ' +
    'Transit mixers 12-14 delayed by 35 mins due to downtown traffic, added retarding admix on site.'
  );

  const runLogProcessor = async () => {
    setLoading(true);
    try {
      const data = await processDailyLog({
        project_id: "PRJ-901",
        log_date: date,
        shift: shift,
        raw_supervisor_notes: rawNotes
      });
      setLogData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runLogProcessor();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="view-header">
        <div className="view-title-group">
          <h2>
            <ClipboardList size={28} color="var(--amber-400)" />
            <span>Site Logs</span>
          </h2>
          <p className="view-description">
            AI-powered daily shift log processing and reporting.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={runLogProcessor}
          disabled={loading}
        >
          <Sparkles size={16} />
          <span>{loading ? 'Processing...' : 'Process Log'}</span>
        </button>
      </div>

      <div className="two-col-grid">
        {/* Left Col: Field Notes Input & Shift Config */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Shift Log Input & Dictation</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Log Date</label>
              <input 
                type="date" 
                className="form-input" 
                value={date} 
                onChange={e => setDate(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Shift Window</label>
              <select className="form-select" value={shift} onChange={e => setShift(e.target.value)}>
                <option value="Day Shift (07:00 - 16:30)">Day Shift (07:00 - 16:30)</option>
                <option value="Swing Shift (16:30 - 00:30)">Swing Shift (16:30 - 00:30)</option>
                <option value="Night Curing (00:30 - 07:00)">Night Curing (00:30 - 07:00)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Supervisor Voice / Raw Shift Field Notes</label>
            <textarea 
              className="form-textarea" 
              rows={8}
              value={rawNotes} 
              onChange={e => setRawNotes(e.target.value)}
              placeholder="Paste raw shift observations, subcontractor work completed, equipment breakdowns, or deliveries..."
            />
          </div>

          {/* Quick Stats Banner */}
          <div style={{ marginTop: '16px', background: 'rgba(0,0,0,0.2)', padding: '14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>TOTAL MAN-HOURS</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--amber-400)' }}>
                {logData?.total_manhours_logged || 642.5} hrs
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>TRADES ACTIVE</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--cyan-accent)' }}>
                {logData?.trades_summary?.length || 5} Crews
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>COMPLIANCE STATUS</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <span className="badge badge-emerald">APPROVED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: AI Structured Output & Subcontractor Headcounts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Executive Summary */}
          <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid var(--amber-500)' }}>
            <h4 style={{ fontSize: '0.92rem', color: 'var(--amber-400)', marginBottom: '6px' }}>
              AI EXECUTIVE SHIFT SYNTHESIS
            </h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              {logData?.ai_generated_executive_summary}
            </p>
          </div>

          {/* Subcontractor Trade Headcount Table */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={16} color="var(--cyan-accent)" />
              <span>Trade Subcontractors & Workforce Deployment</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {logData?.trades_summary?.map((trade, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: '6px' }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '0.84rem' }}>{trade.trade_name}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginLeft: '8px' }}>({trade.work_location})</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span className="badge badge-amber">{trade.workers_present} Workers</span>
                    <span className="mono" style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{trade.shift_hours}h</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Heavy Equipment & Handover Protocol */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ArrowRight size={16} color="var(--emerald-success)" />
              <span>Next Shift Handover Protocol</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {logData?.next_shift_handover_instructions?.map((inst, i) => (
                <div key={i} style={{ fontSize: '0.82rem', color: 'var(--text-main)', display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--amber-400)', fontWeight: 700 }}>•</span>
                  <span>{inst}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
