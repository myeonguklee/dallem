import { UpdateUserPayload, updateUserSchema } from './schema';

describe('updateUserSchema', () => {
  const validUserData: UpdateUserPayload = {
    companyName: '테스트 회사',
    image: null,
  };

  describe('유효한 데이터 검증', () => {
    it('모든 필수 필드가 올바르면 검증을 통과해야 한다', () => {
      const result = updateUserSchema.safeParse(validUserData);
      expect(result.success).toBe(true);
    });

    it('이미지가 없어도 검증을 통과해야 한다', () => {
      const result = updateUserSchema.safeParse(validUserData);
      expect(result.success).toBe(true);
    });

    it('올바른 이미지 파일이 있으면 검증을 통과해야 한다', () => {
      const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
      const dataWithImage = { ...validUserData, image: file };

      const result = updateUserSchema.safeParse(dataWithImage);
      expect(result.success).toBe(true);
    });
  });

  describe('필수 필드 검증', () => {
    it('companyName이 없으면 에러가 발생해야 한다', () => {
      const dataWithoutCompanyName: Partial<UpdateUserPayload> = { ...validUserData };
      delete dataWithoutCompanyName.companyName;

      const result = updateUserSchema.safeParse(dataWithoutCompanyName);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('errors.companyNameRequired');
      }
    });
  });

  describe('companyName 검증', () => {
    it('유효한 companyName이 통과해야 한다', () => {
      const validCompanyNames = ['테스트 회사', 'ABC Corp', '123 Company', '회사명'];

      validCompanyNames.forEach((name) => {
        const data = { ...validUserData, companyName: name };
        const result = updateUserSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it('빈 문자열 companyName이면 에러가 발생해야 한다', () => {
      const data = { ...validUserData, companyName: '' };
      const result = updateUserSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('errors.companyNameRequired');
      }
    });

    it('공백만 있는 companyName이면 에러가 발생해야 한다', () => {
      const data = { ...validUserData, companyName: '   ' };
      const result = updateUserSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('errors.companyNameRequired');
      }
    });
  });

  describe('image 검증', () => {
    it('null 이미지는 통과해야 한다', () => {
      const data = { ...validUserData, image: null };
      const result = updateUserSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('이미지 파일이 아니면 에러가 발생해야 한다', () => {
      const file = new File([''], 'test.txt', { type: 'text/plain' });
      const data = { ...validUserData, image: file };

      const result = updateUserSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('errors.imageType');
      }
    });

    it('유효한 이미지 파일들이 통과해야 한다', () => {
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

      validImageTypes.forEach((type) => {
        const file = new File([''], `test.${type.split('/')[1]}`, { type });
        const data = { ...validUserData, image: file };
        const result = updateUserSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });
  });

  describe('타입 검증', () => {
    it('companyName이 숫자면 에러가 발생해야 한다', () => {
      const data = { ...validUserData, companyName: 123 };
      const result = updateUserSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('image가 문자열이면 에러가 발생해야 한다', () => {
      const data = { ...validUserData, image: 'image.jpg' };
      const result = updateUserSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('타입 추론', () => {
    it('UpdateUserPayload 타입이 올바르게 추론되어야 한다', () => {
      // 타입 체크만 수행 (런타임 에러 없음)
      const _test: typeof validUserData = validUserData;
      expect(_test).toBeDefined();
    });
  });
});
