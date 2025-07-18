'use client';

import { Tag } from '@/shared/ui/tag/Tag';

interface GatheringDeadlineTagProps {
  registrationEnd: Date;
}

export const GatheringDeadlineTag = ({ registrationEnd }: GatheringDeadlineTagProps) => {
  const calculateDeadlineInfo = (endDate: Date) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffInMs = end.getTime() - now.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    // 텍스트 계산
    let text: string;
    switch (true) {
      case diffInDays > 0:
        text = `${diffInDays}일 후 마감`;
        break;
      case diffInHours >= 0:
        // 오늘 마감이면 실제 마감 시간 표시
        const endHours = end.getHours().toString().padStart(2, '0');
        text = `오늘 ${endHours}시 마감`;
        break;
      default:
        text = '마감';
    }

    // 색상 계산
    let color: 'primary' | 'secondary' | 'tertiary';
    switch (true) {
      case diffInDays === 0:
        color = 'primary';
        break;
      case diffInDays <= 7:
        color = 'secondary';
        break;
      default:
        color = 'tertiary';
    }

    return { text, color };
  };

  const { text: deadlineText, color: deadlineColor } = calculateDeadlineInfo(registrationEnd);

  return (
    <Tag
      tagColor={deadlineColor}
      className="absolute top-0 right-0"
    >
      {deadlineText}
    </Tag>
  );
};
