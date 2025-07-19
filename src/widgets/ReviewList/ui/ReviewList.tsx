import { ReviewCard } from '@/entities/review/ui/ReviewCard';
import { ReviewListFilter } from '@/features/review/ReviewListFilter/ui/ReviewListFilter';
import { ReviewSort } from '@/features/review/ReviewSort/ui/ReviewSort';
import reviewImg from '../../../entities/review/ui/reviewImg.jpg';
import userCat from '../../../entities/review/ui/userCat.jpg';

export const ReviewList = () => {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <ReviewListFilter />
        <ReviewSort />
      </div>
      <div className="mt-8">
        <ReviewCard
          score={3}
          comment="우르라라라라라라 깡깡 우르라라라라라라 깡깡 우르라라라라라라 깡깡 우르라라라라라라 깡깡 우르라라라라라라 깡깡 우르라라라라라라 깡깡우르라라라라라라 깡깡우르라라라라라라 깡깡우르라라라라라라 깡깡"
          dateTime="2024-10-19T01:21:47.762Z"
          userName="이링"
          userImg={userCat}
          reviewImg={reviewImg}
          gatheringName="오늘도 힘차게 화이팅"
          location="신림"
        />
      </div>
    </>
  );
};
