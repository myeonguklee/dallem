'use client';

import { useTranslations } from 'next-intl';
import { Tag } from '@/shared/ui/tag/Tag';

interface GatheringDeadlineTagProps {
  registrationEnd: Date;
}

export const GatheringDeadlineTag = ({ registrationEnd }: GatheringDeadlineTagProps) => {
  const t = useTranslations('ui.gatheringCard.deadline');

  const calculateDeadlineInfo = (endDate: Date) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffInMs = end.getTime() - now.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    // 텍스트 계산
    let text: string;
    switch (true) {
      case diffInDays > 0: {
        text = t('daysLeft', { days: diffInDays });
        break;
      }
      case diffInHours >= 0: {
        // 오늘 마감인지 확인 (같은 날짜인지 체크)
        const isToday = now.toDateString() === end.toDateString();

        if (isToday) {
          // 오늘 마감이면 실제 마감 시간 표시
          const endHours = end.getHours().toString().padStart(2, '0');
          text = t('todayEnd', { time: endHours });
        } else {
          // 내일 마감이면 하루 남음으로 표시
          text = t('daysLeft', { days: 1 });
        }
        break;
      }
      default: {
        text = t('ended');
      }
    }

    // 색상 계산
    let color: 'primary' | 'secondary' | 'tertiary';
    switch (true) {
      case diffInDays === 0: {
        color = 'primary';
        break;
      }
      case diffInDays <= 7: {
        color = 'secondary';
        break;
      }
      default: {
        color = 'tertiary';
      }
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
