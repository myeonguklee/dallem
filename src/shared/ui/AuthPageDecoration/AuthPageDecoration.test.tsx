import { useAuthImageSize } from '@/shared/hooks/useAuthImageSize';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AuthPageDecoration } from './AuthPageDecoration';

// ── 모듈 모킹 ─────────────────────────────────────────────
// next-intl: 네임스페이스가 주어지므로 짧은 키('welcome', 'desc1', 'desc2')를 반환

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      welcome: '환영합니다!',
      desc1: '함께 성장하는',
      desc2: '개발자 커뮤니티에 오신 것을 환영합니다',
    };
    return translations[key] || key;
  },
}));

// 훅 모킹
jest.mock('@/shared/hooks/useAuthImageSize', () => ({
  useAuthImageSize: jest.fn(),
}));

// LoginImageIcon 모킹 (컴포넌트의 실제 import 경로와 일치시킴)
jest.mock('../icon', () => ({
  LoginImageIcon: ({ size }: { size: number }) => (
    <div
      data-testid="login-image"
      data-size={size}
    />
  ),
}));

describe('AuthPageDecoration 컴포넌트', () => {
  const mockUseAuthImageSize = useAuthImageSize as jest.MockedFunction<typeof useAuthImageSize>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('제목이 h2(level=2)로 올바르게 렌더링된다', () => {
    render(<AuthPageDecoration />);
    expect(screen.getByRole('heading', { level: 2, name: '환영합니다!' })).toBeInTheDocument();
  });

  it('설명 텍스트가 모두 렌더링된다', () => {
    render(<AuthPageDecoration />);
    expect(screen.getByText('함께 성장하는 개발자 커뮤니티에 오신 것을 환영합니다')).toHaveProperty(
      'tagName',
      'P',
    );
  });

  it('LoginImageIcon이 훅에서 반환한 size로 렌더링된다', () => {
    mockUseAuthImageSize.mockReturnValue(300);
    render(<AuthPageDecoration />);
    const img = screen.getByTestId('login-image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('data-size', '300');
  });

  it('useAuthImageSize 훅이 호출된다', () => {
    render(<AuthPageDecoration />);
    expect(mockUseAuthImageSize).toHaveBeenCalledTimes(1);
  });

  it('이미지 size가 변경되면 리렌더 시 반영된다', () => {
    const { rerender } = render(<AuthPageDecoration />);
    expect(screen.getByTestId('login-image')).toHaveAttribute('data-size', '300');

    mockUseAuthImageSize.mockReturnValue(480);
    rerender(<AuthPageDecoration />);
    expect(screen.getByTestId('login-image')).toHaveAttribute('data-size', '480');
  });
});
