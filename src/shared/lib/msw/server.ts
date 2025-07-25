import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Node.js 환경에서 MSW 서버 설정
export const server = setupServer(...handlers);
