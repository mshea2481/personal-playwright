import { test, expect, APIRequestContext } from '@playwright/test';
import { createTestContactMessage } from '@lib/TestData';
import { createAuthenticatedContext } from '@lib/helpers/authenticatedRequest';

test.describe('POST /api/v1/contact_messages (public endpoint)', () => {
    test('creates a contact message with valid data and returns 201', async ({ request }) => {
        const testMessage = createTestContactMessage();

        const response = await request.post('/api/v1/contact_messages', {
            data: { contact_message: testMessage },
        });

        expect(response.status()).toBe(201);

        const body = await response.json();
        expect(body).toHaveProperty('id');
        expect(body.name).toBe(testMessage.name);
        expect(body.email).toBe(testMessage.email);
        expect(body.message).toBe(testMessage.message);
    });

    test('rejects a contact message with a blank name and returns 422', async ({ request }) => {
        const invalidMessage = createTestContactMessage({ 
            overrides: { name: '' } 
        });

        const response = await request.post('/api/v1/contact_messages', {
            data: { contact_message: invalidMessage },
        });

        expect(response.status()).toBe(422);

        const body = await response.json();
        expect(body).toHaveProperty('errors');
        expect(body.errors.join(' ')).toMatch(/name/i);
    });

    test('rejects a contact message with a malformed email and returns 422', async ({ request }) => {
        const invalidMessage = createTestContactMessage({ 
            overrides: { email: 'not-an-email' } 
        });

        const response = await request.post('/api/v1/contact_messages', {
            data: { contact_message: invalidMessage },
        });

        expect(response.status()).toBe(422);

        const body = await response.json();
        expect(body).toHaveProperty('errors');
    });

    test('rejects a request with missing contact_message params entirely', async ({ request }) => {
        const response = await request.post('/api/v1/contact_messages', {
            data: {},
        });

        expect([400, 422]).toContain(response.status());
    });

    test('does not accept a phone field, since contact messages have no phone attribute', async ({ request }) => {
        const testMessage = createTestContactMessage();

        const response = await request.post('/api/v1/contact_messages', {
            data: { contact_message: { ...testMessage, phone: '123-456-7890' } },
        });

        expect(response.status()).toBe(201);

        const body = await response.json();
        // Confirms strong params silently drops unpermitted attributes
        // rather than erroring or persisting unexpected data.
        expect(body).not.toHaveProperty('phone');
    });
});

test.describe('GET/DELETE /api/v1/contact_messages (authenticated endpoints)', () => {
    let authedContext: APIRequestContext;

    test.beforeAll(async ({ baseURL }) => {
        authedContext = await createAuthenticatedContext(baseURL!);
    });

    test.afterAll(async () => {
        await authedContext.dispose();
    });

    test('GET /api/v1/contact_messages without auth returns 401', async ({ request }) => {
        const response = await request.get('/api/v1/contact_messages');
        expect(response.status()).toBe(401);
    });

    test('GET /api/v1/contact_messages with auth returns a list including a newly created message', async () => {
        const testMessage = createTestContactMessage();

        const createResponse = await authedContext.post('/api/v1/contact_messages', {
            data: { contact_message: testMessage },
        });
        expect(createResponse.status()).toBe(201);
        const created = await createResponse.json();

        const indexResponse = await authedContext.get('/api/v1/contact_messages');
        expect(indexResponse.status()).toBe(200);

        const messages = await indexResponse.json();
        expect(Array.isArray(messages)).toBe(true);
        expect(messages.some((m: any) => m.id === created.id)).toBe(true);
    });

    test('GET /api/v1/contact_messages/:id returns the correct message', async () => {
        const testMessage = createTestContactMessage();

        const createResponse = await authedContext.post('/api/v1/contact_messages', {
            data: { contact_message: testMessage },
        });
        const created = await createResponse.json();

        const showResponse = await authedContext.get(`/api/v1/contact_messages/${created.id}`);
        expect(showResponse.status()).toBe(200);

        const fetched = await showResponse.json();
        expect(fetched.id).toBe(created.id);
        expect(fetched.email).toBe(testMessage.email);
    });

    test('GET /api/v1/contact_messages/:id with a non-existent id returns 404', async () => {
        const response = await authedContext.get('/api/v1/contact_messages/999999999');
        expect(response.status()).toBe(404);
    });

    test('DELETE /api/v1/contact_messages/:id removes the message', async () => {
        const testMessage = createTestContactMessage();

        const createResponse = await authedContext.post('/api/v1/contact_messages', {
            data: { contact_message: testMessage },
        });
        const created = await createResponse.json();

        const deleteResponse = await authedContext.delete(`/api/v1/contact_messages/${created.id}`);
        expect(deleteResponse.status()).toBe(204);

        const showResponse = await authedContext.get(`/api/v1/contact_messages/${created.id}`);
        expect(showResponse.status()).toBe(404);
    });

    test('DELETE /api/v1/contact_messages/:id without auth returns 401 and does not delete', async ({ request }) => {
        const testMessage = createTestContactMessage();

        const createResponse = await authedContext.post('/api/v1/contact_messages', {
            data: { contact_message: testMessage },
        });
        const created = await createResponse.json();

        const unauthedDeleteResponse = await request.delete(`/api/v1/contact_messages/${created.id}`);
        expect(unauthedDeleteResponse.status()).toBe(401);

        const showResponse = await authedContext.get(`/api/v1/contact_messages/${created.id}`);
        expect(showResponse.status()).toBe(200);
    });
});