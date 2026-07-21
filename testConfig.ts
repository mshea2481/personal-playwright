export const testConfig = {
    qa: process.env.QA_BASE_URL ?? 'https://localhost:3000',
    dev: process.env.DEV_BASE_URL ?? '',
    qaApi: process.env.QA_API_URL ?? 'https://localhost:3001',
    devApi: process.env.DEV_API_URL ?? '',
    username: process.env.ADMIN_TEST_USERNAME ?? '',
    password: process.env.ADMIN_TEST_PASSWORD ?? '',
    waitForElement: 120000,
    dbUsername: process.env.DB_USERNAME ?? '',
    dbPassword: process.env.DB_PASSWORD ?? '',
    dbServerName: process.env.DB_SERVER_NAME ?? '',
    dbPort: process.env.DB_PORT ?? '',
    dbName: process.env.DB_NAME ?? '',
};