'use client';

import { useEffect, useState } from 'react';
import { isFavorite, toggleFavorite } from './favoritesStorage';

export const useFavoritesAction = (id?: number) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (id !== undefined) {
      setIsLiked(isFavorite(id));
    }
  }, [id]);

  const handleFavoritesStorage = () => {
    if (id === undefined) return;
    toggleFavorite(id);
    setIsLiked(!isLiked);
  };

  return {
    isLiked,
    handleFavoritesStorage,
  };
};
