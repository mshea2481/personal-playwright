import test from '@lib/BaseTest';
import { expect } from '@playwright/test';
import { createTestContactMessage } from '@lib/TestData';

test(`Verify a Contact Message is created and displays correctly in the Admin Dashboard`, { tag: '@Smoke' }, async ({ adminLoginPage, adminDashboardPage, contactPage, workerId }) => {
    const testContactMessage = createTestContactMessage(workerId);

    let contactMessageRowCountBefore: number;

    await test.step('Navigate to Admin login page', async () => {
        await adminLoginPage.navigateToURL();
    });

    await test.step('Log in to Admin Dashboard', async () => {
        await adminLoginPage.loginToAdmin();
    });

    await test.step('Navigate to Contact Messages tab', async () => {
        await adminDashboardPage.clickContactMessagesTab();
    });

    await test.step('Capture Contact Message count before creating new message', async () => {
        contactMessageRowCountBefore = await adminDashboardPage.CONTACT_MESSAGES_TABLE_ROWS.count();
    });

    await test.step('Log out from Admin Dashboard', async () => {
        await adminDashboardPage.logoutFromAdmin();
    });

    await test.step('Navigate to Contact page', async () => {
        await contactPage.navigateToURL();
    });

    await test.step('Fill in Contact Form and Click on Send Message button', async () => {
        await contactPage.addName(testContactMessage.name);
        await contactPage.addEmail(testContactMessage.email);
        await contactPage.addMessage(testContactMessage.message);
        await contactPage.clickSendMessage();
    });

    await test.step('Navigate to Admin login page', async () => {
        await adminLoginPage.navigateToURL();
    });

    await test.step('Log in to Admin Dashboard', async () => {
        await adminLoginPage.loginToAdmin();
    });

    await test.step('Navigate to Contact Messages tab', async () => {
        await adminDashboardPage.clickContactMessagesTab();
    });

    await test.step('Verify created Contact Message is displayed in Admin Dashboard', async () => {
        const row = await adminDashboardPage.getContactMessageRowByText(testContactMessage.name);
        await expect(row).toBeVisible();
        await expect(row.getByText(testContactMessage.name, { exact: true })).toBeVisible();
        await expect(row.getByText(testContactMessage.email, { exact: true })).toBeVisible();
        await expect(row.getByText(testContactMessage.message, { exact: true })).toBeVisible();
    });

    await test.step('Verify Contact Message row count increases by 1', async () => {
        await expect(adminDashboardPage.CONTACT_MESSAGES_TABLE_ROWS).toHaveCount(contactMessageRowCountBefore + 1);
    });

    await test.step('Verify the Contact Message count badge matches the number of messages displayed', async () => {
        const badgeText = await adminDashboardPage.CONTACT_MESSAGES_COUNT_BADGE.textContent();
        const rowCount = await adminDashboardPage.CONTACT_MESSAGES_TABLE_ROWS.count();
        expect(badgeText).toContain(rowCount.toString());
    });
});