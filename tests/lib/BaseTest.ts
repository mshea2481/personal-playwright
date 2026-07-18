import { TestInfo, test as baseTest } from '@playwright/test';
import { InquiryFormPage } from '@pages/InquiryFormPage';
import { AdminLoginPage } from '@pages/AdminLoginPage';
import { AdminDashboardPage } from '@pages/AdminDashboardPage';
import { ContactPage } from '@pages/ContactPage';

export const test = baseTest.extend<{
  inquiryFormPage: InquiryFormPage;
  adminLoginPage: AdminLoginPage;
  adminDashboardPage: AdminDashboardPage;
  contactPage: ContactPage;
  testInfo: TestInfo;
}>({
  inquiryFormPage: async ({ page, context }, use) => { 
    await use(new InquiryFormPage(page, context));
  },
  adminLoginPage: async ({ page, context }, use) => { 
    await use(new AdminLoginPage(page, context));
  },
  adminDashboardPage: async ({ page, context }, use) => {
    await use(new AdminDashboardPage(page, context));
  },
  contactPage: async ({ page, context }, use) => {
    await use(new ContactPage(page, context));
  },
  testInfo: async ({}, use, testInfo) => {
    await use(testInfo);
  }
})

export default test;
