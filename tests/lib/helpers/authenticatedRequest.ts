import { APIRequestContext, request } from '@playwright/test';
import { testConfig } from '../../../testConfig';

/**
 * Logs in as admin and returns an `APIRequestContext` with the session
 * cookie already attached. The returned context can be disposed via
 * `context.dispose()`.
 */
export async function createAuthenticatedContext(baseURL: string): Promise<APIRequestContext> {
    const context = await request.newContext({ baseURL });

    const response = await context.post('/admin/login', {
        form: {
            username: testConfig.adminUsername,
            password: testConfig.adminPassword,
        },
    });

    if (!response.ok() && response.status() !== 302) {
        await context.dispose();
        throw new Error(`Admin login failed with status ${response.status()}`);
    }

    return context;
}