import { test, expect } from '../lib/ApiFixtures'; 
import { createTestInquiry } from '@lib/TestData';

test.describe('POST /api/v1/inquiries (public endpoint)', () => {
    test('creates an inquiry with valid data and returns 201', async ({ request }) => {
        const testInquiry = createTestInquiry();

        const response = await request.post('/api/v1/inquiries', {
            data: { inquiry: testInquiry },
        });

        expect(response.status()).toBe(201);

        const body = await response.json();
        expect(body).toHaveProperty('id');
        expect(body.name).toBe(testInquiry.name);
        expect(body.email).toBe(testInquiry.email);
        expect(body.phone).toBe(testInquiry.phone);
        expect(body.message).toBe(testInquiry.message);
    });

    test('rejects an inquiry with a blank name and returns 422', async ({ request }) => {
        const invalidInquiry = createTestInquiry({ name: '' });

        const response = await request.post('/api/v1/inquiries', {
            data: { inquiry: invalidInquiry },
        });

        expect(response.status()).toBe(422);

        const body = await response.json();
        expect(body).toHaveProperty('errors');
        expect(body.errors.join(' ')).toMatch(/name/i);
    });

    test('rejects an inquiry with a malformed email and returns 422', async ({ request }) => {
        const invalidInquiry = createTestInquiry({ email: 'not-an-email' });

        const response = await request.post('/api/v1/inquiries', {
            data: { inquiry: invalidInquiry },
        });

        expect(response.status()).toBe(422);

        const body = await response.json();
        expect(body).toHaveProperty('errors');
    });

    test('rejects a request with missing inquiry params entirely', async ({ request }) => {
        const response = await request.post('/api/v1/inquiries', {
            data: {},
        });

        expect(response.status()).toBe(400);
    });
});

test.describe('GET/DELETE /api/v1/inquiries (authenticated endpoints)', () => {

    test('GET /api/v1/inquiries without auth returns 401', async ({ request }) => {
        const response = await request.get('/api/v1/inquiries');
        expect(response.status()).toBe(401);
    });

    // Notice we just ask for `authedRequest` in the test arguments!
    test('GET /api/v1/inquiries with auth returns a list including a newly created inquiry', async ({ authedRequest }) => {
        const testInquiry = createTestInquiry();

        const createResponse = await authedRequest.post('/api/v1/inquiries', {
            data: { inquiry: testInquiry },
        });
        expect(createResponse.status()).toBe(201);
        const created = await createResponse.json();

        const indexResponse = await authedRequest.get('/api/v1/inquiries');
        expect(indexResponse.status()).toBe(200);

        const inquiries = await indexResponse.json();
        expect(Array.isArray(inquiries)).toBe(true);
        expect(inquiries.some((i: any) => i.id === created.id)).toBe(true);
    });

    test('GET /api/v1/inquiries/:id returns the correct inquiry', async ({ authedRequest }) => {
        const testInquiry = createTestInquiry();

        const createResponse = await authedRequest.post('/api/v1/inquiries', {
            data: { inquiry: testInquiry },
        });
        const created = await createResponse.json();

        const showResponse = await authedRequest.get(`/api/v1/inquiries/${created.id}`);
        expect(showResponse.status()).toBe(200);

        const fetched = await showResponse.json();
        expect(fetched.id).toBe(created.id);
        expect(fetched.email).toBe(testInquiry.email);
    });

    test('GET /api/v1/inquiries/:id with a non-existent id returns 404', async ({ authedRequest }) => {
        const response = await authedRequest.get('/api/v1/inquiries/999999999');
        expect(response.status()).toBe(404);
    });

    test('DELETE /api/v1/inquiries/:id removes the inquiry', async ({ authedRequest }) => {
        const testInquiry = createTestInquiry();

        const createResponse = await authedRequest.post('/api/v1/inquiries', {
            data: { inquiry: testInquiry },
        });
        const created = await createResponse.json();

        const deleteResponse = await authedRequest.delete(`/api/v1/inquiries/${created.id}`);
        expect(deleteResponse.status()).toBe(204);

        const showResponse = await authedRequest.get(`/api/v1/inquiries/${created.id}`);
        expect(showResponse.status()).toBe(404);
    });

    test('DELETE /api/v1/inquiries/:id without auth returns 401 and does not delete', async ({ request, authedRequest }) => {
        const testInquiry = createTestInquiry();

        // Use authedRequest to setup data
        const createResponse = await authedRequest.post('/api/v1/inquiries', {
            data: { inquiry: testInquiry },
        });
        const created = await createResponse.json();

        // Use unauthenticated `request` to attempt deletion
        const unauthedDeleteResponse = await request.delete(`/api/v1/inquiries/${created.id}`);
        expect(unauthedDeleteResponse.status()).toBe(401);

        // Confirm it's still there using authedRequest
        const showResponse = await authedRequest.get(`/api/v1/inquiries/${created.id}`);
        expect(showResponse.status()).toBe(200);
    });
});