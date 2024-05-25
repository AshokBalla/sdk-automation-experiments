import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://example.com
  await page.locator('iframe[name="cash-name-iframe"]').contentFrame().getByRole('textbox', { name: 'Cash Full Name' }).click();
  await page.locator('iframe[name="cash-name-iframe"]').contentFrame().getByRole('textbox', { name: 'Cash Full Name' }).fill('Ashok Balla');
  await page.locator('iframe[name="cash-contact-iframe"]').contentFrame().getByRole('textbox', { name: 'Cash contact info' }).click();
  await page.locator('iframe[name="cash-contact-iframe"]').contentFrame().getByRole('textbox', { name: 'Cash contact info' }).fill('ashok@SecurePay.com');
  await page.getByRole('button', { name: 'Submit' }).click();
});