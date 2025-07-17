import { render, screen } from '@testing-library/react';
import { ReviewCard } from './ReviewCard';

// 별점 mock 함수 만들기
jest.mock('@/shared/ui/ratingStarDisplay/RatingStarDisplay', () => ({
  RatingStarDisplay: ({ score }: { score: number }) => (
    <div
      data-testid="rating-stars"
      data-score={score}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < score ? '★' : '☆'}</span>
      ))}
    </div>
  ),
}));

const baseProps = {
  score: 3,
  comment: '기본 테스트용 리뷰 텍스트 입니다.',
  dateTime: '2025.05.05',
};

describe('ReviewCard 테스트 ', () => {
  it('기본 필수 props 렌더링 테스트', () => {
    render(<ReviewCard {...baseProps} />);
    const reviewCard = screen.getByTestId('review-card');
    expect(reviewCard).toHaveTextContent('기본 테스트용 리뷰 텍스트 입니다.');
    expect(reviewCard).toHaveTextContent('2025.05.05');

    const rating = screen.getByTestId('rating-stars');
    expect(rating).toHaveAttribute('data-score', '3');
  });

  describe('리뷰페이지 테스트', () => {
    it('모든 props가 렌더링이어야 합니다.', () => {
      render(
        <ReviewCard
          {...baseProps}
          userName="고구마"
          gatheringName="이번주 주말 달리기"
          location="신림"
        />,
      );
      const reviewCard = screen.getByTestId('review-card');
      expect(reviewCard).toHaveTextContent('고구마');
      expect(reviewCard).toHaveTextContent('이번주 주말 달리기');
      expect(reviewCard).toHaveTextContent('신림');
    });
  });
  describe('상세페이지 테스트', () => {
    it('유저 이름이 렌더링 되어야한다. ', () => {
      render(
        <ReviewCard
          {...baseProps}
          userName="고구마"
        />,
      );
      const reviewCard = screen.getByTestId('review-card');
      expect(reviewCard).toHaveTextContent('고구마');
    });
  });
  describe('마이페이지 테스트', () => {
    it('모임이름과 지역이 렌더링 되어야한다.', () => {
      render(
        <ReviewCard
          {...baseProps}
          gatheringName="이번주 주말 달리기"
          location="신림"
        />,
      );
      const reviewCard = screen.getByTestId('review-card');
      expect(reviewCard).toHaveTextContent('이번주 주말 달리기');
      expect(reviewCard).toHaveTextContent('신림');
    });
  });
});
