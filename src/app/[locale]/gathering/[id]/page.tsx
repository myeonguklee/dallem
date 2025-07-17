import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Locale } from '@/i18n';
import { formatDateAndTime } from '@/shared/lib/date';
import { ContainerInformation } from '@/widgets/ContainerInformation';
import capProfileImage from '@/widgets/ContainerInformation/cap-profile.jpg';

interface GatheringDetailPageProps {
  params: Promise<{ id: string; locale: Locale }>;
}

export default async function GatheringDetailPage({ params }: GatheringDetailPageProps) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.gathering.detail' });
  const gathering = {
    teamId: 1,
    id: 1,
    type: '친목',
    name: '달램핏 오피스 스트레칭',
    dateTime: '2025-07-17T19:30:00Z',
    registrationEnd: '2025-07-19T17:00:00Z',
    location: '을지로 3가',
    participantCount: 4,
    capacity: 10,
    image: '/gathering-banner.jpg',
    createdBy: 123,
    canceledAt: null,
  };
  const { formattedDate, formattedTime } = formatDateAndTime(gathering.dateTime);

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <div className="text-2xl font-bold">
        {t('title')} - ID: {id}
      </div>
      <div className="flex w-[996px] gap-4">
        <div className="relative h-[270px] w-[486px] overflow-hidden rounded-xl">
          <Image
            src={capProfileImage}
            alt={'alt'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 486px"
          />
        </div>
        <ContainerInformation
          title={gathering.name}
          location={gathering.location}
          date={formattedDate}
          time={formattedTime}
          participants={[
            { id: '1', avatarUrl: '/cat-profile.jpg' },
            { id: '2', avatarUrl: '/cat-profile.jpg' },
            { id: '3', avatarUrl: '/cat-profile.jpg' },
            { id: '4', avatarUrl: '/cat-profile.jpg' },
            { id: '5', avatarUrl: '/cat-profile.jpg' },
            { id: '6', avatarUrl: '/cat-profile.jpg' },
          ]}
          minParticipants={5}
          maxParticipants={gathering.capacity}
        />
      </div>
    </div>
  );
}
