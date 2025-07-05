import { server } from '@/shared/lib/msw/server';
import { HttpResponse, http } from 'msw';

describe('GET /api/error', () => {
  it('should return 500 error', async () => {
    const res = await fetch('http://localhost:3000/api/error');
    expect(res.status).toBe(500);
    expect(res.statusText).toBe('Internal Server Error');
  });

  it('should handle custom error responses', async () => {
    server.use(
      http.get('http://localhost:3000/api/error', () => {
        return new HttpResponse(
          JSON.stringify({ error: 'Not Found', message: 'Resource not found' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } },
        );
      }),
    );
    const res = await fetch('http://localhost:3000/api/error');
    const data = await res.json();
    expect(res.status).toBe(404);
    expect(data).toEqual({ error: 'Not Found', message: 'Resource not found' });
  });
});
