import { test, expect } from '@playwright/test';
import { createTestInquiry } from '@lib/TestData';

test('inquiry form success behavior (homepage start path)', async ({ page }) => {
  const testInquiry = createTestInquiry();    

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


