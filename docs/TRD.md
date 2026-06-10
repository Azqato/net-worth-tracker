# Net Worth Tracker — Technical Requirements Document

## System Architecture

**Type**: Static web app — no server, no backend, no API calls for user data.  
**Deployment**: GitHub Pages (`Azqato/net-worth-tracker`, `main` branch). Files served directly from the repo root.  
**Data persistence**: Browser `localStorage` only, scoped to the origin and browser profile. Clearing browser cache removes all data.  
**Build**: None. No bundler, no compiler, no transpiler. Every file ships as-is.

---

## Tech Stack

| Layer | Technology | Version | Delivery |
|---|---|---|---|
| Markup | HTML5 | — | Static file |
| Styling | CSS3 (custom properties, grid, flexbox) | — | Static file |
| Logic | Vanilla JavaScript (ES2020+) | — | Static file |
| Charts | Chart.js | 4.4.0 | jsDelivr CDN |
| Excel I/O | SheetJS (xlsx) | 0.20.1 | SheetJS CDN |
| Hosting | GitHub Pages | — | — |

No Node.js. No npm. No framework. No runtime in production.

---

## Folder Structure

```
/
├── index.html        # Landing page & step-by-step guide (site entry point)
├── app.html          # Net Worth Tracker application
├── style.css         # Shared stylesheet for both pages
├── app.js            # All application logic (loaded by app.html only)
├── favicon.svg       # Money bag emoji favicon (SVG)
├── README.md         # Developer-facing project overview (root only)
└── docs/
    ├── PRD.md        # Product requirements
    ├── TRD.md        # This file — technical requirements
    ├── DESIGN.md     # Design system reference
    ├── PATCHNOTES.md # Full version history
    ├── PRFAQ.md      # Press release and FAQ
    ├── TENETS.md     # Product principles
    ├── METRICS.md    # Success metrics and targets
    ├── ROADMAP.md    # Milestone planning
    ├── SECURITY.md   # Security posture and data handling
    └── RUNBOOK.md    # Setup, deploy, and ops procedures
```

---

## Data Models

### Snapshot Object

```json
{
  "id": "1717000000000",
  "date": "2024-06",
  "cash": 22000,
  "taxable": 150000,
  "retirement": 95000,
  "realEstate": 280000,
  "total": 547000
}
```

| Field | Type | Description |
|---|---|---|
| `id` | string | `Date.now().toString()` for manual saves; `Date.now() + Math.random()` for bulk imports |
| `date` | string | ISO year-month `YYYY-MM` |
| `cash` | number | Cash Equivalents balance (dollars, no decimals stored) |
| `taxable` | number | Taxable Investments balance |
| `retirement` | number | Retirement Investments balance |
| `realEstate` | number | Real Estate market value |
| `total` | number | Sum of all four categories; computed at save time, stored for convenience |

### localStorage Keys

| Key | Type | Description |
|---|---|---|
| `networth_snapshots` | JSON array | All snapshots, sorted by date ascending |
| `inactivity_dismiss_count` | integer string | Times the inactivity modal was dismissed (0, 1, or 2) |

---

## API Design

This is a browser-only application. There are no HTTP endpoints. The internal data flow is:

### Write path
1. User fills form → `saveSnapshot()` called
2. Parse and validate inputs
3. Upsert into `snapshots` array (match by `date` field)
4. Sort array by date ascending
5. `persistSnapshots()` → `localStorage.setItem('networth_snapshots', JSON.stringify(snapshots))`
6. `renderAll()` → update all DOM elements

### Read path
1. `DOMContentLoaded` fires → `loadSnapshots()`
2. `JSON.parse(localStorage.getItem('networth_snapshots'))` → `snapshots` global array
3. `renderAll()` dispatches to each renderer

### Import path
```
FileReader.readAsArrayBuffer(file)
  → XLSX.read(buffer, { cellDates: true })
  → sheet_to_json(worksheet, { defval: '' })
  → parseDate(val)    // handles Date objects, YYYY-MM strings, M/D/YYYY strings
  → parseNum(val)     // strips $, commas; falls back to 0
  → filter rows where date === null
  → confirm(count) prompt
  → upsert each row into snapshots
  → sort → persist → renderAll
```

### Export path
```
XLSX.utils.book_new()
  → aoa_to_sheet([ headers, ...rows ])   // Date, Net Worth, Cash, Investments, Retirement, Real Estate
  → set column widths (!cols)
  → book_append_sheet(wb, ws, 'Net Worth Data')
  → XLSX.writeFile(wb, 'networth-export-YYYY-MM-DD.xlsx')
```

### Print path
1. Gather latest/prev snapshot data
2. Build KPI HTML (5 cards: Total, Cash, Taxable, Retirement, Real Estate)
3. Create off-screen `<div>` at `left: -9999px`
4. Create `<canvas>` (880×260px) and render Chart.js line chart (total net worth only, monochrome)
5. Capture canvas as PNG via `canvas.toDataURL()`
6. Destroy Chart.js instance; remove off-screen div
7. Build last-12-months history table HTML
8. Inject all generated HTML into `#printReport`
9. Call `window.print()`

---

## State Management

All state lives in a single module-level `snapshots` array in `app.js`. There is no external state library.

- **Load**: read from `localStorage` on `DOMContentLoaded`
- **Mutate**: modify the array, sort by date, write back to `localStorage`
- **Render**: `renderAll()` is called after every mutation; all renderers are pure DOM writers that read from `snapshots`
- **Charts**: `lineChart` and `allocationChart` are module-level variables holding Chart.js instances. Each render call destroys the previous instance before creating a new one to prevent canvas memory leaks.

### Render pipeline

| Function | DOM targets |
|---|---|
| `renderTotalCard(latest, prev)` | `#totalNetWorth`, `#totalDate`, `#totalMoM` |
| `renderCategoryCards(latest, prev)` | `#cashValue`, `#cashPct`, `#cashMoM` (× 4 categories) |
| `renderLineChart()` | `#lineChart` canvas |
| `renderAllocationChart(latest)` | `#allocationChart` canvas |
| `renderSnapshotHistory()` | `#snapshotTable` innerHTML |

### Inactivity Timer

- **Events monitored**: `mousemove`, `mousedown`, `keydown`, `scroll`, `touchstart`, `click`
- **First warning**: 30 seconds of inactivity (`INACTIVITY_MS_1ST`)
- **Second warning**: 120 seconds after first dismissal (`INACTIVITY_MS_2ND`)
- **After two dismissals**: timer permanently stopped; state persisted in `inactivity_dismiss_count`

---

## Third-Party Integrations

| Library | Purpose | Source | Auth |
|---|---|---|---|
| Chart.js 4.4.0 | Line chart and doughnut chart rendering | `cdn.jsdelivr.net` | None |
| SheetJS 0.20.1 | Excel `.xlsx` read and write | `cdn.sheetjs.com` | None |

Both scripts are loaded via `<script src>` in `app.html`. If either fails to load, the relevant function alerts the user and returns early. No user data is sent to these CDNs — they serve JavaScript files only.

---

## Performance Requirements

| Target | Value |
|---|---|
| Page load (cold, no data) | < 2 seconds on broadband |
| First meaningful render | < 1 second (no SSR required; page is fully static) |
| Bundle size | No JS bundle — all JS loaded from CDN or inline |
| Render on 100 snapshots | < 100ms (all operations are synchronous DOM writes) |
| localStorage footprint | < 50KB for 10 years of monthly data |

---

## Browser Requirements

| API / Feature | Required for |
|---|---|
| `localStorage` | All data persistence |
| `FileReader` | Excel import |
| Canvas API | Print chart capture |
| CSS Grid | Category grid and charts row layout |
| CSS Custom Properties | Theming |
| ES2020 (optional chaining, numeric separators) | `app.js` |

Supported: Chrome 80+, Firefox 79+, Safari 14+, Edge 80+.

---

## Deployment

| Property | Value |
|---|---|
| Repository | `https://github.com/Azqato/net-worth-tracker` |
| Branch | `main` |
| Pages source | Repo root (`/`) |
| Live URL | `https://azqato.github.io/net-worth-tracker/` |
| Entry point | `index.html` |

Push to `main` → GitHub Actions builds Pages → live within ~30 seconds. No build command, no artifact to upload.

---

## Known Technical Debt

| Item | Current shortcut | Correct solution |
|---|---|---|
| No input validation on snapshot form | Negative numbers and non-numeric input are coerced to 0 or NaN silently | Add client-side validation with user-visible error messages |
| Auth modal is UI-only | `authModal` renders a full sign-up form with OAuth buttons wired to `oauthSignIn()` stub functions that do nothing | Remove the modal entirely or connect to a real auth provider |
| Global `snapshots` array | All state in a single mutable global; no encapsulation | Wrap in a module or class with explicit read/write methods |
| `renderAll()` is always full re-render | Every mutation re-renders every chart and DOM section | Add dirty-checking to skip unchanged sections |
| No offline fallback for CDN scripts | If jsDelivr or SheetJS CDN is unreachable, charts and import/export silently fail | Bundle or self-host CDN scripts; add explicit error UI |
