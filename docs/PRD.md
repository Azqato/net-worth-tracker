# Net Worth Tracker — Product Requirements Document

## Problem Statement

Individual investors who track their monthly finances in spreadsheets have no easy way to visualize their net worth history without either paying for a financial app (which requires sharing sensitive data) or building their own charts from scratch. Existing tools require account creation, charge subscription fees, or send financial data to third-party servers — none of which is acceptable for privacy-conscious users.

Net Worth Tracker solves this by providing a fully client-side chart and history tool that runs entirely in the browser. Users keep their data in Google Sheets (a tool they already use) and import it into the app for visualization. No accounts. No servers. No cost.

---

## Target Users

**Primary persona: The Self-Tracking Investor**
- Maintains a personal spreadsheet of monthly account balances (checking, brokerage, 401k, home value)
- Wants to see trends and charts without paying for a service like Personal Capital or Mint
- Privacy-conscious — unwilling to connect bank accounts or share balance data with a third party
- Comfortable using Google Sheets and a web browser; not a developer
- Checks their net worth monthly, not daily

**Secondary persona: The Privacy-First Minimalist**
- Distrustful of financial aggregator apps
- Prefers owning their data locally
- Willing to do a small amount of manual data entry in exchange for full control
- Values simplicity over automation

---

## Goals

- Give users a clear visual picture of their net worth over time with zero account creation friction
- Make the data entry workflow feel as lightweight as a spreadsheet update
- Ensure no user data ever leaves the browser — full privacy by architecture
- Be deployable and runnable at zero cost indefinitely (static hosting only)

---

## Non-Goals

- Cloud sync or cross-device data persistence
- Automated account aggregation or bank connectivity
- Debt and liability tracking (negative net worth positions)
- Multiple portfolio views or custom user-defined categories
- Currency conversion or multi-currency support
- Mobile native app (iOS/Android)
- Social sharing or public profiles
- User authentication backend (a placeholder UI exists in `authModal` but is not wired up)
- Budget tracking, spending analysis, or cash flow tools

---

## User Stories

**Data entry**
- As a user, I want to record my monthly balances across four categories so that I can build a history over time.
- As a user, I want to edit a previous month's entry by re-entering the same date so that I can correct mistakes without deleting and re-adding.
- As a user, I want to delete individual snapshots so that I can remove erroneous entries.
- As a user, I want to clear all data at once so that I can start fresh.

**Visualization**
- As a user, I want to see my total net worth and each category's value for the most recent month so that I know where I stand today.
- As a user, I want to see month-over-month percentage changes on every card so that I can spot trends at a glance.
- As a user, I want to see a line chart of my net worth over time so that I can understand the trajectory.
- As a user, I want to see an allocation doughnut chart so that I can understand how my wealth is distributed.

**Data portability**
- As a user, I want to download a pre-formatted Excel template so that I can set up my Google Sheet correctly the first time.
- As a user, I want to import snapshots from an Excel file so that I can load historical data from my existing spreadsheet.
- As a user, I want to export my data to Excel so that I can keep a backup outside the browser.
- As a user, I want to print a clean PDF report so that I can save or share a point-in-time summary.

**Reminders**
- As a user, I want to be reminded to export my data after a period of inactivity so that I don't lose my work if the browser cache is cleared.

---

## Feature List

### MVP (Shipped)

| ID | Feature |
|---|---|
| F1 | Add monthly snapshot via modal (date + 4 category amounts) |
| F2 | Edit existing month by re-entering same date (upsert) |
| F3 | Delete individual snapshots from history table |
| F4 | Clear all snapshot data with confirmation prompt |
| F5 | Total net worth card (value, date, MoM change) |
| F6 | Four category cards (value, % of portfolio, MoM badge each) |
| F7 | Net Worth Over Time line chart (total + 4 category series) |
| F8 | Allocation doughnut chart with live inline percentage labels |
| F9 | Snapshot history table, newest-first, with per-row delete |
| F10 | Collapsible Snapshot History section |
| F11 | Collapsible Patch Notes section (collapsed by default) |
| F12 | Download pre-formatted Excel template with Instructions tab |
| F13 | Import snapshots from `.xlsx` file matching template format |
| F14 | Export all snapshots to `.xlsx` |
| F15 | Print-optimized Net Worth Report (letter portrait, monochrome) |
| F16 | Inactivity warning modal prompting export (max 2 reminders, then permanently suppressed) |
| F17 | Landing page and step-by-step setup/import/export guide |

### Future (Post-Launch / Planned)

| Feature | Rationale for deferral |
|---|---|
| Cloud sync / user accounts | Requires backend infrastructure; breaks zero-cost constraint |
| Debt / liability tracking | Scope expansion; requires redesigned data model |
| Custom categories | Increases complexity; primary users fit within 4 standard categories |
| Mobile native app | Separate engineering effort; web app works on mobile browsers |
| Multiple portfolio views | Low-priority edge case for primary persona |

---

## Constraints

- **No backend**: Must remain a static site deployable on GitHub Pages with zero server cost
- **No build step**: Must be plain HTML/CSS/JS with no bundler or compilation step required
- **No framework**: Vanilla JavaScript only — no React, Vue, Angular, etc.
- **CDN dependencies only**: External libraries loaded from CDN (Chart.js, SheetJS); no npm install
- **Browser localStorage limit**: ~5MB per origin; limits historical data volume (not a practical concern for monthly snapshots)
- **Single developer**: No team; decisions must favor simplicity and maintainability

---

## Assumptions

- Users already maintain their financial data in a spreadsheet (Google Sheets or Excel)
- Monthly granularity is sufficient; daily or weekly tracking is not needed
- Four asset categories (Cash, Taxable, Retirement, Real Estate) cover the primary use case
- Users accept that browser cache clearing will erase data and will export regularly
- GitHub Pages will remain a viable free hosting option

---

## Success Criteria

| Criterion | Measure |
|---|---|
| Core workflow is self-service | A new user completes the full setup (template download → Sheet fill → import → view charts) without needing support |
| Privacy commitment is absolute | Zero network requests made for personal financial data (verified by browser devtools) |
| Zero setup friction | App is usable immediately at the live URL with no installation, account creation, or configuration |
| Data round-trip works | Exported `.xlsx` can be re-imported without reformatting |
| Print output is professional | Printed report reads cleanly on a monochrome laser printer |
