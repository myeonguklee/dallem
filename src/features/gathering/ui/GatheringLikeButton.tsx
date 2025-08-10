'use client';

import { useTranslations } from 'next-intl';
import { useFavoritesAction } from '@/features/favorites/model/usefavorites';
import { LikeIcon, UnlikeIcon } from '@/shared/ui/icon';

interface GatheringLikeButtonProps {
  gatheringId: number;
  onToggle?: () => void;
}

export const GatheringLikeButton = ({ gatheringId, onToggle }: GatheringLikeButtonProps) => {
  const t = useTranslations('ui.likeButton');
  const { isLiked, handleFavoritesStorage } = useFavoritesAction(gatheringId);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleFavoritesStorage();
    onToggle?.();
  };

  const iconProps = {
    'aria-hidden': true,
    role: 'img' as const,
  };

  return (
    <button
      onClick={handleLike}
      aria-label={isLiked ? t('unlike') : t('like')}
      aria-pressed={isLiked}
      className="cursor-pointer"
      type="button"
    >
      {isLiked ? <LikeIcon {...iconProps} /> : <UnlikeIcon {...iconProps} />}
    </button>
  );
};
