import React from 'react';
import {
  Building2,
  ShieldAlert,
  Activity,
  IndianRupee,
  CalendarDays,
  CloudSun,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  FileCheck2
} from 'lucide-react';
import MetricCard from '../components/MetricCard';

export default function DashboardOverview({ onNavigate, onOpenAudit }) {
  const epics = [
    {
      id: 'safety',
      title: 'Safety Compliance',
      desc: 'AI-powered PPE detection & hazard identification system.',
      icon: ShieldAlert,
      badge: '92.5% Score',
      color: 'amber'
    },
    {
      id: 'cracks',
      title: 'Structural Analysis',
      desc: 'Automated crack detection and repair recommendations.',
      badge: '3.85mm Alert',
      icon: Activity,
      color: 'rose'
    },
    {
      id: 'valuation',
      title: 'Property Valuation',
      desc: 'Real-time property valuation with market intelligence.',
      badge: '₹762.1Cr',
      icon: IndianRupee,
      color: 'emerald'
    },
    {
      id: 'planning',
      title: 'Project Planning',
      desc: 'Schedule optimization and resource allocation.',
      badge: '465 Days',
      icon: CalendarDays,
      color: 'cyan'
    },
    {
      id: 'weather',
      title: 'Weather Intelligence',
      desc: 'Forecast-based operational planning.',
      badge: 'Wind Advisory',
      icon: CloudSun,
      color: 'indigo'
    },
    {
      id: 'multimodal',
      title: 'Site Inspection',
      desc: 'Multi-angle image analysis and defect detection.',
      badge: 'Live Ready',
      icon: Building2,
      color: 'amber'
    }
  ];

  return (
    <div>
      {/* View Header */}
      <div className="view-header">
        <div className="view-title-group">
          <h2>
            <Building2 size={28} color="var(--cyan-accent)" />
            <span>Dashboard Overview</span>
          </h2>
          <p className="view-description">
            Real-time construction intelligence: safety monitoring, structural analysis, valuation, and planning.
          </p>
        </div>

        <button className="btn btn-primary" onClick={onOpenAudit}>
          <FileCheck2 size={16} />
          <span>Generate Audit</span>
        </button>
      </div>

      {/* Top Level Metric KPIs */}
      <div className="metric-grid">
        <MetricCard
          label="Safety Score"
          value="88 / 100"
          subtext="Compliance 92.5%"
          badgeText="ELEVATED"
          icon={ShieldAlert}
          colorVariant="amber"
        />
        <MetricCard
          label="Defect Severity"
          value="84 / 100"
          subtext="Pillar 14 Shear"
          badgeText="CRITICAL"
          icon={Activity}
          colorVariant="rose"
        />
        <MetricCard
          label="Valuation"
          value="₹762.1 Cr"
          subtext="185,000 sqft"
          badgeText="+14.2% ROI"
          icon={IndianRupee}
          colorVariant="emerald"
        />
        <MetricCard
          label="Timeline"
          value="465 Days"
          subtext="Critical Path"
          badgeText="10 MILESTONES"
          icon={CalendarDays}
          colorVariant="cyan"
        />
      </div>

      {/* Critical Active Alert Bar */}
      <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px 20px', marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <AlertTriangle size={24} color="var(--rose-danger)" />
          <div>
            <div style={{ fontWeight: 700, color: 'var(--rose-danger)', fontSize: '0.95rem' }}>
              URGENT ALERT
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Shear crack (3.85mm) on Level 2 Pillar 14. High winds (42 km/h) forecast after 15:00 require crane shutdown.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('cracks')}>
            View Details
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => onNavigate('weather')}>
            Weather
          </button>
        </div>
      </div>

      {/* Platform Epics Matrix */}
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.2rem' }}>Platform Modules</h3>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Data-Driven Analytics</span>
      </div>

      <div className="three-col-grid">
        {epics.map((epic) => {
          const Icon = epic.icon;
          return (
            <div 
              key={epic.id} 
              className="glass-panel" 
              style={{ padding: '24px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              onClick={() => onNavigate(epic.id)}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div className={`metric-icon-wrap`} style={{ width: '42px', height: '42px' }}>
                    <Icon size={20} />
                  </div>
                  <span className={`badge badge-${epic.color}`}>{epic.badge}</span>
                </div>

                <h4 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>{epic.title}</h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {epic.desc}
                </p>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--cyan-accent)' }}>
                <span>Open Module</span>
                <ArrowRight size={14} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
