'use client';

import determineProgressStatus from '@/shared/lib/gathering/determineProgressStatus';
import { ProgressState } from '@/shared/types/progressStatus';
import { progressFill } from './progressBarVariants';

interface ProgressBarProps {
  current: number;
  total: number;
  minToConfirm: number;
}

export const ProgressBar = ({ current, total, minToConfirm }: ProgressBarProps) => {
  const ratio = total > 0 ? Math.min(current / total, 1) : 0;

  const state: ProgressState = determineProgressStatus({ current, total, minToConfirm });

  return (
    <div className="relative h-1 w-full overflow-hidden rounded-md bg-orange-50">
      <div
        role="progressbar"
        aria-valuenow={ratio * 100}
        aria-valuemin={0}
        aria-valuemax={100}
        className={['absolute top-0 left-0 h-full', progressFill({ state })].join(' ')}
        style={{ width: `${ratio * 100}%` }}
      />
    </div>
  );
};
