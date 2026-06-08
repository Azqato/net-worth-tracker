# Net Worth Tracker — Patch Notes

All changes listed newest first.

---

## v3.6 — 2026-06-08 — Documentation Audit & Restructure

### Added
- Created `/docs/` directory to house all project documentation
- Added `/docs/PRFAQ.md` — press release and internal/external FAQ
- Added `/docs/TENETS.md` — product principles and decision framework
- Added `/docs/METRICS.md` — north star metric, targets, and measurement methods
- Added `/docs/ROADMAP.md` — current phase, milestones, and deferred items
- Added `/docs/SECURITY.md` — authentication model, data storage, attack surface
- Added `/docs/RUNBOOK.md` — local setup, build, deploy, rollback, and common errors

### Changed
- Moved `PRD.md` → `/docs/PRD.md`; restructured to include problem statement, personas, goals, non-goals, user stories, feature list, constraints, assumptions, and success criteria
- Moved `TRD.md` → `/docs/TRD.md`; updated folder structure section to reflect `/docs/`, added known technical debt section
- Moved `Design.md` → `/docs/DESIGN.md`; added design philosophy, spacing system, breakpoints, accessibility standards, and animation/motion sections
- Moved `PatchNotes.md` → `/docs/PATCHNOTES.md`; converted to semantic versioning (MAJOR.MINOR.PATCH) with dated entries
- Updated `README.md` with developer-oriented sections: prerequisites, installation, local dev, environment variables, build/deploy instructions, and link to `/docs/`

### Removed
- Root-level `PRD.md`, `TRD.md`, `Design.md`, `PatchNotes.md` (superseded by `/docs/` equivalents)

---

## v3.5 — 2024-06-01 — Codebase Cleanup & Documentation

### Added
- `PatchNotes.md`, `Design.md`, `PRD.md`, `TRD.md` added to project root

### Changed
- Updated `README.md` with accurate button labels and current feature list

### Fixed
- "As of No data yet" display text corrected to "No data yet" on app page

### Removed
- Stale server files (`index.js`, `package.json`, `data.json`) left over from an early Node.js prototype
- Verbose multi-line comment blocks in `style.css` and `app.js`

---

## v3.4 — Nav Button Polish

### Changed
- Support button moved to sit between Add Snapshot and Guide in app nav

### Removed
- Emojis removed from all navigation buttons for a cleaner look

---

## v3.3 — Unified Button Style

### Changed
- All navigation buttons across both pages converted to the same uniform outline style (`.btn-outline`)
- Landing page section links (Setup, Import, Export) converted from text links to matching outline buttons
- Add Snapshot button changed from green fill to outline style

---

## v3.2 — Navigation Cleanup

### Added
- Guide and App buttons added to the far right of navigation on all pages
- Active page highlighted with accent-color border (`.btn-nav-active`)

---

## v3.1 — Landing Page & Guide

### Added
- Dedicated landing page at the site root (`index.html`) with step-by-step Setup, Import, and Export tutorials
- Guide button in the app navigation bar linking back to the landing page

### Changed
- Tracker app moved from `index.html` to `app.html`; landing page is now the public entry point

---

## v3.0 — Support Button Repositioned

### Changed
- Support button moved to the left of the Guide button in the navigation bar

---

## v2.9 — Footer & Support Link

### Added
- "Built by Azqato" footer on all pages linking to `azqato.github.io`
- Support button in the navigation bar linking to the support page

---

## v2.8 — Money Bag Favicon

### Added
- Money bag emoji favicon implemented as an SVG (`favicon.svg`) for crisp rendering in all browsers and bookmarks

---

## v2.7 — Enhanced Monochrome Printer Visibility

### Changed
- All print text uses bold font-weight (700–900) for maximum visibility on monochrome laser printers
- Border widths increased from 1px to 2–3px for crisp definition
- Font sizes increased 10–20% for improved legibility
- Line-height and chart line-width increased (3px) for crisp rendering without dithering

---

## v2.6 — Export Format Standardization

### Changed
- Export column format now matches the template and import format exactly (Date, Net Worth, Cash, Investments, Retirement, Real Estate)
- Column widths standardized across export, template, and import
- Exported files can be re-imported directly without reformatting

---

## v2.5 — Monochrome Laser Printer Optimization

### Changed
- Print report uses pure black (`#000000`) exclusively for all text, borders, and lines
- Eliminated all grayscale variants that cause dithering inconsistencies across printer models

---

## v2.4 — Print Report Improvements

### Changed
- Snapshot history on print report expanded from last 5 to last 12 months
- Net Worth Over Time chart on print shows total net worth line only (category lines removed)
- Net Worth Over Time chart takes a full-width row on the print layout

### Removed
- Allocation chart removed from print layout

---

## v2.3 — Clear All Data

### Added
- Clear All button in the Snapshot History header that deletes all snapshots at once
- Confirmation prompt required before data is removed

---

## v2.2 — Simplified Column Format

### Changed
- Template and import now use condensed column headers: Date, Net Worth, Cash, Investments, Retirement, Real Estate
- Date column format standardized to M/D/YYYY

---

## v2.1 — Excel Import

### Changed
- Import Data now accepts an Excel (`.xlsx`) file instead of raw JSON
- Rows with missing or malformed dates are automatically skipped

---

## v2.0 — Allocation Chart Labels

### Changed
- Allocation chart legend now shows inline percentage per category (e.g., "Cash (5%)") — no hover required

---

## v1.4 — Print & PDF Report

### Added
- Print function produces a clean 8.5×11 letter-portrait PDF report
- Report includes: KPI grid, Net Worth Over Time chart, and last-12-snapshot history table
- `@media print` CSS layer forces monochrome output and hides all UI chrome
- Chart images captured via Canvas API for accurate print fidelity

---

## v1.3 — Collapsible History & Print Preview

### Added
- Snapshot History section collapse/expand toggle
- Patch Notes section collapse/expand toggle

---

## v1.2 — Excel Template & MoM Indicators

### Added
- Excel (`.xlsx`) template download with pre-formatted columns and an Instructions tab
- Month-over-month percentage change badges on all four category cards and the Total Net Worth card

---

## v1.1 — Chart Enhancements & Allocation Fix

### Added
- Hover tooltips on all charts show dollar value and percentage of portfolio

### Fixed
- Allocation percentage calculations now correctly computed from the latest snapshot total

### Changed
- Line chart shows all five series (Net Worth + 4 categories)

---

## v1.0 — Initial Release

### Added
- Net worth tracking across four categories: Cash Equivalents, Taxable Investments, Retirement Investments, Real Estate
- Add Snapshot modal for monthly data entry
- Net Worth Over Time line chart and Allocation doughnut chart
- Snapshot history table with per-row delete support
- Export to JSON and Paste/Import data
- Data stored in browser `localStorage` — persists across visits until cache is cleared
