# Credit Card SDK Test Suite

A simplified test suite for credit card SDK validation using Cucumber and Playwright with support for parallel execution. The suite uses **Playwright + Cucumber** with comprehensive test reporting and coverage analysis.

## Features

- **Payment Amount Validation**: Tests various payment amount scenarios
- **Card Type Testing**: Mastercard, Visa, Amex, and Discover card validation
- **API Key Validation**: Tests invalid, missing, and non-string API keys
- **Field Validation**: CVV, expiration date, and combined card validation
- **Country Validation**: Tests different country scenarios
- **Parallel Execution**: Run tests in parallel for faster execution

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
credit-card-sdk/
├── features/
│   ├── creditCard.feature      # Cucumber feature file with all scenarios
│   └── steps.js                # Step definitions (simplified)
├── reports/                    # Test reports directory (generated)
│   ├── cucumber-report.json    # JSON test results
│   ├── test-results.csv        # CSV test report
│   └── html-report/            # HTML test report
│       └── index.html
├── coverage/                   # Coverage reports directory (generated)
│   ├── index.html              # HTML coverage report
│   ├── lcov.info               # LCOV coverage report
│   └── coverage-final.json     # JSON coverage data
├── run-tests.js                # Test runner script with profile support
├── parallel-runner.js          # Advanced parallel execution runner
├── creditsdkcucumber.js        # Cucumber configuration with parallel profiles
├── generate-reports.js         # Report generation script
├── run-tests-with-reports.js   # Test runner with reporting
├── config.js                   # Test configuration and constants
├── .c8rc                       # c8 coverage configuration
└── package.json                # Dependencies and scripts
```

## Installation

```bash
npm install
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
- `npm run test:all` - **Run all tests with CSV, HTML, and coverage reports** ⭐
- `npm run test:with-reports` - Run tests and generate CSV/HTML test reports
- `npm run test:reports` - Generate CSV/HTML reports from existing JSON
- `npm run test:coverage` - Run tests with c8 coverage (HTML, text, LCOV, JSON)
- `npm run test:coverage:html` - Run tests with HTML coverage only
- `npm run test:coverage:lcov` - Run tests with LCOV coverage only

### Option 1: Using npm scripts (Legacy)

#### Basic Execution
```bash
npm test                    # Run with default profile (1 worker)
npm run test:default        # Run with default profile
npm run test:sequential     # Run sequentially (1 worker)
npm run test:parallel       # Run in parallel (10 workers)
```

#### Advanced Parallel Execution
```bash
npm run parallel            # Run with 5 workers (balanced)
npm run parallel:fast       # Run with 10 workers (maximum speed)
npm run parallel:balanced   # Run with 5 workers (balanced)
npm run parallel:conservative # Run with 3 workers (resource-friendly)
```

#### Custom Runner Scripts
```bash
npm start                   # Run with default profile
npm run start:parallel      # Run with parallel profile
npm run start:sequential    # Run with sequential profile
```

### Option 2: Direct cucumber commands
```bash
# Basic execution
npx cucumber-js

# Profile-based execution
npx cucumber-js --profile default
npx cucumber-js --profile sequential
npx cucumber-js --profile parallel

# Custom parallel workers
npx cucumber-js --profile parallel --parallel 8
```

### Option 3: Custom parallel runner
```bash
# Run with default 5 workers
node parallel-runner.js

# Run with custom worker count
node parallel-runner.js --workers=8
node parallel-runner.js --workers=3
```

## Execution Profiles

### Default Profile
- **Workers**: 1
- **Use Case**: Development, debugging
- **Speed**: Slowest but most stable
- **Reports**: `reports/` directory

### Sequential Profile
- **Workers**: 0 (single worker)
- **Use Case**: Detailed debugging, CI/CD
- **Speed**: Slow but reliable
- **Reports**: `reports/sequential/` directory

### Parallel Profile
- **Workers**: 10
- **Use Case**: Production testing, performance
- **Speed**: Fastest execution
- **Reports**: `reports/parallel/` directory
- **Retry**: 1 attempt for failed tests

## 🎯 Test Scenarios

The test suite covers:

1. ✅ **Basic Payment Tests**: Valid amounts with different card types
2. ✅ **Amount Validation**: Zero, negative, decimal, and non-numeric amounts
3. ✅ **API Key Tests**: Invalid, missing, and type validation
4. ✅ **Field Validation**: Missing CVV, expiration, and combined card scenarios
5. ✅ **Error Handling**: System error display validation
6. ✅ **Card Type Testing**: Mastercard, Visa, Amex, and Discover card validation
7. ✅ **Country Validation**: Tests different country scenarios

## Configuration

- Environment variables are loaded from `.env` file
- Default timeout: 90 seconds
- Parallel execution with configurable worker counts
- HTML report generation for all profiles
- Automatic retry for parallel execution

## Performance Tips

### For Maximum Speed
```bash
npm run parallel:fast        # 10 workers
```

### For Balanced Performance
```bash
npm run parallel:balanced    # 5 workers
```

### For Resource Conservation
```bash
npm run parallel:conservative # 3 workers
```

### For Debugging
```bash
npm run test:sequential      # Single worker
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

2. **Set up environment** (if needed, create `.env` file with required variables)

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

1. **Report Generation Errors**
   - Ensure the `reports/` directory exists and has write permissions
   - Make sure tests have been run at least once to generate JSON report

2. **Timeout errors waiting for selectors**
   - Ensure you're using the correct payment form URL
   - Check that the payment form elements exist on the target page

3. **Import errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check that you're using Node.js version compatible with the project

## Notes

- All original scenarios are preserved (commented)
- Active scenarios have simplified implementations
- Tests use Playwright for browser automation
- Error handling is simplified but functional
- Parallel execution significantly reduces total test time
- Reports are generated separately for each execution profile
- **New**: Comprehensive CSV and HTML test reports with coverage analysis
