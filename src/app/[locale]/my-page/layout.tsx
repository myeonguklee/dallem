import { getTranslations } from 'next-intl/server';
import { MyPageTab } from '@/features/my-page/ui/MyPageTab';
import { Locale } from '@/i18n/routing';
import { EditIcon, ProfileBGIcon, ProfileIcon } from '@/shared/ui/icon';

interface MyPageLayoutProps {
  params: Promise<{ locale: Locale }>;
  children: React.ReactNode;
}

export default async function MyPageLayout({ params, children }: MyPageLayoutProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.myPage' });

  return (
    <div className="flex flex-1 flex-col gap-4">
      <p className="mt-5 text-2xl font-bold">{t('title')}</p>

      {/* 프로필 정보 */}
      <div className="flex h-40 w-full flex-col overflow-hidden rounded-2xl border border-gray-100">
        <div className="flex flex-1 items-center justify-between bg-orange-400 px-4">
          <p className="text-lg font-semibold">내 프로필</p>
          <div className="tablet:gap-10 web:gap-20 flex items-center gap-2">
            <ProfileBGIcon className="self-end" />
            <EditIcon />
          </div>
        </div>
        <div className="h-2 border-t-2 border-t-orange-500 bg-orange-400" />

        <div className="flex flex-2 gap-2 bg-white px-5">
          <ProfileIcon className="-translate-y-3" />
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">이름</p>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">회사</p>
              <p className="text-sm font-medium">이메일</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-t-gray-100" />

      <MyPageTab />

      {/* 중첩 라우팅을 위한 children 렌더링 */}
      {children}
    </div>
  );
}
