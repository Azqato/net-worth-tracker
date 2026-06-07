# Net Worth Tracker

**[Live App → https://azqato.github.io/Net-Worth-Tracker/index.html](https://azqato.github.io/Net-Worth-Tracker/index.html)**

A personal net worth tracker that runs entirely in your browser — no account required, no data sent anywhere. Track your wealth across four categories over time with charts, month-over-month comparisons, and Excel import/export.

---

## Features

- **Monthly snapshots** — record your net worth each month across four categories
- **Net Worth Over Time** — line chart showing total and category trends
- **Allocation chart** — doughnut chart with live percentage labels
- **Month-over-month (MoM)** — percentage change badges on every card
- **Excel export** — download your data as a `.xlsx` file
- **Excel import** — re-import data from the provided template
- **Print report** — clean letter-portrait PDF with charts and snapshot history
- **100% client-side** — all data lives in your browser's localStorage
- **Emoji favicon** — 💰 money bag icon appears in browser tabs and bookmarks

## Categories

| Category | Includes |
|---|---|
| Cash Equivalents | Checking, savings, money market, CDs |
| Taxable Investments | Brokerage accounts, stocks, ETFs, mutual funds |
| Retirement Investments | 401k, IRA, Roth IRA, pension |
| Real Estate | Primary home, investment properties (market value) |

## Usage

Visit the [live app](https://azqato.github.io/Net-Worth-Tracker/index.html) and click **+ Add Snapshot** to record your first month. No setup needed.

To import historical data, click **Template** to download a pre-formatted Excel file, fill it in, then use **Import Data** to load it.

## Data & Privacy

All data is stored in your browser's `localStorage`. Nothing is sent to a server. Clearing your browser cache will erase your data — use **Export** regularly to keep a backup.

## Tech Stack

- Vanilla HTML / CSS / JavaScript
- [Chart.js](https://www.chartjs.org/) for charts
- [SheetJS](https://sheetjs.com/) for Excel import/export
- Hosted on GitHub Pages
