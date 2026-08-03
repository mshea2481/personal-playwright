// @ts-check

import { test, expect } from '@playwright/test';

test('confirm submenu item link works', async ({ page }) => {
  await page.goto('/');

// Click the get ABOUT ME menu item and INQUIRIES submenu item.
  await page.getByRole('button', { name: 'ABOUT ME' }).click();
  await page.getByRole('link', { name: 'INQUIRIES' }).click();

// Expects page to have a heading with the name of Inquiry Form to be visible.
  await expect(page.getByRole('heading', { name: 'Inquiry Form' })).toBeVisible();
});