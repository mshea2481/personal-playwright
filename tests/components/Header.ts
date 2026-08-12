import { Page, BrowserContext, Locator } from '@playwright/test';

export class Header {
  private readonly page: Page;
  private readonly context: BrowserContext;
  private readonly homeButton: Locator;
  private readonly aboutMeMenuItem: Locator;
  private readonly aboutMeSubmenuItem: Locator;
  private readonly resumeSubmenuItem: Locator;
  private readonly portfolioSubmenuItem: Locator;
  private readonly inquiriesSubmenuItem: Locator;
  private readonly contactMenuItem: Locator;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    this.homeButton = page.getByRole('button', { name: 'HOME' });
    this.aboutMeMenuItem = page.getByRole('button', { name: 'ABOUT ME' });
    this.aboutMeSubmenuItem = page.getByRole('menuitem', { name: 'ABOUT ME' });
    this.resumeSubmenuItem = page.getByRole('menuitem', { name: 'RESUME' });
    this.portfolioSubmenuItem = page.getByRole('menuitem', { name: 'PORTFOLIO' });
    this.inquiriesSubmenuItem = page.getByRole('menuitem', { name: 'INQUIRIES' });
    this.contactMenuItem = page.getByRole('button', { name: 'CONTACT' });
  }

  async clickHome() {
    await this.homeButton.click();
  }

  async clickAboutMe() {
    await this.aboutMeMenuItem.click();
  }

  async clickAboutMeSubmenu() {
    await this.aboutMeMenuItem.click();
    await this.aboutMeSubmenuItem.click();
  }

  async clickResumeSubmenu() {
    await this.aboutMeMenuItem.click();
    await this.resumeSubmenuItem.click();
  }

  async clickPortfolioSubmenu() {
    await this.aboutMeMenuItem.click();
    await this.portfolioSubmenuItem.click();
  }

    async clickInquiries() {
    await this.aboutMeMenuItem.click();
    await this.inquiriesSubmenuItem.click();
  }

  async clickContact() {
    await this.contactMenuItem.click();
  } 
}