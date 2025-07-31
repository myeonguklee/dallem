'use client';

import { useTranslations } from 'next-intl';
import { useFavoritesAction } from '@/features/favorites/model/usefavorites';
import { InfoChip, StateChip } from '@/shared/ui/chip';
import { LikeIcon, UnlikeIcon } from '@/shared/ui/icon';
import { ProgressBar } from '@/shared/ui/progressbar';
import { cva } from 'class-variance-authority';
import { AvatarGroup } from './AvatarGroup';

type ContainerInformationProps = {
  id?: number;
  title: string;
  location: string;
  date: string; // e.g. '1월 7일'
  time: string; // e.g. '17:30'
  participants: Array<{ id: string; image: string }>;
  maxParticipants: number;
  minParticipants: number;
};

export const containerInformationVariants = cva(
  // 공통 스타일
  'rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm min-w-0 flex-1 break-words w-full min-h-[270px]',
);

export const ContainerInformation = ({
  title,
  location,
  date,
  time,
  participants,
  maxParticipants,
  minParticipants,
  id,
}: ContainerInformationProps) => {
  const { isLiked, handleFavoritesStorage } = useFavoritesAction(id);
  const isConfirmed = participants.length >= minParticipants;
  const visibleAvatars = participants.slice(0, 4).map((p) => p.image);
  const extraCount = participants.length > 4 ? participants.length - 4 : 0;
  const t = useTranslations('pages.gathering.detail');

  return (
    <div className={containerInformationVariants()}>
      <div className="flex items-center justify-between border-b-2 border-dashed border-b-gray-200 pb-4">
        <div className="flex flex-col justify-center gap-3">
          <div className="gap-0.5">
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            <p className="text-xs text-gray-700">{location}</p>
          </div>
          <div className="flex gap-1">
            <InfoChip info={date} />
            <InfoChip
              info={time}
              variant={'time'}
            />
          </div>
        </div>
        {/* 우측 상단 좋아요 */}
        <div className="flex">
          <button
            onClick={handleFavoritesStorage}
            className="cursor-pointer"
            aria-label={t(isLiked ? 'unlike' : 'like')}
          >
            {isLiked ? <LikeIcon size={48} /> : <UnlikeIcon size={48} />}
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-between gap-4">
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold whitespace-nowrap text-gray-900">
              {t('participantStatus', { count: participants.length })}
            </span>
            <AvatarGroup
              avatars={visibleAvatars}
              extraCount={extraCount}
            />
          </div>
          {isConfirmed && (
            <StateChip
              variant="confirmed"
              className="whitespace-nowrap"
            >
              {t('confirmed')}
            </StateChip>
          )}
        </div>
        <ProgressBar
          minToConfirm={minParticipants}
          current={participants.length}
          total={maxParticipants}
        />

        <div className="flex w-full justify-between text-xs text-gray-500">
          <span>{t('minParticipants', { count: minParticipants })}</span> {/* 최소인원 n명 */}
          <span>{t('maxParticipants', { count: maxParticipants })}</span> {/* 최대인원 n명 */}
        </div>
      </div>
    </div>
  );
};
