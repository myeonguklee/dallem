import { signinSchema } from './signinSchema';

describe('signinSchema', () => {
  // 유효한 로그인 데이터
  const validUserData = {
    email: 'test@example.com',
    password: 'password123',
  };

  describe('유효한 데이터 검증', () => {
    it('유효한 이메일과 비밀번호로 검증을 통과해야 한다', () => {
      const result = signinSchema.safeParse(validUserData);
      expect(result.success).toBe(true);
    });
  });

  describe('이메일 유효성 검사', () => {
    it('이메일이 없으면 오류를 반환해야 한다', () => {
      const result = signinSchema.safeParse({
        ...validUserData,
        email: '',
      });
      expect(result.success).toBe(false);
    });

    it('유효하지 않은 이메일 형식이면 오류를 반환해야 한다', () => {
      const result = signinSchema.safeParse({
        ...validUserData,
        email: 'invalid-email',
      });
      expect(result.success).toBe(false);
    });

    it('이메일에 @가 없으면 오류를 반환해야 한다', () => {
      const result = signinSchema.safeParse({
        ...validUserData,
        email: 'testexample.com',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('비밀번호 유효성 검사', () => {
    it('비밀번호가 없으면 오류를 반환해야 한다', () => {
      const result = signinSchema.safeParse({
        ...validUserData,
        password: '',
      });
      expect(result.success).toBe(false);
    });

    it('비밀번호가 8자 미만이면 오류를 반환해야 한다', () => {
      const result = signinSchema.safeParse({
        ...validUserData,
        password: 'short',
      });
      expect(result.success).toBe(false);
    });

    it('비밀번호가 정확히 8자이면 통과해야 한다', () => {
      const result = signinSchema.safeParse({
        ...validUserData,
        password: '12345678',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('오류 메시지 검증', () => {
    it('유효하지 않은 이메일 형식일 때 올바른 오류 메시지를 반환해야 한다', () => {
      const result = signinSchema.safeParse({
        ...validUserData,
        email: 'invalid-email',
      });

      if (!result.success) {
        expect(result.error.issues[0].message).toBe('errors.validation.email');
      } else {
        fail('유효성 검사가 실패해야 합니다.');
      }
    });

    it('짧은 비밀번호일 때 올바른 오류 메시지를 반환해야 한다', () => {
      const result = signinSchema.safeParse({
        ...validUserData,
        password: 'short',
      });

      if (!result.success) {
        expect(result.error.issues[0].message).toBe('errors.validation.password');
      } else {
        fail('유효성 검사가 실패해야 합니다.');
      }
    });
  });
});
