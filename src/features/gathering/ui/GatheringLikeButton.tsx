'use client';

import { useFavoritesStore } from '@/features/favorites/model/favoritesStore';
import { LikeIcon, UnlikeIcon } from '@/shared/ui/icon';

interface GatheringLikeButtonProps {
  gatheringId: number;
}

export const GatheringLikeButton = ({ gatheringId }: GatheringLikeButtonProps) => {
  const isLiked = useFavoritesStore((state) => state.isFavorite(gatheringId));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  // localstorage에서 찜한 목록 가져오기
  // gatheringId 있으면 isLiked true
  // 없으면 isLiked false

  console.log('gatheringId', gatheringId);

  // localstorage 찜 혹은 찜 해제
  const handleLike = () => {
    toggleFavorite(gatheringId);
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
