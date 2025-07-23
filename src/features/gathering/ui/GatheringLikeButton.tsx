'use client';

import { useEffect, useState } from 'react';
import { isFavorite, toggleFavorite } from '@/features/favorites/model/favoritesStorage';
import { LikeIcon, UnlikeIcon } from '@/shared/ui/icon';

interface GatheringLikeButtonProps {
  gatheringId: number;
  onToggle?: (gatheringId: number) => void;
}

export const GatheringLikeButton = ({ gatheringId, onToggle }: GatheringLikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);

  // localstorage에서 찜한 목록 가져오기
  // gatheringId 있으면 isLiked true
  // 없으면 isLiked false

  useEffect(() => {
    setIsLiked(isFavorite(gatheringId));
  }, [gatheringId]);

  console.log('gatheringId', gatheringId);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // localstorage 찜 혹은 찜 해제
    toggleFavorite(gatheringId);
    if (onToggle) return onToggle(gatheringId);
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
