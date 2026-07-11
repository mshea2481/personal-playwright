import test from '@lib/BaseTest';
import { expect } from '@playwright/test';

test(`Verify Admin Login`, { tag: '@Smoke'}, async ({ adminLoginPage }) => {
    await test.step(`Navigate to Admin Login Page`, async () => {
        await adminLoginPage.navigateToURL();
    });
    await test.step(`Fill in Username & Password and Click on Login button`, async () => {
        await adminLoginPage.loginToAdmin();
    });
    await test.step(`Verify User is logged in and navigated to Admin Dashboard`, async () => {
        await expect(adminLoginPage.page).toHaveURL('/admin/inquiries');
        await expect(adminLoginPage.page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
    });
}); 