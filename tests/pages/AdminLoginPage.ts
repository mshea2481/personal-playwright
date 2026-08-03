import { Page, BrowserContext, Locator } from '@playwright/test';
import { testConfig } from '../../testConfig';

export class AdminLoginPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly USERNAME_EDITBOX: Locator;
    readonly PASSWORD_EDITBOX: Locator;
    readonly LOGIN_BUTTON: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context; 
        this.USERNAME_EDITBOX = page.getByLabel('Username');
        this.PASSWORD_EDITBOX = page.getByLabel('Password');
        this.LOGIN_BUTTON = page.getByRole('button', { name: 'Log In' });
    }

    async navigateToURL(): Promise<void> { 
        await this.page.goto('/admin/login');
    }

    async loginToAdmin(): Promise<void> {
        await this.USERNAME_EDITBOX.fill(testConfig.adminUsername);
        await this.PASSWORD_EDITBOX.fill(testConfig.adminPassword);
        await this.LOGIN_BUTTON.click();
    }
}
