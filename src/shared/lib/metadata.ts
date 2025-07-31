import type { Metadata } from 'next';
import { Locale } from 'next-intl';

const baseUrl = 'https://dallem-beryl.vercel.app';

// 모임 목록 페이지 메타데이터
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateGatheringMetadata = (locale: Locale, messages: any): Metadata => {
  const metadata = messages.metadata.gathering;

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1500,
          height: 1080,
          alt: metadata.ogImageAlt,
        },
      ],
      url: `${baseUrl}/${locale}/gathering`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: [`${baseUrl}/og-image.jpg`],
    },
  };
};

// 리뷰 목록 페이지 메타데이터
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateReviewsMetadata = (locale: Locale, messages: any): Metadata => {
  const metadata = messages.metadata.reviews;

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1500,
          height: 1080,
          alt: metadata.ogImageAlt,
        },
      ],
      url: `${baseUrl}/${locale}/reviews`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: [`${baseUrl}/og-image.jpg`],
    },
  };
};

// 개별 모임 상세 페이지 메타데이터
export const generateGatheringDetailMetadata = (
  locale: Locale,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messages: any,
  gathering: {
    id: number;
    name: string;
    type: string;
    location: string;
    dateTime: string;
    image: string;
  },
): Metadata => {
  const metadata = messages.metadata.gatheringDetail;

  const title = metadata.titleTemplate.replace('{name}', gathering.name);
  const description = metadata.descriptionTemplate
    .replace('{name}', gathering.name)
    .replace('{type}', gathering.type)
    .replace('{location}', gathering.location)
    .replace('{dateTime}', gathering.dateTime);

  // 모임 이미지가 없으면 기본 이미지 사용
  const imageUrl = gathering.image || '/og-image.jpg';

  return {
    title,
    description,
    keywords: metadata.keywords,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1500,
          height: 1080,
          alt: metadata.ogImageAlt.replace('{name}', gathering.name),
        },
      ],
      url: `${baseUrl}/${locale}/gathering/${gathering.id}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
};
