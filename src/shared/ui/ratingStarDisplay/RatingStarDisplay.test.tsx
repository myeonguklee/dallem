import { render, screen } from '@testing-library/react';
import { RatingStarDisplay } from './RatingStarDisplay';

describe('RatingStarDisplay 테스트', () => {
  it('항상 별이 5개 렌더링 되어야한다.', () => {
    render(<RatingStarDisplay />);
    const stars = screen.getAllByRole('img'); // 5개의 StarIcon
    expect(stars).toHaveLength(5);
  });
  it('score가 0이면 모두 empty-star여야 한다', () => {
    render(<RatingStarDisplay score={0} />);
    const filled = screen.queryAllByLabelText('filled-star');
    const empty = screen.getAllByLabelText('empty-star');

    // 채워진 별의 갯수는 0
    expect(filled).toHaveLength(0);
    // 빈 별의 갯수는 5
    expect(empty).toHaveLength(5);
  });
  it('score가 3이면 filled 3개, empty 2개여야 한다', () => {
    render(<RatingStarDisplay score={3} />);
    const filled = screen.queryAllByLabelText('filled-star');
    const empty = screen.getAllByLabelText('empty-star');
    expect(filled).toHaveLength(3);
    expect(empty).toHaveLength(2);
  });
  it('score가 5이면 모두 filled-star여야 한다', () => {
    render(<RatingStarDisplay score={5} />);
    const filled = screen.getAllByLabelText('filled-star');
    const empty = screen.queryAllByLabelText('empty-star');
    expect(filled).toHaveLength(5);
    expect(empty).toHaveLength(0);
  });
  it('aria-label이 정확히 평점을 표시해야 한다', () => {
    render(<RatingStarDisplay score={4} />);
    const container = screen.getByLabelText('평점 4 / 5점 만점');
    expect(container).toBeInTheDocument();
  });
});
