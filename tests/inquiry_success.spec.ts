// @ts-check

import { test, expect } from '@playwright/test';

test('inquiry form success behavior', async ({ page }) => {
  const testInquiry = {
    name: `Test User${Date.now()}`,
    email: `testuser${Date.now()}@example.com`,
    phone: '123-456-9999',
    message: `This is a test inquiry. ${Date.now()}`,
  };

await page.goto('http://localhost:3000/');

// Click the get ABOUT ME menu item and INQUIRIES submenu item. Fill out form field and submit.
  await page.getByRole('button', { name: 'ABOUT ME' }).click();
  await page.getByRole('link', { name: 'INQUIRIES' }).click();
  await page.getByLabel('Name').fill(testInquiry.name);
  await page.getByLabel('Email').fill(testInquiry.email);
  await page.getByLabel('Phone').fill(testInquiry.phone);
  await page.getByLabel('Message').fill(testInquiry.message);
  await page.getByText('Send Inquiry').click();


// Expects a success alert to be visible and URL to contain homepage.
  await expect(page.getByText('Inquiry submitted successfully. Thank you for reaching out!')).toBeVisible();
  await expect(page.url()).toContain('/');
});


