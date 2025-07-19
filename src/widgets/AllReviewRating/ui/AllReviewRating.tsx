import { RatingScore } from './RatingScore';
import { RatingScoreProgressBar } from './RatingScoreProgressBar';

const stars = {
  teamId: 1,
  oneStar: 0,
  twoStars: 2,
  threeStars: 4,
  fourStars: 5,
  fiveStars: 10,
  averageScore: 3.6,
};

export const AllReviewRating = () => {
  // 추후 최적화 필요한 코드
  const { oneStar, twoStars, threeStars, fourStars, fiveStars, averageScore } = stars;
  const starData = [
    { label: '5점', count: fiveStars },
    { label: '4점', count: fourStars },
    { label: '3점', count: threeStars },
    { label: '2점', count: twoStars },
    { label: '1점', count: oneStar },
  ];
  const total = starData.reduce((sum, { count }) => sum + count, 0);

  return (
    <>
      <div className="tablet:gap-8 web:gap-16 desktop:gap-24 mx-auto my-20 flex h-[116px] w-full max-w-[610px] min-w-[343px] items-center justify-center gap-0">
        <div className="flex-none">
          <RatingScore averageScore={averageScore} />
        </div>
        <div className="tablet:w-[280px] web:w-[350px] desktop:w-[400px] ml-4 w-[180px]">
          <RatingScoreProgressBar
            stars={starData}
            total={total}
          />
        </div>
      </div>
    </>
  );
};
