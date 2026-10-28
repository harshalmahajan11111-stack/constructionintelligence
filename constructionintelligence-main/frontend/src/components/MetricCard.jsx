import React from 'react';

export default function MetricCard({ 
  label, 
  value, 
  subtext, 
  icon: Icon, 
  colorVariant = 'amber', 
  badgeText 
}) {
  return (
    <div className={`metric-card ${colorVariant}`}>
      <div className="metric-header">
        <span className="metric-label">{label}</span>
        {Icon && (
          <div className="metric-icon-wrap">
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="metric-value">{value}</div>

      <div className="metric-subtext">
        {badgeText && (
          <span className={`badge badge-${colorVariant}`}>
            {badgeText}
          </span>
        )}
        <span>{subtext}</span>
      </div>
    </div>
  );
}
