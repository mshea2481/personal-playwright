export const testConfig = {
    baseUrl: process.env.BASE_URL ?? 'http://localhost:3000',
    adminUsername: process.env.ADMIN_TEST_USERNAME ?? '',
    adminPassword: process.env.ADMIN_TEST_PASSWORD ?? '',
    waitForElement: 10_000,
};