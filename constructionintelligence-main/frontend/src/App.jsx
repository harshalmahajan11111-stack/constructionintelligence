import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import JsonContractViewer from './components/JsonContractViewer';
import AuditReportModal from './components/AuditReportModal';

// Views
import DashboardOverview from './views/DashboardOverview';
import SiteSafetyView from './views/SiteSafetyView';
import CrackAnalysisView from './views/CrackAnalysisView';
import RealEstateValuationView from './views/RealEstateValuationView';
import ProjectPlanningView from './views/ProjectPlanningView';
import DailySiteLogView from './views/DailySiteLogView';
import WeatherAdvisoryView from './views/WeatherAdvisoryView';
import KnowledgeBotView from './views/KnowledgeBotView';
import MultimodalStudioView from './views/MultimodalStudioView';

// API
import { checkHealth, generateAuditReport } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isContractsOpen, setIsContractsOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [systemHealthy, setSystemHealthy] = useState(true);
  const [auditReportData, setAuditReportData] = useState(null);

  useEffect(() => {
    // Health check on mount
    checkHealth()
      .then(() => setSystemHealthy(true))
      .catch(() => setSystemHealthy(false));
  }, []);

  const handleOpenAudit = async () => {
    try {
      const data = await generateAuditReport({
        project_name: "Metropolitan Center Phase II",
        auditor_name: "Chief Structural Inspector R. Vance, PE, SE"
      });
      setAuditReportData(data);
      setIsAuditOpen(true);
    } catch (err) {
      console.error(err);
      setIsAuditOpen(true);
    }
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onOpenContracts={() => setIsContractsOpen(true)}
        onOpenAudit={handleOpenAudit}
        systemHealthy={systemHealthy}
      />

      {/* Main Content Workspace */}
      <main className="content-wrapper">
        {activeTab === 'overview' && (
          <DashboardOverview 
            onNavigate={setActiveTab} 
            onOpenAudit={handleOpenAudit} 
          />
        )}
        {activeTab === 'safety' && <SiteSafetyView />}
        {activeTab === 'cracks' && <CrackAnalysisView />}
        {activeTab === 'valuation' && <RealEstateValuationView />}
        {activeTab === 'planning' && <ProjectPlanningView />}
        {activeTab === 'logs' && <DailySiteLogView />}
        {activeTab === 'weather' && <WeatherAdvisoryView />}
        {activeTab === 'knowledge' && <KnowledgeBotView />}
        {activeTab === 'multimodal' && <MultimodalStudioView />}
      </main>

      {/* JSON Contracts Inspector Modal */}
      <JsonContractViewer 
        isOpen={isContractsOpen} 
        onClose={() => setIsContractsOpen(false)} 
      />

      {/* Executive Audit Report Modal */}
      <AuditReportModal 
        isOpen={isAuditOpen} 
        onClose={() => setIsAuditOpen(false)} 
        reportData={auditReportData} 
      />
    </div>
  );
}
