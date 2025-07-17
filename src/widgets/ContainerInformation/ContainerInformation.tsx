'use client';

import { useState } from 'react';
import { InfoChip, StateChip } from '@/shared/ui/chip';
import { LikeIcon, UnlikeIcon } from '@/shared/ui/icon';
import { ProgressBar } from '@/shared/ui/progressbar';
import { type VariantProps, cva } from 'class-variance-authority';
import { AvatarGroup } from './AvatarGroup';
import capProfileImage from './cap-profile.jpg';

type ContainerInformationProps = {
  title: string;
  location: string;
  date: string; // e.g. '1월 7일'
  time: string; // e.g. '17:30'
  participants: Array<{ id: string; avatarUrl: string }>;
  maxParticipants: number;
  minParticipants: number;
} & VariantProps<typeof containerInformationVariants>;

export const containerInformationVariants = cva(
  'rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm', // 공통 스타일
  {
    variants: {
      size: {
        large: 'h-[270px] w-[486px]',
        small: 'h-[240px] w-[340px]',
      },
    },
    defaultVariants: {
      size: 'large',
    },
  },
);

export const ContainerInformation = ({
  title,
  location,
  date,
  time,
  participants,
  maxParticipants,
  minParticipants,
  size,
}: ContainerInformationProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const isConfirmed = participants.length >= minParticipants;
  const avatars = [capProfileImage, capProfileImage, capProfileImage, capProfileImage];
  const extraCount = participants.length - avatars.length;
  return (
    <div className={containerInformationVariants({ size })}>
      <div className="flex items-center justify-between border-b-2 border-dashed border-b-gray-200">
        <div className="flex h-[129px] flex-col justify-center gap-3">
          <div className="gap-0.5">
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            <p className="text-xs text-gray-500">{location}</p>
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
            onClick={() => setIsLiked((prev) => !prev)}
            className="cursor-pointer"
            aria-label={isLiked ? '좋아요 취소' : '좋아요'}
          >
            {isLiked ? <LikeIcon size={48} /> : <UnlikeIcon size={48} />}
          </button>
        </div>
      </div>
      <div className="mt-2 flex h-[69px] flex-col items-center justify-between">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold whitespace-nowrap text-gray-900">
              모집 정원 {participants.length}명
            </span>
            <AvatarGroup
              avatars={avatars}
              extraCount={extraCount}
            />
          </div>
          {isConfirmed && (
            <StateChip
              variant="confirmed"
              className="whitespace-nowrap"
            >
              개설확정
            </StateChip>
          )}
        </div>
        <ProgressBar
          minToConfirm={minParticipants}
          current={participants.length}
          total={maxParticipants}
        />

        <div className="flex w-full justify-between text-xs text-gray-500">
          <span>최소인원 {minParticipants}명</span>
          <span>최대인원 {maxParticipants}명</span>
        </div>
      </div>
    </div>
  );
};
