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

// ─── Inactivity timer ────────────────────────────────────────────────────────

// Returns how many times the user has dismissed: 0, 1, or 2+
function inactivityDismissCount() {
  return parseInt(localStorage.getItem(INACTIVITY_KEY) || '0', 10);
}

// Returns the timeout in ms to use next, or null if permanently suppressed
function nextInactivityMs() {
  const n = inactivityDismissCount();
  if (n === 0) return INACTIVITY_MS_1ST;
  if (n === 1) return INACTIVITY_MS_2ND;
  return null; // user dismissed twice — never show again
}

function startInactivityTimer() {
  if (nextInactivityMs() === null) return; // permanently dismissed
  const events = ['mousemove','mousedown','keydown','scroll','touchstart','click'];
  events.forEach(ev =>
    document.addEventListener(ev, resetInactivityTimer, { passive: true })
  );
  resetInactivityTimer();
}

function resetInactivityTimer() {
  const ms = nextInactivityMs();
  if (ms === null) return; // permanently dismissed
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(showInactivityModal, ms);
}

function showInactivityModal() {
  const isFinal = inactivityDismissCount() === 1; // second (last) showing
  const modal   = document.getElementById('inactivityModal');

  // Swap subtitle text to signal it's the last reminder
  const subtitle = modal.querySelector('.modal-header p');
  if (subtitle) {
    subtitle.textContent = isFinal
      ? "This is the last time we'll remind you. Your data lives only in this browser — export a backup or create an account to keep it safe."
      : "You've been inactive for 30 seconds. Your data is stored only in this browser — it will be lost if you clear your cache, use a different browser, or switch devices.";
  }

  modal.style.display = 'flex';
}

function dismissInactivity() {
  document.getElementById('inactivityModal').style.display = 'none';
  const newCount = inactivityDismissCount() + 1;
  localStorage.setItem(INACTIVITY_KEY, newCount.toString());
  // If they've now dismissed twice, stop the timer entirely
  if (newCount >= 2) {
    clearTimeout(inactivityTimer);
  } else {
    resetInactivityTimer(); // reschedule with 2-minute delay
  }
}

// ─── Auth modal ───────────────────────────────────────────────────────────────

function openAuthModal() {
  document.getElementById('inactivityModal').style.display = 'none';
  document.getElementById('authEmail').value    = '';
  document.getElementById('authPassword').value = '';
  document.getElementById('authModal').style.display = 'flex';
  resetInactivityTimer();
}

function createAccount() {
  const email    = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value;
  if (!email)    { alert('Please enter your email address.'); return; }
  if (!password) { alert('Please create a password.'); return; }
  // Placeholder — wire to your auth backend here
  alert('Account creation is coming soon!\n\nFor now, use Export Data to download your snapshots and re-import them any time.');
}

function oauthSignIn(provider) {
  // Placeholder — wire OAuth redirect/popup here
  alert(`${provider} sign-in is coming soon!`);
}

function openSignIn() {
  // Placeholder — swap modal content for a sign-in form here
  alert('Sign-in is coming soon!');
}


function exportAndDismiss() {
  exportData();
  dismissInactivity();
}

// ─── Total Card ──────────────────────────────────────────────────────────────

function renderTotalCard(latest, prev) {
  document.getElementById('totalNetWorth').textContent = latest ? fmt(latest.total) : '$0';
  document.getElementById('totalDate').textContent =
    latest ? `As of ${fmtDate(latest.date)}` : 'As of No data yet';

  const momEl = document.getElementById('totalMoM');
  if (latest && prev) {
    const ch    = latest.total - prev.total;
    const pct   = prev.total !== 0 ? (ch / prev.total) * 100 : 0;
    const sign  = ch >= 0 ? '+' : '';
    const color = ch >= 0 ? '#3fb950' : '#f85149';
    const arrow = ch >= 0 ? '↑' : '↓';
    momEl.innerHTML = `<span style="color:${color}">${arrow} ${sign}${fmt(ch)} (${sign}${pct.toFixed(2)}%) MoM</span>`;
  } else {
    momEl.innerHTML = '';
  }
}

// ─── Category Cards ──────────────────────────────────────────────────────────

function renderCategoryCards(latest, prev) {
  const cats = [
    { key: 'cash',       vId: 'cashValue',       pId: 'cashPct',       mId: 'cashMoM'       },
    { key: 'taxable',    vId: 'taxableValue',    pId: 'taxablePct',    mId: 'taxableMoM'    },
    { key: 'retirement', vId: 'retirementValue', pId: 'retirementPct', mId: 'retirementMoM' },
    { key: 'realEstate', vId: 'realEstateValue', pId: 'realEstatePct', mId: 'realEstateMoM' }
  ];
  const total = latest ? (latest.total || 0) : 0;

  cats.forEach(({ key, vId, pId, mId }) => {
    const value = latest ? (latest[key] || 0) : 0;
    const pct   = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';

    document.getElementById(vId).textContent = fmt(value);
    document.getElementById(pId).textContent = `${pct}% of portfolio`;

    const momEl = document.getElementById(mId);
    if (latest && prev) {
      const prevVal = prev[key] || 0;
      const ch      = value - prevVal;
      const chPct   = prevVal !== 0 ? (ch / prevVal) * 100 : 0;
      if (Math.abs(ch) < 0.01) {
        momEl.textContent = '—'; momEl.className = 'mom-badge neutral';
      } else if (ch > 0) {
        momEl.textContent = `↑ +${chPct.toFixed(1)}%`; momEl.className = 'mom-badge positive';
      } else {
        momEl.textContent = `↓ ${chPct.toFixed(1)}%`;  momEl.className = 'mom-badge negative';
      }
    } else {
      momEl.textContent = ''; momEl.className = 'mom-badge';
    }
  });
}

// ─── Line Chart ──────────────────────────────────────────────────────────────

function renderLineChart() {
  const canvas  = document.getElementById('lineChart');
  const emptyEl = document.getElementById('lineChartEmpty');

  if (snapshots.length === 0) {
    canvas.style.display  = 'none';
    emptyEl.style.display = 'block';
    if (lineChart) { lineChart.destroy(); lineChart = null; }
    return;
  }
  canvas.style.display  = 'block';
  emptyEl.style.display = 'none';

  const labels = snapshots.map(s => fmtDate(s.date));
  const datasets = [
    { label:'Net Worth',  data:snapshots.map(s=>s.total),      borderColor:'#00d4a0', backgroundColor:'rgba(0,212,160,0.07)', fill:true,  tension:0.3, pointRadius:4, pointHoverRadius:6, borderWidth:2 },
    { label:'Cash',       data:snapshots.map(s=>s.cash),       borderColor:COLORS.cash,       backgroundColor:'transparent', tension:0.3, pointRadius:3, pointHoverRadius:5, borderWidth:1.5 },
    { label:'Taxable',    data:snapshots.map(s=>s.taxable),    borderColor:COLORS.taxable,    backgroundColor:'transparent', tension:0.3, pointRadius:3, pointHoverRadius:5, borderWidth:1.5 },
    { label:'Retirement', data:snapshots.map(s=>s.retirement), borderColor:COLORS.retirement, backgroundColor:'transparent', tension:0.3, pointRadius:3, pointHoverRadius:5, borderWidth:1.5 },
    { label:'Real Estate',data:snapshots.map(s=>s.realEstate), borderColor:COLORS.realEstate, backgroundColor:'transparent', tension:0.3, pointRadius:3, pointHoverRadius:5, borderWidth:1.5 }
  ];

  if (lineChart) lineChart.destroy();
  lineChart = new Chart(canvas, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode:'index', intersect:false },
      plugins: {
        legend: { labels: { color:'#e6edf3', font:{size:11}, padding:12 } },
        tooltip: {
          backgroundColor:'#21262d', borderColor:'#30363d', borderWidth:1,
          titleColor:'#e6edf3', bodyColor:'#8b949e',
          callbacks: {
            label(ctx) {
              const snap  = snapshots[ctx.dataIndex];
              const total = snap ? snap.total : 0;
              const pctStr = (total > 0 && ctx.dataset.label !== 'Net Worth')
                ? ` (${((ctx.raw / total) * 100).toFixed(1)}%)` : '';
              return ` ${ctx.dataset.label}: ${fmt(ctx.raw)}${pctStr}`;
            }
          }
        }
      },
      scales: {
        x: { grid:{color:'#21262d'}, ticks:{color:'#8b949e', font:{size:11}} },
        y: { grid:{color:'#21262d'}, ticks:{color:'#8b949e', font:{size:11}, callback:v=>fmtShort(v)} }
      }
    }
  });
}

// ─── Allocation Chart ────────────────────────────────────────────────────────

function renderAllocationChart(latest) {
  const canvas  = document.getElementById('allocationChart');
  const emptyEl = document.getElementById('allocationChartEmpty');

  if (!latest || latest.total === 0) {
    canvas.style.display  = 'none';
    emptyEl.style.display = 'block';
    if (allocationChart) { allocationChart.destroy(); allocationChart = null; }
    return;
  }
  canvas.style.display  = 'block';
  emptyEl.style.display = 'none';

  const data  = [latest.cash, latest.taxable, latest.retirement, latest.realEstate];
  const total = data.reduce((a, b) => a + b, 0);

  if (allocationChart) allocationChart.destroy();
  allocationChart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: CAT_LABELS,
      datasets: [{ data, backgroundColor:CAT_COLORS, borderColor:'#161b22', borderWidth:2, hoverOffset:8 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '60%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#e6edf3', padding:14, font:{size:12},
            generateLabels(chart) {
              const ds = chart.data.datasets[0];
              const t  = ds.data.reduce((s, v) => s + v, 0);
              return chart.data.labels.map((label, i) => {
                const pct = t > 0 ? ((ds.data[i] / t) * 100).toFixed(1) : '0.0';
                return {
                  text: `${label} (${pct}%)`,
                  fillStyle: ds.backgroundColor[i],
                  strokeStyle: 'transparent',
                  lineWidth: 0, hidden: false,
                  index: i, datasetIndex: 0,
                  fontColor: '#e6edf3'
                };
              });
            }
          }
        },
        tooltip: {
          backgroundColor:'#21262d', borderColor:'#30363d', borderWidth:1,
          titleColor:'#e6edf3', bodyColor:'#8b949e',
          callbacks: {
            label(ctx) {
              const pct = total > 0 ? ((ctx.raw / total) * 100).toFixed(1) : '0.0';
              return ` ${ctx.label}: ${fmt(ctx.raw)} (${pct}%)`;
            }
          }
        }
      }
    }
  });
}

// ─── Snapshot History ────────────────────────────────────────────────────────

function renderSnapshotHistory() {
  const container = document.getElementById('snapshotTable');
  if (snapshots.length === 0) {
    container.innerHTML = '<div class="empty-state">No snapshots yet. Add your first snapshot!</div>';
    return;
  }

  const sorted = [...snapshots].reverse();
  let html = `<table class="snapshot-table">
    <thead><tr>
      <th>Date</th><th>Cash</th><th>Taxable</th>
      <th>Retirement</th><th>Real Estate</th><th>Total</th><th>MoM</th><th></th>
    </tr></thead><tbody>`;

  sorted.forEach(snap => {
    const idx  = snapshots.findIndex(s => s.id === snap.id);
    const prev = snapshots[idx - 1];
    let momHtml = '<span style="color:#8b949e">—</span>';
    if (prev) {
      const ch    = snap.total - prev.total;
      const pct   = prev.total !== 0 ? (ch / prev.total) * 100 : 0;
      const sign  = ch >= 0 ? '+' : '';
      const color = ch >= 0 ? '#3fb950' : '#f85149';
      momHtml = `<span style="color:${color}">${sign}${pct.toFixed(2)}%</span>`;
    }
    html += `<tr>
      <td>${fmtDate(snap.date)}</td>
      <td>${fmt(snap.cash)}</td><td>${fmt(snap.taxable)}</td>
      <td>${fmt(snap.retirement)}</td><td>${fmt(snap.realEstate)}</td>
      <td><strong>${fmt(snap.total)}</strong></td>
      <td>${momHtml}</td>
      <td><button class="delete-btn" onclick="deleteSnapshot('${snap.id}')" title="Delete">🗑</button></td>
    </tr>`;
  });

  html += '</tbody></table>';
  container.innerHTML = html;
}

// ─── Add / Delete Snapshot ───────────────────────────────────────────────────

function openAddModal() {
  const now = new Date();
  document.getElementById('snapshotDate').value =
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  ['snapshotCash','snapshotTaxable','snapshotRetirement','snapshotRealEstate']
    .forEach(id => { document.getElementById(id).value = ''; });
  document.getElementById('addSnapshotModal').style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

function closeModalOnOverlay(e, id) {
  if (e.target === document.getElementById(id)) closeModal(id);
}

function saveSnapshot() {
  const date = document.getElementById('snapshotDate').value;
  if (!date) { alert('Please select a date.'); return; }

  const cash       = parseFloat(document.getElementById('snapshotCash').value)       || 0;
  const taxable    = parseFloat(document.getElementById('snapshotTaxable').value)    || 0;
  const retirement = parseFloat(document.getElementById('snapshotRetirement').value) || 0;
  const realEstate = parseFloat(document.getElementById('snapshotRealEstate').value) || 0;

  const snapshot = {
    id:   Date.now().toString(),
    date, cash, taxable, retirement, realEstate,
    total: cash + taxable + retirement + realEstate
  };

  const existingIdx = snapshots.findIndex(s => s.date === date);
  if (existingIdx >= 0) {
    snapshots[existingIdx] = snapshot;
  } else {
    snapshots.push(snapshot);
  }
  snapshots.sort((a, b) => new Date(a.date) - new Date(b.date));
  persistSnapshots();
  closeModal('addSnapshotModal');
  renderAll();
}

function deleteSnapshot(id) {
  if (!confirm('Delete this snapshot?')) return;
  snapshots = snapshots.filter(s => s.id !== id);
  persistSnapshots();
  renderAll();
}

function clearAllData(e) {
  e.stopPropagation();
  if (!confirm('Delete all snapshots? This cannot be undone.')) return;
  snapshots = [];
  persistSnapshots();
  renderAll();
}

// ─── Collapse Toggle ─────────────────────────────────────────────────────────

function toggleSection(contentId, btnId) {
  const content  = document.getElementById(contentId);
  const btn      = document.getElementById(btnId);
  const isHidden = content.style.display === 'none';
  content.style.display = isHidden ? 'block' : 'none';
  btn.textContent = isHidden ? '▲ Collapse' : '▼ Expand';
}

// ─── Export / Import ─────────────────────────────────────────────────────────

function exportData() {
  if (typeof XLSX === 'undefined') { alert('Excel library not loaded. Refresh and try again.'); return; }

  const wb   = XLSX.utils.book_new();
  const rows = [
    ['Date', 'Net Worth', 'Cash', 'Investments', 'Retirement', 'Real Estate']
  ];
  snapshots.forEach(s => {
    rows.push([s.date, s.total || 0, s.cash || 0, s.taxable || 0, s.retirement || 0, s.realEstate || 0]);
  });

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{ wch:12 }, { wch:14 }, { wch:12 }, { wch:14 }, { wch:14 }, { wch:14 }];
  XLSX.utils.book_append_sheet(wb, ws, 'Net Worth Data');

  XLSX.writeFile(wb, `networth-export-${new Date().toISOString().slice(0, 10)}.xlsx`);
}

function openPasteModal() {
  document.getElementById('pasteDataInput').value = '';
  document.getElementById('pasteDataModal').style.display = 'flex';
}

function importData() {
  if (typeof XLSX === 'undefined') { alert('Excel library not loaded. Refresh and try again.'); return; }

  const fileInput = document.getElementById('pasteDataInput');
  if (!fileInput.files || fileInput.files.length === 0) {
    alert('Please select an Excel file.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const workbook = XLSX.read(e.target.result, { type: 'array', cellDates: true });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

      function parseDate(val) {
        if (!val) return null;
        if (val instanceof Date) {
          const y = val.getFullYear();
          const m = String(val.getMonth() + 1).padStart(2, '0');
          return `${y}-${m}`;
        }
        const str = String(val).trim();
        if (/^\d{4}-\d{2}$/.test(str)) return str;
        const match = str.match(/^(\d{1,2})\/\d{1,2}\/(\d{4})$/);
        if (match) return `${match[2]}-${String(parseInt(match[1])).padStart(2, '0')}`;
        return null;
      }

      function parseNum(val) {
        if (typeof val === 'number') return val;
        return Number(String(val).replace(/[$,\s]/g, '')) || 0;
      }

      const data = rows
        .map(r => ({
          date:       parseDate(r['Date'] || r['date']),
          cash:       parseNum(r['Cash']       || r['cash']       || 0),
          taxable:    parseNum(r['Investments'] || r['taxable']    || 0),
          retirement: parseNum(r['Retirement']  || r['retirement'] || 0),
          realEstate: parseNum(r['Real Estate'] || r['realEstate'] || 0),
        }))
        .filter(r => r.date !== null);

      if (data.length === 0) {
        alert('No valid snapshot rows found. Make sure the file matches the template format.');
        return;
      }

      if (!confirm(`Import ${data.length} snapshot(s)? Existing entries for the same month will be overwritten.`)) return;

      data.forEach(s => {
        const snap = {
          id:         Date.now().toString() + Math.random(),
          date:       s.date,
          cash:       s.cash,
          taxable:    s.taxable,
          retirement: s.retirement,
          realEstate: s.realEstate,
          total:      s.cash + s.taxable + s.retirement + s.realEstate
        };
        const idx = snapshots.findIndex(e => e.date === snap.date);
        if (idx >= 0) { snapshots[idx] = snap; } else { snapshots.push(snap); }
      });

      snapshots.sort((a, b) => new Date(a.date) - new Date(b.date));
      persistSnapshots();
      closeModal('pasteDataModal');
      renderAll();
      alert(`Imported ${data.length} snapshot(s).`);
    } catch (err) {
      alert('Failed to parse Excel file: ' + err.message);
    }
  };
  reader.onerror = function() { alert('Failed to read file.'); };
  reader.readAsArrayBuffer(fileInput.files[0]);
}

// ─── Excel Template ──────────────────────────────────────────────────────────

function downloadTemplate() {
  if (typeof XLSX === 'undefined') { alert('Excel library not loaded. Refresh and try again.'); return; }

  const wb = XLSX.utils.book_new();

  const blank = ['', '', '', '', '', ''];
  const wsData = [
    ['Date', 'Net Worth', 'Cash', 'Investments', 'Retirement', 'Real Estate'],
    [new Date(2022, 0, 1), 143719, 22005, 69668, 52046, 0],
    blank, blank, blank, blank, blank, blank
  ];
  const ws = XLSX.utils.aoa_to_sheet(wsData, { cellDates: true });

  if (ws['A2']) ws['A2'].z = 'M/D/YYYY';
  ['B2','C2','D2','E2','F2'].forEach(ref => { if (ws[ref]) ws[ref].z = '"$"#,##0'; });

  ws['!cols'] = [{ wch:12 },{ wch:14 },{ wch:12 },{ wch:14 },{ wch:14 },{ wch:14 }];
  XLSX.utils.book_append_sheet(wb, ws, 'Net Worth Data');

  const instrData = [
    ['NET WORTH TRACKER — DATA TEMPLATE'], [''],
    ['This template matches the expected import format.'],
    ['Instructions:'],
    ['1. Enter dates in M/D/YYYY format (e.g. 1/1/2022 for January 2022)'],
    ['2. Enter dollar amounts as plain numbers — no $ sign or commas needed'],
    ['3. Net Worth is for reference; the app calculates it automatically'],
    ['4. Delete the example row before importing'], [''],
    ['Categories:'],
    ['Cash',        'Checking, savings, money market, CDs'],
    ['Investments', 'Brokerage, stocks, ETFs, mutual funds'],
    ['Retirement',  '401k, IRA, Roth IRA, pension'],
    ['Real Estate', 'Primary home, investment properties (market value)']
  ];
  const wsInstr = XLSX.utils.aoa_to_sheet(instrData);
  wsInstr['!cols'] = [{ wch:30 },{ wch:50 }];
  XLSX.utils.book_append_sheet(wb, wsInstr, 'Instructions');

  XLSX.writeFile(wb, 'networth-template.xlsx');
}

// ─── Print Report ────────────────────────────────────────────────────────────

/**
 * printReport() — Monochrome-Optimized Print Function
 * Generates a letter-size Net Worth Report with full compatibility for monochrome laser printers
 * (HP LaserJet, Brother, Canon, etc.).
 * 
 * MONOCHROME ADAPTATIONS:
 * - All text, borders, and lines use pure black (#000000) for maximum printer compatibility
 * - No grayscale variations or light colors that may not print reliably
 * - ALL TEXT IS BOLD (font-weight: 700/900) for maximum visibility on monochrome printers
 * - Thicker borders (2px+) for prominent definition and crisp lines
 * - Increased font sizes and padding for improved readability
 * - Pure black rendering eliminates dithering inconsistencies across different printer models
 * - Optimized spacing and line-height for legibility on all monochrome laser devices
 * - High ink density on printed text and lines prevents fading on HP LaserJet, Brother, Canon, Xerox
 */
function printReport() {
  const latest = snapshots.length > 0 ? snapshots[snapshots.length - 1] : null;
  const prev   = snapshots.length > 1 ? snapshots[snapshots.length - 2] : null;

  const kpis = [
    { label:'Total Net Worth',         value: latest ? latest.total      : 0, prev: prev ? prev.total      : null },
    { label:'Cash Equivalents',        value: latest ? latest.cash       : 0, prev: prev ? prev.cash       : null },
    { label:'Taxable Investments',     value: latest ? latest.taxable    : 0, prev: prev ? prev.taxable    : null },
    { label:'Retirement Investments',  value: latest ? latest.retirement : 0, prev: prev ? prev.retirement : null },
    { label:'Real Estate',             value: latest ? latest.realEstate : 0, prev: prev ? prev.realEstate : null }
  ];

  const kpiHtml = kpis.map(k => {
    let changeHtml = '';
    if (k.prev !== null) {
      const ch    = k.value - k.prev;
      const pct   = k.prev !== 0 ? (ch / k.prev) * 100 : 0;
      const sign  = ch >= 0 ? '+' : '';
      // MONOCHROME: All indicators use pure black (#000000) and bold for reliable printer output
      const color = '#000000';
      changeHtml = `<div class="pr-kpi-change" style="color:${color};font-weight:700">${sign}${pct.toFixed(1)}% MoM</div>`;
    }
    return `<div class="pr-kpi"><div class="pr-kpi-label" style="font-weight:700">${k.label}</div>
      <div class="pr-kpi-value" style="font-weight:900">${fmt(k.value)}</div>${changeHtml}</div>`;
  }).join('');

  // Render print-specific line chart off-screen: only Net Worth total, pure black
  // MONOCHROME: Chart uses pure black (#000000) for all lines and text
  const offscreen = document.createElement('div');
  offscreen.style.cssText = 'position:fixed;left:-9999px;top:0;visibility:hidden';
  document.body.appendChild(offscreen);

  let lineImg = '';

  if (snapshots.length > 0) {
    const c = document.createElement('canvas');
    c.width = 880; c.height = 260;
    offscreen.appendChild(c);
    const ch = new Chart(c, {
      type: 'line',
      data: {
        labels: snapshots.map(s => fmtDate(s.date)),
        datasets: [{
          label: 'Net Worth',
          data: snapshots.map(s => s.total),
          // MONOCHROME: Pure black line (#000000) with solid fill (no opacity) for maximum printer compatibility
          borderColor: '#000000', backgroundColor: '#f0f0f0',
          fill: true, tension: 0.3, pointRadius: 4, borderWidth: 3
        }]
      },
      options: {
        responsive: false, animation: { duration: 0 },
        plugins: { legend: { display: false } },
        scales: {
          // MONOCHROME: All axis lines, grids, text bold and black (#000000) for visibility
          x: { grid: { color: '#000000', lineWidth: 2 }, ticks: { color: '#000000', font: { size: 11, weight: 700 }, maxRotation: 45 } },
          y: { grid: { color: '#000000', lineWidth: 2 }, ticks: { color: '#000000', font: { size: 11, weight: 700 }, callback: v => fmtShort(v) } }
        }
      }
    });
    lineImg = c.toDataURL();
    ch.destroy();
  }

  document.body.removeChild(offscreen);

  // MONOCHROME: No-data message uses pure black and bold for consistent, visible appearance
  const lineHtml = lineImg ? `<img src="${lineImg}" alt="Net Worth Chart">` : '<div style="padding:40px;text-align:center;color:#000000;font-size:12px;font-weight:700">No data</div>';

  const recent = [...snapshots].reverse().slice(0, 12);
  const rowsHtml = recent.length === 0
    ? '<tr><td colspan="7" style="text-align:center;color:#000000;font-weight:700;font-size:12px">No data</td></tr>'
    : recent.map(snap => {
        const idx  = snapshots.findIndex(s => s.id === snap.id);
        const p    = snapshots[idx - 1];
        let momCell = '—';
        if (p) {
          const ch    = snap.total - p.total;
          const pct   = p.total !== 0 ? (ch / p.total) * 100 : 0;
          const sign  = ch >= 0 ? '+' : '';
          // MONOCHROME: All text uses pure black (#000000) and bold for consistent, reliable printing
          const color = '#000000';
          momCell = `<span style="color:${color};font-weight:700">${sign}${pct.toFixed(2)}%</span>`;
        }
        return `<tr>
          <td style="font-weight:700">${fmtDate(snap.date)}</td><td style="font-weight:700">${fmt(snap.cash)}</td>
          <td style="font-weight:700">${fmt(snap.taxable)}</td><td style="font-weight:700">${fmt(snap.retirement)}</td>
          <td style="font-weight:700">${fmt(snap.realEstate)}</td><td style="font-weight:900">${fmt(snap.total)}</td>
          <td style="font-weight:700">${momCell}</td></tr>`;
      }).join('');

  const dateStr = new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
  document.getElementById('printReport').innerHTML = `
    <div class="pr-header">
      <h1>Net Worth Report</h1>
      <div class="pr-date">Generated ${dateStr}${latest ? ` &nbsp;·&nbsp; Data as of ${fmtDate(latest.date)}` : ''}</div>
    </div>
    <div class="pr-kpi-grid">${kpiHtml}</div>
    <div class="pr-chart-box pr-chart-full"><h4>Net Worth Over Time</h4>${lineHtml}</div>
    <div class="pr-history">
      <h4>Recent Snapshot History (Last 12)</h4>
      <table class="pr-history-table">
        <thead><tr><th>Date</th><th>Cash</th><th>Taxable</th><th>Retirement</th><th>Real Estate</th><th>Total</th><th>MoM</th></tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>`;
  window.print();
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
