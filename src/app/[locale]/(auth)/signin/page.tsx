import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

interface SignInPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function SignInPage({ params }: SignInPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.signin' });

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-2xl font-bold">{t('title')}</div>
    </div>
  );
}
