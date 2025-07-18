import { ProgressBar } from '@/shared/ui/progressbar';

interface StarDataProps {
  label: string;
  count: number;
}

interface RatingScoreProgressBarProps {
  stars: StarDataProps[];
  total: number;
}

export const RatingScoreProgressBar = ({ stars, total }: RatingScoreProgressBarProps) => {
  return (
    <div className="space-y-2">
      {stars.map(({ label, count }) => (
        <div
          key={label}
          className="flex w-full items-center"
        >
          {/* 1. 레이블 영역 */}
          <strong className="w-10 flex-shrink-0 text-sm text-gray-700">{label}</strong>

          {/* 2. 바 영역*/}
          <div className="flex-1">
            <ProgressBar
              current={count}
              total={total}
              minToConfirm={total}
            />
          </div>
          <span className="w-8 flex-shrink-0 text-right text-sm text-gray-600">{count}</span>
        </div>
      ))}
    </div>
  );
};
