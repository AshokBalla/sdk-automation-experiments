# RegionA SDK - ACH Payment Testing

## 🎯 Overview

This project contains automated tests for RegionA ACH payment functionality using **Puppeteer + Cucumber** with comprehensive test reporting and coverage analysis.

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn

### **Installation**
```bash
npm install
```

This will install Puppeteer, Cucumber, c8, and other necessary packages defined in the package.json file.

### **Environment Setup**
Create a `.env` file in the parent directory with:
```env
REGIONA_ACH_URL=https://your-test-environment.com/ach-payment
USERNAME=your_username
PASSWORD=your_password
```

## 🧪 Running Tests

### **Run All Tests with Full Reporting (Recommended)**
```bash
npm run test:all
```
This command runs all tests, generates CSV and HTML test reports, and creates coverage reports.

### **Run All Tests (Basic)**
```bash
npm test
```
Runs all Cucumber tests with console output only.

### **Run Specific Feature**
```bash
npm run test:canach
```
Runs only the RegionA ACH feature tests.

### **Run Tests with Test Reports (No Coverage)**
```bash
npm run test:with-reports
```
Generates CSV and HTML test reports without coverage analysis.

### **Run Tests with Coverage Only**
```bash
npm run test:coverage
```
Runs tests with coverage analysis (HTML, text, LCOV, and JSON formats).

### **Generate Reports from Existing JSON**
```bash
npm run test:reports
```
Generates CSV and HTML reports from an existing `reports/cucumber-report.json` file.

### **Available Scripts**
- `npm test` - Run all Cucumber tests (console output only)
- `npm run test:canach` - Run only RegionA ACH feature tests
- `npm run test:all` - **Run all tests with CSV, HTML, and coverage reports** ⭐
- `npm run test:with-reports` - Run tests and generate CSV/HTML test reports
- `npm run test:reports` - Generate CSV/HTML reports from existing JSON
- `npm run test:coverage` - Run tests with c8 coverage (HTML, text, LCOV, JSON)
- `npm run test:coverage:html` - Generate HTML coverage report only
- `npm run test:coverage:lcov` - Generate LCOV coverage report only
- `npm run test:coverage:nyc` - Run tests with NYC coverage (legacy)
- `npm run coverage:report` - Generate NYC HTML coverage report
- `npm run coverage:lcov` - Generate NYC LCOV coverage report

## 📊 Test Reports

### **CSV Report** (`reports/test-results.csv`)
- Detailed test results for each scenario
- Includes: Feature name, Scenario name, Status, Duration, Step counts
- Summary section with total passed/failed/skipped counts and pass rate
- Easy to import into Excel, Google Sheets, or other analysis tools

### **HTML Test Report** (`reports/html-report/index.html`)
- Interactive HTML report with visual test results
- Shows all scenarios with pass/fail status
- Includes execution time and step details
- Can be opened in any web browser for easy viewing

### **Coverage Reports**

#### **HTML Coverage Report** (`coverage/index.html`)
- Interactive code coverage visualization
- Shows which lines are covered by tests
- Branch, function, and statement coverage metrics
- Color-coded coverage indicators

#### **LCOV Coverage Report** (`coverage/lcov.info`)
- Standard LCOV format for CI/CD integration
- Compatible with coverage tools like Codecov, Coveralls, etc.
- Machine-readable format for automated analysis

#### **JSON Coverage Report** (`coverage/coverage-final.json`)
- Machine-readable coverage data
- Can be processed by custom tools or CI/CD pipelines

## 📈 Viewing Reports

### **CSV Report**
Open `reports/test-results.csv` in:
- Microsoft Excel
- Google Sheets
- Any CSV viewer or text editor

The CSV includes:
- Individual test results with status and duration
- Summary statistics (total, passed, failed, skipped)
- Pass rate percentage

### **HTML Test Report**
Open `reports/html-report/index.html` in your web browser to view:
- Visual test results dashboard
- Scenario-by-scenario breakdown
- Execution times and step details
- Pass/fail status with color coding

### **HTML Coverage Report**
Open `coverage/index.html` in your web browser to view:
- Code coverage visualization
- File-by-file coverage breakdown
- Uncovered lines highlighted
- Coverage metrics (statements, branches, functions, lines)

## 📁 Project Structure

```
can-sdk-ach/
├── features/
│   ├── canach.feature          # Gherkin test scenarios
│   └── step_defs/
│       └── canachsteps.js      # Step definitions
├── reports/                     # Test reports directory (generated)
│   ├── cucumber-report.json    # JSON test results
│   ├── test-results.csv        # CSV test report
│   └── html-report/            # HTML test report
│       └── index.html
├── coverage/                    # Coverage reports directory (generated)
│   ├── index.html              # HTML coverage report
│   ├── lcov.info               # LCOV coverage report
│   └── coverage-final.json     # JSON coverage data
├── canach.js                   # Main test functions for ACH payments
├── cucumber.js                 # Cucumber configuration
├── generate-reports.js         # Report generation script
├── run-tests-with-reports.js   # Test runner with reporting
├── .c8rc                       # c8 coverage configuration
├── .nycrc                      # NYC coverage configuration (legacy)
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🔧 Configuration

### **Cucumber Configuration (cucumber.js)**
- Formats: Progress bar, HTML, and JSON output
- JSON output saved to `reports/cucumber-report.json`
- Step definitions loaded from `features/step_defs/*.js`

### **Coverage Configuration (.c8rc)**
```json
{
  "all": true,
  "include": ["*.js", "features/**/*.js"],
  "exclude": ["node_modules/**", "coverage/**"],
  "reporter": ["html", "text", "lcov"],
  "branches": 80,
  "lines": 80,
  "functions": 80,
  "statements": 80
}
```

## 📋 Report Locations

After running `npm run test:all`, you'll find:

- **CSV Test Report**: `reports/test-results.csv`
- **HTML Test Report**: `reports/html-report/index.html`
- **HTML Coverage Report**: `coverage/index.html`
- **LCOV Coverage Report**: `coverage/lcov.info`
- **JSON Coverage Data**: `coverage/coverage-final.json`

## 🔄 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment** (create `.env` file with `REGIONA_ACH_URL`, `USERNAME`, `PASSWORD`)

3. **Run tests with all reports**:
   ```bash
   npm run test:all
   ```

4. **View reports**:
   - Open `reports/html-report/index.html` for test results
   - Open `coverage/index.html` for coverage analysis
   - Open `reports/test-results.csv` for spreadsheet analysis

## 🐛 Troubleshooting

If you encounter issues while running the tests, try the following solutions:

- **Authentication Errors**: Verify your credentials in the `.env` file
- **Timeout Errors**: The default timeout is set to 60 minutes; adjust if needed
- **Element Not Found**: UI may have changed; check selectors in implementation
- **Environment Issues**: Ensure you're using the correct REGIONA_ACH_URL for your environment
- **Report Generation Errors**: Ensure the `reports/` directory exists and has write permissions

## 📞 Support

For questions about test coverage or the test suite, refer to:
- Test reports in `reports/` directory
- Coverage reports in `coverage/` directory
- Console output from test commands
- This README documentation

## 📚 Additional Resources

For a more detailed understanding of this project and how to use Cucumber with JavaScript, you can refer to the [Cucumber 10-Minute Tutorial](https://cucumber.io/docs/guides/10-minute-tutorial/?lang=javascript). This tutorial provides step-by-step instructions on setting up and running automated tests using Cucumber.

---

**Last Updated**: 2024
**Reporting**: ✅ CSV, HTML, and Coverage reports available 