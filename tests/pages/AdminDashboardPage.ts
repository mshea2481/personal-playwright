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
        this.LOGOUT_BUTTON = page.getByRole('button', { name: 'Log Out' });
        this.INQUIRY_TAB = page.getByRole('link', { name: 'Inquiries' });
        this.CONTACT_MESSAGES_TAB = page.getByRole('link', { name: 'Contact Messages' });
        this.INQUIRIES_TABLE = page.getByTestId('inquiries-table');
        this.CONTACT_MESSAGES_TABLE = page.getByTestId('contact-messages-table');
        this.INQUIRIES_TABLE_ROWS = this.INQUIRIES_TABLE.locator('tbody tr'); 
        this.CONTACT_MESSAGES_TABLE_ROWS = this.CONTACT_MESSAGES_TABLE.locator('tbody tr');
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
    async getInquiryRowByText(text: string): Promise<Locator> {
        return this.INQUIRIES_TABLE.locator('tr', { hasText: text });
    }
}