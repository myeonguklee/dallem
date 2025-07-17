'use client';

import { Tag } from '@/shared/ui/tag/Tag';

interface GatheringDeadlineTagProps {
  registrationEnd: Date;
}

export const GatheringDeadlineTag = ({ registrationEnd }: GatheringDeadlineTagProps) => {
  const calculateDeadlineText = (endDate: Date): string => {
    const now = new Date();
    const end = new Date(endDate);
    const diffInMs = end.getTime() - now.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays}일 후 마감`;
    } else if (diffInHours >= 0) {
      // 오늘 마감이면 실제 마감 시간 표시
      const endHours = end.getHours().toString().padStart(2, '0');
      return `오늘 ${endHours}시 마감`;
    }
    return '마감';
  };

  const getDeadlineColor = (endDate: Date): 'primary' | 'secondary' | 'tertiary' => {
    const now = new Date();
    const end = new Date(endDate);
    const diffInMs = end.getTime() - now.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      // 당일 마감
      return 'primary';
    } else if (diffInDays <= 7) {
      // 일주일 이내 마감
      return 'secondary';
    } else {
      // 일주일 이후 마감
      return 'tertiary';
    }
  };

  const deadlineText = calculateDeadlineText(registrationEnd);
  const deadlineColor = getDeadlineColor(registrationEnd);

  return (
    <Tag
      tagColor={deadlineColor}
      className="absolute top-0 right-0"
    >
      {deadlineText}
    </Tag>
  );
};
