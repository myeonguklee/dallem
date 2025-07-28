'use client';

import Image from 'next/image';
import {
  useCancelGathering,
  useGetGatheringDetail,
  useJoinGathering,
  useLeaveGathering,
} from '@/entities/gathering-detail/api/queries';
import { GatheringDeadlineTag } from '@/entities/gathering/ui';
import { useGetParticipants } from '@/entities/participant/api/queries';
import { useRouter } from '@/i18n/navigation';
import { ROUTES } from '@/shared/config/routes';
import { formatDateAndTime } from '@/shared/lib/date';
import { BottomFloatingBar, GatheringRole } from '@/widgets/BottomFloatingBar';
import { ContainerInformation } from '@/widgets/ContainerInformation';
import { ReviewList } from './ReviewList';

export const GatheringDetailLayout = ({ id }: { id: number }) => {
  const { data: gathering } = useGetGatheringDetail(id);

  const { data: participantsData } = useGetParticipants(id);

  const { mutate: join, isPending: isJoining } = useJoinGathering();
  const { mutate: leave, isPending: isLeaving } = useLeaveGathering();
  const { mutate: cancel, isPending: isCanceling } = useCancelGathering();
  const router = useRouter();

  // isPending 상태 값 활용하기전 임시 콘솔
  console.log(isJoining, isLeaving, isCanceling);

  const isFull = gathering.capacity <= gathering.participantCount;

  const handleJoin = () => {
    join(id);
  };

  const handleLeave = () => {
    leave(id);
  };

  const handleCancel = () => {
    // 윈도우 컨펌 대신 모달 or 알림 표시 x
    if (window.confirm('정말로 모임을 취소하시겠습니까?')) {
      cancel(id, {
        onSuccess: () => {
          // 성공 시 목록 페이지로 이동
          router.push(ROUTES.GATHERING);
        },
      });
    }
  };

  const handleShare = () => {
    // 공유하기 로직 구현
    // url링크 클립보드로 복사
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('모임 링크가 클립보드에 복사되었습니다!');
    });
  };

  const participants =
    participantsData?.map(({ userId, User }) => ({
      id: String(userId),
      image:
        User.image ||
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1728361169610_19610008.JPG',
    })) ?? [];

  const { formattedDate, formattedTime } = formatDateAndTime(gathering.dateTime);

  return (
    <div className="tablet:mb-[100px] mb-[200px] flex flex-col items-center px-4 py-8">
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
      <section className="h-[687px] w-full max-w-[996px] border-t-2 border-gray-300 p-4">
        <h2 className="mb-4 text-xl font-semibold">이용자들은 이 프로그램을 이렇게 느꼈어요!</h2>
        <ReviewList id={id} />
      </section>
      {/* 하단 플로팅 바 */}
      <BottomFloatingBar
        role={GatheringRole.HOST}
        title="더 건강한 프로그램"
        content="국내 최고 웰니스 전문가와 프로그램을 통해 회복해요"
        isFull={isFull}
        onJoin={handleJoin}
        onCancelJoin={handleLeave}
        onCancelProject={handleCancel}
        onShare={handleShare}
      />
    </div>
  );
};
