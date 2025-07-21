'use client';

import Image from 'next/image';
import { formatDateAndTime } from '@/shared/lib/date';
import { Tag } from '@/shared/ui/tag';
import { BottomFloatingBar, GatheringRole } from '@/widgets/BottomFloatingBar';
import { ContainerInformation } from '@/widgets/ContainerInformation';
import capProfileImage from '@/widgets/ContainerInformation/cap-profile.jpg';
import { ReviewList } from './ReviewList';

export const GatheringDetailLayout = ({ id }: { id: string }) => {
  // const { data: gathering, isLoading, error } = useGetGatheringDetail(Number(id));
  // if (isLoading) return <p>로딩 중...</p>;
  // if (error) return <p>에러 발생</p>;
  // if (!gathering) return null;
  // const { data: participantsData } = useGetParticipants(Number(id));

  const gathering = {
    teamId: '1',
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
  const participantsData = [
    {
      teamId: 1,
      userId: 1,
      gatheringId: 100,
      joinedAt: '2025-07-21T10:00:00Z',
      User: {
        id: 1,
        email: 'alice@example.com',
        name: 'Alice',
        companyName: 'OpenAI',
        image: '/cat-profile.jpg',
      },
    },
    {
      teamId: 1,
      userId: 2,
      gatheringId: 100,
      joinedAt: '2025-07-21T10:01:00Z',
      User: {
        id: 2,
        email: 'bob@example.com',
        name: 'Bob',
        companyName: 'Google',
        image: '/cat-profile.jpg',
      },
    },
    {
      teamId: 1,
      userId: 3,
      gatheringId: 100,
      joinedAt: '2025-07-21T10:02:00Z',
      User: {
        id: 3,
        email: 'carol@example.com',
        name: 'Carol',
        companyName: 'Meta',
        image: '/cat-profile.jpg',
      },
    },
  ];
  const participants = participantsData.map(({ userId, User }) => ({
    id: String(userId),
    image: User.image,
  }));

  const { formattedDate, formattedTime } = formatDateAndTime(gathering.dateTime);
  console.log('Gathering ID:', id);
  return (
    <main className="tablet:pb-[84px] flex flex-col items-center px-4 py-8 pb-0">
      <section className="mb-8 flex w-full max-w-[996px] flex-col gap-4 md:flex-row">
        {/* Gathering Banner */}
        <div className="relative h-[270px] w-[486px] overflow-hidden rounded-xl">
          <Image
            src={capProfileImage}
            alt={'alt'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 486px"
          />
          <div className="absolute top-2 right-2 z-10">
            <Tag tagColor={'primary'}>오늘 {'21'}시 마감</Tag>
          </div>
        </div>
        {/* ContainerInformation 컴포넌트 */}
        <ContainerInformation
          title={gathering.name}
          location={gathering.location}
          date={formattedDate}
          time={formattedTime}
          participants={participants}
          minParticipants={5}
          maxParticipants={gathering.capacity}
        />
        {/* 리뷰 리스트 컴포넌트 */}
      </section>
      <section className="h-[687px] w-full max-w-[996px] border-t-2 border-gray-300 bg-gray-50 p-4">
        <h2 className="mb-4 text-xl font-semibold">생생 후기</h2>
        <ReviewList />
      </section>
      {/* 하단 플로팅 바 */}
      <BottomFloatingBar
        role={GatheringRole.GUEST}
        title="더 건강한 프로그램"
        content="국내 최고 웰니스 전문가와 프로그램을 통해 회복해요"
      />
    </main>
  );
};
