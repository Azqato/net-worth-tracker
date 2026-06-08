# Net Worth Tracker — Roadmap

## Current Phase

**Phase 3: Stable & Documented**

The core product is feature-complete for the primary use case. The full import/export/chart/print workflow is shipped and working. Documentation has been restructured and is now comprehensive. The current focus is on polish, accessibility, and stability — not new features.

---

## Milestone Table

| Milestone | Target | Status |
|---|---|---|
| v1.0 — Initial Release | Shipped | Complete |
| v2.x — Print, Excel, Charts polish | Shipped | Complete |
| v3.x — Landing page, nav unification, cleanup | Shipped | Complete |
| v3.6 — Documentation audit and restructure | 2026-06-08 | Complete |
| v4.0 — Accessibility & mobile polish | Q3 2026 | Planned |
| v5.0 — Cloud sync / accounts | Undated | Planned |

---

## Feature Breakdown Per Milestone

### v1.0 — Initial Release (Complete)
- Monthly snapshot entry modal
- Net Worth Over Time line chart
- Allocation doughnut chart
- Snapshot history table with delete
- Export to JSON / paste import
- localStorage persistence

### v2.x — Print, Excel, Charts Polish (Complete)
- Excel `.xlsx` template download
- Excel import replacing JSON paste
- Month-over-month badges on all cards
- Allocation chart inline percentage labels
- Print report (letter portrait, monochrome laser-optimized)
- Clear All data button
- Simplified import/export column format (round-trip compatible)

### v3.x — Landing Page, Nav Unification, Cleanup (Complete)
- Dedicated landing page (`index.html`) with step-by-step guide
- App moved to `app.html`
- Unified `.btn-outline` button style across all pages
- Active page nav indicator (`.btn-nav-active`)
- Support link and footer on all pages
- SVG emoji favicon
- Stale server-side files removed
- Patch notes, design system, and requirements documented

### v3.6 — Documentation Audit (Complete, 2026-06-08)
- `/docs/` directory created
- All root-level docs moved to `/docs/` and reformatted to spec
- Added: PRFAQ.md, TENETS.md, METRICS.md, ROADMAP.md, SECURITY.md, RUNBOOK.md
- README updated for developer audience
- In-app patch notes updated

### v4.0 — Accessibility & Mobile Polish (Planned, Q3 2026)
- Full responsive layout for `app.html` on mobile viewports
- ARIA labels on chart canvases
- Skip-navigation link
- Keyboard-accessible modals (focus trap, Escape key close)
- WCAG AA audit and gap remediation
- Color-blind-safe MoM badge alternative (icon in addition to color)

### v5.0 — Cloud Sync / Accounts (Planned, Undated)
- Optional user account creation (Google OAuth)
- Cloud storage for snapshots (cross-device sync)
- Freemium model: local-only remains free; cloud sync is paid
- Data migration path from localStorage to cloud

---

## Explicitly Deferred Items

| Feature | Reason for Deferral |
|---|---|
| Debt / liability tracking | Requires redesigned data model and new UI; out of scope for asset-only tracker |
| Custom asset categories | Increases complexity significantly; four-category model serves primary persona (see Tenet 4) |
| Automated bank/account aggregation | Requires backend, OAuth flows, and credential handling — violates privacy tenet and zero-cost constraint |
| Currency conversion / multi-currency | Niche use case; requires FX rate API and adds data model complexity |
| Mobile native app (iOS/Android) | Separate engineering platform; web app covers mobile use via browser |
| Budget tracking / spending analysis | Different product category; out of scope for net worth tracking tool |
| Social sharing / public profiles | Antithetical to privacy-first positioning |
| Multiple portfolio views | Low priority; single portfolio covers the primary persona |
| Self-hosted CDN scripts | Reduces CDN dependency risk but adds file maintenance overhead; low-priority until CDN reliability becomes an issue |
