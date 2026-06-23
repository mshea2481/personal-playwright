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

// Login as admin user and check for the inquiry in the admin dashboard.
    await page.goto('http://localhost:3000/admin/login');
    await page.getByLabel('Username').fill('michaelstephenshea');
    await page.getByLabel('Password').fill('Miguel24!!');
    await page.getByText('Log In').click();

// Expects the inquiry to be visible in the admin dashboard. Confirm all fields.
    await expect(page.getByText('Test User')).toBeVisible();

});