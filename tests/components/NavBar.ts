import { Page, BrowserContext, Locator } from '@playwright/test';

export class NavBar {
  private readonly page: Page;
  private readonly context: BrowserContext;
  private readonly homeButton: Locator;
  private readonly aboutMeButton: Locator;
  private readonly inquiriesMenuItem: Locator;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    this.homeButton = page.getByRole('button', { name: 'HOME' });
    this.aboutMeButton = page.getByRole('button', { name: 'ABOUT ME' });
    this.inquiriesMenuItem = page.getByRole('menuitem', { name: 'INQUIRIES' });
  }

  async clickHome() {
    await this.homeButton.click();
  }

  async clickAboutMe() {
    await this.aboutMeButton.click();
  }

  async clickInquiries() {
    await this.inquiriesMenuItem.click();
  }
}