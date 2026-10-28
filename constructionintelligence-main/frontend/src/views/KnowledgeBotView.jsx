import React, { useState, useEffect } from 'react';
import { BookOpenCheck, Search, ShieldCheck, AlertCircle, CheckCircle2, Bookmark, Sparkles } from 'lucide-react';
import { queryKnowledge } from '../services/api';

export default function KnowledgeBotView() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('What is the acceptable concrete slump for heavily reinforced high-rise columns?');
  const [knowledgeData, setKnowledgeData] = useState(null);

  const presets = [
    "What is the acceptable concrete slump for heavily reinforced high-rise columns?",
    "What are the OSHA 1926 fall protection rules for scaffolding and unprotected edges?",
    "What are the minimum curing periods and formwork stripping times under ACI 308R & IS 456?"
  ];

  const handleSearch = async (searchTerm = query) => {
    setLoading(true);
    try {
      const data = await queryKnowledge({ query: searchTerm });
      setKnowledgeData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(query);
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="view-header">
        <div className="view-title-group">
          <h2>
            <BookOpenCheck size={28} color="var(--amber-400)" />
            <span>Knowledge Base</span>
          </h2>
          <p className="view-description">
            Building codes, standards, and QA/QC compliance information.
          </p>
        </div>
      </div>

      {/* Query Bar & Presets */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input 
              type="text" 
              className="form-input" 
              style={{ paddingLeft: '42px', fontSize: '0.95rem' }}
              value={query} 
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch(query)}
              placeholder="Ask any structural code question, ASTM specification, or OSHA standard..."
            />
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => handleSearch(query)}
            disabled={loading}
          >
            <Sparkles size={16} />
            <span>{loading ? 'Consulting Codes...' : 'Ask Assistant'}</span>
          </button>
        </div>

        {/* Quick Presets */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Try Preset Queries:</span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.74rem' }}
              onClick={() => {
                setQuery(preset);
                handleSearch(preset);
              }}
            >
              {preset.length > 50 ? preset.substring(0, 50) + '...' : preset}
            </button>
          ))}
        </div>
      </div>

      {/* Answer & Rationale */}
      {knowledgeData && (
        <div className="two-col-grid" style={{ marginBottom: '24px' }}>
          {/* Direct Answer & Engineering Rationale */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className="badge badge-amber">{knowledgeData.domain_category}</span>
              <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>ID: {knowledgeData.query_id}</span>
            </div>

            <h3 style={{ fontSize: '1.15rem', marginBottom: '12px', color: 'var(--text-main)' }}>
              Direct Engineering Answer
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '16px' }}>
              {knowledgeData.direct_answer}
            </p>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--cyan-accent)' }}>
              <h4 style={{ fontSize: '0.86rem', color: 'var(--cyan-accent)', marginBottom: '6px' }}>
                TECHNICAL & STRUCTURAL RATIONALE
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {knowledgeData.engineering_rationale}
              </p>
            </div>
          </div>

          {/* QA/QC Checklist & Pitfalls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="glass-panel" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="var(--emerald-success)" />
                <span>Site QA/QC Field Checklist</span>
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {knowledgeData.qa_qc_checklist?.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '0.82rem', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--emerald-success)' }}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--rose-danger)' }}>
                <AlertCircle size={16} />
                <span>Common Construction Pitfalls to Avoid</span>
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {knowledgeData.common_pitfalls_to_avoid?.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '0.82rem', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--rose-danger)' }}>⚠</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verified Building Code Citations */}
      {knowledgeData && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bookmark size={18} color="var(--amber-400)" />
            <span>Verified Building Code & Regulatory Citations</span>
          </h3>

          <div className="three-col-grid">
            {knowledgeData.citations?.map((cit, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <span className="mono badge badge-amber" style={{ fontSize: '0.72rem' }}>{cit.code_standard}</span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>{cit.jurisdiction}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px' }}>{cit.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--cyan-accent)', marginBottom: '8px' }}>Section: {cit.section}</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.4 }}>
                    "{cit.clause_snippet}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
