import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react';
import { GlobalErrorFallback } from './GlobalErrorFallback';

// Mock next-intl
jest.mock('next-intl', () => ({
  useLocale: jest.fn(() => 'ko'),
  useTranslations: (ns?: string) => (key: string) => {
    const messages: Record<string, string> = {
      'errors.global.title': '문제가 발생했어요',
      'errors.global.message': '잠시 후 다시 시도해 주세요.',
      'errors.global.retryButton': '다시 시도',
      'errors.global.backToHome': '홈으로',
    };
    const compositeKey = ns ? `${ns}.${key}` : key;
    return messages[compositeKey] || compositeKey;
  },
}));

// Mock i18n router
jest.mock('@/i18n', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

describe('GlobalErrorFallback', () => {
  const mockUseRouter = useRouter as unknown as jest.Mock;
  const mockUseLocale = useLocale as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({ push: jest.fn() });
    mockUseLocale.mockReturnValue('ko');
  });

  it('번역된 타이틀/메시지와 버튼 텍스트가 렌더링된다', () => {
    render(
      <GlobalErrorFallback
        error={new Error('test')}
        reset={jest.fn()}
      />,
    );

    expect(screen.getByText('문제가 발생했어요')).toBeInTheDocument();
    expect(screen.getByText('잠시 후 다시 시도해 주세요.')).toBeInTheDocument();
    expect(screen.getByText('다시 시도')).toBeInTheDocument();
    expect(screen.getByText('홈으로')).toBeInTheDocument();
  });

  it('다시 시도 버튼 클릭 시 reset이 호출된다', () => {
    const resetMock = jest.fn();
    render(
      <GlobalErrorFallback
        error={new Error('test')}
        reset={resetMock}
      />,
    );

    fireEvent.click(screen.getByText('다시 시도'));

    expect(resetMock).toHaveBeenCalled();
  });

  it('홈으로 버튼 클릭 시 현재 locale과 함께 /gathering 으로 이동한다', () => {
    const pushMock = jest.fn();
    mockUseRouter.mockReturnValue({ push: pushMock });
    mockUseLocale.mockReturnValue('ko');

    render(
      <GlobalErrorFallback
        error={new Error('test')}
        reset={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByText('홈으로'));

    expect(pushMock).toHaveBeenCalledWith('/gathering', { locale: 'ko' });
  });
});
