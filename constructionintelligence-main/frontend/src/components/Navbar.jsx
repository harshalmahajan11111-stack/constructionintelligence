import React from 'react';
import {
  Building2,
  ShieldAlert,
  Activity,
  IndianRupee,
  CalendarDays,
  ClipboardList,
  CloudSun,
  BookOpenCheck,
  Layers,
  FileCheck2,
  Code2
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenContracts, onOpenAudit, systemHealthy }) {
  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: Building2 },
    { id: 'safety', label: 'Safety Monitor', icon: ShieldAlert },
    { id: 'cracks', label: 'Defect Analysis', icon: Activity },
    { id: 'valuation', label: 'Valuation', icon: IndianRupee },
    { id: 'planning', label: 'Planning', icon: CalendarDays },
    { id: 'logs', label: 'Site Logs', icon: ClipboardList },
    { id: 'weather', label: 'Weather', icon: CloudSun },
    { id: 'knowledge', label: 'Knowledge Base', icon: BookOpenCheck },
    { id: 'multimodal', label: 'Inspection', icon: Layers }
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand-section">
          <div className="brand-icon">
            <Building2 size={24} />
          </div>
          <div>
            <div className="brand-title">
              <span>BuildIQ Analytics</span>
              <span className="brand-badge">PRO</span>
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', letterSpacing: '0.02em' }}>
              Smart Construction Intelligence Platform
            </div>
          </div>
        </div>

        <nav className="tabs-nav">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="nav-actions">
          <div className="status-pill" title="FastAPI Engine Connected">
            <span className="status-dot"></span>
            <span>API {systemHealthy ? 'ONLINE' : 'SYNCING'}</span>
          </div>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={onOpenContracts}
            title="Inspect Strict JSON Data Contracts"
          >
            <Code2 size={15} />
            <span>JSON Contracts</span>
          </button>

          <button 
            className="btn btn-primary btn-sm"
            onClick={onOpenAudit}
          >
            <FileCheck2 size={15} />
            <span>Audit Report</span>
          </button>
        </div>
      </div>
    </header>
  );
}
