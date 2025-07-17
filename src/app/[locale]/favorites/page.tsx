import { getTranslations } from 'next-intl/server';
import { Locale } from '@/i18n';

interface FavoritesPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function FavoritesPage({ params }: FavoritesPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.favorites' });

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-2xl font-bold">{t('title')}</div>
    </div>
  );
}
