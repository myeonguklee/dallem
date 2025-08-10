import { TestWrapper } from '@/shared/lib/test/testUtils';
import { render, screen } from '@testing-library/react';
import { GatheringDetailButton } from './GatheringDetailButton';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'ui.gatheringCard.joinButton.full': '모집 마감',
      'ui.gatheringCard.joinButton.detail': '상세보기',
    };
    return translations[key] || key;
  },
}));

// Mock Button
jest.mock('@/shared/ui/button/Button', () => ({
  Button: ({
    children,
    variant,
    disabled,
    className,
  }: {
    children: React.ReactNode;
    variant?: string;
    disabled?: boolean;
    className?: string;
  }) => (
    <button
      data-testid="join-button"
      data-variant={variant}
      data-disabled={disabled}
      className={className}
    >
      {children}
    </button>
  ),
}));

describe('GatheringDetailButton', () => {
  it('모집이 마감되지 않았을 때 상세보기 버튼이 표시되어야 한다', () => {
    render(
      <TestWrapper>
        <GatheringDetailButton
          participantCount={5}
          capacity={10}
        />
      </TestWrapper>,
    );

    const button = screen.getByTestId('join-button');
    expect(button).toHaveTextContent('detail');
    expect(button).toHaveAttribute('data-variant', 'primary');
    expect(button).toHaveAttribute('data-disabled', 'false');
  });

  it('모집이 마감되었을 때 모집 마감 버튼이 표시되어야 한다', () => {
    render(
      <TestWrapper>
        <GatheringDetailButton
          participantCount={10}
          capacity={10}
        />
      </TestWrapper>,
    );

    const button = screen.getByTestId('join-button');
    expect(button).toHaveTextContent('full');
    expect(button).toHaveAttribute('data-variant', 'default');
    expect(button).toHaveAttribute('data-disabled', 'true');
  });

  it('참가자 수가 정원을 초과했을 때도 모집 마감 버튼이 표시되어야 한다', () => {
    render(
      <TestWrapper>
        <GatheringDetailButton
          participantCount={12}
          capacity={10}
        />
      </TestWrapper>,
    );

    const button = screen.getByTestId('join-button');
    expect(button).toHaveTextContent('full');
    expect(button).toHaveAttribute('data-variant', 'default');
    expect(button).toHaveAttribute('data-disabled', 'true');
  });

  it('버튼에 올바른 CSS 클래스가 적용되어야 한다', () => {
    render(
      <TestWrapper>
        <GatheringDetailButton
          participantCount={5}
          capacity={10}
        />
      </TestWrapper>,
    );

    const button = screen.getByTestId('join-button');
    expect(button).toHaveClass('h-8', 'w-24', 'px-4', 'py-2', 'text-sm', 'whitespace-nowrap');
  });
});
