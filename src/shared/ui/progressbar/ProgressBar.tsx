'use client';

import { useTranslations } from 'next-intl';
import determineProgressStatus from '@/shared/lib/gathering/determineProgressStatus';
import { ProgressState } from '@/shared/types/progressStatus';
import { progressFill } from './progressBarVariants';

interface ProgressBarProps {
  current: number;
  total: number;
  minToConfirm: number;
  'aria-label'?: string;
}

export const ProgressBar = ({
  current,
  total,
  minToConfirm,
  'aria-label': ariaLabel,
}: ProgressBarProps) => {
  const t = useTranslations('ui.progressBar');
  const ratio = total > 0 ? Math.min(current / total, 1) : 0;

  const state: ProgressState = determineProgressStatus({ current, total, minToConfirm });

  // 기본 라벨이 없으면 자동 생성 (다국어 지원)
  const defaultLabel = t('defaultLabel', { current, total });

  return (
    <div className="relative h-1 w-full overflow-hidden rounded-md bg-orange-50">
      <div
        role="progressbar"
        aria-valuenow={ratio * 100}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel || defaultLabel}
        className={['absolute top-0 left-0 h-full', progressFill({ state })].join(' ')}
        style={{ width: `${ratio * 100}%` }}
      />
    </div>
  );
};
