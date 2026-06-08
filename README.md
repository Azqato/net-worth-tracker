# Net Worth Tracker

A browser-based personal finance tool for tracking monthly net worth across four asset categories — no account required, no data sent anywhere.

**Live site**: [https://azqato.github.io/Net-Worth-Tracker/](https://azqato.github.io/Net-Worth-Tracker/)

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| HTML5 | — | Markup (`index.html`, `app.html`) |
| CSS3 | — | Styling with custom properties, grid, flexbox (`style.css`) |
| Vanilla JavaScript | ES2020+ | All application logic (`app.js`) |
| Chart.js | 4.4.0 | Line chart and doughnut chart (jsDelivr CDN) |
| SheetJS (xlsx) | 0.20.1 | Excel `.xlsx` import and export (SheetJS CDN) |
| GitHub Pages | — | Static hosting |

No build step. No bundler. No framework. No Node.js in production.

---

## Prerequisites

- A web browser (Chrome 80+, Firefox 79+, Safari 14+, Edge 80+) — required to run the app locally
- Git — required to clone and contribute
- No Node.js, npm, or other runtime required

---

## Installation

```bash
git clone https://github.com/Azqato/Net-Worth-Tracker.git
cd Net-Worth-Tracker
```

That's it. There are no dependencies to install.

---

## Running Locally

Open `index.html` directly in a browser:

```bash
# macOS / Linux
open index.html

# Windows
start index.html
```

Or serve with any static file server to avoid browser restrictions on local file access:

```bash
# Python 3
python -m http.server 8080

# Node.js (npx, no install required)
npx serve .
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

Default app URL when served: `http://localhost:8080/app.html`

---

## Environment Variables

None. This is a fully static application with no server-side configuration.

No `.env` file is needed. No secrets are used. No API keys are required.

---

## Build

There is no build step. The source files are the production files.

---

## Deploy

Deployment is automatic via GitHub Pages.

1. Push changes to the `main` branch:
   ```bash
   git push origin main
   ```
2. GitHub Actions builds and publishes Pages from the repo root.
3. The live site updates at [https://azqato.github.io/Net-Worth-Tracker/](https://azqato.github.io/Net-Worth-Tracker/) within ~30 seconds.

No manual deploy steps. No staging environment. No build artifacts to upload.

**Pages configuration**: Settings → Pages → Source: Deploy from branch `main`, folder `/` (root).

---

## Full Documentation

See the [`/docs`](docs/) directory:

| File | Contents |
|---|---|
| [PRD.md](docs/PRD.md) | Product requirements, user stories, feature list |
| [TRD.md](docs/TRD.md) | Architecture, data models, internal data flow |
| [DESIGN.md](docs/DESIGN.md) | Color palette, typography, component patterns |
| [PATCHNOTES.md](docs/PATCHNOTES.md) | Full version history |
| [PRFAQ.md](docs/PRFAQ.md) | Press release and FAQ |
| [TENETS.md](docs/TENETS.md) | Product principles |
| [METRICS.md](docs/METRICS.md) | Success metrics and targets |
| [ROADMAP.md](docs/ROADMAP.md) | Milestones and planned features |
| [SECURITY.md](docs/SECURITY.md) | Security posture and data handling |
| [RUNBOOK.md](docs/RUNBOOK.md) | Local setup, deploy, rollback, common errors |
