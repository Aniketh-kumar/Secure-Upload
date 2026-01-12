const request = require('supertest');
const app = require('../server');

describe('GET /', () => {
  test('responds with index.html', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
    expect(res.text).toMatch(/<html|<!DOCTYPE html/i);
  });
});
