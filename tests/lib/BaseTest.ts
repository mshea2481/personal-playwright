import { TestInfo, WorkerInfo, test as baseTest } from '@playwright/test';
import { InquiryFormPage } from '@pages/InquiryFormPage';
import { AdminLoginPage } from '@pages/AdminLoginPage';
import { AdminDashboardPage } from '@pages/AdminDashboardPage';
import { ContactPage } from '@pages/ContactPage';
import { Header } from '@components/Header';

type TestFixtures = {
  inquiryFormPage: InquiryFormPage;
  adminLoginPage: AdminLoginPage;
  adminDashboardPage: AdminDashboardPage;
  contactPage: ContactPage;
  testInfo: TestInfo;
  header: Header;
};

type WorkerFixtures = {
  workerId: number;
};

export const test = baseTest.extend<TestFixtures, WorkerFixtures>({
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
  },
  header: async ({ page, context }, use) => {
    await use(new Header(page, context));
  },

  workerId: [async ({}, use, workerInfo: WorkerInfo) => {
    await use(workerInfo.workerIndex);
  }, { scope: 'worker' }],
});

export default test;
