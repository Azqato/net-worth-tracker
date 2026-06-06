'use strict';

// ─── Chart.js global defaults ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Chart !== 'undefined') Chart.defaults.color = '#e6edf3';
});

// ─── Constants ────────────────────────────────────────────────────────────────
const STORAGE_KEY        = 'networth_snapshots';
const INACTIVITY_KEY     = 'inactivity_dismiss_count';
const INACTIVITY_MS_1ST  = 30_000;   // first warning: 30 s
const INACTIVITY_MS_2ND  = 120_000;  // second warning: 2 min

const COLORS = {
  cash:       '#4a9eff',
  taxable:    '#a371f7',
  retirement: '#f78166',
  realEstate: '#ffa657'
};
const CAT_COLORS = [COLORS.cash, COLORS.taxable, COLORS.retirement, COLORS.realEstate];
const CAT_LABELS = ['Cash', 'Taxable', 'Retirement', 'Real Estate'];

// ─── State ────────────────────────────────────────────────────────────────────
let snapshots        = [];
let lineChart        = null;
let allocationChart  = null;
let inactivityTimer  = null;

// ─── localStorage helpers ────────────────────────────────────────────────────

function loadSnapshots() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    snapshots = raw ? JSON.parse(raw) : [];
  } catch (e) {
    snapshots = [];
  }
}

function persistSnapshots() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshots));
}

// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  loadSnapshots();
  renderAll();
  startInactivityTimer();
});

function renderAll() {
  const latest = snapshots.length > 0 ? snapshots[snapshots.length - 1] : null;
  const prev   = snapshots.length > 1 ? snapshots[snapshots.length - 2] : null;
  renderTotalCard(latest, prev);
  renderCategoryCards(latest, prev);
  renderLineChart();
  renderAllocationChart(latest);
  renderSnapshotHistory();
}

// ─── Formatting helpers ──────────────────────────────────────────────────────

function fmt(v) {
  if (v === null || v === undefined || isNaN(v)) return '$0';
  return '$' + Math.round(v).toLocaleString('en-US');
}

function fmtShort(v) {
  if (Math.abs(v) >= 1_000_000) return '$' + (v / 1_000_000).toFixed(1) + 'M';
  if (Math.abs(v) >= 1_000)     return '$' + (v / 1_000).toFixed(0) + 'K';
  return '$' + Math.round(v);
}

function fmtDate(dateStr) {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}