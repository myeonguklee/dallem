'use client';

import { useEffect, useState } from 'react';
import { isFavorite, toggleFavorite } from './favoritesStorage';

export const useFavoritesAction = (id: number) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(isFavorite(id));
  }, [id]);

  const handleFavoritesStorage = () => {
    toggleFavorite(id);
    setIsLiked(!isLiked);
  };

  return {
    isLiked,
    handleFavoritesStorage,
  };
};
