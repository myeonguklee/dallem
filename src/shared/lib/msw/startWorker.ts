import { worker } from './browser';

export async function startWorker() {
  if (process.env.NODE_ENV === 'development') {
    await worker.start({
      onUnhandledRequest: 'bypass', // 개발 환경에서는 처리되지 않은 요청을 무시
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    });
    console.log('🔄 MSW enabled for development');
  }
}
