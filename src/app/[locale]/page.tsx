import { getTranslations } from 'next-intl/server';

export default async function HomePage() {
  const t = await getTranslations('pages.home');

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-2xl font-bold">{t('title')}</div>
    </div>
  );
}
