import { HttpResponse, http } from 'msw';

export const authHandlers = [
  // 사용자 정보 조회
  http.get('*/auths/user', () => {
    return HttpResponse.json({
      id: 5,
      email: 'test@example.com',
      name: '테스트 사용자',
      companyName: '테스트 회사',
      image: '',
    });
  }),

  // 사용자 정보 업데이트
  http.put('*/auths/user', async ({ request }) => {
    const body = (await request.json()) as {
      name?: string;
      companyName?: string;
      image?: string;
    };
    return HttpResponse.json({
      id: 5,
      email: 'test@example.com',
      name: body?.name || '테스트 사용자',
      companyName: body?.companyName || '테스트 회사',
      image: body?.image || '',
    });
  }),

  // 로그인
  http.post('*/auths/signin', async ({ request }) => {
    const body = (await request.json()) as {
      email: string;
      password: string;
    };

    // 간단한 인증 로직
    if (body?.email === 'test@example.com' && body?.password === 'password') {
      return HttpResponse.json({
        user: {
          id: 5,
          email: 'test@example.com',
          name: '테스트 사용자',
        },
        token: 'mock-jwt-token',
      });
    }

    return new HttpResponse(null, { status: 401 });
  }),

  // 회원가입
  http.post('*/auths/signup', async ({ request }) => {
    const body = (await request.json()) as {
      email: string;
      password: string;
      name: string;
      companyName: string;
    };

    return HttpResponse.json(
      {
        user: {
          id: Date.now(),
          email: body?.email,
          name: body?.name,
          companyName: body?.companyName,
        },
      },
      { status: 201 },
    );
  }),
];
