# RegionA Credit Card SDK Test Suite

This is a Playwright + Cucumber automation project for testing RegionA Credit Card payment functionality. The suite uses **Playwright + Cucumber** with comprehensive test reporting and coverage analysis.

## 📊 Test Reports

After running tests with reports, you'll get the following outputs:

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
regiona-credit-card-sdk/
├── features/
│   ├── creditcard.feature          # Cucumber Gherkin test scenarios
│   └── step_defs/
│       └── cardsteps.js            # Step definitions for the feature
├── reports/                        # Test reports directory (generated)
│   ├── cucumber-report.json        # JSON test results
│   ├── test-results.csv            # CSV test report
│   └── html-report/                # HTML test report
│       └── index.html
├── coverage/                       # Coverage reports directory (generated)
│   ├── index.html                  # HTML coverage report
│   ├── lcov.info                   # LCOV coverage report
│   └── coverage-final.json         # JSON coverage data
├── test.js                         # Main test functions and RegionAcard class
├── config.js                       # Configuration with fallback URLs
├── cucumber.js                     # Cucumber configuration
├── generate-reports.js             # Report generation script
├── run-tests-with-reports.js       # Test runner with reporting
├── .c8rc                           # c8 coverage configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set environment variables:**
   
   **Option 1: Environment variables**
   ```bash
   export REGIONA_CREDIT_CARD_URL="https://your-actual-payment-url.com"
   export INVALID_API_KEY_URL="https://your-invalid-api-key-test-url.com"
   ```
   
   **Option 2: Create .env file**
   Create a `.env` file in the project root:
   ```
   REGIONA_CREDIT_CARD_URL=https://your-actual-payment-url.com
   INVALID_API_KEY_URL=https://your-invalid-api-key-test-url.com
   ```
   
   **Option 3: Update config.js**
   Edit the `config.js` file with your actual URLs.

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

### **Legacy Coverage Command**
```bash
npm run coverage
```
Runs tests with HTML and text coverage reports (legacy command, use `test:coverage` for full coverage).

### **Available Scripts**
- `npm test` - Run all Cucumber tests (console output only)
- `npm run test:all` - **Run all tests with CSV, HTML, and coverage reports** ⭐
- `npm run test:with-reports` - Run tests and generate CSV/HTML test reports
- `npm run test:reports` - Generate CSV/HTML reports from existing JSON
- `npm run test:coverage` - Run tests with c8 coverage (HTML, text, LCOV, JSON)
- `npm run coverage` - Legacy coverage command (HTML and text only)

## Test Features

- **Credit Card Payment Testing**: Tests payment form filling and submission
- **Hosted Field Support**: Handles iframe-based payment fields
- **Error Handling**: Proper error handling and browser cleanup
- **Environment Configuration**: Flexible configuration options

## 🎯 Test Scenarios

The test suite includes comprehensive scenarios for 100% coverage:
- ✅ **Valid payments**: Tests with different amounts (50, 100, 200, 500)
- ✅ **Card types**: Tests with Amex, Visa, Mastercard, and Discover cards
- ✅ **Invalid card number**: Tests with invalid card number
- ✅ **Invalid expiry date**: Tests with expired card
- ✅ **Invalid CVV**: Tests with invalid CVV code
- ✅ **Empty amount**: Tests with empty payment amount
- ✅ **Invalid API key**: Tests with invalid API key validation
- ✅ **Payment amount validation**: Tests various payment amounts (zero, negative, large numbers, decimals, alphabetic, special characters)
- ✅ **Name on card validation**: Tests name field with special characters, numbers, and combinations
- ✅ **Error scenarios**: Tests generic decline, insufficient funds, socket errors
- ✅ **Field validation**: Tests missing CVV, missing expiration, combined credit card fields

## Configuration

The project uses a fallback configuration system:
1. First checks environment variables
2. Falls back to values in `config.js`
3. Provides helpful error messages if neither is configured

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

2. **Set up environment** (create `.env` file or set environment variables):
   ```env
   REGIONA_CREDIT_CARD_URL=https://your-actual-payment-url.com
   INVALID_API_KEY_URL=https://your-invalid-api-key-test-url.com
   ```

3. **Run tests with all reports**:
   ```bash
   npm run test:all
   ```

4. **View reports**:
   - Open `reports/html-report/index.html` for test results
   - Open `coverage/index.html` for coverage analysis
   - Open `reports/test-results.csv` for spreadsheet analysis

## 🐛 Troubleshooting

**Common Issues:**

1. **"REGIONA_CREDIT_CARD_URL environment variable is not set"**
   - Set the environment variable or update `config.js`

2. **Timeout errors waiting for selectors**
   - Ensure you're using the correct payment form URL
   - Check that the payment form elements exist on the target page

3. **Import errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check that you're using Node.js version compatible with the project

4. **Report Generation Errors**
   - Ensure the `reports/` directory exists and has write permissions
   - Make sure tests have been run at least once to generate JSON report

## Dependencies

- `@cucumber/cucumber`: Test framework
- `puppeteer`: Browser automation
- `dotenv`: Environment variable loading
- `@cucumber/pretty-formatter`: Test output formatting
- `c8`: Code coverage tool