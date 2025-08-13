import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SigninFormData } from '../model/type';
import { SigninForm } from './SigninForm';

// ---- 모듈 모킹: next-auth, next/navigation, AuthForm ----
const mockSignIn = jest.fn();
jest.mock('next-auth/react', () => ({
  signIn: (...args: SigninFormData[]) => mockSignIn(...args),
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

// AuthForm는 실제 UI가 복잡하니, 필요한 필드만 노출하는 가짜 컴포넌트로 대체
jest.mock('@/widgets/AuthForm/ui/AuthForm', () => ({
  AuthForm: jest.fn(({ meta, handlers, isValid, isSubmitted }) => (
    <div data-testid="auth-form">
      <button
        type="submit"
        disabled={!isValid}
        data-testid="submit-button"
        data-is-valid={String(isValid)}
        data-is-submitted={String(isSubmitted)}
      >
        {meta.buttonLabel}
      </button>
      <input
        {...handlers.register('email')}
        data-testid="email-input"
        placeholder="이메일"
      />
      <input
        {...handlers.register('password')}
        type="password"
        data-testid="password-input"
        placeholder="비밀번호"
      />
      {handlers.errors.email && (
        <div data-testid="email-error">{handlers.errors.email.message}</div>
      )}
    </div>
  )),
}));

// ROUTES 모킹 (실제 프로젝트 상수와 맞추세요)
jest.mock('@/shared/config/routes', () => ({
  ROUTES: {
    ROOT: '/',
    GATHERING: '/gathering',
    GATHERING_DETAIL: (id: number) => `/gathering/${id}`,
    SIGNUP: '/signup',
  },
}));

jest.mock('next-intl', () => {
  const actual = jest.requireActual('next-intl');
  return {
    ...actual,
    useLocale: () => 'ko',
  };
});
// ---- 공통 헬퍼 ----
const setReferrer = (value: string) => {
  Object.defineProperty(document, 'referrer', {
    value,
    configurable: true,
  });
};

export const setTestUrl = (url: string) => {
  // 현재 문서 URL을 변경 (JSDOM 권장 방식)
  window.history.pushState({}, '', url);
};

describe('SigninForm 컴포넌트', () => {
  const originalReferrer = document.referrer;

  beforeEach(() => {
    mockPush.mockReset();
    mockSignIn.mockReset();
    setReferrer(''); // 기본값
    mockSignIn.mockResolvedValue({ error: null });
  });

  afterEach(() => {
    // 테스트 간 referrer 누수 방지
    setReferrer(originalReferrer);
    jest.clearAllMocks();
  });

  it('렌더링 시 이메일과 비밀번호 입력 필드가 보인다', () => {
    render(<SigninForm />);
    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
  });

  it('초기에는 폼이 유효하지 않아 전송 버튼이 비활성화되어 있다', () => {
    render(<SigninForm />);
    const submit = screen.getByTestId('submit-button') as HTMLButtonElement;
    expect(submit).toBeDisabled();
    expect(submit.dataset.isValid).toBe('false');
    expect(submit.dataset.isSubmitted).toBe('false');
  });

  it('유효하지 않은 이메일을 입력하면 오류 메시지가 표시된다', async () => {
    render(<SigninForm />);
    const email = screen.getByPlaceholderText('이메일');
    const submit = screen.getByTestId('submit-button');

    // invalid 이메일로 onChange 유효성 검사 유도
    fireEvent.change(email, { target: { value: 'invalid-email' } });

    // 제출 시도 (버튼이 disabled일 수 있으므로, 엔터 제출도 함께 트리거)
    fireEvent.keyDown(email, { key: 'Enter', code: 'Enter' });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(screen.getByTestId('email-error')).toBeInTheDocument();
    });
  });

  it('로그인 실패 시 이메일 필드에 에러 메시지가 표기된다', async () => {
    mockSignIn.mockResolvedValueOnce({ error: '인증 실패' });

    render(<SigninForm />);
    const email = screen.getByPlaceholderText('이메일');
    const password = screen.getByPlaceholderText('비밀번호');
    const submit = screen.getByTestId('submit-button') as HTMLButtonElement;

    fireEvent.change(email, { target: { value: 'test@example.com' } });
    fireEvent.change(password, { target: { value: 'wrongpassword' } });

    await waitFor(() => expect(submit).not.toBeDisabled());
    fireEvent.click(submit);

    await waitFor(() => {
      // setError로 넣은 메시지 키가 그대로 노출됨 (i18n은 컴포넌트 상위에서 처리)
      expect(screen.getByTestId('email-error')).toHaveTextContent('errors.validation.cannotSignIn');
    });
  });
});
