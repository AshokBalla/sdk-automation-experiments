const crypto = require('crypto');

class SDKExample {
  constructor({ apiKey, baseUrl, webhookSecret, httpClient } = {}) {
    this.apiKey = apiKey || process.env.SDK_API_KEY;
    this.baseUrl = baseUrl || process.env.API_BASE_URL;
    this.webhookSecret = webhookSecret || process.env.WEBHOOK_SECRET;
    // httpClient should expose post(url, body) and get(url)
    this.httpClient = httpClient || null;
  }

  init(opts = {}) {
    if (opts.apiKey) this.apiKey = opts.apiKey;
    if (opts.baseUrl) this.baseUrl = opts.baseUrl;
    if (opts.webhookSecret) this.webhookSecret = opts.webhookSecret;
    return this;
  }

  // Simulated authenticate flow. If an httpClient is provided it will be used (mockable in tests)
  async authenticate() {
    if (this.httpClient && typeof this.httpClient.post === 'function') {
      try {
        const resp = await this.httpClient.post(`${this.baseUrl}/auth`, { apiKey: this.apiKey });
        if (resp && resp.token) return resp.token;
        throw this._wrapError(resp, 'Invalid auth response');
      } catch (err) {
        throw this._wrapError(err, 'Authentication failed');
      }
    }

    // Local simulated behavior for examples/tests without network
    if (!this.apiKey) throw new Error('API key missing');
    if (this.apiKey === 'valid_api_key') return 'mock-token-12345';
    const e = new Error('Unauthorized');
    e.status = 401;
    throw e;
  }

  verifyWebhookSignature(rawBody, signatureHeader) {
    if (!this.webhookSecret) throw new Error('Webhook secret not configured');
    const computed = crypto.createHmac('sha256', this.webhookSecret).update(rawBody).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(signatureHeader));
  }

  _wrapError(err, message) {
    const e = new Error(message);
    if (err && err.status) e.status = err.status;
    if (err && err.message) e.detail = err.message;
    return e;
  }
}

module.exports = SDKExample;
