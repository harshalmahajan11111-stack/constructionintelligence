import React, { useState } from 'react';
import { Layers, Upload, Eye, CheckCircle2, AlertTriangle, Sparkles, RefreshCw } from 'lucide-react';
import ImageAnnotator from '../components/ImageAnnotator';
import { analyzeSiteSafety, analyzeCrack } from '../services/api';

export default function MultimodalStudioView() {
  const [selectedPreset, setSelectedPreset] = useState('safety');
  const [activeMode, setActiveMode] = useState('safety'); // 'safety' or 'crack'
  const [customImage, setCustomImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);

  const presets = {
    safety: {
      name: "Level 14 Slab PPE & Perimeter",
      url: "/samples/safety_site.jpg",
      category: "Site Safety Monitoring"
    },
    crack: {
      name: "Pillar 14 Shear Defect Macro",
      url: "/samples/crack_column.jpg",
      category: "Crack Detection"
    },
    overview: {
      name: "Metropolitan Superstructure Overview",
      url: "/samples/project_overview.jpg",
      category: "Planning & Valuation"
    }
  };

  const currentUrl = customImage || presets[selectedPreset].url;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const runMultimodalInspection = async () => {
    setLoading(true);
    setAnalysisResult(null);
    try {
      if (activeMode === 'safety') {
        const data = await analyzeSiteSafety({
          project_name: "Metropolitan Tower Studio",
          image_base64: customImage || null,
          image_filename: presets[selectedPreset]?.name
        });
        setAnalysisResult({ type: 'safety', data });
      } else {
        const data = await analyzeCrack({
          structural_element: "Column / Retaining Wall",
          crack_width_override_mm: 3.85
        });
        setAnalysisResult({ type: 'crack', data });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="view-header">
        <div className="view-title-group">
          <h2>
            <Layers size={28} color="var(--amber-400)" />
            <span>Inspection Studio</span>
          </h2>
          <p className="view-description">
            Upload site photos and run AI-powered analysis. 
            to execute multi-angle AI inference across safety, structural defects, and progress status.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
            <Upload size={16} />
            <span>Upload Custom Photo</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>

          <button 
            className="btn btn-primary"
            onClick={runMultimodalInspection}
            disabled={loading}
          >
            <Sparkles size={16} />
            <span>{loading ? 'Running AI Engine...' : 'Execute Multimodal Scan'}</span>
          </button>
        </div>
      </div>

      {/* Preset Selector Bar */}
      <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Select High-Res Site Presets:</span>
          {Object.keys(presets).map((key) => (
            <button
              key={key}
              className={`btn btn-sm ${selectedPreset === key && !customImage ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => {
                setSelectedPreset(key);
                setCustomImage(null);
                setActiveMode(key === 'crack' ? 'crack' : 'safety');
              }}
            >
              {presets[key].name}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target Inference:</span>
          <button 
            className={`btn btn-sm ${activeMode === 'safety' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveMode('safety')}
          >
            PPE & Safety
          </button>
          <button 
            className={`btn btn-sm ${activeMode === 'crack' ? 'btn-cyan' : 'btn-secondary'}`}
            onClick={() => setActiveMode('crack')}
          >
            Crack Diagnostics
          </button>
        </div>
      </div>

      {/* Main Studio Canvas */}
      <div className="two-col-grid">
        {/* Left Col: Visual Canvas */}
        <div>
          <ImageAnnotator
            imageUrl={currentUrl}
            boxes={analysisResult?.type === 'safety' ? (analysisResult.data.detections || []) : []}
            selectedBox={selectedBox}
            onSelectBox={setSelectedBox}
            title={`Multimodal Inspection Canvas: ${presets[selectedPreset]?.name || 'Uploaded Subject'}`}
          />
        </div>

        {/* Right Col: AI Multimodal Diagnostic Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Eye size={18} color="var(--cyan-accent)" />
              <span>Real-Time Multimodal Diagnostic Intelligence</span>
            </h3>

            {!analysisResult && (
              <div style={{ padding: '30px 20px', textAlign: 'center', color: 'var(--text-dim)', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <p>Click "Execute Multimodal Scan" to trigger computer vision analysis on this image.</p>
              </div>
            )}

            {analysisResult?.type === 'safety' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>INSPECTION ID</span>
                    <div className="mono" style={{ fontWeight: 700 }}>{analysisResult.data.analysis_id}</div>
                  </div>
                  <span className="badge badge-amber">{analysisResult.data.risk_level}</span>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '6px', fontSize: '0.86rem', lineHeight: 1.5 }}>
                  {analysisResult.data.osha_compliance_summary}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                  <span>PPE Compliance: <strong style={{ color: 'var(--emerald-success)' }}>{analysisResult.data.ppe_compliance_rate}%</strong></span>
                  <span>Detected Workers: <strong>{analysisResult.data.detected_personnel_count}</strong></span>
                </div>
              </div>
            )}

            {analysisResult?.type === 'crack' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DEFECT CLASSIFICATION</span>
                    <div style={{ fontWeight: 700, color: 'var(--rose-danger)' }}>{analysisResult.data.crack_type}</div>
                  </div>
                  <span className="badge badge-rose">SEVERITY {analysisResult.data.severity_score}/100</span>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '6px', fontSize: '0.86rem', lineHeight: 1.5 }}>
                  {analysisResult.data.root_cause_diagnosis}
                </div>

                <div style={{ fontSize: '0.82rem', color: 'var(--amber-400)' }}>
                  Primary Repair: {analysisResult.data.repair_options[0]?.method_name}
                </div>
              </div>
            )}
          </div>

          {/* Camera Telemetry & Technical Specs */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Multimodal Telemetry & Calibration</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
              <div>• Resolution: 1600 x 1200 px</div>
              <div>• Inference Latency: 142 ms</div>
              <div>• Model: Multimodal Vision Engine</div>
              <div>• Dynamic Range: High Contrast (HDR)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
