import { getTranslations } from 'next-intl/server';
import { Locale } from '@/i18n';

interface SignUpPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function SignUpPage({ params }: SignUpPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.signup' });

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-2xl font-bold">{t('title')}</div>
    </div>
  );
}
