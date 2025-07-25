import { getTranslations } from 'next-intl/server';

export default async function HomePage() {
  const t = await getTranslations('pages.home');

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <p className="text-xl text-gray-600">{t('welcome')}</p>
    </div>
  );
}
