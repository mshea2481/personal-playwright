// @ts-check

import { test, expect } from '@playwright/test';

test('inquiry form', async ({ page }) => {
  await page.goto('http://localhost:3000/');

// Click the get ABOUT ME menu item and INQUIRIES submenu item. Fill out form field and submit.
  await page.getByRole('button', { name: 'ABOUT ME' }).click();
  await page.getByRole('link', { name: 'INQUIRIES' }).click();
  await page.getByLabel('Name').fill('Test User');
  await page.getByLabel('Email').fill('testuser@example.com');
  await page.getByLabel('Phone').fill('123-456-7890');
  await page.getByLabel('Message').fill('This is a test inquiry.');
  await page.getByText('Send Inquiry').click();


// Expects a success alert to be visible and URL to contain homepage.
  await expect(page.getByText('Inquiry submitted successfully. Thank you for reaching out!')).toBeVisible();
  await expect(page.url()).toContain('/');
});


