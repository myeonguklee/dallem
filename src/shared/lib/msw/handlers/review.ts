import { HttpResponse, http } from 'msw';
import { mockGatherings } from './gathering';

const mockReviews = [
  {
    id: 1,
    score: 5,
    comment: '정말 좋은 모임이었습니다!',
    gatheringId: 1,
    userId: 1,
    createdAt: '2024-12-20T15:00:00',
    gathering: {
      id: 1,
      name: '달램핏 오피스 스트레칭',
      type: 'DALLAEMFIT',
      dateTime: '2024-12-25T10:00:00',
      location: '건대입구',
      image: 'https://example.com/image1.jpg',
    },
  },
  {
    id: 2,
    score: 4,
    comment: '힐링되는 시간이었어요',
    gatheringId: 2,
    userId: 1,
    createdAt: '2024-12-19T16:00:00',
    gathering: {
      id: 2,
      name: '워케이션 힐링 모임',
      type: 'WORKATION',
      dateTime: '2024-12-26T14:00:00',
      location: '홍대입구',
      image: 'https://example.com/image2.jpg',
    },
  },
];

export const reviewHandlers = [
  // 리뷰 목록 조회
  http.get('*/reviews', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const gatheringId = url.searchParams.get('gatheringId');
    const limit = url.searchParams.get('limit');
    const offset = url.searchParams.get('offset');

    let filteredReviews = [...mockReviews];

    // 사용자별 필터
    if (userId) {
      filteredReviews = filteredReviews.filter((review) => review.userId === parseInt(userId));
    }

    // 모임별 필터
    if (gatheringId) {
      filteredReviews = filteredReviews.filter(
        (review) => review.gatheringId === parseInt(gatheringId),
      );
    }

    // 페이지네이션
    if (offset && limit) {
      const offsetNum = parseInt(offset);
      const limitNum = parseInt(limit);
      filteredReviews = filteredReviews.slice(offsetNum, offsetNum + limitNum);
    }

    return HttpResponse.json(filteredReviews);
  }),

  // 리뷰 생성
  http.post('*/reviews', async ({ request }) => {
    const body = (await request.json()) as {
      score: number;
      comment: string;
      gatheringId: number;
    };

    const foundGathering = mockGatherings.find((g) => g.id === body?.gatheringId);
    const defaultGathering = {
      id: body?.gatheringId || 1,
      name: '기본 모임',
      type: 'DALLAEMFIT',
      dateTime: new Date().toISOString(),
      location: '서울',
      image: 'https://example.com/default-image.jpg',
    };

    const newReview = {
      id: Date.now(),
      score: body?.score || 5,
      comment: body?.comment || '',
      gatheringId: body?.gatheringId || 1,
      userId: 1,
      createdAt: new Date().toISOString(),
      gathering: foundGathering || defaultGathering,
    };

    mockReviews.push(newReview);
    return HttpResponse.json(newReview, { status: 201 });
  }),

  // 리뷰 점수 통계
  http.get('*/reviews/scores', ({ request }) => {
    const url = new URL(request.url);
    const gatheringId = url.searchParams.get('gatheringId');

    return HttpResponse.json({
      gatheringId: parseInt(gatheringId || '1'),
      averageScore: 4.5,
      totalCount: 10,
      scores: {
        1: 0,
        2: 1,
        3: 2,
        4: 3,
        5: 4,
      },
    });
  }),

  // 리뷰 수정
  http.put('*/reviews/:id', async ({ params, request }) => {
    const id = parseInt(params.id as string);
    const body = (await request.json()) as {
      score: number;
      comment: string;
    };

    const reviewIndex = mockReviews.findIndex((review) => review.id === id);
    if (reviewIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockReviews[reviewIndex] = {
      ...mockReviews[reviewIndex],
      score: body?.score || mockReviews[reviewIndex].score,
      comment: body?.comment || mockReviews[reviewIndex].comment,
    };

    return HttpResponse.json(mockReviews[reviewIndex]);
  }),

  // 리뷰 삭제
  http.delete('*/reviews/:id', ({ params }) => {
    const id = parseInt(params.id as string);
    const reviewIndex = mockReviews.findIndex((review) => review.id === id);

    if (reviewIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockReviews.splice(reviewIndex, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];

export { mockReviews };
