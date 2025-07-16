import { getTranslations } from 'next-intl/server';

export default async function ProfilePage() {
  const t = await getTranslations('pages.profile');

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-2xl font-bold">{t('title')}</div>
    </div>
  );
}
