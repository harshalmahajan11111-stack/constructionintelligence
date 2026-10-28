import React, { useState, useEffect } from 'react';
import { IndianRupee, TrendingUp, Building, Award, BarChart3, Calculator, CheckCircle2 } from 'lucide-react';
import { estimateValuation } from '../services/api';

export default function RealEstateValuationView() {
  const [loading, setLoading] = useState(false);
  const [valData, setValData] = useState(null);

  // Form state
  const [title, setTitle] = useState('Metropolitan Tower Phase II');
  const [propertyType, setPropertyType] = useState('Commercial Office Tower');
  const [area, setArea] = useState(185000);
  const [locationTier, setLocationTier] = useState('Tier 1 Prime CBD');
  const [grade, setGrade] = useState('Grade A+ Luxury Commercial');
  const [stage, setStage] = useState('Structural Framework 75% Complete');
  const [floors, setFloors] = useState(28);
  const [parking, setParking] = useState(150);
  const [leed, setLeed] = useState('LEED Gold Candidate');

  const runCalculation = async () => {
    setLoading(true);
    try {
      const data = await estimateValuation({
        property_title: title,
        property_type: propertyType,
        built_up_area_sqft: parseFloat(area),
        location_tier: locationTier,
        construction_grade: grade,
        current_stage: stage,
        number_of_floors: parseInt(floors, 10),
        parking_bays: parseInt(parking, 10),
        smart_building_certification: leed
      });
      setValData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runCalculation();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="view-header">
        <div className="view-title-group">
          <h2>
            <IndianRupee size={28} color="var(--emerald-success)" />
            <span>Property Valuation</span>
          </h2>
          <p className="view-description">
            AI-powered property valuation with market intelligence and construction grade analysis.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={runCalculation}
          disabled={loading}
        >
          <Calculator size={16} />
          <span>{loading ? 'Calculating...' : 'Calculate'}</span>
        </button>
      </div>

      <div className="two-col-grid">
        {/* Left Col: Interactive Property Parameter Inputs */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={18} color="var(--amber-400)" />
            <span>Property & Construction Parameters</span>
          </h3>

          <div className="form-group">
            <label className="form-label">Asset Title</label>
            <input 
              type="text" 
              className="form-input" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Built-Up Area (sqft)</label>
              <input 
                type="number" 
                className="form-input" 
                value={area} 
                onChange={e => setArea(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location Tier</label>
              <select className="form-select" value={locationTier} onChange={e => setLocationTier(e.target.value)}>
                <option value="Tier 1 Prime CBD">Tier 1 Prime CBD</option>
                <option value="Tier 2 Suburban Hub">Tier 2 Suburban Hub</option>
                <option value="Tier 3 Emerging Urban">Tier 3 Emerging Urban</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Construction Grade</label>
              <select className="form-select" value={grade} onChange={e => setGrade(e.target.value)}>
                <option value="Grade A+ Luxury Commercial">Grade A+ Luxury Commercial</option>
                <option value="Grade A Standard">Grade A Standard</option>
                <option value="Grade B Semi-Commercial">Grade B Semi-Commercial</option>
                <option value="Grade C Budget">Grade C Budget</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Current Stage</label>
              <select className="form-select" value={stage} onChange={e => setStage(e.target.value)}>
                <option value="Pre-construction">Pre-construction</option>
                <option value="Earthwork">Earthwork</option>
                <option value="Structural Framework 75% Complete">Structural Framework 75% Complete</option>
                <option value="MEP & Finishing">MEP & Finishing</option>
                <option value="Ready for Occupancy">Ready for Occupancy</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Number of Storeys</label>
              <input 
                type="number" 
                className="form-input" 
                value={floors} 
                onChange={e => setFloors(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Parking Bays</label>
              <input 
                type="number" 
                className="form-input" 
                value={parking} 
                onChange={e => setParking(e.target.value)} 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">ESG / Green Building Standard</label>
            <select className="form-select" value={leed} onChange={e => setLeed(e.target.value)}>
              <option value="LEED Gold Candidate">LEED Gold Candidate</option>
              <option value="LEED Platinum">LEED Platinum</option>
              <option value="LEED Silver">LEED Silver</option>
              <option value="BREEAM">BREEAM</option>
              <option value="None">None</option>
            </select>
          </div>
        </div>

        {/* Right Col: Valuation Output & Comps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Headline Valuation Card */}
          <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(6, 182, 212, 0.08))' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ESTIMATED TOTAL ASSET VALUATION</span>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--emerald-success)' }}>
                  ₹{(valData?.estimated_total_value_usd || 0).toLocaleString()}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-emerald" style={{ fontSize: '0.85rem' }}>
                  ₹{Math.round((valData?.price_per_sqft_usd || 0) * 83.5).toLocaleString()}/sqft
                </span>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                  5-Yr Projected ROI: {valData?.roi_projection_5yr_annualized}%
                </div>
              </div>
            </div>

            {/* Valuation Range */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-dim)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px' }}>
              <span>Conservative Min: ₹{((valData?.value_range_min_usd || 0) * 83.5).toLocaleString()}</span>
              <span>Optimistic Max: ₹{((valData?.value_range_max_usd || 0) * 83.5).toLocaleString()}</span>
            </div>
          </div>

          {/* Factor Breakdown */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BarChart3 size={16} color="var(--amber-400)" />
              <span>Valuation Contribution Factor Breakdown</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {valData?.factors_breakdown?.map((factor, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: '6px' }}>
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 600 }}>{factor.factor_name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{factor.description}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="mono" style={{ fontWeight: 700, fontSize: '0.84rem' }}>
                      ₹{((factor.contribution_amount_usd / 1000) * 83.5).toLocaleString()}k
                    </div>
                    <span className="badge badge-amber" style={{ fontSize: '0.68rem' }}>
                      {factor.weight_percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Comparables */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '10px' }}>Market Comparables (Prime District)</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {valData?.comparables?.map((comp, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div>
                    <span style={{ fontWeight: 600 }}>{comp.property_name}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginLeft: '8px' }}>({comp.distance_km} km away)</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span className="mono">₹{Math.round(comp.price_per_sqft * 83.5).toLocaleString()}/sqft</span>
                    <span className="badge badge-cyan">{Math.round(comp.similarity_index * 100)}% Match</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
