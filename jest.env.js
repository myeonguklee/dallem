// 테스트 환경변수 로드
import { config } from 'dotenv';

// .env.test 파일 로드
config({ path: '.env.test' });

// 기본값 설정 (파일이 없어도 동작하도록)
if (!process.env.NEXT_PUBLIC_TEAM_ID) {
  process.env.NEXT_PUBLIC_TEAM_ID = '1';
}

if (!process.env.NEXT_PUBLIC_API_URL) {
  process.env.NEXT_PUBLIC_API_URL = 'https://test-api.example.com';
}

process.env.NODE_ENV = 'test';
