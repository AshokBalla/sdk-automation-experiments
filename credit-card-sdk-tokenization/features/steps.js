import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import {
    fillAndSubmitPaymentForm,
    testSuccessMessage,
    testNegativePayment,
    testCreditCardAmountRangeValidation,
    testCardMissingAmountValidation,
    testInvalidAmountValidation,
    testCreditcardInvalidAmountValidation,
    testApikeyValidation,
    missingApikeyValidation,
    nonStringApikeyValidation,
    transactionFailed,
    testLogin,
    invalidLogin,
    testInvalidCardNumberValidation,
    testInvalidCVVValidation,
    testInvalidExpiryDateValidation,
    testInvalidCardNameValidation,
    testInvalidBillingZipValidation
} from '../payment.js';
import { loadSdkAutomationEnv } from '../../../src/common/sdkAutomationPaths.js';
import assert from 'assert';

loadSdkAutomationEnv(import.meta.url, ['..']);

console.log('Environment variables:');

// Verify environment variables are loaded
if (!process.env.CREDIT_CARD_URL) {
    console.warn('CREDIT_CARD_URL environment variable is not set');
}

console.log('CREDIT_CARD_URL:', process.env.CREDIT_CARD_URL);

setDefaultTimeout(60 * 60000); // 60 minutes

// Default test card details
const DEFAULT_CARD_NAME = 'Ashok Balla';
const DEFAULT_CARD_NUMBER = '4111111111111111'; // Visa test card
const DEFAULT_CARD_EXP = '12/25';
const DEFAULT_CARD_CVV = '123';
const DEFAULT_BILLING_ZIP = '12345';

// Background step
Given('the user is on the credit card payment page', async function () {
    console.log('User is on credit card payment page');
    // Test that we can access the environment
    if (!process.env.CREDIT_CARD_URL) {
        throw new Error('CREDIT_CARD_URL environment variable is not set');
    }
});

// Positive test scenarios
When('the user enters a valid payment amount {string} with card details', async function (amount) {
    console.log('Starting test with CREDIT_CARD_URL:', process.env.CREDIT_CARD_URL);
    const result = await fillAndSubmitPaymentForm(amount, DEFAULT_CARD_NAME, DEFAULT_CARD_NUMBER, DEFAULT_CARD_EXP, DEFAULT_CARD_CVV, DEFAULT_BILLING_ZIP);
    console.log('Test result:', result);
    assert.strictEqual(result, 'success', `Payment test failed! Expected success but got: ${result}`);
    console.log('✅ Payment test passed! Success message found.');
});

When('the user validates tokenization for amount {string} with card details', async function (amount) {
    console.log('Starting test with CREDIT_CARD_URL:', process.env.CREDIT_CARD_URL);
    const result = await testSuccessMessage(amount, DEFAULT_CARD_NAME, DEFAULT_CARD_NUMBER, DEFAULT_CARD_EXP, DEFAULT_CARD_CVV, DEFAULT_BILLING_ZIP);
    console.log('Test result:', result);
    assert.strictEqual(result, 'success', `Tokenization test failed! Expected success but got: ${result}`);
    console.log('✅ Tokenization test passed! Tokenize message found.');
});

// Negative test scenarios - Amount validation
When('the user enters a payment amount of {string} and submit is hit', async function (amount) {
    console.log('Starting test with CREDIT_CARD_URL:', process.env.CREDIT_CARD_URL);

    // Handle negative amounts
    if (amount.startsWith('-')) {
        const result = await testNegativePayment(amount, DEFAULT_CARD_NAME, DEFAULT_CARD_NUMBER, DEFAULT_CARD_EXP, DEFAULT_CARD_CVV, DEFAULT_BILLING_ZIP);
        console.log('Test result:', result);
        assert.strictEqual(result, 'negative_amount_error_caught', `Payment test failed! Expected error but got: ${result}`);
        console.log(`✅ Payment test passed! Negative amount ${amount} error caught.`);
        return;
    }

    // Handle zero amounts
    if (amount === '0' || amount === '0.0') {
        const result = await testCardMissingAmountValidation(amount, DEFAULT_CARD_NAME, DEFAULT_CARD_NUMBER, DEFAULT_CARD_EXP, DEFAULT_CARD_CVV, DEFAULT_BILLING_ZIP);
        console.log('Test result:', result);
        assert.strictEqual(result, 'missing_amount_error_caught', `Payment test failed! Expected error but got: ${result}`);
        console.log(`✅ Payment test passed! Zero amount ${amount} error caught.`);
        return;
    }

    // Handle invalid amount formats (non-numeric)
    if (isNaN(parseFloat(amount)) && amount !== '9999999999') {
        const result = await testCardMissingAmountValidation(amount, DEFAULT_CARD_NAME, DEFAULT_CARD_NUMBER, DEFAULT_CARD_EXP, DEFAULT_CARD_CVV, DEFAULT_BILLING_ZIP);
        console.log('Test result:', result);
        assert.strictEqual(result, 'missing_amount_error_caught', `Payment test failed! Expected error but got: ${result}`);
        console.log(`✅ Payment test passed! Invalid amount ${amount} error caught.`);
        return;
    }

    // Handle amounts exceeding maximum
    const amountValue = parseFloat(amount);
    if (amountValue > 999999.99) {
        const result = await testCreditCardAmountRangeValidation(amount, DEFAULT_CARD_NAME, DEFAULT_CARD_NUMBER, DEFAULT_CARD_EXP, DEFAULT_CARD_CVV, DEFAULT_BILLING_ZIP);
        console.log('Test result:', result);
        assert.strictEqual(result, 'amount_range_error_caught', `Payment test failed! Expected error but got: ${result}`);
        console.log(`✅ Payment test passed! Amount range error caught for ${amount}.`);
        return;
    }

    // Handle decimal amounts (invalid format)
    if (amount.includes('.') && amount !== '0.0') {
        const result = await testInvalidAmountValidation(amount, DEFAULT_CARD_NAME, DEFAULT_CARD_NUMBER, DEFAULT_CARD_EXP, DEFAULT_CARD_CVV, DEFAULT_BILLING_ZIP);
        console.log('Test result:', result);
        assert.strictEqual(result, 'invalid_amount_error_caught', `Payment test failed! Expected error but got: ${result}`);
        console.log(`✅ Payment test passed! Invalid decimal amount ${amount} error caught.`);
        return;
    }

    // Valid amounts - should succeed
    const result = await fillAndSubmitPaymentForm(amount, DEFAULT_CARD_NAME, DEFAULT_CARD_NUMBER, DEFAULT_CARD_EXP, DEFAULT_CARD_CVV, DEFAULT_BILLING_ZIP);
    console.log('Test result:', result);
    assert.strictEqual(result, 'success', `Payment test failed! Expected success but got: ${result}`);
    console.log(`✅ Payment test passed! Amount ${amount} processed successfully.`);
});

When('the user tests with missing amount validation', async function () {
    console.log('Starting test with CREDIT_CARD_URL:', process.env.CREDIT_CARD_URL);
    const result = await testCardMissingAmountValidation('', DEFAULT_CARD_NAME, DEFAULT_CARD_NUMBER, DEFAULT_CARD_EXP, DEFAULT_CARD_CVV, DEFAULT_BILLING_ZIP);
    console.log('Test result:', result);
    assert.strictEqual(result, 'missing_amount_error_caught', `Payment test failed! Expected error but got: ${result}`);
    console.log('✅ Payment test passed! Missing amount error caught.');
});

When('the user tests with invalid amount format {string}', async function (invalidAmount) {
    console.log('Starting test with CREDIT_CARD_URL:', process.env.CREDIT_CARD_URL);
    const result = await testCreditcardInvalidAmountValidation(invalidAmount, DEFAULT_CARD_NAME, DEFAULT_CARD_NUMBER, DEFAULT_CARD_EXP, DEFAULT_CARD_CVV, DEFAULT_BILLING_ZIP);
    console.log('Test result:', result);
    assert.strictEqual(result, 'invalid_amount_error_caught', `Payment test failed! Expected error but got: ${result}`);
    console.log(`✅ Invalid amount format test passed: ${invalidAmount}`);
});

// API Key validation
When('the user validates invalid apikey', async function () {
    console.log('Testing invalid API key validation');
    const result = await testApikeyValidation('invalid-test-key');
    console.log('Test result:', result);
    assert.strictEqual(result, 'invalid_api_key_error_caught', `Payment test failed! Expected invalid API key error but got: ${result}`);
    console.log('✅ Payment test passed! Invalid API key test passed - transaction correctly failed as expected');
});

When('the user validates missing apikey', async function () {
    console.log('Testing missing API key validation');
    const result = await missingApikeyValidation();
    console.log('Test result:', result);
    assert.strictEqual(result, 'invalid_api_key_error_caught', `Payment test failed! Expected invalid API key error but got: ${result}`);
    console.log('✅ Payment test passed! Missing API key test passed - transaction correctly failed as expected');
});

When('the user validates non-string API key', async function () {
    console.log('Testing non-string API key validation');
    const result = await nonStringApikeyValidation();
    console.log('Test result:', result);
    assert.strictEqual(result, 'invalid_api_key_error_caught', `Payment test failed! Expected invalid API key error but got: ${result}`);
    console.log('✅ Payment test passed! Non-string API key test passed - transaction correctly failed as expected');
});

// Transaction failure
When('the user tests transaction failure with amount {string}', async function (amount) {
    console.log('Starting test with CREDIT_CARD_URL:', process.env.CREDIT_CARD_URL);
    const result = await transactionFailed(amount, DEFAULT_CARD_NAME, DEFAULT_CARD_NUMBER, DEFAULT_CARD_EXP, DEFAULT_CARD_CVV, DEFAULT_BILLING_ZIP);
    console.log('Test result:', result);
    assert.strictEqual(result, 'transaction_failed_error_caught', `Payment test failed! Expected failure but got: ${result}`);
    console.log('✅ Payment test passed! Transaction failure correctly caught.');
});

// Login scenarios
When('the user logs in with valid credentials', async function () {
    console.log('Testing valid login');
    if (!process.env.LOGIN_URL || !process.env.LOGIN_USERNAME || !process.env.LOGIN_PASSWORD) {
        console.log('⚠️ Login credentials not set, skipping login test');
        return;
    }
    const result = await testLogin(process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD);
    console.log('Test result:', result);
    // Login success is indicated by navigating away from login page
    assert.ok(result !== 'error', `Login test failed! Expected success but got: ${result}`);
    console.log('✅ Login test passed!');
});

When('the user logs in with invalid credentials', async function () {
    console.log('Testing invalid login');
    if (!process.env.LOGIN_URL) {
        console.log('⚠️ LOGIN_URL not set, skipping login test');
        return;
    }
    const result = await invalidLogin('invalid@example.com', 'wrongpassword');
    console.log('Test result:', result);
    assert.strictEqual(result, 'invalid_login_error_caught', `Login test failed! Expected error but got: ${result}`);
    console.log('✅ Invalid login test passed!');
});

// Common actions
When('submits the payment', async function () {
    console.log('✅ Payment submitted');
    // This step is covered by the fillAndSubmitPaymentForm function which calls tokenizationPayment
});

// Assertions
Then('the payment should be tokenized successfully', async function () {
    console.log('✅ Payment tokenized successfully');
    // Assertions are already done in the When steps using assert.strictEqual
    // This step confirms the test passed
});

Then('the tokenize message should be displayed', async function () {
    console.log('✅ Tokenize message displayed');
    // Assertions are already done in the When steps using assert.strictEqual
    // This step confirms the tokenize message was found
});

Then('an error message should be displayed', async function () {
    console.log('✅ Error message displayed');
    // Assertions are already done in the When steps using assert.strictEqual
    // This step confirms the error was caught
});

Then('a failure message should be displayed', async function () {
    console.log('✅ Failure message displayed');
    // Assertions are already done in the When steps using assert.strictEqual
    // This step confirms the failure was caught
});

Then('the login should be successful', async function () {
    console.log('✅ Login successful');
    // Assertions are already done in the When steps
    // This step confirms the login test passed
});

// Invalid card details validation
When('the user tests with invalid card number {string}', async function (cardNumber) {
    console.log('Starting test with CREDIT_CARD_URL:', process.env.CREDIT_CARD_URL);
    const result = await testInvalidCardNumberValidation('100', DEFAULT_CARD_NAME, cardNumber, DEFAULT_CARD_EXP, DEFAULT_CARD_CVV, DEFAULT_BILLING_ZIP);
    console.log('Test result:', result);
    assert.strictEqual(result, 'invalid_card_number_error_caught', `Payment test failed! Expected error but got: ${result}`);
    console.log(`✅ Invalid card number test passed: ${cardNumber}`);
});

When('the user tests with invalid CVV {string}', async function (cvv) {
    console.log('Starting test with CREDIT_CARD_URL:', process.env.CREDIT_CARD_URL);
    const result = await testInvalidCVVValidation('100', DEFAULT_CARD_NAME, DEFAULT_CARD_NUMBER, DEFAULT_CARD_EXP, cvv, DEFAULT_BILLING_ZIP);
    console.log('Test result:', result);
    assert.strictEqual(result, 'invalid_cvv_error_caught', `Payment test failed! Expected error but got: ${result}`);
    console.log(`✅ Invalid CVV test passed: ${cvv}`);
});

When('the user tests with invalid expiry date {string}', async function (expiryDate) {
    console.log('Starting test with CREDIT_CARD_URL:', process.env.CREDIT_CARD_URL);
    const result = await testInvalidExpiryDateValidation('100', DEFAULT_CARD_NAME, DEFAULT_CARD_NUMBER, expiryDate, DEFAULT_CARD_CVV, DEFAULT_BILLING_ZIP);
    console.log('Test result:', result);
    assert.strictEqual(result, 'invalid_expiry_date_error_caught', `Payment test failed! Expected error but got: ${result}`);
    console.log(`✅ Invalid expiry date test passed: ${expiryDate}`);
});

When('the user tests with invalid card name {string}', async function (cardName) {
    console.log('Starting test with CREDIT_CARD_URL:', process.env.CREDIT_CARD_URL);
    const result = await testInvalidCardNameValidation('100', cardName, DEFAULT_CARD_NUMBER, DEFAULT_CARD_EXP, DEFAULT_CARD_CVV, DEFAULT_BILLING_ZIP);
    console.log('Test result:', result);
    assert.strictEqual(result, 'invalid_card_name_error_caught', `Payment test failed! Expected error but got: ${result}`);
    console.log(`✅ Invalid card name test passed: ${cardName}`);
});

When('the user tests with invalid billing zip {string}', async function (billingZip) {
    console.log('Starting test with CREDIT_CARD_URL:', process.env.CREDIT_CARD_URL);
    const result = await testInvalidBillingZipValidation('100', DEFAULT_CARD_NAME, DEFAULT_CARD_NUMBER, DEFAULT_CARD_EXP, DEFAULT_CARD_CVV, billingZip);
    console.log('Test result:', result);
    assert.strictEqual(result, 'invalid_billing_zip_error_caught', `Payment test failed! Expected error but got: ${result}`);
    console.log(`✅ Invalid billing zip test passed: ${billingZip}`);
});
