import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Next.js 앱의 경로를 설정합니다.
  dir: './',
});

// Jest에 전달할 사용자 정의 설정
const customJestConfig = {
  // 테스트 환경변수 로드
  setupFiles: ['<rootDir>/jest.polyfill.js', '<rootDir>/jest.env.js'],

  // 각 테스트 실행 전에 실행할 파일을 지정합니다.
  setupFilesAfterEnv: ['<rootDir>/jest.setup.msw.js', '<rootDir>/jest.setup.js'],

  // 'jest-environment-jsdom'을 사용하도록 설정합니다.
  testEnvironment: 'jest-environment-jsdom',

  // TypeScript 경로 별칭(@/components/*)을 Jest가 이해하도록 설정합니다.
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // ESM 모듈 변환 설정
  transformIgnorePatterns: ['node_modules/(?!(next-intl|use-intl)/)'],

  // 커버리지 설정
  collectCoverageFrom: [
    'src/entities/**/*.{ts,tsx}',
    'src/features/**/*.{ts,tsx}',
    'src/shared/lib/**/*.{ts,tsx}',
    'src/shared/ui/**/*.{ts,tsx}',
    '!src/entities/**/*.test.{ts,tsx}',
    '!src/features/**/*.test.{ts,tsx}',
    '!src/shared/lib/**/*.test.{ts,tsx}',
    '!src/shared/ui/**/*.test.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.{ts,tsx}',
    '!src/**/api/**/*.{ts,tsx}',
    '!src/**/toast/**/*.{ts,tsx}',
    '!src/**/image/**/*.{ts,tsx}',
    '!src/**/sentry/**/*.{ts,tsx}',
    '!src/**/store/**/*.{ts,tsx}',
    '!src/**/msw/browser.{ts,tsx}',
    '!src/**/msw/startWorker.{ts,tsx}',
    // 아이콘들을 모두 제외
    '!src/shared/ui/icon/icons/**/*.{ts,tsx}',
    // StarIcon만 다시 포함
    'src/shared/ui/icon/icons/StarIcon.tsx',
    // 메타데이터 파일 제외
    '!src/shared/lib/metadata.ts',
  ],

  // 커버리지 리포트 설정
  coverageReporters: ['text', 'lcov', 'html'],
  coverageDirectory: 'coverage',
};

// next/jest 설정을 불러와 사용자 정의 설정과 병합합니다.
export default createJestConfig(customJestConfig);
