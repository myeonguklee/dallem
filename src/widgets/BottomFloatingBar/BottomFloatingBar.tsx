import { useTranslations } from 'next-intl';
import { GatheringRole } from '@/entities/gathering-detail/model/types';
import { Button } from '@/shared/ui/button';
import { twMerge } from 'tailwind-merge';

export type BottomFloatingBarProps = {
  role: GatheringRole;
  title: string;
  content: string;
  isFull?: boolean;
  onJoin?: () => void;
  onCancelJoin?: () => void;
  onCancelProject?: () => void;
  onShare?: () => void;
};

export const BottomFloatingBar = ({
  role,
  title,
  content,
  isFull = false,
  onJoin,
  onCancelJoin,
  onCancelProject,
  onShare,
}: BottomFloatingBarProps) => {
  const t = useTranslations('pages.gathering.detail');
  const isHost = role === GatheringRole.HOST;
  const commonButtonClass = 'h-[44px] min-w-[115px] font-semibold whitespace-nowrap';
  return (
    <div className="fixed bottom-0 left-0 w-full border-t-2 border-gray-900 bg-white px-4">
      <div
        className={twMerge(
          'mx-auto flex h-21 w-full max-w-[1200px] items-center gap-1',
          isHost
            ? 'h-auto flex-col items-start gap-3 py-4 md:h-[84px] md:flex-row md:items-center md:justify-between md:py-0'
            : 'justify-between',
        )}
      >
        <div className="flex flex-col">
          <span className="text-base font-semibold whitespace-nowrap text-gray-800">{title}</span>
          <span className="text-xs font-medium text-gray-700">{content}</span>
        </div>
        <div className={`flex gap-2 ${isHost ? 'w-full justify-center md:w-auto' : ''} `}>
          {role === GatheringRole.GUEST && (
            <Button
              variant={'primary'}
              onClick={onJoin}
              disabled={isFull}
              className={twMerge(commonButtonClass, isFull && 'bg-gray-400 text-white opacity-50')}
            >
              {t('joinButton')}
            </Button>
          )}
          {role === GatheringRole.MEMBER && (
            <Button
              variant={'outline'}
              onClick={onCancelJoin}
              className={commonButtonClass}
            >
              {t('cancelJoinButton')}
            </Button>
          )}
          {role === GatheringRole.HOST && (
            <>
              <Button
                variant={'outline'}
                onClick={onCancelProject}
                className={commonButtonClass}
              >
                {t('cancelButton')}
              </Button>
              <Button
                variant={'primary'}
                onClick={onShare}
                className={commonButtonClass}
              >
                {t('shareButton')}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
