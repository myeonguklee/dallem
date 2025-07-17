import { getTranslations } from 'next-intl/server';
import { Locale } from '@/i18n';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">{t('pages.home.title')}</h1>
      <p className="text-xl text-gray-600">{t('pages.home.welcome')}</p>
    </div>
  );
}
