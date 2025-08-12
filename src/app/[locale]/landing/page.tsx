import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n';
import { HealingLanding } from '@/widgets/landing/ui/HealingLanding';

type Locale = (typeof routing.locales)[number];

export const dynamic = 'force-static';
export const revalidate = false;
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.landing.seo' });
  const title = t('title');
  const description = t('description');

  const languages = Object.fromEntries(routing.locales.map((l) => [l, `/${l}/landing`]));

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/landing`,
      languages,
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/landing`,
      type: 'website',
      locale,
    },
  };
}

export default function Page() {
  return <HealingLanding />;
}
