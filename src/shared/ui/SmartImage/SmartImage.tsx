'use client';

import Image, { ImageProps } from 'next/image';

interface SmartImageProps {
  src: ImageProps['src'];
  alt: string;
  index?: number; // 리스트 내 순서
  sizes?: string;
  className?: string;
  quality?: number;
}

export const SmartImage = ({
  src,
  alt,
  index = 0,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 280px, 320px',
  className = 'object-cover',
  quality = 80,
}: SmartImageProps) => {
  const isFirstImage = index === 0; // 첫 번째 이미지만 priority

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      quality={quality}
      {
        ...(isFirstImage
          ? { priority: true } // 첫 이미지 → LCP 최적화
          : { loading: 'lazy' }) // 나머지 → lazy
      }
    />
  );
};
