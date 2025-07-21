import { getTranslations } from 'next-intl/server';
import { Locale } from '@/i18n';
import { Button } from '@/shared/ui/button';
import { DoubleHeartIcon } from '@/shared/ui/icon';

interface GatheringPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function GatheringPage({ params }: GatheringPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.gatherings' });

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="mt-10 flex h-20 w-full items-center gap-4">
        <DoubleHeartIcon />
        <div className="flex h-full flex-col justify-evenly">
          <p className="text-sm font-medium">함께 할 사람이 없나요?</p>
          <p className="text-2xl font-semibold">지금 모임에 참여해보세요</p>
        </div>
      </div>
      <div className="flex justify-end">
        <Button className="">모임 만들기</Button>
      </div>

      <div></div>
      <div className="text-2xl font-bold">{t('title')}</div>
    </div>
  );
}
