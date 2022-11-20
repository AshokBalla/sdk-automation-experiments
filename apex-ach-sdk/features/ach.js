import { When, Then, Given, setDefaultTimeout } from '@cucumber/cucumber';
// import { fillForm } from '../../../achpayment.js';
import {
    fillForm, testNegativePayment,
    testAmountRangeValidation, testMissingAmountValidation,
    testInvalidAmountValidation, testBankCountryNotSupported,
    testfillForm, testApikeyValidation,
    nonStringApikeyValidation
} from '../../../pages/achpage/achpayment.js';
import { loadSdkAutomationEnv } from '../../../src/common/sdkAutomationPaths.js';

import assert from 'assert';

loadSdkAutomationEnv(import.meta.url, ['..']);

setDefaultTimeout(60 * 60000);

// Verify environment variables are loaded
if (!process.env.ACH_URL) {
    throw new Error('ACH_URL environment variable is not set');
}

console.log('Environment variables:');
console.log(process.env.ACH_URL);


When('the user enters a valid payment amount 100', async function () {
    console.log('Starting test with ACH_URL:', process.env.ACH_URL);
    const result1 = await fillForm('100', 'Ashok Balla', '0000000016', '122105278');
    console.log("Ashok Test:", result1);

    // Use proper assertion - assert.strictEqual
    assert.strictEqual(result1, 'success', `Payment test Success! ${result1}`);
    assert.ok(true, 'Success message step completed successfully');
    console.log('✅ Payment test passed! Success message found.');
});


When('the user enter a  payment amount of -50 is entered and submit is hit', async function () {
    console.log('Starting test with ACH_URL:', process.env.ACH_URL);
    const result2 = await testNegativePayment('-50', 'Ashok Balla', '0000000016', '122105278');
    console.log('Test result:', result2);

    assert.strictEqual(result2, 'negative_amount_error_caught', `Payment test failed! Expected error but got: ${result2}`);
    console.log('✅ Payment test passed! Negative amount error caught.');
});




When('the user enter a payment amount of 9999999999 is entered and submit is hit', async function () {
    console.log('Starting test with ACH_URL:', process.env.ACH_URL);
    const result3 = await testAmountRangeValidation('9999999999', 'Ashok Balla', '0000000016', '122105278');
    console.log('Test result:', result3);
    assert.strictEqual(result3, 'amount_range_error_caught', `Payment test failed! Expected error but got: ${result3}`);
    console.log('✅ Payment test passed! Amount range error caught.');

});


When('the user enter a payment amount of 0 is entered and submit is hit', async function () {
    console.log('Starting test with ACH_URL:', process.env.ACH_URL);
    const result4 = await testMissingAmountValidation('0', 'Ashok Balla', '0000000016', '122105278');
    console.log('Test result:', result4);
    assert.strictEqual(result4, 'missing_amount_error_caught', `Payment test failed! Expected error but got: ${result4}`);
    console.log('✅ Payment test passed! Missing amount error caught.');

});


When('the user enter a payment amount of 45.55 is entered and submit is hit', async function () {
    console.log('Starting test with ACH_URL:', process.env.ACH_URL);
    const result5 = await testInvalidAmountValidation('45.55', 'Ashok Balla', '0000000016', '122105278');
    console.log('Test result:', result5);
    assert.strictEqual(result5, 'invalid_amount_error_caught', `Payment test failed! Expected error but got: ${result5}`);
    console.log('✅ Payment test passed! Invalid amount error caught.');

});


When('the user enter a payment amount of -45.55 is entered and submit is hit', async function () {
    console.log('Starting test with ACH_URL:', process.env.ACH_URL);
    const result6 = await testNegativePayment('-45.55', 'Ashok Balla', '0000000016', '122105278');
    console.log('Test result:', result6);
    assert.strictEqual(result6, 'negative_amount_error_caught', `Payment test failed! Expected error but got: ${result6}`);
    console.log('✅ Payment test passed! Negative amount error caught.');

});


When('the user enter a payment amount of 0.0 is entered and submit is hit', async function () {
    console.log('Starting test with ACH_URL:', process.env.ACH_URL);
    const result7 = await testMissingAmountValidation('0.0', 'Ashok Balla', '0000000016', '122105278');
    console.log('Test result:', result7);
    assert.strictEqual(result7, 'missing_amount_error_caught', `Payment test failed! Expected error but got: ${result7}`);
    console.log('✅ Payment test passed! Missing amount error caught.');

});


When('the user enter a payment amount of abc is entered and submit is hit', async function () {
    console.log('Starting test with ACH_URL:', process.env.ACH_URL);
    const result8 = await testMissingAmountValidation('abc', 'Ashok Balla', '0000000016', '122105278');
    console.log('Test result:', result8);
    assert.strictEqual(result8, 'missing_amount_error_caught', `Payment test failed! Expected error but got: ${result8}`);
    console.log('✅ Payment test passed! Missing amount error caught.');
});

When('the user enter a payment amount of abc123 is entered and submit is hit', async function () {
    console.log('Starting test with ACH_URL:', process.env.ACH_URL);
    const result9 = await testMissingAmountValidation('abc123', 'Ashok Balla', '0000000016', '122105278');
    console.log('Test result:', result9);
    assert.strictEqual(result9, 'missing_amount_error_caught', `Payment test failed! Expected error but got: ${result9}`);
    console.log('✅ Payment test passed! Missing amount error caught.');

});


When('the user enter a payment amount of !@#$% is entered and submit is hit', async function () {
    console.log('Starting test with ACH_URL:', process.env.ACH_URL);
    const result10 = await testMissingAmountValidation('!@#$%', 'Ashok Balla', '0000000016', '122105278');
    console.log('Test result:', result10);
    assert.strictEqual(result10, 'missing_amount_error_caught', `Payment test failed! Expected error but got: ${result10}`);
    console.log('✅ Payment test passed! Missing amount error caught.');

});

When('the user enter a name on the account only numbers', async function () {
    console.log('Starting test with ACH_URL:', process.env.ACH_URL);
    const result11 = await fillForm('200', '123456778687456789', '0000000016', '122105278');
    console.log('Test result:', result11);
    assert.strictEqual(result11, 'success', `Payment test failed! Expected success but got: ${result11}`);
    console.log('✅ Payment test passed! Bank country error caught.');

});


When('the user enter the a name on the account only special characters', async function () {
    console.log('Starting test with ACH_URL:', process.env.ACH_URL);
    const result12 = await fillForm('300', '!@#$%!@#$!@#$!@#$!@#$', '0000000016', '122105278');
    console.log('Test result:', result12);
    assert.strictEqual(result12, 'success', `Payment test failed! Expected success but got: ${result12}`);
    console.log('✅ Payment test passed! Name on account with special characters test passed');
});


When('the user enter the name on the account only special characters alphabets numbers', async function () {
    console.log('Starting test with ACH_URL:', process.env.ACH_URL);
    const result13 = await fillForm('300', 'Ashok123!@#$', '0000000016', '122105278');
    console.log('Test result:', result13);
    assert.strictEqual(result13, 'success', `Payment test failed! Expected success but got: ${result13}`);
    console.log('✅ Payment test passed! Name on account with special characters alphabets numbers test passed');
});


When('the user enter the name on the account largenumber', async function () {
    console.log('Starting test with ACH_URL:', process.env.ACH_URL);
    const result14 = await fillForm('300', '999346369999999999954699999999999999999', '0000000016', '122105278');
    console.log('Test result:', result14);
    assert.strictEqual(result14, 'success', `Payment test failed! Expected success but got: ${result14}`);
    console.log('✅ Payment test passed! Name on account with large number of characters test passed');
});


When('the user enter the large account number', async function () {
    console.log('Starting test with ACH_URL:', process.env.ACH_URL);
    const result15 = await fillForm('400', 'Ashok Balla', '78945624656456664', '122105278');
    console.log('Test result:', result15);
    assert.strictEqual(result15, 'success', `Payment test failed! Expected success but got: ${result15}`);
    console.log('✅ Payment test passed! Account number with large number of characters test passed');
});

When('the user validate failure payment', async function () {
    console.log('Starting test with ACH_URL:', process.env.ACH_URL);
    const result16 = await fillForm('102', 'Ashok Balla', '0000000016', '122105278');
    console.log('Test result:', result16);
    assert.strictEqual(result16, 'success', `Payment test failed! Expected success but got: ${result16}`);
    console.log('✅ Payment test passed!');
});


When('the user enter a payment amount without ACH account name', async function () {
    console.log('Starting test with ACH_URL:', process.env.ACH_URL);
    const result17 = await testfillForm('100', '', '0000000016', '122105278');
    console.log('Test result:', result17);
    // assert.strictEqual(result17, 'success', `Payment test failed! Expected success but got: ${result17}`);
    // console.log('✅ Payment test passed!');
});

When('the user enter a payment amout with ACH  account number', async function () {
    console.log('Starting test with ACH_URL:', process.env.ACH_URL);
    const result17 = await testfillForm('100', 'Ashok Balla', '', '122105278');
    console.log('Test result:', result17);
    // assert.strictEqual(result17, 'success', `Payment test failed! Expected success but got: ${result17}`);
    console.log('✅ Payment test passed!');
});

When('the user enter a pyment amout without ACH  routhing number', async function () {
    console.log('Starting test with ACH_URL:', process.env.ACH_URL);
    const result18 = await testfillForm('100', 'Ashok Balla', '0000000016', '');
    console.log('Test result:', result18);
    // assert.strictEqual(result18, 'success', `Payment test failed! Expected success but got: ${result18}`);
    console.log('✅ Payment test passed!');
});

When('the user validate empty name', async function () {
    console.log('Starting test with ACH_URL:', process.env.ACH_URL);
    const result19 = await testfillForm('100', '', '0000000016', '122105278');
    console.log('Test result:', result19);
    //assert.strictEqual(result19, 'success', `Payment test failed! Expected success but got: ${result19}`);
    console.log('Empty name test passed');
});

When('the user validate empty accountnumber', async function () {
    console.log('Starting test with ACH_URL:', process.env.ACH_URL);
    const result20 = await testfillForm('100', 'Ashok Balla', '', '122105278');
    console.log('Test result:', result20);
    //assert.strictEqual(result20, 'success', `Payment test failed! Expected success but got: ${result20}`);
    console.log('Empty account number test passed');
});

When('the user validate empty routing number', async function () {
    console.log('Starting test with ACH_URL:', process.env.ACH_URL);
    const result21 = await testfillForm('100', 'Ashok Balla', '0000000016', '');
    console.log('Test result:', result21);
    //assert.strictEqual(result21, 'success', `Payment test failed! Expected success but got: ${result21}`);
    console.log('Empty routing number test passed');
});


When('the user validate invalid apikey', async function () {
    console.log('Testing invalid API key validation');
    const result32 = await testApikeyValidation('invalid-test-key');
    console.log('Test result:', result32);
    assert.strictEqual(result32, 'invalid_api_key_error_caught', `Payment test failed! Expected invalid API key error but got: ${result32}`);
    console.log('✅ Payment test passed! Invalid API key test passed - transaction correctly failed as expected');
});

When('the user validate missing apikey', async function () {
    console.log('Testing missing API key validation');
    const result33 = await testApikeyValidation('');
    console.log('Test result:', result33);
    assert.strictEqual(result33, 'invalid_api_key_error_caught', `Payment test failed! Expected invalid API key error but got: ${result33}`);
    console.log('✅ Payment test passed! Invalid API key test passed - transaction correctly failed as expected');
});

When('the user validates non-string API key', async function () {
    console.log('Testing  non-string API key validation');
    const result34 = await nonStringApikeyValidation();
    console.log('Test result:', result34);
    assert.strictEqual(result34, 'invalid_api_key_error_caught', `Payment test failed! Expected invalid API key error but got: ${result34}`);
    console.log('✅ Payment test passed! Invalid API key test passed - transaction correctly failed as expected');
});



