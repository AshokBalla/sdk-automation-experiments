import puppeteer from "puppeteer";
import dotenv from "dotenv";
// Removed unused import to avoid conflicts
dotenv.config();


class RegionAcard {
    constructor() {
        this.page = null;
        this.browser = null;
        this.timeout = 90000;
    }

    async init() {
        this.browser = await puppeteer.launch({
            headless: true,
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // Add your Chrome path here
            args: ['--start-maximized'],
            defaultViewport: null
        });
        this.page = await this.browser.newPage();
        this.page.setDefaultTimeout(this.timeout);
        await this.page.setViewport({
            //width: 885,
            width: 1200,
            height: 900
            //height: 779
        });
    }

    async typeHostedField(field, toType) {
        const iframeSelector = `iframe[name="${field}-iframe"]`;
        const iframeElementHandle = await this.page.$(iframeSelector);
        const iframe = await iframeElementHandle.contentFrame();

        await iframe.type(`#${field}-hosted-field`, toType, { delay: 100 });
    }

    async fillPaymentDetails(amount, cardName, cardNumber, cardExp, cardCvv, billingZip) {

        // Wait for the amount input to be available and then clear its value
        await this.page.waitForSelector('input[id="amount-in"]');
        await this.page.$eval('input[id="amount-in"]', input => input.value = '');

        // fill amount  

        await this.page.focus('#amount-in');
        await this.page.keyboard.down('Control');
        await this.page.keyboard.press('A');
        await this.page.keyboard.up('Control');
        await this.page.keyboard.press('Backspace');
        await this.page.keyboard.type(amount);

        // fill last name   
        await this.page.focus('#userInfo-last_name-in');
        await this.page.keyboard.down('Control');
        await this.page.keyboard.press('A');
        await this.page.keyboard.up('Control');
        // await this.page.keyboard.press('Backspace');
        await this.page.keyboard.type('Ashok');


        // fill email
        await this.page.focus('#userInfo-email-in');
        await this.page.keyboard.down('Control');
        await this.page.keyboard.press('A');
        await this.page.keyboard.up('Control');

        // Fully clear the email field by pressing 'Backspace' 23 times
        for (let i = 0; i < 23; i++) {
            await this.page.keyboard.press('Backspace');
        }

        await this.page.keyboard.type('ashok@SecurePay.com');

        // fill city
        await this.page.focus('#userInfo-personal_address-city-in');
        await this.page.keyboard.down('Control');
        await this.page.keyboard.press('A');
        await this.page.keyboard.up('Control');

        for (let i = 0; i < 13; i++) {
            await this.page.keyboard.press('Backspace');
        }
        await this.page.keyboard.type('Toronto');

        //<input id="userInfo-personal_address-country-in" type="text">
        await this.page.focus('#userInfo-personal_address-country-in');
        await this.page.keyboard.down('Control');
        await this.page.keyboard.press('A');
        await this.page.keyboard.up('Control');

        for (let i = 0; i < 6; i++) {
            await this.page.keyboard.press('Backspace');
        }
        await this.page.keyboard.type('RegionA');

        //<input id="userInfo-personal_address-region-in" type="text">
        await this.page.focus('#userInfo-personal_address-region-in');
        await this.page.keyboard.down('Control');
        await this.page.keyboard.press('A');
        await this.page.keyboard.up('Control');

        for (let i = 0; i < 9; i++) {
            await this.page.keyboard.press('Backspace');
        }
        await this.page.keyboard.type('Ontario');


        //<input id="userInfo-personal_address-postal_code-in" type="text">
        await this.page.focus('#userInfo-personal_address-postal_code-in');
        await this.page.keyboard.down('Control');
        await this.page.keyboard.press('A');
        await this.page.keyboard.up('Control');

        for (let i = 0; i < 8; i++) {
            await this.page.keyboard.press('Backspace');
        }
        await this.page.keyboard.type('G2E2H1');


        //<input id="billingInfo-address-city-in" type="text">
        await this.page.focus('#billingInfo-address-city-in');
        await this.page.keyboard.down('Control');
        await this.page.keyboard.press('A');
        await this.page.keyboard.up('Control');

        for (let i = 0; i < 13; i++) {
            await this.page.keyboard.press('Backspace');
        }

        await this.page.keyboard.type('Toronto');


        //<input id="billingInfo-address-region-in" type="text">
        await this.page.focus('#billingInfo-address-region-in');
        await this.page.keyboard.down('Control');
        await this.page.keyboard.press('A');
        await this.page.keyboard.up('Control');

        for (let i = 0; i < 9; i++) {
            await this.page.keyboard.press('Backspace');
        }
        await this.page.keyboard.type('Ontario');

        //<input id="billingInfo-address-postal_code-in" type="text">
        await this.page.focus('#billingInfo-address-postal_code-in');
        await this.page.keyboard.down('Control');
        await this.page.keyboard.press('A');
        await this.page.keyboard.up('Control');

        for (let i = 0; i < 8; i++) {
            await this.page.keyboard.press('Backspace');
        }
        await this.page.keyboard.type('G2E2H1');

        await this.typeHostedField('card-name', cardName);
        await this.typeHostedField('card-number', cardNumber);
        await this.typeHostedField('card-exp', cardExp);
        await this.typeHostedField('card-cvv', cardCvv);
        await this.typeHostedField('billing-zip', billingZip);

    }

    async submitPayment() {
        const submit = '#submit-payment';
        await this.page.waitForSelector(submit);
        await this.page.click(submit);
    }

    async delay(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time)
        });
    }
    async closeBrowser() {
        await this.browser.close();
    }

    async validateInvalidApikey() {
        const invalidApikeyurl = process.env.INVALID_API_KEY_URL;
        if (!invalidApikeyurl) {
            throw new Error('INVALID_API_KEY_URL environment variable is not set. Please set it in your environment or update config.js');
        }
        await this.page.goto(invalidApikeyurl);
    }
}

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const regionaCreditCard = async (amount, cardName, cardNumber, cardExp, cardCvv, billingZip) => {
    const creditcardurl = process.env.REGIONA_CREDIT_CARD_URL;
    if (!creditcardurl) {
        throw new Error('CREDIT_CARD_URL environment variable is not set');
    }
    const regionaCard = new RegionAcard();
    try {
        await regionaCard.init();
        await regionaCard.page.goto(creditcardurl);
        await delay(3000);
        await regionaCard.fillPaymentDetails(amount, cardName, cardNumber, cardExp, cardCvv, billingZip);
        await delay(3000);
        await regionaCard.submitPayment();
        await delay(5000);

        // Wait for either success or error result
        const resultSelector = await Promise.race([
            regionaCard.page.waitForSelector('[data-testid="result-line-success"]', { timeout: 30000 }).then(() => 'success'),
            regionaCard.page.waitForSelector('[data-testid="result-line-error"]', { timeout: 30000 }).then(() => 'error'),
            regionaCard.page.waitForSelector('[data-testid="result-line-failure"]', { timeout: 30000 }).then(() => 'failure')
        ]);

        if (resultSelector === 'success') {
            const successMessage = await regionaCard.page.$eval('[data-testid="result-line-success"]', el => el.textContent.trim());
            console.log('✅ Payment successful:', successMessage);
            return 'success';
        } else if (resultSelector === 'error') {
            const errorMessage = await regionaCard.page.$eval('[data-testid="result-line-error"]', el => el.textContent.trim());
            console.log('❌ Payment error:', errorMessage);
            return 'error';
        } else {
            const failureMessage = await regionaCard.page.$eval('[data-testid="result-line-failure"]', el => el.textContent.trim());
            console.log('❌ Payment failed:', failureMessage);
            return 'failure';
        }

    } catch (err) {
        console.error('Error in regionaCreditCard:', err);
        return 'error';
    } finally {
        await regionaCard.closeBrowser();
    }
}

export const validateInvalidAmount = async (amount, cardName, cardNumber, cardExp, cardCvv, billingZip) => {
    const creditcardurl = process.env.REGIONA_CREDIT_CARD_URL;
    if (!creditcardurl) {
        throw new Error('CREDIT_CARD_URL environment variable is not set');
    }
    const regionaCard = new RegionAcard();
    try {
        await regionaCard.init();
        await regionaCard.page.goto(creditcardurl);
        await delay(3000);
        await regionaCard.fillPaymentDetails(amount, cardName, cardNumber, cardExp, cardCvv, billingZip);
        await regionaCard.submitPayment();
        await delay(5000);

        let errorMessage;
        try {
            await regionaCard.page.waitForSelector('[data-testid="result-line-error"]', { timeout: 15000 });
            await delay(1000);

            // Get all error elements and use the last one
            errorMessage = await regionaCard.page.evaluate(() => {
                const errorElements = document.querySelectorAll('[data-testid="result-line-error"]');
                if (errorElements.length > 0) {
                    const lastErrorElement = errorElements[errorElements.length - 1];
                    return lastErrorElement.textContent.trim();
                }
                return '';
            });

            console.log('Invalid amount error message found:', errorMessage);
        } catch (err) {
            console.log('Error getting message:', err);
            return 'no_error_found';
        }

        // Check for various invalid amount error patterns
        const isInvalidAmountError = errorMessage && (
            (errorMessage.includes('INVALID_PARAM') && errorMessage.includes('amount')) ||
            errorMessage.includes('Some required fields are missing or invalid: amount') ||
            errorMessage.toLowerCase().includes('invalid') ||
            errorMessage.toLowerCase().includes('amount') ||
            errorMessage.includes('error')
        );

        if (isInvalidAmountError) {
            console.log('✅ Invalid amount error correctly caught');
            return 'invalid_amount_error_caught';
        } else {
            console.log('❌ Unexpected error:', errorMessage);
            return 'invalid_amount_error_not_caught';
        }
    } catch (err) {
        console.error('Invalid amount test error:', err);
        return 'error';
    } finally {
        await regionaCard.closeBrowser();
    }
}

export const invalidAmountValidation = async (amount, cardName, cardNumber, cardExp, cardCvv, billingZip) => {
    const creditcardurl = process.env.REGIONA_CREDIT_CARD_URL;
    if (!creditcardurl) {
        throw new Error('CREDIT_CARD_URL environment variable is not set');
    }
    const regionaCard = new RegionAcard();
    try {
        await regionaCard.init();
        await regionaCard.page.goto(creditcardurl);
        await delay(3000);
        await regionaCard.fillPaymentDetails(amount, cardName, cardNumber, cardExp, cardCvv, billingZip);
        await regionaCard.submitPayment();
        await delay(5000);

        let errorMessage;
        try {
            errorMessage = await regionaCard.page.evaluate(() => {
                const errorElements = document.querySelectorAll('[data-testid="result-line-error"]');
                if (errorElements.length > 0) {
                    const lastErrorElement = errorElements[errorElements.length - 1];
                    return lastErrorElement.textContent.trim();
                }
                return '';
            });

            console.log('Invalid amount error message found:', errorMessage);
        } catch (err) {
            console.log('Error getting message:', err);
            return 'no_error_found';
        }

        // Check for invalid amount validation error
        if (errorMessage && errorMessage.includes('SOCKET_ERROR') && errorMessage.includes('VALIDATION_ERROR') && errorMessage.includes('Amount') && errorMessage.includes('is not within the min') && errorMessage.includes('and max')) {
            console.log('✅ Invalid amount validation error correctly caught');
            return 'invalid_amount_error_caught';
        } else {
            console.log('❌ Unexpected error:', errorMessage);
            return 'unexpected_error';
        }

    } catch (err) {
        console.error('Error in testInvalidAmountValidation:', err);
        return 'error';
    } finally {
        await regionaCard.closeBrowser();
    }
}


export const missingAmountValidation = async (amount, cardName, cardNumber, cardExp, cardCvv, billingZip) => {
    const creditcardurl = process.env.REGIONA_CREDIT_CARD_URL;
    if (!creditcardurl) {
        throw new Error('CREDIT_CARD_URL environment variable is not set');
    }
    const regionaCard = new RegionAcard();
    try {
        await regionaCard.init();
        await regionaCard.page.goto(creditcardurl);
        await delay(3000);
        await regionaCard.fillPaymentDetails(amount, cardName, cardNumber, cardExp, cardCvv, billingZip);
        await regionaCard.submitPayment();
        await delay(5000);
        await regionaCard.page.waitForSelector('[data-testid="result-line-error"]', { timeout: 15000 });
        await delay(2000);

        // Wait for error and get the last error message
        let errorMessage;
        try {
            await regionaCard.page.waitForSelector('[data-testid="result-line-error"]', { timeout: 20000 });
            await delay(2000);

            // Get all error elements and use the last one
            errorMessage = await regionaCard.page.evaluate(() => {
                const errorElements = document.querySelectorAll('[data-testid="result-line-error"]');
                if (errorElements.length > 0) {
                    const lastErrorElement = errorElements[errorElements.length - 1];
                    return lastErrorElement.textContent.trim();
                }
                return '';
            });

            console.log('Missing amount error message found:', errorMessage);
        } catch (err) {
            console.log('Error getting message:', err);
            return 'no_error_found';
        }

        // Check for missing amount validation error
        if (errorMessage && errorMessage.includes('INVALID_PARAM') && errorMessage.includes('Some required fields are missing or invalid: amount')) {
            console.log('✅ Missing amount validation error correctly caught');
            return 'missing_amount_error_caught';
        } else {
            console.log('❌ Unexpected error:', errorMessage);
            return 'unexpected_error';
        }

    } catch (err) {
        console.error('Error in testMissingAmountValidation:', err);
        return 'error';
    } finally {
        await regionaCard.closeBrowser();
    }
}



export const validateNegativeAmount = async (amount, cardName, cardNumber, cardExp, cardCvv, billingZip) => {
    const creditcardurl = process.env.REGIONA_CREDIT_CARD_URL;
    if (!creditcardurl) {
        throw new Error('CREDIT_CARD_URL environment variable is not set');
    }
    const regionaCard = new RegionAcard();
    try {
        await regionaCard.init();
        await regionaCard.page.goto(creditcardurl);
        await delay(3000);
        await regionaCard.fillPaymentDetails(amount, cardName, cardNumber, cardExp, cardCvv, billingZip);
        await regionaCard.submitPayment();
        await delay(5000);
        await regionaCard.page.waitForSelector('[data-testid="result-line-error"]', { timeout: 15000 });
        await delay(2000);

        let errorMessage;
        try {
            errorMessage = await regionaCard.page.evaluate(() => {
                const errorElements = document.querySelectorAll('[data-testid="result-line-error"]');
                if (errorElements.length > 0) {
                    const lastErrorElement = errorElements[errorElements.length - 1];
                    return lastErrorElement.textContent.trim();
                }
                return '';
            });
            console.log('Full error message found:', errorMessage);
        } catch (err) {
            console.log('Error getting message:', err);
            return 'no_error_found';
        }

        // Simple validation - check for the specific error
        if (errorMessage && errorMessage.includes('INVALID_PARAM') && errorMessage.includes('positive integer')) {
            console.log('✅ Negative amount error correctly caught');
            return 'negative_amount_error_caught';
        } else {
            console.log('❌ Unexpected error:', errorMessage);
            return 'unexpected_error';
        }

    } catch (err) {
        console.error('Error in validateNegativeAmount:', err);
        return 'error';
    } finally {
        await regionaCard.closeBrowser();
    }
}


export const validateLargeAmount = async (amount, cardName, cardNumber, cardExp, cardCvv, billingZip) => {
    const creditcardurl = process.env.REGIONA_CREDIT_CARD_URL;
    if (!creditcardurl) {
        throw new Error('CREDIT_CARD_URL environment variable is not set');
    }
    const regionaCard = new RegionAcard();
    try {
        await regionaCard.init();
        await regionaCard.page.goto(creditcardurl);
        await delay(3000);
        await regionaCard.fillPaymentDetails(amount, cardName, cardNumber, cardExp, cardCvv, billingZip);
        await regionaCard.submitPayment();
        await delay(5000);
        await regionaCard.page.waitForSelector('[data-testid="result-line-error"]', { timeout: 15000 });
        await delay(2000);
        let errorMessage;
        try {
            errorMessage = await regionaCard.page.evaluate(() => {
                const errorElements = document.querySelectorAll('[data-testid="result-line-error"]');
                if (errorElements.length > 0) {
                    const lastErrorElement = errorElements[errorElements.length - 1];
                    return lastErrorElement.textContent.trim();
                }
                return '';
            });
            console.log('Full error message found:', errorMessage);
        } catch (err) {
            console.log('Error getting message:', err);
            return 'no_error_found';
        }
        // Check for amount range validation error
        if (errorMessage && errorMessage.includes('VALIDATION_ERROR') && errorMessage.includes('Amount') && errorMessage.includes('is not within the min')) {
            console.log('✅ Amount range validation error correctly caught');
            return 'amount_range_error_caught';
        } else {
            console.log('❌ Unexpected error:', errorMessage);
            return 'unexpected_error';
        }

    } catch (err) {
        console.error('Error in testAmountRangeValidation:', err);
        return 'error';
    } finally {
        await regionaCard.closeBrowser();
    }
}

export const validateInvalidApiKey = async () => {
    const url = `https://example.com
    const regionaCard = new RegionAcard();
    try {
        await regionaCard.init();
        await regionaCard.page.goto(url);
        await delay(5000);
        await regionaCard.page.waitForSelector('[data-testid="result-line-error"]', { timeout: 15000 });
        await delay(2000);
        let invalidApikey;  // Initialize invalidApikey to store the error message  
        try {
            invalidApikey = await regionaCard.page.evaluate(() => {
                const errorElements = document.querySelectorAll('[data-testid="result-line-error"]');
                if (errorElements.length > 0) {
                    const lastErrorElement = errorElements[errorElements.length - 1];
                    return lastErrorElement.textContent.trim();
                }
            });
            console.log('Invalid API key error message found:', invalidApikey);
        } catch (err) {
            console.log('Error getting message:', err);
            return 'no_error_found';
        }

        if (invalidApikey && invalidApikey.includes('INVALID_PARAM') && invalidApikey.includes('Valid API Key not found') && invalidApikey.includes('Please provide a valid API Key')) {
            console.log('✅ Invalid API key error correctly caught');
            return 'invalid_api_key_error_caught';
        } else {
            console.log('❌ Unexpected error:', invalidApikey);
            return 'invalid_api_key_error_not_caught';
        }
    } catch (err) {
        console.error('Invalid API key test error:', err);
        return 'error';
    } finally {
        if (regionaCard) {
            await regionaCard.closeBrowser();
        }
    }
}

export const countryValidation = async (amount, cardName, cardNumber, cardExp, cardCvv, billingZip) => {
    const creditcardurl = process.env.REGIONA_CREDIT_CARD_URL;
    if (!creditcardurl) {
        throw new Error('CREDIT_CARD_URL environment variable is not set');
    }
    const regionaCard = new RegionAcard();
    try {
        await regionaCard.init();
        await regionaCard.page.goto(creditcardurl);
        await delay(3000);
        await regionaCard.fillPaymentDetails(amount, cardName, cardNumber, cardExp, cardCvv, billingZip);
        await regionaCard.submitPayment();
        await delay(5000);
        await regionaCard.page.waitForSelector('[data-testid="result-line-error"]', { timeout: 15000 });
        await delay(2000);
        let errorMessage;
        try {
            errorMessage = await regionaCard.page.evaluate(() => {
                const errorElements = document.querySelectorAll('[data-testid="result-line-error"]');
                if (errorElements.length > 0) {
                    const lastErrorElement = errorElements[errorElements.length - 1];
                    return lastErrorElement.textContent.trim();
                }
                return '';
            });
            console.log('Country error message found:', errorMessage);
        } catch (err) {
            console.log('Error getting message:', err);
            return 'no_error_found';
        }

        if (errorMessage && errorMessage.includes('INVALID_PARAM') && errorMessage.includes('Some required fields are missing or invalid: country')) {
            console.log('✅ Country validation error correctly caught');
            return 'country_validation_error_caught';
        } else {
            console.log('❌ Unexpected error:', errorMessage);
            return 'unexpected_error';
        }

    } catch (err) {
        console.error('Country validation test error:', err);
        return 'error';
    } finally {
        await regionaCard.closeBrowser();
    }
}

export const failureMessage = async (amount, cardName, cardNumber, cardExp, cardCvv, billingZip) => {
    const creditcardurl = process.env.REGIONA_CREDIT_CARD_URL;
    if (!creditcardurl) {
        throw new Error('CREDIT_CARD_URL environment variable is not set');
    }
    const regionaCard = new RegionAcard();
    try {
        await regionaCard.init();
        await regionaCard.page.goto(creditcardurl);
        await delay(3000);
        await regionaCard.fillPaymentDetails(amount, cardName, cardNumber, cardExp, cardCvv, billingZip);
        await regionaCard.submitPayment();
        await delay(5000);

        let failureMessage;
        try {
            await regionaCard.page.waitForSelector('[data-testid="result-line-failure"]', { timeout: 20000 });
            await delay(2000);

            failureMessage = await regionaCard.page.$eval('[data-testid="result-line-failure"]', el => el.textContent.trim());
            console.log('Transaction failed error message found:', failureMessage);
        } catch (err) {
            console.log('Error getting message:', err);
            return 'no_error_found';
        }

        if (failureMessage && failureMessage.includes('failure')) {
            console.log('✅ Transaction failed error correctly caught');
            return 'transaction_failed_error_caught';
        } else {
            console.log('❌ Unexpected error:', failureMessage);
            return 'unexpected_error';
        }
    } catch (err) {
        console.error('Error in failureMessage:', err);
        return 'error';
    } finally {
        await regionaCard.closeBrowser();
    }
}

export const validateMissingApiKey = async () => {
    const url = `https://example.com
    const regionaCard = new RegionAcard();

    try {

        await regionaCard.init();
        await regionaCard.page.goto(url);
        await delay(5000);
        await regionaCard.page.waitForSelector('[data-testid="result-line-error"]', { timeout: 15000 });
        await delay(2000);
        let missingApikey;
        try {
            missingApikey = await regionaCard.page.evaluate(() => {
                const errorElements = document.querySelectorAll('[data-testid="result-line-error"]');
                if (errorElements.length > 0) {
                    const lastErrorElement = errorElements[errorElements.length - 1];
                    return lastErrorElement.textContent.trim();
                }
            });
            console.log('Missing API key error message found:', missingApikey);
        } catch (err) {
            console.log('Error getting message:', err);
            return 'no_error_found';
        }

        if (missingApikey && missingApikey.includes('INVALID_PARAM') && missingApikey.includes('Valid API Key not found') && missingApikey.includes('Please provide a valid API Key')) {
            console.log('✅ Invalid API key error correctly caught');
            return 'invalid_api_key_error_caught';
        } else {
            console.log('❌ Unexpected error:', invalidApikey);
            return 'unexpected_error';
        }
    } catch (err) {
        console.error('Missing API key test error:', err);
        return 'error';
    } finally {
        if (regionaCard) {
            await regionaCard.closeBrowser();
        }
    }
}



export const validateNonStringApiKey = async () => {
    const url = `https://example.com
    const regionaCard = new RegionAcard();
    try {
        await regionaCard.init();
        await regionaCard.page.goto(url);
        await delay(5000);
        await regionaCard.page.waitForSelector('[data-testid="result-line-error"]', { timeout: 15000 });
        await delay(2000);
        let nonStringApikey;
        try {
            nonStringApikey = await regionaCard.page.evaluate(() => {
                const errorElements = document.querySelectorAll('[data-testid="result-line-error"]');
                if (errorElements.length > 0) {
                    const lastErrorElement = errorElements[errorElements.length - 1];
                    return lastErrorElement.textContent.trim();
                }
            });
            console.log('Non-string API key error message found:', nonStringApikey);
        } catch (err) {
            console.log('Error getting message:', err);
            return 'no_error_found';
        }

        if (nonStringApikey && nonStringApikey.includes('INVALID_PARAM') && nonStringApikey.includes('Valid API Key not found') && nonStringApikey.includes('Please provide a valid API Key')) {
            console.log('✅ Non-string API key error correctly caught');
            return 'non_string_api_key_error_caught';
        } else {
            console.log('❌ Unexpected error:', nonStringApikey);
            return 'unexpected_error';
        }
    } catch (err) {
        console.error('Non-string API key test error:', err);
        return 'error';
    } finally {

        await regionaCard.closeBrowser();

    }
}

export const validateCountry = async () => {
    let regionaCard = null;
    try {
        regionaCard = new RegionAcard();
        await regionaCard.init();
        // Test country validation
        return 'country_validation_tested';
    } catch (err) {
        console.error('Country validation test error:', err);
        return 'error';
    } finally {
        if (regionaCard) {
            await regionaCard.closeBrowser();
        }
    }
}

export const validateMissingCVV = async () => {
    let regionaCard = null;
    try {
        regionaCard = new RegionAcard();
        await regionaCard.init();
        const url = process.env.REGIONA_CREDIT_CARD_URL || config.REGIONA_CREDIT_CARD_URL;
        await regionaCard.page.goto(url);
        // Fill payment details without CVV
        await regionaCard.fillPaymentDetails('100', 'John Doe', '4111111111111111', '12/25', '', '12345');
        await regionaCard.submitPayment();
        return 'missing_cvv_tested';
    } catch (err) {
        console.error('Missing CVV test error:', err);
        return 'error';
    } finally {
        if (regionaCard) {
            await regionaCard.closeBrowser();
        }
    }
}

export const validateMissingExpiration = async () => {
    let regionaCard = null;
    try {
        regionaCard = new RegionAcard();
        await regionaCard.init();
        const url = process.env.REGIONA_CREDIT_CARD_URL || config.REGIONA_CREDIT_CARD_URL;
        await regionaCard.page.goto(url);
        // Fill payment details without expiration
        await regionaCard.fillPaymentDetails('100', 'John Doe', '4111111111111111', '', '123', '12345');
        await regionaCard.submitPayment();
        return 'missing_expiration_tested';
    } catch (err) {
        console.error('Missing expiration test error:', err);
        return 'error';
    } finally {
        if (regionaCard) {
            await regionaCard.closeBrowser();
        }
    }
}

export const validateCombinedCardWithSeparateCVV = async () => {
    let regionaCard = null;
    try {
        regionaCard = new RegionAcard();
        await regionaCard.init();
        const url = process.env.REGIONA_CREDIT_CARD_URL || config.REGIONA_CREDIT_CARD_URL;
        await regionaCard.page.goto(url);
        // Test combined card with separate CVV
        await regionaCard.fillPaymentDetails('100', 'John Doe', '4111111111111111', '12/25', '123', '12345');
        await regionaCard.submitPayment();
        return 'combined_card_separate_cvv_tested';
    } catch (err) {
        console.error('Combined card with separate CVV test error:', err);
        return 'error';
    } finally {
        if (regionaCard) {
            await regionaCard.closeBrowser();
        }
    }
}

export const validateCombinedCardWithSeparateExpiration = async () => {
    let regionaCard = null;
    try {
        regionaCard = new RegionAcard();
        await regionaCard.init();
        const url = process.env.REGIONA_CREDIT_CARD_URL || config.REGIONA_CREDIT_CARD_URL;
        await regionaCard.page.goto(url);
        // Test combined card with separate expiration
        await regionaCard.fillPaymentDetails('100', 'John Doe', '4111111111111111', '12/25', '123', '12345');
        await regionaCard.submitPayment();
        return 'combined_card_separate_expiration_tested';
    } catch (err) {
        console.error('Combined card with separate expiration test error:', err);
        return 'error';
    } finally {
        if (regionaCard) {
            await regionaCard.closeBrowser();
        }
    }
}


export const fillForm = async (amount, cardName, cardNumber, cardExp, cardCvv, billingZip) => {
    const creditcardurl = process.env.REGIONA_CREDIT_CARD_URL;
    if (!creditcardurl) {
        throw new Error('REGIONA_CREDIT_CARD_URL environment variable is not set');
    }
    const regionaCard = new RegionAcard();
    try {
        await regionaCard.init();
        await regionaCard.page.goto(creditcardurl);
        await delay(3000);
        await regionaCard.fillPaymentDetails(amount, cardName, cardNumber, cardExp, cardCvv, billingZip);
        await delay(3000);
        await regionaCard.submitPayment();
        await delay(3000);
        return 'success';
    } catch (err) {
        console.error(err);
        return 'error';
    } finally {
        await regionaCard.closeBrowser();
    }
}