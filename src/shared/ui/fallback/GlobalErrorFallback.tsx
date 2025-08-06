'use client';

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n';
import { ROUTES } from '@/shared/config/routes';

// 디자인 시스템에 맞게 추후 변경
export function GlobalErrorFallback({
  reset,
}: {
  error: Error;
  reset: (() => void) | (() => Promise<void>);
}) {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('errors.global');

  const handleGoHome = () => {
    router.push(ROUTES.GATHERING, { locale });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">{t('title')}</h2>
        <p className="mb-6 text-gray-600">{t('message')}</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => reset()}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none"
          >
            {t('retryButton')}
          </button>
          <button
            onClick={handleGoHome}
            className="rounded-lg bg-orange-500 px-5 py-2.5 text-base font-medium text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none"
          >
            {t('backToHome')}
          </button>
        </div>
      </div>
    </div>
  );
}
