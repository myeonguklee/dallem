'use client';

import { useFavoritesAction } from '@/features/favorites/model/usefavorites';
import { LikeIcon, UnlikeIcon } from '@/shared/ui/icon';

interface GatheringLikeButtonProps {
  gatheringId: number;
  onToggle?: () => void;
}

export const GatheringLikeButton = ({ gatheringId, onToggle }: GatheringLikeButtonProps) => {
  const { isLiked, handleFavoritesStorage } = useFavoritesAction(gatheringId);

  const handleLike = () => {
    handleFavoritesStorage();
    onToggle?.();
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
