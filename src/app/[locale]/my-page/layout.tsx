'use client';

import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { ProfileSection } from '@/entities/user/ui/ProfileSection';
import { MyPageTab } from '@/features/my-page/ui/MyPageTab';

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('pages.myPage');

  return (
    <div className="flex flex-1 flex-col gap-4">
      <p className="mt-5 text-2xl font-bold">{t('title')}</p>

      {/* 프로필 정보 */}
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileSection />
      </Suspense>
      <div className="border-t-2 border-t-gray-100" />

      <MyPageTab />

      {/* 중첩 라우팅을 위한 children 렌더링 */}
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </div>
  );
}
