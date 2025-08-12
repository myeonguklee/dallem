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

// ---- 공통 헬퍼 ----
const setReferrer = (value: string) => {
  Object.defineProperty(document, 'referrer', {
    value,
    configurable: true,
  });
};

describe('SigninForm 컴포넌트', () => {
  const originalReferrer = document.referrer;

  beforeEach(() => {
    mockPush.mockReset();
    mockSignIn.mockReset();
    setReferrer('');
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

  it('유효한 자격 증명으로 로그인하면 홈(/)으로 이동한다', async () => {
    render(<SigninForm />);
    const email = screen.getByPlaceholderText('이메일');
    const password = screen.getByPlaceholderText('비밀번호');
    const submit = screen.getByTestId('submit-button') as HTMLButtonElement;

    // 유효 입력으로 isValid 토글
    fireEvent.change(email, { target: { value: 'test@example.com' } });
    fireEvent.change(password, { target: { value: 'password123' } });

    // 버튼이 활성화되었는지 확인 후 클릭
    await waitFor(() => expect(submit).not.toBeDisabled());
    fireEvent.click(submit);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        email: 'test@example.com',
        password: 'password123',
        redirect: false,
      });
      expect(mockPush).toHaveBeenCalledWith('/');
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

  it('이전 페이지가 모임 페이지(/gathering)면 해당 referrer로 이동한다', async () => {
    setReferrer('http://localhost:3000/gathering');

    render(<SigninForm />);
    const email = screen.getByPlaceholderText('이메일');
    const password = screen.getByPlaceholderText('비밀번호');
    const submit = screen.getByTestId('submit-button') as HTMLButtonElement;

    fireEvent.change(email, { target: { value: 'test@example.com' } });
    fireEvent.change(password, { target: { value: 'password123' } });

    await waitFor(() => expect(submit).not.toBeDisabled());
    fireEvent.click(submit);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('http://localhost:3000/gathering');
    });
  });

  it('모임 하위 경로(/gathering/123) referrer도 포함 매칭으로 이전 페이지로 이동한다', async () => {
    setReferrer('https://example.com/gathering/123?tab=info');

    render(<SigninForm />);
    const email = screen.getByPlaceholderText('이메일');
    const password = screen.getByPlaceholderText('비밀번호');
    const submit = screen.getByTestId('submit-button') as HTMLButtonElement;

    fireEvent.change(email, { target: { value: 'test@example.com' } });
    fireEvent.change(password, { target: { value: 'password123' } });

    await waitFor(() => expect(submit).not.toBeDisabled());
    fireEvent.click(submit);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('https://example.com/gathering/123?tab=info');
    });
  });

  it('제출 후 isSubmitted 플래그가 true로 반영되는지 확인한다', async () => {
    render(<SigninForm />);
    const email = screen.getByPlaceholderText('이메일');
    const password = screen.getByPlaceholderText('비밀번호');
    const submit = screen.getByTestId('submit-button') as HTMLButtonElement;

    fireEvent.change(email, { target: { value: 'test@example.com' } });
    fireEvent.change(password, { target: { value: 'password123' } });

    await waitFor(() => expect(submit).not.toBeDisabled());
    fireEvent.click(submit);

    await waitFor(() => {
      // 모킹된 AuthForm에서 data-is-submitted 값으로 노출
      expect(submit.dataset.isSubmitted).toBe('true');
    });
  });
});
