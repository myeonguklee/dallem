import { signupSchema } from './signupSchema';

describe('signupSchema', () => {
  const validUserData = {
    name: '홍길동',
    email: 'test@example.com',
    company: '테스트 회사',
    password: 'password123',
    confirmPassword: 'password123',
  };

  it('모든 필수 필드가 올바르면 검증을 통과해야 한다', () => {
    expect(signupSchema.safeParse(validUserData).success).toBe(true);
  });

  describe('필수 필드 검증', () => {
    it.each(['name', 'email', 'company', 'password', 'confirmPassword'])(
      '%s가 없으면 오류를 반환해야 한다',
      (field) => {
        const data = { ...validUserData, [field]: '' };
        expect(signupSchema.safeParse(data).success).toBe(false);
      },
    );
  });

  describe('이메일 형식 검증', () => {
    it('유효하지 않은 이메일 형식이면 오류를 반환해야 한다', () => {
      const result = signupSchema.safeParse({
        ...validUserData,
        email: 'invalid-email',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('비밀번호 검증', () => {
    it('비밀번호가 8자 미만이면 오류를 반환해야 한다', () => {
      const result = signupSchema.safeParse({
        ...validUserData,
        password: 'short',
        confirmPassword: 'short',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('비밀번호 확인 검증', () => {
    it('비밀번호와 비밀번호 확인이 일치하지 않으면 오류를 반환해야 한다', () => {
      const result = signupSchema.safeParse({
        ...validUserData,
        password: 'password123',
        confirmPassword: 'different',
      });
      expect(result.success).toBe(false);
    });
  });
});
