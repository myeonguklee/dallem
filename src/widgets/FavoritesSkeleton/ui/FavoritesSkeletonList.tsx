import { FavoritesSkeletonCard } from './FavoritesSkeletonCard';

export const FavoritesSkeletonList = () => (
  <div className="w-full space-y-6">
    {Array.from({ length: 7 }).map((_, i) => (
      <FavoritesSkeletonCard key={i} />
    ))}
  </div>
);
