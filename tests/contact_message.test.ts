// @ts-check

import { test, expect } from '@playwright/test';

test('contact form data saves to db and displays correctly in admin', async ({ page }) => {
  const testContactMessage = {
    name: `Test User${Date.now()}`,
    email: `testuser${Date.now()}@example.com`,
    phone: '123-456-9999',
    message: `This is a test contact message. ${Date.now()}`,
  };

  await page.goto('http://localhost:3000/');

    // Navigate to the contact form via the CONTACT link.
  await page.getByRole('link', { name: 'CONTACT' }).click();

   // Fill out and submit the form.
  await page.getByLabel('Name').fill(testContactMessage.name);
  await page.getByLabel('Email').fill(testContactMessage.email);
  await page.getByLabel('Message').fill(testContactMessage.message);
  await page.getByRole('button', { name: 'Send Message' }).click();

    // Log in as admin. Credentials come from env vars, not hardcoded.
  await page.goto('http://localhost:3000/admin/login');
  await page.getByLabel('Username').fill(process.env.ADMIN_TEST_USERNAME ?? '');
  await page.getByLabel('Password').fill(process.env.ADMIN_TEST_PASSWORD ?? '');
  await page.getByRole('button', { name: 'Log In' }).click();

    // Scope to the specific table row containing this inquiry's name,
  // then assert every field is present in that same row.
  const row = page.locator('tr', { hasText: testContactMessage.name });

  await page.getByRole('link', { name: 'Contact Messages' }).click();
  await expect(row).toBeVisible();
  await expect(row.getByText(testContactMessage.name, { exact: true })).toBeVisible();
  await expect(row.getByText(testContactMessage.email, { exact: true })).toBeVisible();
  await expect(row.getByText(testContactMessage.message, { exact: true })).toBeVisible();
});