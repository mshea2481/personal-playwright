import { TestInfo, test as baseTest } from '@playwright/test';
import { InquiryFormPage } from '@pages/InquiryFormPage';
import { AdminLoginPage } from '@pages/AdminLoginPage';
import { AdminDashboardPage } from '@pages/AdminDashboardPage';

export const test = baseTest.extend<{
  inquiryFormPage: InquiryFormPage;
  adminLoginPage: AdminLoginPage;
  adminDashboardPage: AdminDashboardPage;
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
  }
})

export default test;
