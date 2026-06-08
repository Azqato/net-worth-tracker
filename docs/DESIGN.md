# Net Worth Tracker — Design System

## Design Philosophy

The app uses a dark, data-dense aesthetic modeled after developer tooling and financial dashboards — not consumer finance apps. The priority order is: legibility first, hierarchy second, color only when it adds meaning. Motion and decoration are minimized so the numbers stay the focus.

---

## Color Palette

All colors are defined as CSS custom properties in `:root` in `style.css`. No hard-coded color values exist outside `:root` and `@media print`.

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#0d1117` | Page background |
| `--surface` | `#161b22` | Cards, header, nav, modals |
| `--surface2` | `#21262d` | Input backgrounds, hover states, table row alternates |
| `--accent` | `#00d4a0` | Brand green — CTAs, active nav state, highlights, brand icon |
| `--text` | `#e6edf3` | Primary text |
| `--text-muted` | `#8b949e` | Labels, secondary text, placeholders |
| `--border` | `#30363d` | All borders and dividers |
| `--positive` | `#3fb950` | Positive MoM change badges |
| `--negative` | `#f85149` | Negative MoM change badges, danger button |
| `--cash` | `#4a9eff` | Cash Equivalents category (chart line + icon background) |
| `--taxable` | `#a371f7` | Taxable Investments category |
| `--retirement` | `#f78166` | Retirement Investments category |
| `--realestate` | `#ffa657` | Real Estate category |

The app is **dark-mode only**. There is no light/dark toggle.

---

## Typography

**Font stack**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`  
System fonts only — no web fonts loaded. Renders in the user's native UI font on every platform.

**Base size**: 14px  
**Line height**: 1.5 (body), 1.6–1.7 (guide content)

| Role | Size | Weight | Usage |
|---|---|---|---|
| Hero heading | clamp(28px–48px) | 800 | Landing page H1 |
| Section title | clamp(20px–28px) | 700 | Landing page section headings |
| Card heading | 14–15px | 600 | Section card titles (Snapshot History, Patch Notes) |
| Category name | 13px | 500 | Category card label |
| Body | 14px | 400 | General content, table cells |
| Caption / label | 13px | 400–500 | Form labels, nav links, step descriptions |
| Muted / secondary | 12–13px | 400 | `--text-muted` usage |
| Total net worth figure | 28–36px | 700 | Primary KPI on app page |
| Print output | 11–24px | 700–900 | All print styles use bold for laser printer legibility |
| Code / UI label | 12px | 500 | Inline `.ui-label` chips in landing page guide |

---

## Spacing System

Base unit: **4px**. All spacing uses multiples of 4.

| Value | Usage |
|---|---|
| 4px | Tight gaps (badge padding, icon inner) |
| 8px | Button horizontal padding, gap between nav items |
| 12px | Card inner padding (compact), form group gap |
| 14px | Grid gaps (need-grid, workflow-grid) |
| 16px | Standard section padding, modal body padding |
| 20px | Container section gap, section card padding |
| 22–24px | Navigation padding, hero section horizontal padding |
| 28px | Hero button padding |
| 32px+ | Hero vertical spacing |
| 48–72px | Landing page section vertical padding |

Max content width: **1400px** with 24px horizontal padding.

---

## Breakpoints

| Breakpoint | Trigger | Changes |
|---|---|---|
| `max-width: 600px` | Mobile portrait | Landing page `.sheet-mock` collapses columns 4–5; nav section links hidden; horizontal padding reduced from 24px to 16px |

The app page (`app.html`) has no explicit breakpoints — the 4-column category grid and 3fr/2fr charts row will compress on narrow viewports. Full responsive support for the app page is deferred (see TRD known technical debt).

---

## Component Patterns

### Buttons

| Class | Style | Usage |
|---|---|---|
| `.btn-outline` | `--surface2` background, `--border` border, `--text` color | All nav and action buttons on both pages |
| `.btn-nav-active` | Accent border + accent text (extends `.btn-outline`) | Current-page nav indicator; hardcoded per page, no JS required |
| `.btn-support` | Inline-flex (extends `.btn-outline`) | External support link |
| `.btn-save` | Full-width accent background, 14px text | Primary action inside modals |
| `.btn-danger-sm` | Red outline, small padding | Clear All in Snapshot History header |
| `.btn-dismiss` | `--surface2` background, muted text | Secondary action in Inactivity modal |
| `.btn-hero-primary` | Accent background, 15px, bold | Hero primary CTA on landing page |
| `.btn-hero-secondary` | `--surface2` background, 15px | Hero secondary CTA on landing page |
| `.collapse-btn` | `--surface2`, muted text, `pointer-events: none` | Expand/Collapse toggle label (display only — click target is the section header) |

### Cards

| Class | Description |
|---|---|
| `.total-card` | Full-width net worth hero card with 3px top gradient stripe (accent color) |
| `.category-card` | 4-column grid item; hover shows accent border transition |
| `.chart-card` | Chart container; `.chart-large` (3fr) and `.chart-small` (2fr) in the charts row |
| `.section-card` | Collapsible section wrapper for Snapshot History and Patch Notes |
| `.need-card` | Landing page requirement card (icon + title + description) |
| `.workflow-card` | Landing page numbered workflow step |
| `.tutorial-block` | Landing page step-group container (header + ordered steps) |

### Modals

All modals use `.modal-overlay` (fixed full-screen, `backdrop-filter: blur`, dark scrim) wrapping `.modal` (480px max-width card).

**Dismiss methods**: click the `×` button, or click the overlay background. Both call `closeModal(id)` or `closeModalOnOverlay(event, id)`.

| ID | Purpose |
|---|---|
| `addSnapshotModal` | Manual snapshot entry (date + 4 category fields) |
| `pasteDataModal` | Excel file upload for import |
| `inactivityModal` | Backup reminder (max 2 times, then permanently suppressed) |
| `authModal` | Create Account placeholder UI (not functional) |

### Empty States

- `.empty-state` — centered muted text shown when no data is present in the history table
- `.chart-empty` — absolutely centered overlay inside chart containers; hidden via CSS when data exists

---

## Accessibility Standards

**Target**: WCAG 2.1 AA (best-effort; not formally audited)

| Requirement | Status |
|---|---|
| Color contrast (text on background) | Primary text `#e6edf3` on `#0d1117` — passes AA (contrast ratio ~13:1) |
| Color contrast (accent text) | `#00d4a0` on `#0d1117` — passes AA (contrast ratio ~8:1) |
| Keyboard navigation | Buttons and links are native elements; tab order follows DOM order |
| Focus styles | Browser default focus rings in use; no custom focus suppression |
| Semantic HTML | `<header>`, `<main>`, `<footer>`, `<nav>`, `<h1>`–`<h4>` used appropriately |
| ARIA | `aria-hidden="true"` on decorative SVGs in auth modal |
| Form labels | All form inputs have associated `<label>` elements |

**Known gaps**: No skip-navigation link; chart canvases have no `aria-label` or `role="img"` descriptions; color is used as the sole differentiator for MoM badges (positive green / negative red).

---

## Animation and Motion

Motion is minimal and functional. No decorative animation exists.

| Element | Transition | Purpose |
|---|---|---|
| Button hover | `background 0.15s`, `color 0.15s` | Confirm interactivity |
| Category card hover | `border-color 0.15s` | Confirm clickable region |
| Hero primary button hover | `opacity 0.15s` | Confirm interactivity |
| Modal open/close | None (display toggle) | Instant — no entrance animation |
| Chart render | Chart.js default animation | Can be disabled if performance is a concern |

**Rule**: Do not add animation to data or status elements. Numbers, badges, and table rows should update instantly — not animate in.
