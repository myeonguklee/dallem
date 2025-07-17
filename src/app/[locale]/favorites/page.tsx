'use client';

import { useTranslations } from 'next-intl';

export default function FavoritesPage() {
  const t = useTranslations('pages.favorites');

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-2xl font-bold">{t('title')}</div>
    </div>
  );
}
