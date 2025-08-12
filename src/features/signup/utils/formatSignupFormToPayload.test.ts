import { formatSignupFormToPayload } from './formatSignupFormToPayload';

describe('formatSignupFormToPayload 유틸리티 함수', () => {
  it('SignupFormData를 SignupPayload로 올바르게 변환해야 한다', () => {
    // given
    const mockFormData = {
      name: '홍길동',
      email: 'test@example.com',
      company: '테스트 회사',
      password: 'password123',
      confirmPassword: 'password123',
    };

    // when
    const result = formatSignupFormToPayload(mockFormData);

    // then
    expect(result).toEqual({
      name: '홍길동',
      email: 'test@example.com',
      companyName: '테스트 회사',
      password: 'password123',
    });
  });

  it('빈 문자열이 포함된 경우에도 정상적으로 변환해야 한다', () => {
    // given
    const mockFormData = {
      name: '',
      email: 'test@example.com',
      company: '',
      password: 'password123',
      confirmPassword: 'password123',
    };

    // when
    const result = formatSignupFormToPayload(mockFormData);

    // then
    expect(result).toEqual({
      name: '',
      email: 'test@example.com',
      companyName: '',
      password: 'password123',
    });
  });

  it('company 필드가 companyName으로 매핑되는지 확인한다', () => {
    // given
    const mockFormData = {
      name: '홍길동',
      email: 'test@example.com',
      company: '회사명',
      password: 'password123',
      confirmPassword: 'password123',
    };

    // when
    const result = formatSignupFormToPayload(mockFormData);

    // then
    expect(result.companyName).toBe('회사명');
    expect(result).not.toHaveProperty('company');
  });

  it('confirmPassword 필드는 결과에 포함되지 않아야 한다', () => {
    // given
    const mockFormData = {
      name: '홍길동',
      email: 'test@example.com',
      company: '테스트 회사',
      password: 'password123',
      confirmPassword: 'password123',
    };

    // when
    const result = formatSignupFormToPayload(mockFormData);

    // then
    expect(result).not.toHaveProperty('confirmPassword');
  });
});
