import { server } from '@/shared/lib/msw/server';
import { HttpResponse, http } from 'msw';

describe('GET /api/example', () => {
  it('should return mocked data', async () => {
    const res = await fetch('http://localhost:3000/api/example');
    const data = await res.json();
    console.log('Response:', res.status, data);
    expect(res.status).toBe(200);
    expect(data).toEqual({
      message: 'This is a mocked response',
      data: { id: 1, name: 'Example Data' },
    });
  });

  it('should return custom data when handler is overridden', async () => {
    server.use(
      http.get('http://localhost:3000/api/example', () => {
        return HttpResponse.json({ message: 'custom', data: { id: 2 } });
      }),
    );
    const res = await fetch('http://localhost:3000/api/example');
    const data = await res.json();
    expect(data).toEqual({ message: 'custom', data: { id: 2 } });
  });
});
