# Net Worth Tracker — PR/FAQ

## Press Release

**FOR IMMEDIATE RELEASE**

### Net Worth Tracker Gives Privacy-Conscious Investors a Free, No-Account Way to Visualize Their Financial Progress

*Browser-based tool runs entirely on-device, pairs with Google Sheets, and requires zero sign-up*

Today, Net Worth Tracker launched publicly as a free, browser-based tool that lets individuals track and visualize their personal net worth over time — without creating an account, installing software, or sharing financial data with any third party.

Unlike popular financial aggregators that require users to connect bank accounts or create profiles, Net Worth Tracker stores everything locally in the user's browser. Users enter their monthly balances across four asset categories — cash, taxable investments, retirement accounts, and real estate — either by hand or by importing an Excel file from Google Sheets. The app instantly generates a net worth history chart, an asset allocation breakdown, and month-over-month change indicators.

"I never realized how much I'd grown my retirement account until I saw it charted over three years," said one early user. "And I didn't have to hand over my login credentials to anyone to see it."

Net Worth Tracker is free to use at [https://azqato.github.io/Net-Worth-Tracker/](https://azqato.github.io/Net-Worth-Tracker/). It works in any modern browser on any device, and includes a step-by-step guide for first-time users.

---

## Internal FAQ

**Q: Why build this when tools like Personal Capital and Mint already exist?**  
A: Those tools require linking bank accounts or creating user profiles. Many users — particularly privacy-conscious individual investors — are unwilling to give a third party read access to their financial accounts. This tool serves that gap with zero data sharing required.

**Q: What happens to user data if the browser cache is cleared?**  
A: It is lost. This is a known and intentional tradeoff — all data lives in `localStorage` with no backup. The app mitigates this by prompting users to export after inactivity and by making Excel export a one-click operation. Users who need cross-device persistence should use a paid cloud service.

**Q: Why only four asset categories? What about debt?**  
A: The four categories (Cash, Taxable Investments, Retirement, Real Estate) cover the primary use case for the target persona. Adding debt tracking or custom categories increases both UI complexity and data model scope. That tradeoff is intentionally deferred — the four-category model ships a working product faster and serves most users well.

**Q: What's the risk of CDN dependencies going down?**  
A: Chart.js and SheetJS are loaded from CDNs (jsDelivr and SheetJS respectively). If either CDN is unreachable, charts will not render and import/export will fail. The app shows alerts in those cases. Self-hosting the scripts would eliminate this risk but adds file maintenance overhead. This is acknowledged in the TRD as technical debt.

**Q: How is this different from just using Google Sheets with charts?**  
A: Google Sheets can do net worth charts, but requires manual setup of formulas, chart configurations, and percentage calculations. This app gives those features out of the box in a purpose-built interface — without requiring spreadsheet skill beyond entering numbers in cells.

**Q: What does success look like for this project?**  
A: A user who discovers the tool is able to complete the full workflow — download template, fill it in, import, view charts — in under 10 minutes without reading any documentation. The support inbox stays empty. The app works the same way three years from now with no maintenance.

**Q: Why GitHub Pages and not Vercel, Netlify, etc.?**  
A: GitHub Pages is free with no usage limits and has no vendor-specific configuration. For a fully static site with no server-side logic, it is the simplest zero-cost option with the least lock-in.

**Q: Is there a plan to monetize this?**  
A: No current plan. The app is free and open source. If cloud sync (accounts, cross-device persistence) is added in the future, a freemium model would be the natural path.

**Q: What must be true for this to succeed long-term?**  
A: (1) GitHub Pages remains free, (2) Chart.js and SheetJS CDNs remain available, (3) browser `localStorage` behavior does not change in a breaking way. All three are stable, widely-used infrastructure — this is a low-risk assumption.

**Q: Who maintains this?**  
A: A single developer (Azqato). There is no team. This directly informs every architectural decision — no build step, no dependencies to update, no framework migrations.

---

## External FAQ

**Q: Is this free?**  
A: Yes, completely free. No subscription, no trial, no credit card.

**Q: Do I need to create an account?**  
A: No. Open the app in your browser and start entering data immediately. No sign-up required.

**Q: Where is my data stored?**  
A: Entirely in your browser's local storage on your device. Nothing is sent to a server. No one but you can see your data.

**Q: What happens if I clear my browser history or cache?**  
A: Your data will be erased. Use the Export button regularly to save a backup Excel file — you can re-import it any time to restore your data.

**Q: Can I use this on multiple devices?**  
A: Not automatically. Data is stored per browser per device. You can move data between devices by exporting from one and importing on another.

**Q: What file format does the app use for import and export?**  
A: Excel (`.xlsx`). You can also use Google Sheets — the guide explains how to export from Google Sheets in the correct format.

**Q: What are the four categories? Can I change them?**  
A: The categories are Cash Equivalents, Taxable Investments, Retirement Investments, and Real Estate. They cannot be customized — the app is designed specifically for this four-category model.

**Q: Does this track debts or liabilities?**  
A: No. The app tracks assets only. Net worth displayed is the sum of all four asset categories with no liability subtraction.

**Q: Does this work on my phone?**  
A: The app works in a mobile browser but is optimized for desktop use. The layout is not fully responsive on small screens.

**Q: How do I print a report?**  
A: Click the Print button in the top navigation. A clean, monochrome PDF-ready report will appear and your browser's print dialog will open. It works best with monochrome laser printers.
