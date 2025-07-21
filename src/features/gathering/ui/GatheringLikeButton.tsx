'use client';

import { useState } from 'react';
import { LikeIcon, UnlikeIcon } from '@/shared/ui/icon';

interface GatheringLikeButtonProps {
  gatheringId: number;
}

export const GatheringLikeButton = ({ gatheringId }: GatheringLikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);

  // localstorage에서 찜한 목록 가져오기
  // gatheringId 있으면 isLiked true
  // 없으면 isLiked false

  console.log('gatheringId', gatheringId);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // localstorage 찜 혹은 찜 해제
  };

  return (
    <button
      onClick={handleLike}
      className="cursor-pointer"
    >
      {isLiked ? <LikeIcon /> : <UnlikeIcon />}
    </button>
  );
};
