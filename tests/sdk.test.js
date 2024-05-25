const SDKExample = require('../src/sdk_example');
const crypto = require('crypto');

describe('SDKExample', () => {
  test('initializes with options and env fallbacks', () => {
    const sdk = new SDKExample({ apiKey: 'a', baseUrl: 'https://x', webhookSecret: 's' });
    expect(sdk.apiKey).toBe('a');
    expect(sdk.baseUrl).toBe('https://x');
    expect(sdk.webhookSecret).toBe('s');
  });

  test('authenticate uses httpClient when provided (mocked)', async () => {
    const mockClient = {
      post: jest.fn().mockResolvedValue({ token: 'token-from-server' })
    };
    const sdk = new SDKExample({ apiKey: 'whatever', baseUrl: 'https://api', httpClient: mockClient });
    const token = await sdk.authenticate();
    expect(token).toBe('token-from-server');
    expect(mockClient.post).toHaveBeenCalledWith('https://api/auth', { apiKey: 'whatever' });
  });

  test('authenticate falls back to simulated behavior', async () => {
    const sdk = new SDKExample({ apiKey: 'valid_api_key' });
    const token = await sdk.authenticate();
    expect(token).toBe('mock-token-12345');
  });

  test('authenticate throws on bad key', async () => {
    const sdk = new SDKExample({ apiKey: 'bad' });
    await expect(sdk.authenticate()).rejects.toMatchObject({ message: 'Unauthorized' });
  });

  test('verifyWebhookSignature validates correct signature', () => {
    const secret = 'whsec_test';
    const payload = JSON.stringify({ id: 'evt_1', type: 'test.event' });
    const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    const sdk = new SDKExample({ webhookSecret: secret });
    const ok = sdk.verifyWebhookSignature(payload, signature);
    expect(ok).toBe(true);
  });

  test('verifyWebhookSignature rejects incorrect signature', () => {
    const secret = 'whsec_test';
    const payload = JSON.stringify({ id: 'evt_1', type: 'test.event' });
    const signature = crypto.createHmac('sha256', 'other').update(payload).digest('hex');
    const sdk = new SDKExample({ webhookSecret: secret });
    const ok = sdk.verifyWebhookSignature(payload, signature);
    expect(ok).toBe(false);
  });

  test('error wrapping preserves status and detail', async () => {
    const mockClient = {
      post: jest.fn().mockRejectedValue({ status: 401, message: 'invalid' })
    };
    const sdk = new SDKExample({ httpClient: mockClient });
    await expect(sdk.authenticate()).rejects.toMatchObject({ message: 'Authentication failed', status: 401, detail: 'invalid' });
  });
});
