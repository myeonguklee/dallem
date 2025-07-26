'use client';

import { useState } from 'react';
import { useGetGatheringsJoined } from '@/entities/gathering/api/queries';
import { useGetReviews } from '@/entities/review/api/my-page';
import { Chip } from '@/shared/ui/chip';

export default function Reviews() {
  const [tab, setTab] = useState<'writable' | 'written'>('writable');

  const { data: gatherings } = useGetGatheringsJoined({
    completed: true,
    reviewed: tab === 'writable' ? false : true,
  });

  // TODO: 로그인 사용자로 변경
  const { data: reviews } = useGetReviews({
    user: 10,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Chip
          active={tab === 'writable'}
          onClick={() => setTab('writable')}
        >
          작성 가능한 리뷰
        </Chip>
        <Chip
          active={tab === 'written'}
          onClick={() => setTab('written')}
        >
          작성한 리뷰
        </Chip>
      </div>
      {tab === 'writable' && gatherings && gatherings.length > 0 ? (
        <div className="flex flex-col gap-4">
          {gatherings?.map((gathering) => (
            <div key={gathering.id}>{gathering.name}</div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="text-center text-sm text-gray-500">작성 가능한 리뷰가 없습니다.</div>
        </div>
      )}
      {tab === 'written' && reviews && reviews.data.length > 0 ? (
        <div className="flex flex-col gap-4">
          {reviews?.data.map((review) => (
            <div key={review.id}>{review.comment}</div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="text-center text-sm text-gray-500">작성한 리뷰가 없습니다.</div>
        </div>
      )}
    </div>
  );
}
