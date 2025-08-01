'use client';

import { useTranslations } from 'next-intl';
import { useGetReviewScore } from '@/entities/review/api/queries';
import { ReviewType } from '@/entities/review/model/type';
import { RatingScore } from './RatingScore';
import { RatingScoreProgressBar } from './RatingScoreProgressBar';

interface Props {
  type?: ReviewType;
}

export const AllReviewRating = ({ type }: Props) => {
  // i18n 문자 변환
  const t = useTranslations('pages.reviews');
  const { data, error } = useGetReviewScore(type);
  if (error || !data) return <div>{t('scoreLoadError')}</div>;

  const {
    oneStar = 0,
    twoStars = 0,
    threeStars = 0,
    fourStars = 0,
    fiveStars = 0,
    averageScore = 0,
  } = data[0] || {};

  const starData = [
    { label: t('fiveStars'), count: fiveStars },
    { label: t('fourStars'), count: fourStars },
    { label: t('threeStars'), count: threeStars },
    { label: t('twoStars'), count: twoStars },
    { label: t('oneStar'), count: oneStar },
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
