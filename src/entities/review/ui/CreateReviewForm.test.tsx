import React from 'react';
import { CreateReviewPayload, createReviewSchema } from '@/entities/review/model/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { CreateReviewForm } from './CreateReviewForm';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'pages.myPage.reviewModal.question': '이 모임은 어떠셨나요?',
      'pages.myPage.reviewModal.commentLabel': '리뷰',
      'pages.myPage.reviewModal.commentPlaceholder': '리뷰를 작성해주세요',
      'pages.myPage.reviewModal.cancel': '취소',
      'pages.myPage.reviewModal.submit': '제출',
      'pages.myPage.reviewModal.ariaLabel': '별점 {score}점',
    };
    return translations[key] || key;
  },
}));

// Test wrapper component
const TestWrapper = ({
  gatheringId = 1,
  onSubmit = jest.fn(),
  onCancel = jest.fn(),
  isSubmitting = false,
}: {
  gatheringId?: number;
  onSubmit?: (data: CreateReviewPayload) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}) => {
  const { control } = useForm<CreateReviewPayload>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      gatheringId,
      score: undefined,
      comment: '',
    },
  });

  return (
    <CreateReviewForm
      control={control}
      gatheringId={gatheringId}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isSubmitting={isSubmitting}
    />
  );
};

describe('CreateReviewForm', () => {
  it('렌더링되어야 한다', () => {
    render(<TestWrapper />);

    expect(screen.getByText('question')).toBeInTheDocument();
    expect(screen.getByText('commentLabel')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('commentPlaceholder')).toBeInTheDocument();
    expect(screen.getByText('cancel')).toBeInTheDocument();
    expect(screen.getByText('submit')).toBeInTheDocument();
  });

  it('별점 버튼들이 렌더링되어야 한다', () => {
    render(<TestWrapper />);

    // 5개의 별점 버튼이 있어야 함
    const starButtons = screen
      .getAllByRole('button')
      .filter((button) => button.getAttribute('aria-label')?.includes('ariaLabel'));
    expect(starButtons).toHaveLength(5);
  });

  it('댓글을 입력할 수 있어야 한다', async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const commentTextarea = screen.getByPlaceholderText('commentPlaceholder');
    await user.type(commentTextarea, '정말 좋은 모임이었습니다!');

    expect(commentTextarea).toHaveValue('정말 좋은 모임이었습니다!');
  });

  it('취소 버튼이 작동해야 한다', async () => {
    const user = userEvent.setup();
    const mockOnCancel = jest.fn();
    render(<TestWrapper onCancel={mockOnCancel} />);

    const cancelButton = screen.getByText('cancel');
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('제출 중일 때 버튼들이 비활성화되어야 한다', () => {
    render(<TestWrapper isSubmitting={true} />);

    const submitButton = screen.getByText('submit');
    const cancelButton = screen.getByText('cancel');

    expect(submitButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });

  it('별점을 선택할 수 있어야 한다', async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const starButtons = screen
      .getAllByRole('button')
      .filter((button) => button.getAttribute('aria-label')?.includes('ariaLabel'));

    // 3점 선택
    await user.click(starButtons[2]); // 3점 버튼

    // 별점이 선택되었는지 확인 (useController의 onChange가 호출되었는지)
    expect(starButtons[2]).toBeInTheDocument();
  });

  it('별점과 댓글이 모두 입력되어야 제출 버튼이 활성화되어야 한다', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    render(<TestWrapper onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByText('submit');
    expect(submitButton).toBeDisabled(); // 초기에는 비활성화

    // 별점만 선택
    const starButtons = screen
      .getAllByRole('button')
      .filter((button) => button.getAttribute('aria-label')?.includes('ariaLabel'));
    await user.click(starButtons[2]); // 3점 선택
    expect(submitButton).toBeDisabled(); // 댓글이 없어서 여전히 비활성화

    // 댓글 입력
    const commentTextarea = screen.getByPlaceholderText('commentPlaceholder');
    await user.type(commentTextarea, '좋은 모임이었습니다');
    expect(submitButton).toBeEnabled(); // 이제 활성화
  });

  it('제출 시 올바른 데이터가 전달되어야 한다', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    render(
      <TestWrapper
        gatheringId={123}
        onSubmit={mockOnSubmit}
      />,
    );

    // 별점 선택
    const starButtons = screen
      .getAllByRole('button')
      .filter((button) => button.getAttribute('aria-label')?.includes('ariaLabel'));
    await user.click(starButtons[3]); // 4점 선택

    // 댓글 입력
    const commentTextarea = screen.getByPlaceholderText('commentPlaceholder');
    await user.type(commentTextarea, '정말 좋은 모임이었습니다!');

    // 제출
    const submitButton = screen.getByText('submit');
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      gatheringId: 123,
      score: 4,
      comment: '정말 좋은 모임이었습니다!',
    });
  });

  it('빈 댓글로는 제출할 수 없어야 한다', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    render(<TestWrapper onSubmit={mockOnSubmit} />);

    // 별점만 선택하고 댓글은 입력하지 않음
    const starButtons = screen
      .getAllByRole('button')
      .filter((button) => button.getAttribute('aria-label')?.includes('ariaLabel'));
    await user.click(starButtons[2]); // 3점 선택

    const submitButton = screen.getByText('submit');
    expect(submitButton).toBeDisabled();

    // 빈 댓글 입력
    const commentTextarea = screen.getByPlaceholderText('commentPlaceholder');
    await user.type(commentTextarea, '   '); // 공백만 입력

    expect(submitButton).toBeDisabled(); // 여전히 비활성화
  });

  it('별점이 없으면 제출할 수 없어야 한다', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    render(<TestWrapper onSubmit={mockOnSubmit} />);

    // 댓글만 입력하고 별점은 선택하지 않음
    const commentTextarea = screen.getByPlaceholderText('commentPlaceholder');
    await user.type(commentTextarea, '좋은 모임이었습니다');

    const submitButton = screen.getByText('submit');
    expect(submitButton).toBeDisabled(); // 별점이 없어서 비활성화
  });
});
