import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';

export default function GanttChart({ tasks = [], totalDays = 465 }) {
  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} color="var(--amber-400)" />
            <span>Interactive Construction Gantt Timeline & Critical Path</span>
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Total project cycle: {totalDays} Calendar Days • Golden bars indicate Critical Path items
          </span>
        </div>

        <div style={{ display: 'flex', gap: '14px', fontSize: '0.8rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '14px', height: '10px', background: 'var(--amber-500)', borderRadius: '2px', display: 'inline-block' }}></span>
            <span style={{ color: 'var(--amber-400)', fontWeight: 600 }}>Critical Path</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '14px', height: '10px', background: 'var(--cyan-accent)', borderRadius: '2px', display: 'inline-block' }}></span>
            <span>Non-Critical Parallel</span>
          </div>
        </div>
      </div>

      {/* Timeline Header Graduations */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-card)', paddingBottom: '8px', marginBottom: '12px', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
        <div style={{ width: '280px', flexShrink: 0, fontWeight: 600 }}>Task & Deliverable</div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
          <span>Day 0</span>
          <span>Day 90</span>
          <span>Day 180</span>
          <span>Day 270</span>
          <span>Day 360</span>
          <span>Day {totalDays}</span>
        </div>
      </div>

      {/* Task Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {tasks.map((task) => {
          const leftPercent = (task.start_day / totalDays) * 100;
          const widthPercent = Math.max(3, (task.duration_days / totalDays) * 100);

          return (
            <div 
              key={task.task_id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 10px',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.04)'
              }}
            >
              <div style={{ width: '280px', flexShrink: 0, paddingRight: '12px' }}>
                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: task.is_critical_path ? 'var(--amber-400)' : 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>[{task.task_id}]</span>
                  <span>{task.task_name}</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', gap: '8px', marginTop: '2px' }}>
                  <span>{task.duration_days} days</span>
                  <span>•</span>
                  <span style={{ color: 'var(--emerald-success)' }}>${(task.estimated_cost_usd / 1000).toLocaleString()}k</span>
                </div>
              </div>

              {/* Bar track */}
              <div style={{ flex: 1, position: 'relative', height: '22px', background: 'rgba(0, 0, 0, 0.25)', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '2px',
                    bottom: '2px',
                    left: `${leftPercent}%`,
                    width: `${widthPercent}%`,
                    background: task.is_critical_path 
                      ? 'linear-gradient(90deg, var(--amber-500), #EA580C)' 
                      : 'linear-gradient(90deg, var(--cyan-accent), #0284C7)',
                    borderRadius: '3px',
                    boxShadow: task.is_critical_path ? '0 0 10px rgba(245, 158, 11, 0.3)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '6px',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: '#000',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                  }}
                  title={`${task.task_name}: Day ${task.start_day} to Day ${task.end_day} (${task.duration_days}d)`}
                >
                  {task.duration_days}d
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
