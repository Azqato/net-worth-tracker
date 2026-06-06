# Net Worth Tracker

A modern, personal finance dashboard for tracking and visualizing your net worth across multiple asset categories.

## Features

✨ **Key Capabilities:**
- **Track Multiple Categories**: Cash equivalents, taxable investments, retirement accounts, and real estate
- **Interactive Charts**: Real-time net worth trends and asset allocation visualization
- **Month-over-Month Analytics**: See your growth with percentage change badges on all categories
- **Excel Import/Export**: Download templates, import data from spreadsheets, or export your history
- **Print Reports**: Generate clean PDF reports with KPIs, charts, and historical data
- **Data Persistence**: All data stored in browser localStorage—nothing on external servers
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites
- Node.js (v14 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/Azqato/Azqato-s-Net-Worth-Tracker.git
cd Azqato-s-Net-Worth-Tracker

# Install dependencies
npm install

# Start the server
npm start
```

The application will run at `http://localhost:3000`

## Usage

### Adding Snapshots
1. Click **+ Add Snapshot** in the header
2. Select a month and enter values for each category
3. Click **Save Snapshot**

### Viewing Data
- **Total Net Worth Card**: Overview of your current net worth and month-over-month change
- **Category Cards**: Individual allocation percentages and MoM changes for each asset class
- **Charts**: 
  - Line chart shows net worth trend and category breakdowns over time
  - Doughnut chart displays current asset allocation
- **Snapshot History**: Sortable table of all recorded snapshots with delete options

### Importing/Exporting

**Export Data:**
- Click **Export** to download an Excel file of your snapshot history
- Useful for backups or external analysis

**Import Data:**
- Click **Import Data** to upload an Excel file
- Use the provided template format or download a blank **Template** from the app

**Template Format:**
| Date | Net Worth | Cash | Investments | Retirement | Real Estate |
|------|-----------|------|-------------|------------|-------------|
| M/D/YYYY | Auto | $ | $ | $ | $ |

### Printing Reports
- Click **Print** to generate a formatted PDF report
- Includes: KPI grid, net worth chart, and recent 12-month history table

### Data Management
- Click **Clear All** in the Snapshot History section to delete all data (with confirmation)
- Delete individual snapshots using the trash icon in the history table

## Project Structure

```
.
├── index.js              # Express-like Node.js server
├── package.json          # Dependencies
├── data.json             # Initial data file
└── public/
    ├── index.html        # Main HTML layout
    ├── style.css         # Dark-themed styles
    └── app.js            # Client-side JavaScript logic
```

## Technology Stack

- **Backend**: Node.js with native HTTP module
- **Frontend**: Vanilla JavaScript (no frameworks)
- **Charts**: Chart.js v4.4.0
- **Data Format**: Excel via XLSX.js
- **Styling**: CSS3 with CSS variables (dark mode)
- **Storage**: Browser localStorage

## Key Dependencies

- `express`: Web server framework (optional upgrade planned)

## External Libraries

- [Chart.js](https://www.chartjs.org/) – Chart visualization
- [XLSX.js](https://sheetjs.com/) – Excel file handling

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Data Privacy

⚠️ **Important**: All data is stored **only in your browser's localStorage**. 
- Data persists across visits until you clear your browser cache
- No data is sent to external servers
- Export your data regularly for backups

## Version History

**v2.4.0** – Print Report Improvements
- Expanded snapshot history to last 12 months
- Simplified chart rendering for cleaner prints
- Black text on printed reports

**v2.3.0** – Clear All Data
- Added bulk delete with confirmation

**v2.2.0** – Simplified Column Format
- Condensed template headers and date format (M/D/YYYY)

**v2.1.0** – Excel Import
- Excel file import instead of raw JSON

**v2.0.0** – Allocation Chart Labels
- Inline percentage labels on allocation chart

**v1.4.0** – Print & PDF Support
- Clean 8.5×11 letter-sized PDF reports

**v1.3.0** – Collapsible Sections
- Collapsible history and patch notes

**v1.2.0** – Excel Template & MoM
- Download Excel template, month-over-month badges

**v1.1.0** – Chart Enhancements
- Improved tooltips, allocation fixes

**v1.0.0** – Initial Release
- Core net worth tracking, charts, import/export

## Contributing

Feel free to fork, modify, and use this project for personal finance tracking.

## License

This project is open source and available under the MIT License.

## Support

For issues, feature requests, or questions, please open an issue on [GitHub](https://github.com/Azqato/Azqato-s-Net-Worth-Tracker/issues).

---

**Made by Azqato** – Track your wealth, visualize your growth.