'use client';

import { useTranslations } from 'next-intl';

export default function GatheringError({
  error,
  reset,
}: {
  error: Error & { digest?: string; status?: number };
  reset: () => void;
}) {
  const t = useTranslations('pages.gatherings.error');

  // 에러 메시지로 400 에러인지 확인
  const isClientError = error.message === '유효한 모임 종류를 입력하세요' || error.status === 400;

  const handleNavigateToGathering = () => {
    // 현재 locale을 가져와서 강제 이동
    const currentPath = window.location.pathname;
    const locale = currentPath.split('/')[1]; // /ko/gathering/error -> ko
    window.location.href = `/${locale}/gathering`;
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <div className="text-center">
        <h2 className="mb-2 text-xl font-semibold text-gray-900">{t('title')}</h2>
        <p className="mb-4 text-gray-600">{error.message}</p>
        <p className="text-sm text-gray-500">
          {isClientError ? t('clientErrorDescription') : t('serverErrorDescription')}
        </p>
      </div>

      <div className="flex gap-2">
        {isClientError ? (
          // 400 에러일 때: 모임 찾기 페이지로 이동
          <button
            onClick={handleNavigateToGathering}
            className="bg-primary rounded-lg px-4 py-2 text-white hover:bg-orange-600"
          >
            {t('navigateToGathering')}
          </button>
        ) : (
          // 그 외 에러일 때: 재시도
          <button
            onClick={reset}
            className="bg-primary rounded-lg px-4 py-2 text-white hover:bg-orange-600"
          >
            {t('retry')}
          </button>
        )}
      </div>
    </div>
  );
}
