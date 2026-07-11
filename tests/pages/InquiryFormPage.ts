// @ts-check

import type { Page, BrowserContext, Locator } from '@playwright/test';

export class InquiryFormPage { 
    private readonly nameInput: Locator;
    private readonly emailInput: Locator;
    private readonly phoneInput: Locator;
    private readonly messageInput: Locator;
    private readonly sendInquiryButton: Locator;

    constructor(public readonly page: Page, context: BrowserContext) {
        this.nameInput = page.getByLabel('Name');
        this.emailInput = page.getByLabel('Email');
        this.phoneInput = page.getByLabel('Phone');
        this.messageInput = page.getByLabel('Message');
        this.sendInquiryButton = page.getByRole('button', { name: 'Send Inquiry' });
    }

    async goto() {
        await this.page.goto('http://localhost:3000/inquiries/new');
    }
    
    async addName(text: string) {
        await this.nameInput.fill(text);
    }

    async addEmail(text: string) {
        await this.emailInput.fill(text);
    }

    async addPhone(text: string) {
        await this.phoneInput.fill(text);
    }

    async addMessage(text: string) {
        await this.messageInput.fill(text);
    }

    async clickSendInquiry() {
        await this.sendInquiryButton.click();
    }
}