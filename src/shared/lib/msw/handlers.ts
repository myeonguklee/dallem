import { HttpResponse, http } from 'msw';

// 기본 핸들러들
export const handlers = [
  // GET 요청 예시
  http.get('http://localhost:3000/api/example', () => {
    return HttpResponse.json({
      message: 'This is a mocked response',
      data: {
        id: 1,
        name: 'Example Data',
      },
    });
  }),

  // POST 요청 예시
  http.post('http://localhost:3000/api/example', async ({ request }) => {
    const body = await request.json();
    // body가 문자열인 경우 파싱
    const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
    return HttpResponse.json({
      message: 'Data created successfully',
      data: parsedBody,
    });
  }),

  // 에러 응답 예시
  http.get('http://localhost:3000/api/error', () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }),
];
