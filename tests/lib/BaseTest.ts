// @ts-check

import { TestInfo, test as baseTest } from '@playwright/test';
import { InquiryFormPage } from '@pages/InquiryFormPage';
import { AdminLoginPage } from '@pages/AdminLoginPage';

export const test = baseTest.extend<{
  inquiryFormPage: InquiryFormPage;
  adminLoginPage: AdminLoginPage;
  testInfo: TestInfo;
}>({
  inquiryFormPage: async ({ page, context }, use) => { 
    await use(new InquiryFormPage(page, context));
  },
  adminLoginPage: async ({ page, context }, use) => { 
    await use(new AdminLoginPage(page, context));
  }
})

export default test;
