// @ts-check

import { test, expect } from '@playwright/test';

test('inquiry form data saves and displays correctly in admin', async ({ page }) => {
  const testInquiry = {
    name: `Test User${Date.now()}`,
    email: `testuser${Date.now()}@example.com`,
    phone: '123-456-9999',
    message: `This is a test inquiry. PRAISE THE LORD JESUS CHRIST! AMEN! ${Date.now()}`,
  };

  await page.goto('http://localhost:3000/');

  // Navigate to the inquiry form via the ABOUT ME dropdown -> INQUIRIES link.
  await page.getByRole('button', { name: 'ABOUT ME' }).click();
  await page.getByRole('link', { name: 'INQUIRIES' }).click();

  // Fill out and submit the form.
  await page.getByLabel('Name').fill(testInquiry.name);
  await page.getByLabel('Email').fill(testInquiry.email);
  await page.getByLabel('Phone').fill(testInquiry.phone);
  await page.getByLabel('Message').fill(testInquiry.message);
  await page.getByRole('button', { name: 'Send Inquiry' }).click();

  // Log in as admin. Credentials come from env vars, not hardcoded.
  await page.goto('http://localhost:3000/admin/login');
  await page.getByLabel('Username').fill(process.env.ADMIN_TEST_USERNAME ?? '');
  await page.getByLabel('Password').fill(process.env.ADMIN_TEST_PASSWORD ?? '');
  await page.getByRole('button', { name: 'Log In' }).click();

  // Scope to the specific table row containing this inquiry's name,
  // then assert every field is present in that same row.
  const row = page.locator('tr', { hasText: testInquiry.name });

  await expect(row).toBeVisible();
  await expect(row.getByText(testInquiry.name, { exact: true })).toBeVisible();
  await expect(row.getByText(testInquiry.email, { exact: true })).toBeVisible();
  await expect(row.getByText(testInquiry.phone, { exact: true })).toBeVisible();
  await expect(row.getByText(testInquiry.message, { exact: true })).toBeVisible();
});
