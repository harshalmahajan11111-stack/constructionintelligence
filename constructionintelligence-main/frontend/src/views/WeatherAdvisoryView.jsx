import React, { useState, useEffect } from 'react';
import { CloudSun, Wind, Droplets, Thermometer, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';
import { getWeatherAdvisory } from '../services/api';

export default function WeatherAdvisoryView() {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [siteLocation, setSiteLocation] = useState('Downtown High-Density Zone (Metro Core)');

  const runAdvisory = async () => {
    setLoading(true);
    try {
      const data = await getWeatherAdvisory({
        site_location: siteLocation,
        planned_activities: [
          "Concrete Pouring for Level 16 Core Slab",
          "Tower Crane #2 Steel Truss Lifts",
          "Deep Trench Retaining Wall Shoring",
          "Exterior Waterproofing Membrane Application"
        ]
      });
      setWeatherData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runAdvisory();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="view-header">
        <div className="view-title-group">
          <h2>
            <CloudSun size={28} color="var(--indigo-accent)" />
            <span>Weather Intelligence</span>
          </h2>
          <p className="view-description">
            Forecast-based operational planning and risk assessment.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={runAdvisory}
          disabled={loading}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          <span>{loading ? 'Updating...' : 'Update'}</span>
        </button>
      </div>

      {/* Critical Weather Alert Banner */}
      <div style={{ background: 'rgba(244, 63, 94, 0.12)', border: '1px solid rgba(244, 63, 94, 0.35)', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <Wind size={26} color="var(--rose-danger)" />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, color: 'var(--rose-danger)', fontSize: '0.98rem' }}>
            CRITICAL CRANE WIND LIMIT TRIGGER AT 15:00 (42 KM/H FORECAST)
          </div>
          <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            Tower Cranes 1 & 2 must be dog-hooked and released into weathervane mode before 15:00. High-temperature concrete pours after 12:00 require chilled water batching and continuous curing mats.
          </div>
        </div>
      </div>

      {/* Hourly Operational Windows */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Hourly Activity Feasibility & Safety Status</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {weatherData?.slots?.map((slot, idx) => {
            const isRed = slot.crane_lift_status.includes('RED');
            const isYellow = slot.crane_lift_status.includes('YELLOW');

            return (
              <div 
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '16px 20px',
                  display: 'grid',
                  gridTemplateColumns: '150px 180px 1fr 1fr',
                  gap: '16px',
                  alignItems: 'center'
                }}
              >
                {/* Time slot */}
                <div>
                  <div className="mono" style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--amber-400)' }}>
                    {slot.time_slot}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Shift Window {idx + 1}</div>
                </div>

                {/* Weather Metrics */}
                <div style={{ display: 'flex', gap: '12px', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Thermometer size={14} color="var(--rose-danger)" />
                    <span>{slot.temperature_celsius}°C</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Wind size={14} color={slot.wind_speed_kmh > 35 ? 'var(--rose-danger)' : 'var(--cyan-accent)'} />
                    <span style={{ fontWeight: slot.wind_speed_kmh > 35 ? 700 : 400 }}>{slot.wind_speed_kmh} km/h</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Droplets size={14} color="var(--cyan-accent)" />
                    <span>{slot.humidity_percent}%</span>
                  </div>
                </div>

                {/* Concrete Pour Condition */}
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block' }}>CONCRETE POUR STATUS</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                    {slot.concrete_pour_suitability}
                  </span>
                </div>

                {/* Crane Status */}
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block' }}>TOWER CRANE STATUS</span>
                  <span 
                    className={`badge ${isRed ? 'badge-rose' : (isYellow ? 'badge-amber' : 'badge-emerald')}`}
                    style={{ fontSize: '0.76rem' }}
                  >
                    {slot.crane_lift_status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Col: Concrete Hydration & Rescheduling */}
      <div className="two-col-grid">
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--amber-400)' }}>
            ACI 305R Hot-Weather Concrete Hydration Precautions
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {weatherData?.concrete_hydration_precautions?.map((item, i) => (
              <div key={i} style={{ fontSize: '0.84rem', color: 'var(--text-main)', background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '6px' }}>
                • {item}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--cyan-accent)' }}>
            Dynamic Weather Rescheduling Action Protocol
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {weatherData?.rescheduling_recommendations?.map((item, i) => (
              <div key={i} style={{ fontSize: '0.84rem', color: 'var(--text-main)', background: 'rgba(6, 182, 212, 0.08)', padding: '10px 14px', borderRadius: '6px' }}>
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
