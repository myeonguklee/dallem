import { RatingStarDisplay } from '@/shared/ui/ratingStarDisplay/RatingStarDisplay';
import { MAX_RATING } from '../constants';

interface RatingScoreProps {
  averageScore: number;
}

export const RatingScore = ({ averageScore }: RatingScoreProps) => {
  // 평균값 반올림
  const score = Math.round(averageScore);

  return (
    <div className="text-center">
      <div className="mb-2">
        <strong className="text-2xl">{score}</strong>
        <span className="text-2xl font-bold text-gray-400"> / {MAX_RATING}</span>
      </div>
      <RatingStarDisplay score={score} />
    </div>
  );
};
