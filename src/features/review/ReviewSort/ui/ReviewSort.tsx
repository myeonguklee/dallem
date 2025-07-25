'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n';
import { Sort } from '@/shared/ui/sort';

export const ReviewSort = () => {
  // i18n 문자 변환
  const t = useTranslations('pages.reviews');
  const ReviewSortList = [
    { label: t('createdAt'), value: 'createdAt' },
    { label: t('scoreTop'), value: 'score' },
    { label: t('participantCount'), value: 'participantCount' },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const activeType = searchParams.get('sortBy') || 'createdAt';

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'createdAt') {
      params.delete('sortBy');
    } else {
      params.set('sortBy', value);
    }

    params.set('offset', '0'); // 필터 변경시 첫 페이지로
    router.push({
      pathname: '/gathering',
      query: Object.fromEntries(params.entries()),
    });
  };

  return (
    <>
      <div className="">
        <Sort
          options={ReviewSortList}
          selected={activeType}
          onChange={handleSortChange}
        />
      </div>
    </>
  );
};
