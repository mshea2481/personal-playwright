// @ts-check

import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

// Click the get started link.
  await page.getByRole('link', { name: 'LinkedIn' }).click();

// Expects page to have the title of my LinkedIn.
  await expect(page).toHaveTitle(/Michael Shea | LinkedIn/);
});

