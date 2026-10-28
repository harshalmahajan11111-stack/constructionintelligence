import React, { useState, useEffect } from 'react';
import { CalendarDays, GitBranch, IndianRupee, Clock, RefreshCw, Zap, AlertTriangle } from 'lucide-react';
import GanttChart from '../components/GanttChart';
import { generateProjectPlan } from '../services/api';

export default function ProjectPlanningView() {
  const [loading, setLoading] = useState(false);
  const [planData, setPlanData] = useState(null);
  const [projectTitle, setProjectTitle] = useState('Metropolitan Tower Phase II');
  const [durationMonths, setDurationMonths] = useState(18);
  const [budgetUsd, setBudgetUsd] = useState(24500000);

  const runPlanGeneration = async () => {
    setLoading(true);
    try {
      const data = await generateProjectPlan({
        project_title: projectTitle,
        project_type: "Commercial High-Rise",
        total_built_area_sqft: 185000,
        target_duration_months: parseInt(durationMonths, 10),
        target_budget_usd: parseFloat(budgetUsd)
      });
      setPlanData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runPlanGeneration();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="view-header">
        <div className="view-title-group">
          <h2>
            <CalendarDays size={28} color="var(--amber-400)" />
            <span>Project Planning</span>
          </h2>
          <p className="view-description">
            Schedule optimization, critical path analysis, and resource allocation.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={runPlanGeneration}
          disabled={loading}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          <span>{loading ? 'Generating...' : 'Regenerate'}</span>
        </button>
      </div>

      {/* Metric Cards Row */}
      <div className="metric-grid" style={{ marginBottom: '20px' }}>
        <div className="metric-card amber">
          <span className="metric-label">CRITICAL PATH DURATION</span>
          <div className="metric-value">{planData?.calculated_critical_path_days || 465} Days</div>
          <div className="metric-subtext">Estimated ~15.5 Months</div>
        </div>
        <div className="metric-card emerald">
          <span className="metric-label">CALCULATED TARGET BUDGET</span>
          <div className="metric-value">₹{(((planData?.calculated_total_budget_usd || 24500000) * 83.5) / 10000000).toFixed(1)}Cr</div>
          <div className="metric-subtext">All Phases Inclusive</div>
        </div>
        <div className="metric-card cyan">
          <span className="metric-label">CONTINGENCY RESERVE</span>
          <div className="metric-value">₹{(((planData?.contingency_fund_usd || 1960000) * 83.5) / 10000000).toFixed(2)}Cr</div>
          <div className="metric-subtext">8.0% Risk Buffer</div>
        </div>
        <div className="metric-card indigo">
          <span className="metric-label">WBS WORK PACKAGES</span>
          <div className="metric-value">{planData?.tasks?.length || 10} Tasks</div>
          <div className="metric-subtext">Across 5 Primary Phases</div>
        </div>
      </div>

      {/* Interactive Visual Gantt Chart */}
      <div style={{ marginBottom: '24px' }}>
        <GanttChart 
          tasks={planData?.tasks || []} 
          totalDays={planData?.calculated_critical_path_days || 465} 
        />
      </div>

      {/* Two Col: Budget Breakdown & Fast-tracking */}
      <div className="two-col-grid">
        {/* Budget Allocation Breakdown */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IndianRupee size={18} color="var(--emerald-success)" />
            <span>Phase-by-Phase Budget Allocation & Contingencies</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {planData?.budget_breakdown?.map((cat, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{cat.category}</span>
                  <span className="badge badge-amber">{cat.percentage_of_total}%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>Base: ₹{((cat.budget_usd * 83.5) / 100000).toLocaleString()}L</span>
                  <span style={{ color: 'var(--cyan-accent)' }}>Contingency: ₹{((cat.contingency_reserve_usd * 83.5) / 100000).toLocaleString()}L</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottlenecks and Fast-Tracking Recommendations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--rose-danger)' }}>
              <AlertTriangle size={16} />
              <span>Identified Critical Path Bottlenecks</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {planData?.identified_bottlenecks?.map((item, i) => (
                <div key={i} style={{ fontSize: '0.82rem', color: 'var(--text-main)', background: 'rgba(244, 63, 94, 0.08)', padding: '8px 12px', borderRadius: '6px' }}>
                  • {item}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '20px', flex: 1 }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--amber-400)' }}>
              <Zap size={16} />
              <span>AI Fast-Tracking Opportunities</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {planData?.fast_tracking_recommendations?.map((item, i) => (
                <div key={i} style={{ fontSize: '0.82rem', color: 'var(--text-main)', background: 'rgba(245, 158, 11, 0.08)', padding: '8px 12px', borderRadius: '6px' }}>
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
