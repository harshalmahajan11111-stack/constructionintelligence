// API Client for BuildIQ Analytics Platform

function getApiBase() {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl || typeof envUrl !== 'string' || !envUrl.trim()) {
    return '/api';
  }
  const trimmed = envUrl.trim().replace(/\/+$/, '');
  if (!trimmed || trimmed === '/') {
    return '/api';
  }
  // Ensure the base URL includes /api so endpoints like /safety/analyze route properly
  if (trimmed.endsWith('/api')) {
    return trimmed;
  }
  return `${trimmed}/api`;
}

const API_BASE = getApiBase();

async function handleResponse(res, defaultErrorMsg) {
  if (res.ok) {
    return res.json();
  }
  let detail = `${res.status} ${res.statusText}`;
  try {
    const errorJson = await res.json();
    if (errorJson && typeof errorJson === 'object') {
      if (errorJson.detail) {
        detail = typeof errorJson.detail === 'string' ? errorJson.detail : JSON.stringify(errorJson.detail);
      } else if (errorJson.message) {
        detail = errorJson.message;
      } else if (errorJson.error) {
        detail = errorJson.error;
      }
    }
  } catch (_) {
    try {
      const text = await res.text();
      if (text) detail = text.slice(0, 150);
    } catch (_) {}
  }
  throw new Error(`${defaultErrorMsg} (${detail})`);
}

export async function checkHealth() {
  const res = await fetch(`${API_BASE}/health`);
  return handleResponse(res, 'Health check failed');
}

export async function analyzeSiteSafety(payload) {
  const res = await fetch(`${API_BASE}/safety/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return handleResponse(res, 'Safety analysis failed');
}

export async function analyzeCrack(payload) {
  const res = await fetch(`${API_BASE}/crack/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return handleResponse(res, 'Crack analysis failed');
}

export async function estimateValuation(payload) {
  const res = await fetch(`${API_BASE}/valuation/estimate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return handleResponse(res, 'Valuation calculation failed');
}

export async function generateProjectPlan(payload) {
  const res = await fetch(`${API_BASE}/planning/generate-plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return handleResponse(res, 'Project planning failed');
}

export async function processDailyLog(payload) {
  const res = await fetch(`${API_BASE}/daily-log/process-log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return handleResponse(res, 'Daily log processing failed');
}

export async function getWeatherAdvisory(payload) {
  const res = await fetch(`${API_BASE}/weather/advisory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return handleResponse(res, 'Weather advisory failed');
}

export async function queryKnowledge(payload) {
  const res = await fetch(`${API_BASE}/knowledge/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return handleResponse(res, 'Knowledge query failed');
}

export async function generateAuditReport(payload) {
  const res = await fetch(`${API_BASE}/report/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return handleResponse(res, 'Audit report generation failed');
}
