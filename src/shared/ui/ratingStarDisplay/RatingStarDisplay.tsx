import { StarIcon } from '../icon';

interface RatingStarDisplayProps {
  score?: number;
}

export const RatingStarDisplay = ({ score = 0 }: RatingStarDisplayProps) => {
  return (
    <>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
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
