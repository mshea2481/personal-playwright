import { test as base, APIRequestContext } from '@playwright/test';
import { createAuthenticatedContext } from './helpers/authenticatedRequest';

// Declare the fixture types
type ApiFixtures = {
    authedRequest: APIRequestContext;
};

export const test = base.extend<ApiFixtures>({
    // This fixture creates an isolated, authenticated request context per test
    authedRequest: async ({ baseURL }, use) => {
        const authedContext = await createAuthenticatedContext(baseURL!);
        
        // Pass the request instance to the test
        await use(authedContext.request);

        // Automatically clean up after the test completes
        await authedContext.dispose();
    },
});

export { expect } from '@playwright/test';