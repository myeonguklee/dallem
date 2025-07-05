import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Next.js 앱의 경로를 설정합니다.
  dir: './',
});

// Jest에 전달할 사용자 정의 설정
const customJestConfig = {
  // 테스트 실행 전에 polyfill을 먼저 적용합니다.
  setupFiles: ['<rootDir>/jest.polyfill.js'],

  // 각 테스트 실행 전에 실행할 파일을 지정합니다.
  setupFilesAfterEnv: ['<rootDir>/jest.setup.msw.js', '<rootDir>/jest.setup.js'],

  // 'jest-environment-jsdom'을 사용하도록 설정합니다.
  testEnvironment: 'jest-environment-jsdom',

  // TypeScript 경로 별칭(@/components/*)을 Jest가 이해하도록 설정합니다.
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

// next/jest 설정을 불러와 사용자 정의 설정과 병합합니다.
export default createJestConfig(customJestConfig);
