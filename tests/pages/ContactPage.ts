import { Page, BrowserContext, Locator } from '@playwright/test';

export class ContactPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly NAME_EDITBOX: Locator;
    readonly EMAIL_EDITBOX: Locator;
    readonly MESSAGE_EDITBOX: Locator;
    readonly SEND_MESSAGE_BUTTON: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.NAME_EDITBOX = page.getByLabel('Name');
        this.EMAIL_EDITBOX = page.getByLabel('Email');
        this.MESSAGE_EDITBOX = page.getByLabel('Message');
        this.SEND_MESSAGE_BUTTON = page.getByRole('button', { name: 'Send Message' }); 
    }

    async navigateToURL(): Promise<void> {
        await this.page.goto('/contact');
    }    
    async addName(text: string): Promise<void> {
        await this.NAME_EDITBOX.fill(text);
    }
    async addEmail(text: string): Promise<void> {
        await this.EMAIL_EDITBOX.fill(text);
    }
    async addMessage(text: string): Promise<void> {
        await this.MESSAGE_EDITBOX.fill(text);
    }
    async clickSendMessage(): Promise<void> {
        await this.SEND_MESSAGE_BUTTON.click();
    }
}
