# Net Worth Tracker — Product Tenets

Tenets are ordered by priority. When two tenets conflict, the higher-numbered one loses.

---

## 1. Privacy Is Architecture, Not Policy

User financial data must never leave the device. This is not a preference the user can override or a policy that can be updated — it is baked into how the system works. There is no server to send data to. When a feature requires a backend (cloud sync, account creation), it is out of scope by definition, not by choice. If that changes, this tenet changes first.

*This tenet resolves tradeoffs like: "Should we add telemetry to understand user behavior?" Answer: No. Knowing what users do requires observing them, which violates this tenet.*

---

## 2. Zero Friction to First Value

A new user must be able to open the app and see meaningful output — their own data charted — in under 10 minutes, with no installation, no account, and no technical setup. Any feature that adds a mandatory step before the user sees their first chart violates this tenet. Complexity belongs inside the workflow, not at the entrance.

*This tenet resolves tradeoffs like: "Should we require email verification to use the app?" Answer: No. That is a gate before first value.*

---

## 3. The App Must Outlive Its Author

The architecture must stay maintainable by a single developer with no active maintenance. No build pipeline to break, no framework to migrate, no npm audit failures to fix. Plain HTML, CSS, and JavaScript that works today will work in ten years with no changes. Adding a dependency or build step requires strong justification — the default answer is no.

*This tenet resolves tradeoffs like: "Should we use React for the UI?" Answer: No. A framework adds upgrade debt and a build step that no one will maintain.*

---

## 4. Four Categories Are Enough

The four asset categories (Cash, Taxable, Retirement, Real Estate) are a product decision, not a technical limitation. Allowing custom categories increases both complexity and support burden without serving the primary user. When a user asks for more categories, the correct response is to direct them to a spreadsheet — that is what spreadsheets are for.

*This tenet resolves tradeoffs like: "A user asked for a 'Crypto' category — should we add it?" Answer: No. Serve the common case well. Edge cases belong in the user's spreadsheet.*

---

## 5. Data Portability Over Convenience

The user must always be able to get their data out in a usable format. Export must produce a file that can be re-imported, opened in Google Sheets, or used independently — not a proprietary format that requires this app to read. Features that make the app stickier by locking in data are rejected. The user's trust in the app's privacy promise depends on their ability to leave whenever they want.

*This tenet resolves tradeoffs like: "Should we use a custom binary format for export to make re-import more reliable?" Answer: No. Standard Excel format first, always.*
