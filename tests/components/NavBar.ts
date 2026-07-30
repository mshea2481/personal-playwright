import { Page, BrowserContext, Locator } from '@playwright/test';

export class NavBar {
  private readonly page: Page;
  private readonly aboutMeButton: Locator;
  private readonly inquiriesMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.aboutMeButton = page.getByRole('button', { name: 'ABOUT ME' });
    this.inquiriesMenuItem = page.getByRole('menuitem', { name: 'INQUIRIES' });
  }

  async clickAboutMe() {
    await this.aboutMeButton.click();
  }

  async clickInquiries() {
    await this.inquiriesMenuItem.click();
  }
}