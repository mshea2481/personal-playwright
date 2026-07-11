// @ts-check

import { Page, BrowserContext, Locator } from '@playwright/test';

export class AdminDashboardPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly LOGOUT_BUTTON: Locator;
    readonly INQUIRY_TAB: Locator;
    readonly CONTACT_MESSAGES_TAB: Locator;
    readonly INQUIRIES_TABLE: Locator;
    readonly CONTACT_MESSAGES_TABLE: Locator;
    readonly INQUIRIES_TABLE_ROWS: Locator;
    readonly INQUIRIES_COUNT_BADGE: Locator; 
    readonly CONTACT_MESSAGES_TABLE_ROWS: Locator;
    readonly CONTACT_MESSAGES_COUNT_BADGE: Locator; 

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context; 
        this.LOGOUT_BUTTON = page.getByRole('link', { name: 'Log Out' });
        this.INQUIRY_TAB = page.getByRole('link', { name: 'Inquiries' });
        this.CONTACT_MESSAGES_TAB = page.getByRole('link', { name: 'Contact Messages' });
        this.INQUIRIES_TABLE = page.locator('table');
        this.CONTACT_MESSAGES_TABLE = page.locator('table');
        this.INQUIRIES_TABLE_ROWS = page.locator('table tr');
        this.CONTACT_MESSAGES_TABLE_ROWS = page.locator('table tr');
        this.INQUIRIES_COUNT_BADGE = page.locator('span', { hasText: 'inquiries' });
        this.CONTACT_MESSAGES_COUNT_BADGE = page.locator('span', { hasText: 'contact messages' });
    }

    async navigateToURL(): Promise<void> { 
        await this.page.goto('/admin/inquiries');
    }
    async clickContactMessagesTab(): Promise<void> {
        await this.CONTACT_MESSAGES_TAB.click();
    }
    async clickInquiriesTab(): Promise<void> {
        await this.INQUIRY_TAB.click();
    }
    async logoutFromAdmin(): Promise<void> {
        await this.LOGOUT_BUTTON.click();
    }
}