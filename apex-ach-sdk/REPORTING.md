# Test Reporting Guide

## 📊 Available Reports

After running tests, you'll get the following reports:

### 1. **CSV Report** (`reports/test-results.csv`)
- Contains detailed test results for each scenario
- Includes: Feature name, Scenario name, Status, Duration, Step counts
- Summary section with total passed/failed/skipped counts and pass rate
- Easy to import into Excel or other tools

### 2. **HTML Test Report** (`reports/html-report/index.html`)
- Interactive HTML report with visual test results
- Shows all scenarios with pass/fail status
- Includes execution time and step details
- Can be opened in any web browser

### 3. **HTML Coverage Report** (`coverage/index.html`)
- Code coverage visualization
- Shows which lines are covered by tests
- Branch, function, and statement coverage metrics
- Interactive HTML interface

### 4. **LCOV Coverage Report** (`coverage/lcov.info`)
- Standard LCOV format for CI/CD integration
- Can be used with coverage tools like Codecov, Coveralls, etc.

## 🚀 Running Tests with Reports

### Run All Tests with All Reports (Recommended)
```bash
npm run test:all
```
This command will:
1. Run all Cucumber tests with coverage
2. Generate CSV and HTML test reports
3. Generate HTML and LCOV coverage reports

### Run Tests with Test Reports Only (No Coverage)
```bash
npm run test:with-reports
```

### Run Tests with Coverage Only
```bash
npm run test:coverage
```

### Generate Reports from Existing JSON
If you already have a `reports/cucumber-report.json` file:
```bash
npm run test:reports
```

## 📈 Test Results Summary

From the latest run:
- **Total Scenarios**: 25
- **Passed**: 24
- **Failed**: 1
- **Skipped**: 0
- **Pass Rate**: 96%

## 📁 Report Locations

All reports are generated in:
- **Test Reports**: `reports/` directory
- **Coverage Reports**: `coverage/` directory

## 🔍 Viewing Reports

1. **CSV Report**: Open `reports/test-results.csv` in Excel, Google Sheets, or any CSV viewer
2. **HTML Test Report**: Open `reports/html-report/index.html` in your web browser
3. **HTML Coverage Report**: Open `coverage/index.html` in your web browser

## ⚙️ Configuration

- **Cucumber Config**: `achsdkcucumber.js`
- **Report Generator**: `generate-reports.js`
- **Test Runner**: `run-tests-with-reports.js`

## 📝 Notes

- Reports directory is automatically created if it doesn't exist
- Previous reports are overwritten on each run
- Coverage reports require c8 to be installed (already included in dependencies)

