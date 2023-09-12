import assert from 'assert';
import { When, Then, setDefaultTimeout } from '@cucumber/cucumber';
// import { fillAndSubmitPaymentForm } from '../../../payment.js';
import {
    fillAndSubmitPaymentForm, testApikeyValidation,
    missingApikeyValidation, nonStringApikeyValidation,
    testSuccessMessage,
    testInvalidAmountValidation,
    testNegativePayment,
    testCreditCardAmountRangeValidation,
    testCreditcardInvalidAmountValidation,
    testCardMissingAmountValidation,
    transactionFailed
} from '../../../pages/cardpage/payment.js';
import { loadSdkAutomationEnv } from '../../../src/common/sdkAutomationPaths.js';

loadSdkAutomationEnv(import.meta.url, ['..']);

setDefaultTimeout(180000);



When('the user enters a valid payment amount with amex card', async function () {
    const result1 = await testSuccessMessage('300', 'Ashok Balla', '347984789456149', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result1);
    assert.strictEqual(result1, 'success', `Payment test failed! Expected success but got: ${result1}`);
    console.log('✅ Payment test passed! Amex test passed');
});

When('the user enters a valid payment amount with visa card', async function () {
    const result2 = await testSuccessMessage('400', 'Ashok Balla', '4128330033003302', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result2);
    assert.strictEqual(result2, 'success', `Payment test failed! Expected success but got: ${result2}`);
    console.log('✅ Payment test passed! Visa test passed');
});

When('the user enters payment as 0', async function () {
    const result3 = await testInvalidAmountValidation('0', 'Ashok Balla', '4835034598457895', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result3);
    assert.strictEqual(result3, 'missing_amount_error_caught', `Payment test failed! Expected missing amount error but got: ${result3}`);
    console.log('✅ Payment test passed! Missing amount error caught');

});

When('the user enters the payment amount -50', async function () {
    const result4 = await testNegativePayment('-50', 'Ashok Balla', '4835034598457895', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result4);
    assert.strictEqual(result4, 'negative_amount_error_caught', `Payment test failed! Expected negative amount error but got: ${result4}`);
    console.log('✅ Payment test passed! Negative amount error caught');

});

When('the user enters the payment amount 9999999999', async function () {
    const result5 = await testCreditCardAmountRangeValidation('9999999999', 'Ashok Balla', '4835034598457895', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result5);
    assert.strictEqual(result5, 'amount_range_error_caught', `Payment test failed! Expected amount range error but got: ${result5}`);
    console.log('✅ Payment test passed! Amount range error caught');

});

When('the user enters the payment amount 45.55', async function () {
    const result6 = await testCreditcardInvalidAmountValidation('45.55', 'Ashok Balla', '4835034598457895', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result6);
    assert.strictEqual(result6, 'invalid_amount_error_caught', `Payment test failed! Expected invalid amount error but got: ${result6}`);
    console.log('✅ Payment test passed! Invalid amount error caught');

});

When('the user enters the payment amount -45.55', async function () {
    const result7 = await testNegativePayment('-45.55', 'Ashok Balla', '4835034598457895', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result7);
    assert.strictEqual(result7, 'negative_amount_error_caught', `Payment test failed! Expected negative amount error but got: ${result7}`);
    console.log('✅ Payment test passed! Negative amount error caught');

});


When('the user enters the payment amount 0.0', async function () {
    const result8 = await testCardMissingAmountValidation('0.0', 'Ashok Balla', '4835034598457895', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result8);
    assert.strictEqual(result8, 'missing_amount_error_caught', `Payment test failed! Expected missing amount error but got: ${result8}`);
    console.log('✅ Payment test passed! Missing amount error caught');

});

When('the user enter the payment alphabetic abc', async function () {
    const result9 = await testCardMissingAmountValidation('abc', 'Ashok Balla', '4835034598457895', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result9);
    assert.strictEqual(result9, 'missing_amount_error_caught', `Payment test failed! Expected missing amount error but got: ${result9}`);
    console.log('✅ Payment test passed! Missing amount error caught');

});

When('the user enter the payment abc123', async function () {
    const result10 = await testCardMissingAmountValidation('abc123', 'Ashok Balla', '4835034598457895', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result10);
    assert.strictEqual(result10, 'missing_amount_error_caught', `Payment test failed! Expected missing amount error but got: ${result10}`);
    console.log('✅ Payment test passed! Missing amount error caught');
});

When('the user enter the payment !@#$%', async function () {
    const result11 = await testCardMissingAmountValidation('!@#$%', 'Ashok Balla', '4835034598457895', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result11);
    assert.strictEqual(result11, 'missing_amount_error_caught', `Payment test failed! Expected missing amount error but got: ${result11}`);
    console.log('✅ Payment test passed! Missing amount error caught');

});

When('the user enter the nameoncard !@#$%', async function () {
    const result12 = await testSuccessMessage('100', '!@#$%', '4835034598457895', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result12);
    assert.strictEqual(result12, 'success', `Payment test failed! Expected success but got: ${result12}`);
    console.log('✅ Payment test passed! Name on card as !@#$% test passed');

});

When('the user enter the nameoncard only numbers', async function () {
    const result13 = await testSuccessMessage('100', '123456', '4835034598457895', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result13);
    assert.strictEqual(result13, 'success', `Payment test failed! Expected success but got: ${result13}`);
    console.log('✅ Payment test passed! Name on card as only numbers test passed');
});

When('the user enter the nameoncard alphabetic special numbers', async function () {
    const result14 = await testSuccessMessage('100', 'Ashok@123', '4835034598457895', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result14);
    assert.strictEqual(result14, 'success', `Payment test failed! Expected success but got: ${result14}`);
    console.log('✅ Payment test passed! Name on card as alphabetic special numbers test passed');
});

// visa
When('the user enters valid credentials with 102 as the amount', async function () {
    const result15 = await transactionFailed('102', 'Ashok Balla', '4835034598457895', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result15);
    assert.strictEqual(result15, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result15}`);
    console.log('✅ Payment test passed! Visa 102 test passed - transaction correctly failed as expected');

});

When('the user enters valid credentials with 193 as the amount', async function () {
    const result16 = await transactionFailed('193', 'Ashok Balla', '4835034598457895', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result16);
    assert.strictEqual(result16, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result16}`);
    console.log('✅ Payment test passed! Visa 193 test passed - transaction correctly failed as expected');

});

When('the user enters valid credentials with 194 as the amount', async function () {
    const result17 = await transactionFailed('194', 'Ashok Balla', '4835034598457895', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result17);
    assert.strictEqual(result17, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result17}`);
    console.log('✅ Payment test passed! Visa 194 test passed - transaction correctly failed as expected');

});

When('the user enters valid credentials with 889986 as the amount', async function () {
    const result18 = await transactionFailed('889986', 'Ashok Balla', '4835034598457895', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result18);
    assert.strictEqual(result18, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result18}`);
    console.log('✅ Payment test passed! Visa 889986 test passed - transaction correctly failed as expected');

});

When('the user enters valid credentials with 889987 as the amount', async function () {
    const result19 = await transactionFailed('889987', 'Ashok Balla', '4835034598457895', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result19);
    assert.strictEqual(result19, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result19}`);
    console.log('✅ Payment test passed! Visa 889987 test passed - transaction correctly failed as expected');

});

When('the user enters valid credentials with 888888 as the amount', async function () {
    const result20 = await testSuccessMessage('888888', 'Ashok Balla', '4835034598457895', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result20);
    assert.strictEqual(result20, 'success', `Payment test failed! Expected success but got: ${result20}`);
    console.log('✅ Payment test passed! Visa 888888 test passed - transaction correctly failed as expected');
});

// amex 
When('the user enters valid credentials with 102 as the amount with amex card', async function () {
    const result21 = await transactionFailed('102', 'Ashok Balla', '347984789456149', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result21);
    assert.strictEqual(result21, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result21}`);
    console.log('✅ Payment test passed! Amex 102 test passed - transaction correctly failed as expected');

});


When('the user enters valid credentials with 193 as the amount with amex card', async function () {
    const result22 = await transactionFailed('193', 'Ashok Balla', '347984789456149', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result22);
    assert.strictEqual(result22, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result22}`);
    console.log('✅ Payment test passed! Amex 193 test passed - transaction correctly failed as expected');

});

When('the user enters valid credentials with 194 as the amount with amex card', async function () {
    const result23 = await transactionFailed('194', 'Ashok Balla', '347984789456149', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result23);
    assert.strictEqual(result23, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result23}`);
    console.log('✅ Payment test passed! Amex 194 test passed - transaction correctly failed as expected');

});

When('the user enters valid credentials with 889986 as the amount with amex card', async function () {
    const result24 = await transactionFailed('889986', 'Ashok Balla', '347984789456149', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result24);
    assert.strictEqual(result24, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result24}`);
    console.log('✅ Payment test passed! Amex 889986 test passed - transaction correctly failed as expected');

});

When('the user enters valid credentials with 889987 as the amount with amex card', async function () {
    const result25 = await transactionFailed('889987', 'Ashok Balla', '347984789456149', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result25);
    assert.strictEqual(result25, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result25}`);
    console.log('✅ Payment test passed! Amex 889987 test passed - transaction correctly failed as expected');

});

When('the user enters valid credentials with 888888 as the amount with amex card', async function () {
    const result26 = await testSuccessMessage('888888', 'Ashok Balla', '347984789456149', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result26);
    assert.strictEqual(result26, 'success', `Payment test failed! Expected success but got: ${result26}`);
    console.log('✅ Payment test passed! Amex 888888 test passed - transaction correctly failed as expected');

});

// mastercard
When('the user enters valid credentials with 102 as the amount with mastercard card', async function () {
    const result27 = await transactionFailed('102', 'Ashok Balla', '5125 6800 1234 1234', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result27);
    assert.strictEqual(result27, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result27}`);
    console.log('✅ Payment test passed! Mastercard 102 test passed - transaction correctly failed as expected');

});

When('the user enters valid credentials with 193 as the amount with mastercard card', async function () {
    const result28 = await transactionFailed('193', 'Ashok Balla', '5125 6800 1234 1234', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result28);
    assert.strictEqual(result28, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result28}`);
    console.log('✅ Payment test passed! Mastercard 193 test passed - transaction correctly failed as expected');

});

When('the user enters valid credentials with 194 as the amount with mastercard card', async function () {
    const result29 = await transactionFailed('194', 'Ashok Balla', '5125 6800 1234 1234', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result29);
    assert.strictEqual(result29, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result29}`);
    console.log('✅ Payment test passed! Mastercard 194 test passed - transaction correctly failed as expected');

});

When('the user enters valid credentials with 889986 as the amount with mastercard card', async function () {
    const result30 = await transactionFailed('889986', 'Ashok Balla', '5125 6800 1234 1234', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result30);
    assert.strictEqual(result30, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result30}`);
    console.log('✅ Payment test passed! Mastercard 889986 test passed - transaction correctly failed as expected');

    console.log('mastercard 888886 test passed');

});

When('the user enters valid credentials with 889987 as the amount with mastercard card', async function () {
    const result31 = await transactionFailed('889987', 'Ashok Balla', '5125 6800 1234 1234', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result31);
    assert.strictEqual(result31, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result31}`);
    console.log('✅ Payment test passed! Mastercard 889987 test passed - transaction correctly failed as expected');

    console.log('mastercard 888887 test passed');

});

When('the user enters valid credentials with 888888 as the amount with mastercard card', async function () {
    const result32 = await testSuccessMessage('888888', 'Ashok Balla', '5125 6800 1234 1234', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result32);
    assert.strictEqual(result32, 'success', `Payment test failed! Expected success but got: ${result32}`);
    console.log('✅ Payment test passed! Mastercard 888888 test passed - transaction correctly failed as expected');

    console.log('mastercard 888888 test passed');

});

// discover
When('the user enters valid credentials with 102 as the amount with discover card', async function () {
    const result33 = await transactionFailed('102', 'Ashok Balla', '6560054567891235', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result33);
    assert.strictEqual(result33, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result33}`);
    console.log('✅ Payment test passed! Discover 102 test passed - transaction correctly failed as expected');
    console.log('discover 102 test passed');

});

When('the user enters valid credentials with 193 as the amount with discover card', async function () {
    const result34 = await transactionFailed('193', 'Ashok Balla', '6560054567891235', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result34);
    assert.strictEqual(result34, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result34}`);
    console.log('✅ Payment test passed! Discover 193 test passed - transaction correctly failed as expected');
    console.log('discover 193 test passed');

});

When('the user enters valid credentials with 194 as the amount with discover card', async function () {
    const result35 = await transactionFailed('194', 'Ashok Balla', '6560054567891235', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result35);
    assert.strictEqual(result35, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result35}`);
    console.log('✅ Payment test passed! Discover 194 test passed - transaction correctly failed as expected');
    console.log('discover 194 test passed');
});

When('the user enters valid credentials with 889986 as the amount with discover card', async function () {
    const result36 = await transactionFailed('889986', 'Ashok Balla', '6560054567891235', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result36);
    assert.strictEqual(result36, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result36}`);
    console.log('✅ Payment test passed! Discover 889986 test passed - transaction correctly failed as expected');
    console.log('discover 888886 test passed');

});

When('the user enters valid credentials with 889987 as the amount with discover card', async function () {
    const result37 = await transactionFailed('889987', 'Ashok Balla', '6560054567891235', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result37);
    assert.strictEqual(result37, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result37}`);
    console.log('✅ Payment test passed! Discover 889987 test passed - transaction correctly failed as expected');
    console.log('discover 888887 test passed');

});

When('the user enters valid credentials with 888888 as the amount with discover card', async function () {
    const result38 = await testSuccessMessage('888888', 'Ashok Balla', '6560054567891235', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result38);
    assert.strictEqual(result38, 'success', `Payment test failed! Expected success but got: ${result38}`);
    console.log('✅ Payment test passed! Discover 888888 test passed - transaction correctly failed as expected');
    console.log('discover 888888  test passed');
});


// Simple test for invalid API key
When('the user validate invalid apikey', async function () {
    console.log('Testing invalid API key validation');
    const result39 = await testApikeyValidation('invalid-test-key');
    console.log('Test result:', result39);
    assert.strictEqual(result39, 'invalid_api_key_error_caught', `Payment test failed! Expected invalid API key error but got: ${result39}`);
    console.log('✅ Payment test passed! Invalid API key test passed - transaction correctly failed as expected');
});


// Simple test for missing API key
When('the user validate missing apikey', async function () {
    console.log('Testing missing API key validation');
    const result40 = await missingApikeyValidation('');
    console.log('Test result:', result40);
    assert.strictEqual(result40, 'invalid_api_key_error_caught', `Payment test failed! Expected invalid API key error but got: ${result40}`);
    console.log('✅ Payment test passed! Invalid API key test passed - transaction correctly failed as expected');
});

// Simple test for non-string API key
When('the user validates non-string API key', async function () {
    console.log('Testing  non-string API key validation');
    const result41 = await nonStringApikeyValidation();
    console.log('Test result:', result41);
    assert.strictEqual(result41, 'invalid_api_key_error_caught', `Payment test failed! Expected invalid API key error but got: ${result41}`);
    console.log('✅ Payment test passed! Invalid API key test passed - transaction correctly failed as expected');
});
// Simple test for country validation
When('the user validate Country', async function () {
    console.log('Testing country validation');
    const result42 = await testSuccessMessage('100', 'Ashok Balla', '4835 0345 9845 7895', '12/30', '100', '12345');
    console.log('Test result:', result42);
    assert.strictEqual(result42, 'success', `Payment test failed! Expected success but got: ${result42}`);
    console.log('✅ Payment test passed! Country test passed - transaction correctly failed as expected');
});
// Simple test for missing CVV validation
When('the user submits payment without CVV', async function () {
    console.log('Testing missing CVV field validation');
    const result43 = await fillAndSubmitPaymentForm('100', 'Ashok Balla', '4835 0345 9845 7895', '12/30', '', '12345', 'USA');
    console.log('Test result:', result43);
    //assert.strictEqual(result43, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result43}`);
    console.log('✅ Payment test passed! Missing CVV test passed - transaction correctly failed as expected');
});
// Simple test for missing expiration validation
When('the user submits payment without expiration date', async function () {
    console.log('Testing missing expiration field validation');
    const result44 = await fillAndSubmitPaymentForm('100', 'Ashok Balla', '4835 0345 9845 7895', '', '100', '12345', 'USA');
    console.log('Test result:', result44);
    //assert.strictEqual(result44, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result44}`);
    console.log('✅ Payment test passed! Missing expiration test passed - transaction correctly failed as expected');
});
// Simple test for combined credit card with separate CVV
When('the user submits payment with combined credit card and separate CVV', async function () {
    console.log('Testing combined credit card with separate CVV validation');
    const result45 = await fillAndSubmitPaymentForm('100', 'Ashok Balla', '4835 0345 9845 7895 144', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result45);
    //assert.strictEqual(result45, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result45}`);
    console.log('✅ Payment test passed! Combined card CVV test passed - transaction correctly failed as expected');
});
// Simple test for combined credit card with separate expiration
When('the user submits payment with combined credit card and separate expiration', async function () {

    console.log('Testing combined credit card with separate expiration validation');
    const result46 = await fillAndSubmitPaymentForm('100', 'Ashok Balla', '4835 0345 9845 7895 123', '12/30', '100', '12345', 'USA');
    console.log('Test result:', result46);
    //assert.strictEqual(result46, 'transaction_failed_error_caught', `Payment test failed! Expected transaction failure but got: ${result46}`);
    console.log('✅ Payment test passed! Combined card expiration test passed - transaction correctly failed as expected');

});



