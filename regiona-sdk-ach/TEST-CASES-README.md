# RegionA ACH Payment Test Cases

This document describes the comprehensive test cases for RegionA ACH payment validation.

## Test Categories

### 🟢 Positive Test Cases (@positive)

#### Happy Path Tests
- **Valid payment with correct data**: Tests successful payment processing
- **Minimum amount**: Tests payment with $0.01
- **Maximum amount**: Tests payment with $999,999.99

#### Format Tests
- **Account number with leading zeros**: Tests "0000000016"
- **Valid institution number**: Tests "123" format
- **Valid transit number**: Tests "12210" format

### 🔴 Negative Test Cases (@negative)

#### Validation Tests (@validation)
- **Empty fields**: Tests all required fields when left empty
- **Invalid formats**: Tests wrong data types and formats
- **Invalid email**: Tests malformed email addresses

#### Boundary Tests (@boundary)
- **Amount limits**: Tests amounts exceeding maximum limits
- **Field length limits**: Tests very long input values

## Running Tests

### Run All Tests
```bash
npx cucumber-js
```

### Run by Category
```bash
# Only positive tests
npx cucumber-js --tags @positive

# Only negative tests  
npx cucumber-js --tags @negative

# Only validation tests
npx cucumber-js --tags @validation

# Only boundary tests
npx cucumber-js --tags @boundary
```

### Run Specific Test
```bash
# Run a specific scenario
npx cucumber-js --name "Valid RegionA ACH payment with correct data"
```

### Using Test Runner Script
```bash
node run-tests.js
```

## Test Structure

- **Features**: `features/canach.feature` - Contains all test scenarios
- **Step Definitions**: `features/step_defs/canachsteps.js` - Implements test logic
- **Test Functions**: `canach.js` - Core testing functions
- **Runner**: `run-tests.js` - Test execution script

## Expected Results

- **Positive tests**: Should pass and process payments successfully
- **Negative tests**: Should fail gracefully with appropriate error messages
- **Validation tests**: Should show validation errors for invalid data
- **Boundary tests**: Should handle edge cases appropriately

## Notes

- Tests use environment variables from `.env` file
- Browser automation is handled by Puppeteer
- All tests have appropriate timeouts and error handling
- Tests are designed to be simple and maintainable 