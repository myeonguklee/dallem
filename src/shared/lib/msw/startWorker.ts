import { worker } from './browser';

export async function startWorker() {
  if (process.env.NODE_ENV === 'development') {
    await worker.start({
      onUnhandledRequest: 'warn', // 처리되지 않은 요청을 경고로 표시
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
      // 디버깅을 위한 로깅 활성화
      quiet: false,
    });
    console.log('🔄 MSW enabled for development');

    // MSW가 활성화되었는지 확인
    console.log('🔍 MSW handlers:', worker.listHandlers());

    // 모든 요청을 가로채도록 설정
    worker.events.on('request:start', ({ request }) => {
      console.log('🌐 MSW: Request started:', request.method, request.url);
    });

    worker.events.on('request:end', ({ request }) => {
      console.log('✅ MSW: Request ended:', request.method, request.url);
    });

    worker.events.on('unhandledException', ({ error, request }) => {
      console.error('❌ MSW: Unhandled exception:', error, request);
    });
  }
}
