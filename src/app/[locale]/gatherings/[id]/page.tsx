import { getTranslations } from 'next-intl/server';

export default async function GatheringDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations('pages.gathering.detail');

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-2xl font-bold">
        {t('title')} - ID: {id}
      </div>
    </div>
  );
}
