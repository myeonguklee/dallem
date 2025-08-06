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
/* eslint-disable @next/next/no-img-element */
jest.mock('@/shared/ui/OptimizedImage/OptimizedImage', () => ({
  OptimizedImage: ({ src, alt }: { src: string; alt: string }) => (
    <img
      data-testid="review-img"
      src={src}
      alt={alt}
    />
  ),
}));

const baseProps = {
  score: 3,
  comment: '기본 테스트용 리뷰 텍스트 입니다.',
  dateTime: '2025.05.05',
};

describe('ReviewCard 테스트 ', () => {
  it('기본 필수 props가 정상 렌더링되어야 한다', () => {
    render(<ReviewCard {...baseProps} />);
    expect(screen.getByTestId('review-card')).toHaveTextContent(baseProps.comment);
    expect(screen.getByTestId('review-card')).toHaveTextContent(baseProps.dateTime);
    expect(screen.getByTestId('rating-stars')).toHaveAttribute('data-score', '3');
  });

  describe('조건부 렌더링', () => {
    it('reviewImg가 undefined이면 이미지 영역이 렌더되지 않아야 한다', () => {
      render(<ReviewCard {...baseProps} />);
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('reviewImg가 값이 있으면, 이미지가 그려져야한다. ', () => {
      render(
        <ReviewCard
          {...baseProps}
          reviewImg="/review.png"
        />,
      );
      const img = screen.getByRole('img', { name: '모임 이미지' });
      expect(img).toBeInTheDocument();
    });

    it('reviewImg가 값이 false 상태로 오면 기본 이미지가 렌더 되어야한다.', () => {
      render(
        <ReviewCard
          {...baseProps}
          reviewImg=""
        />,
      );
      const img = screen.getByRole('img', { name: '모임 이미지' }) as HTMLImageElement;
      expect(img.src).toContain('/gathering-default-image.png');
    });

    it('userImg가 undefined면 프로필 이미지가 렌더되지 않아야 한다', () => {
      render(
        <ReviewCard
          {...baseProps}
          userName="고구마"
        />,
      );
      expect(screen.queryByLabelText('프로필 이미지')).not.toBeInTheDocument();
    });

    it('location이 없으면 지역 텍스트가 렌더되지 않아야 한다', () => {
      render(
        <ReviewCard
          {...baseProps}
          gatheringName="모임"
        />,
      );
      expect(screen.queryByLabelText('지역')).not.toBeInTheDocument();
    });

    it('userName이 없으면 이름 텍스트가 렌더되지 않아야 한다', () => {
      render(
        <ReviewCard
          {...baseProps}
          location="신림"
        />,
      );
      expect(screen.queryByLabelText('유저이름')).not.toBeInTheDocument();
    });
  });

  describe('전체 props가 전달될 때', () => {
    it('모든 정보가 정확하게 렌더링되어야 한다', () => {
      render(
        <ReviewCard
          {...baseProps}
          userName="고구마"
          userImg="/user.png"
          gatheringName="이번주 주말 달리기"
          location="신림"
          reviewImg="/review.png"
        />,
      );
      expect(screen.getByTestId('review-card')).toHaveTextContent('고구마');
      expect(screen.getByTestId('review-card')).toHaveTextContent('이번주 주말 달리기');
      expect(screen.getByTestId('review-card')).toHaveTextContent('신림');
    });
  });

  describe('alt 분기 처리 테스트 ', () => {
    it('gatheringName이 없을 경우 alt는 "모임 이미지"여야 한다', () => {
      render(
        <ReviewCard
          {...baseProps}
          reviewImg="/review.png"
        />,
      );
      const img = screen.getByRole('img', { name: '모임 이미지' });
      expect(img).toBeInTheDocument();
    });

    it('userName이 없을 경우 alt는 "유저 이미지"여야 한다', () => {
      render(
        <ReviewCard
          {...baseProps}
          userImg="/user.png"
        />,
      );
      const img = screen.getByRole('img', { name: '유저 이미지' });
      expect(img).toBeInTheDocument();
    });
  });
});
