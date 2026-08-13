export interface TestInquiry {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export interface TestContactMessage {
    name: string;
    email: string;
    message: string;
}

export function createTestInquiry(workerId?: number,overrides: Partial<TestInquiry> = {}): TestInquiry {
    const timestamp = Date.now();
    const prefix = workerId !== undefined ? `Worker${workerId}_` : ''; 
    return {
        name: `${prefix}Test User${timestamp}`,
        email: `${prefix}testuser${timestamp}@example.com`,
        phone: '123-456-9999',
        message: `This is a test inquiry. ${timestamp}`,
        ...overrides,
    };
}

export function createTestContactMessage(workerId?: number,overrides: Partial<TestContactMessage> = {}): TestContactMessage {
    const timestamp = Date.now();
    const prefix = workerId !== undefined ? `Worker${workerId}_` : ''; 
    return {
        name: `${prefix}Test User${timestamp}`,
        email: `${prefix}testuser${timestamp}@example.com`,
        message: `This is a test contact message. ${timestamp}`,
        ...overrides,
    };
}