// .toBeInTheDocument()와 같은 React Testing Library의
// 유용한 matcher들을 모든 테스트 파일에서 사용할 수 있게 합니다.
import '@testing-library/jest-dom';

process.env.NEXT_PUBLIC_TEAM_ID = '10-6';

jest.mock('@/i18n', () => ({
  // useRouter를 호출하면, 가짜 객체를 반환하도록 설정
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  // Link, redirect 등 @/i18n에서 export하는 다른 것들도
  // 가짜 컴포넌트나 함수로 만든다
  Link: ({ children }) => children,
  redirect: jest.fn(),
  usePathname: () => '/',
}));

// 2. next-intl의 번역 기능도 모킹
jest.mock('next-intl', () => ({
  useTranslations: () => (key) => key,
  NextIntlClientProvider: ({ children }) => children,
}));
