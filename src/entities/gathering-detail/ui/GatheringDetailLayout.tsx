'use client';

import Image from 'next/image';
import { useGetGatheringDetail } from '@/entities/gathering-detail/api/queries';
import { GatheringDeadlineTag } from '@/entities/gathering/ui';
import { useGetParticipants } from '@/entities/participant/api/queries';
import { formatDateAndTime } from '@/shared/lib/date';
import { BottomFloatingBar, GatheringRole } from '@/widgets/BottomFloatingBar';
import { ContainerInformation } from '@/widgets/ContainerInformation';
import { ReviewList } from './ReviewList';

export const GatheringDetailLayout = ({ id }: { id: number }) => {
  const { data: gathering } = useGetGatheringDetail(id);

  const { data: participantsData } = useGetParticipants(id);

  const participants = participantsData!.map(({ userId, User }) => ({
    id: String(userId),
    image:
      User.image ||
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1728361169610_19610008.JPG',
  }));

  const { formattedDate, formattedTime } = formatDateAndTime(gathering.dateTime);

  return (
    <main className="tablet:mb-0 mb-[100px] flex flex-col items-center px-4 py-8">
      <section className="mb-8 flex w-full max-w-[996px] flex-col gap-4 md:flex-row">
        {/* Gathering Banner */}
        <div className="relative h-[270px] w-[486px] overflow-hidden rounded-xl">
          <Image
            src={gathering.image}
            alt={'alt'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 486px"
          />
          {/* Tag */}
          <GatheringDeadlineTag registrationEnd={new Date(gathering.registrationEnd)} />
        </div>
        {/* ContainerInformation 컴포넌트 */}
        <ContainerInformation
          title={gathering.name || '제목 없음'}
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
        <ReviewList id={id} />
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
