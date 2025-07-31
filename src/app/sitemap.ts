import { MetadataRoute } from 'next';
import { getGatherings } from '@/entities/gathering/api';
import { routing } from '@/i18n';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 배포된 웹사이트의 도메인 주소 (검색 엔진 크롤링용)
  const baseUrl = 'https://dallem-beryl.vercel.app';
  const currentDate = new Date();

  // 기본 페이지들
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/ko`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ];

  // 다국어 페이지들 (공개 페이지만 포함)
  const localizedPages = routing.locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}/gathering`,
      lastModified: currentDate,
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/${locale}/reviews`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]);

  // 동적 페이지들 (개별 모임 상세 페이지)
  let dynamicPages: MetadataRoute.Sitemap = [];

  try {
    // API에서 모임 목록 가져오기
    const gatherings = await getGatherings({ limit: 20 }); // 최근 20개 모임만 포함

    // 각 locale별로 모임 상세 페이지 생성
    dynamicPages = routing.locales.flatMap((locale) =>
      gatherings.map((gathering) => ({
        url: `${baseUrl}/${locale}/gathering/${gathering.id}`,
        lastModified: currentDate, // 현재 시간 사용 (Gathering 타입에 updatedAt/createdAt 없음)
        changeFrequency: 'daily' as const,
        priority: 0.8, // 모임 상세 페이지는 높은 우선순위
      })),
    );
  } catch (error) {
    console.error('사이트맵 생성 중 모임 데이터 가져오기 실패:', error);
    // 에러가 발생해도 정적 페이지들은 반환
  }

  return [...staticPages, ...localizedPages, ...dynamicPages];
}
