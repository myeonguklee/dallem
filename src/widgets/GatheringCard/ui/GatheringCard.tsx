import Image from 'next/image';
import { Button } from '@/shared/ui/button/Button';
import { InfoChip, StateChip } from '@/shared/ui/chip';
import { UnlikeIcon } from '@/shared/ui/icon';
import { ProgressBar } from '@/shared/ui/progressbar';
import { Tag } from '@/shared/ui/tag/Tag';

export const GatheringCard = () => {
  return (
    <div className="tablet:flex-row rounded-common flex w-full max-w-[996px] flex-col overflow-hidden border border-gray-200 bg-white">
      <div className="tablet:w-[280px] relative w-full">
        <Image
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=224&fit=crop&crop=center&q=80"
          width={400}
          height={224}
          alt="gathering-image"
          className="tablet:h-full h-40 w-full object-cover"
          sizes="(max-width: 744px) 100vw, 280px"
          priority
        />
        {/* 오버레이 - 마감 시간 */}
        <Tag
          tagColor="primary"
          className="absolute top-0 right-0"
        >
          오늘 21시 마감
        </Tag>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-black">워케이션 | 을지로 3가</h3>
            <div className="flex gap-2">
              <InfoChip info={'1월 7일'} />
              <InfoChip
                info={'17:30'}
                variant="time"
              />
            </div>
          </div>
          <UnlikeIcon />
        </div>

        <div className="flex w-full items-end gap-2">
          <div className="flex w-full flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-black">18/20</span>
              <StateChip variant="confirmed">개설확정</StateChip>
            </div>
            <ProgressBar
              current={18}
              total={20}
              minToConfirm={10}
            />
          </div>

          <Button className="h-8 w-24 px-4 py-2 text-sm whitespace-nowrap">참여하기</Button>
        </div>
      </div>
    </div>
  );
};
