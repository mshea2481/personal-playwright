import test from '@lib/BaseTest';
import { expect } from '@playwright/test';

test(`Verify an Inquiry is created and displays correctly in the Admin Dashboard`, { tag: '@Smoke'}, async ({ adminLoginPage, adminDashboardPage, inquiryFormPage }) => {
    const testInquiry = {
        name: `Test User${Date.now()}`,
        email: `testuser${Date.now()}@example.com`,
        phone: '123-456-9999',
        message: `This is a test inquiry. ${Date.now()}`,
    };

    let inquiryRowCountBefore: number;

    await test.step('Navigate to Admin login page', async () => {
        await adminLoginPage.navigateToURL();
    });

    await test.step(`Log in to Admin Dashboard`, async () => {
        await adminLoginPage.loginToAdmin();
    });

    await test.step('Capture Inquiry count before creating new inquiry', async () => {
        inquiryRowCountBefore = await adminDashboardPage.INQUIRIES_TABLE_ROWS.count();
    });

    await test.step('Log out from Admin Dashboard', async () => {
        await adminDashboardPage.logoutFromAdmin();
    });

    await test.step('Navigate to Inquiry Form page', async () => {
        await inquiryFormPage.navigateToURL();
    });

    await test.step(`Fill in Inquiry Form and Click on Send Inquiry button`, async () => {
        await inquiryFormPage.addName(testInquiry.name);
        await inquiryFormPage.addEmail(testInquiry.email);
        await inquiryFormPage.addPhone(testInquiry.phone);
        await inquiryFormPage.addMessage(testInquiry.message);
        await inquiryFormPage.clickSendInquiry();
    });

    await test.step('Navigate to Admin login page', async () => {
        await adminLoginPage.navigateToURL();
    });

    await test.step(`Log in to Admin Dashboard`, async () => {
        await adminLoginPage.loginToAdmin();
    });

    await test.step(`Verify created Inquiry is displayed in Admin Dashboard`, async () => {
        const row = await adminDashboardPage.getInquiryRowByText(testInquiry.name);
        await expect(row).toBeVisible();
        await expect(row.getByText(testInquiry.name, { exact: true })).toBeVisible();
        await expect(row.getByText(testInquiry.email, { exact: true })).toBeVisible();
        await expect(row.getByText(testInquiry.phone, { exact: true })).toBeVisible();
        await expect(row.getByText(testInquiry.message, { exact: true })).toBeVisible();
    });

    await test.step(`Verify Inquiry row counts increase by 1 after creating new inquiry`, async () => {
        const inquiryRowCountAfter = await adminDashboardPage.INQUIRIES_TABLE_ROWS.count();
        expect(inquiryRowCountAfter).toBe(inquiryRowCountBefore + 1);
    });

    await test.step(`Verify the Inquiry count badge is equal to the number of inquiries displayed in Admin Dashboard`, async () => {
        const inquiryCountBadge = await adminDashboardPage.INQUIRIES_COUNT_BADGE.textContent();
        const inquiryCount = await adminDashboardPage.INQUIRIES_TABLE_ROWS.count();
        expect(inquiryCountBadge).toContain(inquiryCount.toString());
    });
});