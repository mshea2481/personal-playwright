import { APIRequestContext, request } from '@playwright/test';
import { testConfig } from '../../../testConfig';

export type AuthedContext = {
    request: APIRequestContext;
    dispose: () => Promise<void>;
};

/**
 * Logs in as admin and returns an object containing an APIRequestContext
 * with the session cookie already attached and a dispose() helper.
 * This shape matches the fixture usage in ApiFixtures.ts
 */
export async function createAuthenticatedContext(baseURL: string): Promise<AuthedContext> {
    const context = await request.newContext({ baseURL });

    const response = await context.post('/admin/login', {
        form: {
            username: testConfig.adminUsername,
            password: testConfig.adminPassword,
        },
    });

    if (!response.ok() && response.status() !== 302) {
        throw new Error(`Admin login failed with status ${response.status()}`);
    }

    return {
        request: context,
        dispose: async () => {
            await context.dispose();
        },
    };
}