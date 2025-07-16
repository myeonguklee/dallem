import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';

type AvatarGroupProps = {
  avatars: StaticImageData[];
  extraCount?: number;
};

export const AvatarGroup = ({ avatars, extraCount = 0 }: AvatarGroupProps) => {
  return (
    <div className="flex items-center">
      {avatars.map((src, idx) => (
        <div
          key={idx}
          className={clsx(
            'relative inline-block h-7 w-7 overflow-hidden rounded-full border-2 border-white',
            idx !== 0 && '-ml-2',
          )}
        >
          <Image
            src={src}
            alt={`user${idx}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
      {extraCount > 0 && (
        <div
          className={clsx(
            'relative inline-flex h-7.5 w-7.5 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-[10px] font-medium text-gray-700',
            '-ml-2',
          )}
        >
          +{extraCount}
        </div>
      )}
    </div>
  );
};
