import { StarIcon } from '../icon';

interface RatingStarDisplayProps {
  score?: number;
}

const STAR = [1, 2, 3, 4, 5];

export const RatingStarDisplay = ({ score = 0 }: RatingStarDisplayProps) => {
  return (
    <>
      <div
        aria-label={`평점 ${score} / 5점 만점`}
        className="flex gap-2"
      >
        {STAR.map((star) => (
          <StarIcon
            key={star}
            filled={star <= score}
            className="leading-8"
          />
        ))}
      </div>
    </>
  );
};
