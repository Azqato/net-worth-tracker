# Net Worth Tracker — Metrics

## North Star Metric

**Monthly active users who have imported or entered at least 3 snapshots.**

This number captures users who have gone beyond casual curiosity and established a real tracking habit. A user with 3 months of data has seen month-over-month comparisons and has a trend line — the core value proposition. Raw visit count and single-session users are noise.

*Measurement caveat: this app has no analytics or backend. This metric is currently unmeasured. See the Measurement Method column below for the current state.*

---

## Acquisition Metrics

| Metric | Description | Target | Timeframe | Measurement Method |
|---|---|---|---|---|
| Monthly unique visitors | Total unique browser sessions to the site root | 500/month | 6 months post-launch | Google Search Console impressions as a proxy; no analytics installed |
| Referral sources | Where visitors come from (search, direct, social) | >50% organic search | 6 months | Google Search Console |
| Landing page → App conversion | % of guide visitors who click "Open the Tracker" | >40% | Ongoing | Not measurable without analytics |

---

## Engagement Metrics

| Metric | Description | Target | Timeframe | Measurement Method |
|---|---|---|---|---|
| Snapshots entered per session | How many snapshots a new user enters in their first visit | ≥3 (historical import) | Ongoing | Not measurable without analytics |
| Import usage rate | % of users who use Excel import vs. manual entry | >60% | 6 months | Not measurable without analytics |
| Export usage rate | % of users who export at least once | >50% | Ongoing | Not measurable without analytics |
| Print usage rate | % of users who print a report | >10% | Ongoing | Not measurable without analytics |

---

## Retention Metrics

| Metric | Description | Target | Timeframe | Measurement Method |
|---|---|---|---|---|
| Month-2 return rate | % of first-month users who return in month 2 | >30% | Ongoing | Not measurable without analytics |
| Long-term habit formation | Users with 12+ monthly snapshots in localStorage | Proxy: GitHub star growth as interest signal | 12 months | GitHub stars/forks (indirect) |

---

## Performance Metrics

| Metric | Description | Target | Measurement Method |
|---|---|---|---|
| Page load time | Time to first meaningful render (landing page) | < 1.5 seconds on broadband | Lighthouse audit |
| App load time | Time to interactive (app.html with CDN scripts) | < 2 seconds on broadband | Lighthouse audit |
| Lighthouse Performance score | Google Lighthouse performance score | > 90 | Lighthouse audit |
| Lighthouse Accessibility score | WCAG-based accessibility score | > 80 | Lighthouse audit |
| CDN uptime | Availability of Chart.js (jsDelivr) and SheetJS CDN | 99.9% | Monitor jsDelivr and SheetJS status pages |
| GitHub Pages uptime | Availability of the live site | 99.9% | GitHub Status page |
| Zero JS errors on load | No console errors in a clean browser session | 0 errors | Manual browser devtools check |

---

## Targets

| Metric | Goal | Timeframe |
|---|---|---|
| Lighthouse Performance | ≥ 90 | Ongoing — check after each deploy |
| Lighthouse Accessibility | ≥ 80 | Ongoing — check after each deploy |
| Zero uncaught JS errors | 0 errors in Chrome devtools on clean load | Every release |
| Page load < 2 seconds | Verified via Lighthouse or WebPageTest | Every release |
| GitHub stars | 50 stars | 12 months post-launch |

---

## Reporting Cadence

| Category | Frequency | Owner |
|---|---|---|
| Lighthouse audits (performance, accessibility) | On each deploy | Developer |
| Manual browser smoke test (load, import, export, print) | On each deploy | Developer |
| GitHub stars/forks | Monthly | Developer |
| Google Search Console (impressions, clicks) | Monthly | Developer |
| CDN status check | On each deploy (manual check of jsDelivr/SheetJS status pages) | Developer |

---

## Analytics Stance

This app intentionally has no analytics script installed. Adding Google Analytics, Plausible, or any equivalent tracker would send visitor data (IP, browser, behavior) to a third-party server. Given the privacy-first positioning of the product, installing analytics is considered a violation of Tenet 1 unless a fully self-hosted, privacy-preserving option is chosen and disclosed to users.

The metrics above that are marked "not measurable without analytics" are aspirational targets that can be baselined only if a privacy-preserving solution is adopted.
