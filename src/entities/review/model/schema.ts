import { z } from 'zod';

// 리뷰 생성 스키마만 관리
export const createReviewSchema = z.object({
  gatheringId: z.number(),
  score: z
    .number()
    .min(1, 'errors.selectRating')
    .max(5, 'pages.myPage.reviewModal.errors.selectRating'),
  comment: z
    .string()
    .min(1, 'errors.reviewContentRequired')
    .max(500, 'errors.reviewContentMaxLength')
    .refine((val) => val.trim().length > 0, {
      message: 'errors.reviewContentRequired',
    }),
});

export type CreateReviewPayload = z.infer<typeof createReviewSchema>;
