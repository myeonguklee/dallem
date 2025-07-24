import { getTranslations } from 'next-intl/server';

export default async function MyPage() {
  const t = await getTranslations('pages.myPage');

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-2xl font-bold">{t('title')}</div>
    </div>
  );
}
