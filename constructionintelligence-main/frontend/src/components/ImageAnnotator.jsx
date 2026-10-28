import React, { useState } from 'react';
import { Eye, ShieldCheck, AlertTriangle, Layers, ZoomIn } from 'lucide-react';

export default function ImageAnnotator({ 
  imageUrl, 
  boxes = [], 
  selectedBox, 
  onSelectBox, 
  title = "Site Visual Inspection Canvas" 
}) {
  const [filter, setFilter] = useState('all'); // all, compliant, violation, warning

  const filteredBoxes = boxes.filter(b => {
    if (filter === 'all') return true;
    return b.status === filter;
  });

  return (
    <div className="glass-panel" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Eye size={18} color="var(--amber-400)" />
            <span>{title}</span>
          </h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Hover or click bounding boxes to inspect AI confidence & OSHA tags
          </span>
        </div>

        {/* Filter Badges */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button 
            className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter('all')}
          >
            All ({boxes.length})
          </button>
          <button 
            className={`btn btn-sm ${filter === 'compliant' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter('compliant')}
            style={filter === 'compliant' ? { background: 'var(--emerald-success)', color: '#000' } : {}}
          >
            Compliant
          </button>
          <button 
            className={`btn btn-sm ${filter === 'violation' ? 'btn-danger' : 'btn-secondary'}`}
            onClick={() => setFilter('violation')}
          >
            Violations
          </button>
        </div>
      </div>

      {/* Visual Canvas Container */}
      <div className="annotator-container">
        <img 
          src={imageUrl} 
          alt="Inspection Subject" 
          className="annotator-image"
          crossOrigin="anonymous"
        />

        {/* Dynamic Bounding Boxes */}
        {filteredBoxes.map((box, idx) => {
          const [ymin, xmin, ymax, xmax] = box.box_2d;
          const top = `${(ymin / 1000) * 100}%`;
          const left = `${(xmin / 1000) * 100}%`;
          const height = `${((ymax - ymin) / 1000) * 100}%`;
          const width = `${((xmax - xmin) / 1000) * 100}%`;

          const isSelected = selectedBox && selectedBox.label === box.label;
          const isViolation = box.status === 'violation';

          return (
            <div
              key={idx}
              className={`bounding-box-overlay ${isViolation ? 'violation' : ''}`}
              style={{
                top,
                left,
                width,
                height,
                borderWidth: isSelected ? '3px' : '2px',
                borderColor: isViolation ? 'var(--rose-danger)' : (box.status === 'warning' ? 'var(--amber-500)' : 'var(--cyan-accent)'),
                backgroundColor: isViolation ? 'rgba(244, 63, 94, 0.22)' : 'rgba(6, 182, 212, 0.15)'
              }}
              onClick={() => onSelectBox && onSelectBox(box)}
            >
              <div 
                className="box-tag"
                style={{
                  background: isViolation ? 'var(--rose-danger)' : (box.status === 'warning' ? 'var(--amber-500)' : 'var(--cyan-accent)'),
                  color: isViolation ? '#fff' : '#000'
                }}
              >
                {box.label} ({Math.round(box.confidence * 100)}%)
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Legend Bar */}
      <div style={{ marginTop: '14px', display: 'flex', gap: '16px', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '12px', height: '12px', background: 'var(--cyan-accent)', borderRadius: '2px', display: 'inline-block' }}></span>
          <span>PPE Verified</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '12px', height: '12px', background: 'var(--amber-500)', borderRadius: '2px', display: 'inline-block' }}></span>
          <span>Caution / Guardrail</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '12px', height: '12px', background: 'var(--rose-danger)', borderRadius: '2px', display: 'inline-block' }}></span>
          <span>OSHA Violation / Trip Hazard</span>
        </div>
      </div>
    </div>
  );
}
