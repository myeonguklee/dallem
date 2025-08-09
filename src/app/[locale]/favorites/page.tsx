'use client';

import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { TypeFilterGroup } from '@/features/filters/ui/TypeFilterGroup';
import { DoubleHeartIcon } from '@/shared/ui/icon';
import { PageInfoLayout } from '@/shared/ui/pageInfoLayout';
import { FavoritesList } from '@/widgets/FavoritesList/FavoritesList';
import { FavoritesSkeletonList } from '@/widgets/FavoritesSkeleton';

export default function FavoritesPage() {
  const t = useTranslations('pages.favorites');
  const searchParams = useSearchParams();
  const type = searchParams.get('type') ?? 'DALLAEMFIT';

  return (
    <div className="mt- mt-10 mb-20 flex flex-1 flex-col items-start">
      <div className="w-full">
        <PageInfoLayout
          infoImg={<DoubleHeartIcon size={60} />}
          title={t('title')}
          subtitle={t('subTitle')}
        />
      </div>

      <TypeFilterGroup />

      <Suspense fallback={<FavoritesSkeletonList />}>
        <FavoritesList type={type} />
      </Suspense>
    </div>
  );
}
