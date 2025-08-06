import { formatDateToYYYYMMDD, formatDateTypeYYYYMMDD } from './dateFormatter';

describe('formatDateToYYYYMMDD 날짜 변환 테스트 ', () => {
  it('ISO 문자열을 YYYY.MM.DD 형식으로 변환한다', () => {
    const result = formatDateToYYYYMMDD('2024-08-05T10:00:00Z');
    expect(result).toBe('2024.08.05');
  });

  it('월/일이 한 자리일 경우 0을 채운다', () => {
    const result = formatDateToYYYYMMDD('2024-01-09T00:00:00Z');
    expect(result).toBe('2024.01.09');
  });
});

describe('formatDateTypeYYYYMMDD 날짜 변환 테스트 ', () => {
  it('Date 객체를 YYYY-MM-DD 형식으로 변환한다', () => {
    const result = formatDateTypeYYYYMMDD(new Date('2024-08-05'));
    expect(result).toBe('2024-08-05');
  });

  it('월/일이 한 자리일 경우 0을 채운다', () => {
    const result = formatDateTypeYYYYMMDD(new Date('2024-01-09'));
    expect(result).toBe('2024-01-09');
  });
});
