# Net Worth Tracker — Runbook

## Local Setup

Complete steps to run the project from a fresh machine.

### Prerequisites

- Git
- A modern web browser (Chrome 80+, Firefox 79+, Safari 14+, Edge 80+)
- No Node.js, npm, or other runtime required

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Azqato/Net-Worth-Tracker.git
cd Net-Worth-Tracker

# 2. Open in browser — option A: open the file directly
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux

# 2. Open in browser — option B: serve locally (avoids some browser restrictions)
python -m http.server 8080        # Python 3 (no install required)
# OR
npx serve .                       # Node.js (npx, no global install required)
# Then open http://localhost:8080 in your browser
```

The app is fully functional at step 2. There is no `npm install`, no environment setup, and no build step.

---

## Build

There is no build step. The source files are the production files.

The repository root is served directly by GitHub Pages. What you see in the repo is what ships to production.

---

## Deploy

### Production (GitHub Pages)

1. Make and commit changes to the `main` branch.
2. Push to the remote:
   ```bash
   git push origin main
   ```
3. GitHub Actions automatically builds and publishes Pages.
4. The live site at [https://azqato.github.io/Net-Worth-Tracker/](https://azqato.github.io/Net-Worth-Tracker/) updates within ~30 seconds.

No manual deploy steps. No artifact upload. No environment variables to set.

**GitHub Pages configuration** (Settings → Pages):
- Source: Deploy from branch
- Branch: `main`
- Folder: `/` (root)

### Verifying the deploy

After pushing, check:
1. GitHub → Actions tab — confirm the Pages deploy workflow shows a green checkmark.
2. Open [https://azqato.github.io/Net-Worth-Tracker/](https://azqato.github.io/Net-Worth-Tracker/) in an incognito window and verify the landing page loads.
3. Navigate to `app.html` and confirm the app loads with no console errors.

---

## Rollback

Since this is a static site on GitHub Pages, rollback means reverting to a previous commit and pushing to `main`.

```bash
# Find the commit to revert to
git log --oneline -10

# Option A: revert the most recent commit (creates a new commit)
git revert HEAD
git push origin main

# Option B: revert multiple commits by creating a new commit at a known-good state
git revert HEAD~3..HEAD   # reverts last 3 commits as individual revert commits
git push origin main

# Option C: hard reset to a specific commit (destructive — confirm before using)
# git reset --hard <commit-sha>
# git push --force origin main   # requires force push; confirm with repo owner first
```

Prefer `git revert` over `git reset --hard` to preserve history. GitHub Pages will redeploy automatically within ~30 seconds of the push.

---

## Environment Configs

| Environment | URL | Branch | Notes |
|---|---|---|---|
| Production | `https://azqato.github.io/Net-Worth-Tracker/` | `main` | Auto-deploys on push |
| Local development | `http://localhost:8080` (or file://) | any branch | No build step; open files directly |

There is no staging environment. Test changes locally before pushing to `main`.

---

## Common Errors

| Error | Likely Cause | Fix |
|---|---|---|
| Charts do not appear; console shows "Chart is not defined" | Chart.js CDN failed to load | Check internet connection; verify `cdn.jsdelivr.net` is reachable; check [jsDelivr status](https://www.jsdelivr.com/statistics) |
| Import Data button does nothing; console shows "XLSX is not defined" | SheetJS CDN failed to load | Check internet connection; verify `cdn.sheetjs.com` is reachable |
| Snapshots disappear after browser restart | Browser set to clear storage on exit | Check browser settings for "Clear cookies and site data when browser closes"; disable or use Export before closing |
| Imported file shows 0 snapshots | Excel file columns don't match the expected format | Ensure the file uses columns: Date, Net Worth, Cash, Investments, Retirement, Real Estate; download the Template from the app for the correct format |
| "As of No data yet" shown on load | No snapshots in localStorage | Add a snapshot via Add Snapshot button, or import an Excel file |
| Print report is blank or cut off | Browser print settings | Ensure "Background graphics" is enabled and margins are set to "None" or "Minimum"; use Chrome for best results |
| Page shows 404 after deploy | GitHub Pages not yet updated, or file renamed | Wait 60 seconds and hard-refresh; verify the file name and path in the repository |
| App loads but shows console errors about `localStorage` | Private/incognito mode with storage disabled | Some browsers block `localStorage` in private mode; use a regular browser window |

---

## Monitoring

This is a static site with no server-side infrastructure to monitor. The relevant health checks are:

| What to check | Where | How often |
|---|---|---|
| Site availability | Open [https://azqato.github.io/Net-Worth-Tracker/](https://azqato.github.io/Net-Worth-Tracker/) in browser | On each deploy; after any reported issue |
| GitHub Pages build status | GitHub → Repository → Actions tab | On each deploy |
| JavaScript errors | Chrome DevTools → Console (clean session, no extensions) | On each deploy |
| CDN availability — Chart.js | [jsDelivr status page](https://www.jsdelivr.com/statistics) | On any chart-related bug report |
| CDN availability — SheetJS | [SheetJS GitHub releases](https://github.com/SheetJS/sheetjs) for security advisories | Monthly |
| Lighthouse score (performance, accessibility) | Chrome DevTools → Lighthouse tab | On each deploy or major change |

There are no error logs, uptime monitors, or alerting systems configured. If an issue is reported, the first diagnostic step is always: open the live URL in a clean incognito browser window and check the DevTools console.
