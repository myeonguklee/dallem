import type { Locale } from 'next-intl';
import { redirect } from '@/i18n';
import { ROUTES } from '@/shared/config/routes';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  // 홈페이지를 모임 목록 페이지로 리다이렉트
  redirect({ href: ROUTES.GATHERING, locale });
}
