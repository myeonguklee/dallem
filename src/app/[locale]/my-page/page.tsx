import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

interface MyPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function MyPage({ params }: MyPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.myPage' });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-2xl font-bold">{t('title')}</div>
    </div>
  );
}
