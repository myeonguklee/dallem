import { CreateReviewPayload, createReviewSchema } from './schema';

describe('createReviewSchema', () => {
  const validReviewData: CreateReviewPayload = {
    gatheringId: 1,
    score: 5,
    comment: '정말 좋은 모임이었습니다!',
  };

  describe('유효한 데이터 검증', () => {
    it('모든 필수 필드가 올바르면 검증을 통과해야 한다', () => {
      const result = createReviewSchema.safeParse(validReviewData);
      expect(result.success).toBe(true);
    });

    it('최소 길이의 comment로도 검증을 통과해야 한다', () => {
      const dataWithMinComment = { ...validReviewData, comment: '좋음' };
      const result = createReviewSchema.safeParse(dataWithMinComment);
      expect(result.success).toBe(true);
    });

    it('최대 길이의 comment로도 검증을 통과해야 한다', () => {
      const maxLengthComment = 'a'.repeat(500);
      const dataWithMaxComment = { ...validReviewData, comment: maxLengthComment };
      const result = createReviewSchema.safeParse(dataWithMaxComment);
      expect(result.success).toBe(true);
    });
  });

  describe('필수 필드 검증', () => {
    it('gatheringId가 없으면 에러가 발생해야 한다', () => {
      const dataWithoutGatheringId: Partial<CreateReviewPayload> = { ...validReviewData };
      delete dataWithoutGatheringId.gatheringId;

      const result = createReviewSchema.safeParse(dataWithoutGatheringId);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Required');
      }
    });

    it('score가 없으면 에러가 발생해야 한다', () => {
      const dataWithoutScore: Partial<CreateReviewPayload> = { ...validReviewData };
      delete dataWithoutScore.score;

      const result = createReviewSchema.safeParse(dataWithoutScore);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Required');
      }
    });

    it('comment가 없으면 에러가 발생해야 한다', () => {
      const dataWithoutComment: Partial<CreateReviewPayload> = { ...validReviewData };
      delete dataWithoutComment.comment;

      const result = createReviewSchema.safeParse(dataWithoutComment);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Required');
      }
    });
  });

  describe('gatheringId 검증', () => {
    it('양의 정수 gatheringId가 통과해야 한다', () => {
      const validGatheringIds = [1, 100, 999999];

      validGatheringIds.forEach((id) => {
        const data = { ...validReviewData, gatheringId: id };
        const result = createReviewSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it('0인 gatheringId는 통과해야 한다', () => {
      const data = { ...validReviewData, gatheringId: 0 };
      const result = createReviewSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('score 검증', () => {
    it('1부터 5까지의 score가 통과해야 한다', () => {
      const validScores = [1, 2, 3, 4, 5];

      validScores.forEach((score) => {
        const data = { ...validReviewData, score };
        const result = createReviewSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it('score가 1 미만이면 에러가 발생해야 한다', () => {
      const data = { ...validReviewData, score: 0 };
      const result = createReviewSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('errors.selectRating');
      }
    });

    it('score가 5 초과면 에러가 발생해야 한다', () => {
      const data = { ...validReviewData, score: 6 };
      const result = createReviewSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('errors.selectRating');
      }
    });

    it('소수점 score는 통과해야 한다 (타입이 number이므로)', () => {
      const data = { ...validReviewData, score: 3.5 };
      const result = createReviewSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('comment 검증', () => {
    it('1자 이상의 comment가 통과해야 한다', () => {
      const validComments = ['좋음', '정말 좋은 모임이었습니다!', '👍'];

      validComments.forEach((comment) => {
        const data = { ...validReviewData, comment };
        const result = createReviewSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it('빈 문자열 comment면 에러가 발생해야 한다', () => {
      const data = { ...validReviewData, comment: '' };
      const result = createReviewSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('errors.reviewContentRequired');
      }
    });

    it('공백만 있는 comment면 에러가 발생해야 한다', () => {
      const data = { ...validReviewData, comment: '   ' };
      const result = createReviewSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('errors.reviewContentRequired');
      }
    });

    it('500자 초과 comment면 에러가 발생해야 한다', () => {
      const overLengthComment = 'a'.repeat(501);
      const data = { ...validReviewData, comment: overLengthComment };
      const result = createReviewSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('errors.reviewContentMaxLength');
      }
    });

    it('500자 comment는 통과해야 한다', () => {
      const exactLengthComment = 'a'.repeat(500);
      const data = { ...validReviewData, comment: exactLengthComment };
      const result = createReviewSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('타입 검증', () => {
    it('gatheringId가 문자열이면 에러가 발생해야 한다', () => {
      const data = { ...validReviewData, gatheringId: '1' };
      const result = createReviewSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('score가 문자열이면 에러가 발생해야 한다', () => {
      const data = { ...validReviewData, score: '5' };
      const result = createReviewSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('comment가 숫자면 에러가 발생해야 한다', () => {
      const data = { ...validReviewData, comment: 123 };
      const result = createReviewSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('타입 추론', () => {
    it('CreateReviewPayload 타입이 올바르게 추론되어야 한다', () => {
      // 타입 체크만 수행 (런타임 에러 없음)
      const _test: typeof validReviewData = validReviewData;
      expect(_test).toBeDefined();
    });
  });
});
