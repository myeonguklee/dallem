import { parseGatheringFiltersFromSearchParams } from './filters';

describe('parseGatheringFiltersFromSearchParams', () => {
  describe('기본 동작', () => {
    it('빈 검색 파라미터가 주어지면 기본값을 반환해야 한다', () => {
      const result = parseGatheringFiltersFromSearchParams({});

      expect(result).toEqual({
        type: 'DALLAEMFIT',
        sortBy: 'registrationEnd',
      });
    });

    it('null/undefined 값들이 주어져도 기본값을 반환해야 한다', () => {
      const result = parseGatheringFiltersFromSearchParams({
        id: undefined,
        type: undefined,
        location: undefined,
        date: undefined,
        createdBy: undefined,
        sortBy: undefined,
        sortOrder: undefined,
      });

      expect(result).toEqual({
        type: 'DALLAEMFIT',
        sortBy: 'registrationEnd',
      });
    });
  });

  describe('개별 필드 파싱', () => {
    it('id가 문자열이면 그대로 파싱해야 한다', () => {
      const result = parseGatheringFiltersFromSearchParams({
        id: '123',
      });

      expect(result.id).toBe('123');
    });

    it('type이 유효한 값이면 파싱해야 한다', () => {
      const result = parseGatheringFiltersFromSearchParams({
        type: 'OFFICE_STRETCHING',
      });

      expect(result.type).toBe('OFFICE_STRETCHING');
    });

    it('location이 유효한 값이면 파싱해야 한다', () => {
      const result = parseGatheringFiltersFromSearchParams({
        location: '건대입구',
      });

      expect(result.location).toBe('건대입구');
    });

    it('date가 문자열이면 그대로 파싱해야 한다', () => {
      const result = parseGatheringFiltersFromSearchParams({
        date: '2024-01-01',
      });

      expect(result.date).toBe('2024-01-01');
    });

    it('createdBy가 숫자 문자열이면 숫자로 변환해야 한다', () => {
      const result = parseGatheringFiltersFromSearchParams({
        createdBy: '123',
      });

      expect(result.createdBy).toBe(123);
    });

    it('sortBy가 유효한 값이면 파싱해야 한다', () => {
      const result = parseGatheringFiltersFromSearchParams({
        sortBy: 'name',
      });

      expect(result.sortBy).toBe('name');
    });

    it('sortOrder가 유효한 값이면 파싱해야 한다', () => {
      const result = parseGatheringFiltersFromSearchParams({
        sortOrder: 'desc',
      });

      expect(result.sortOrder).toBe('desc');
    });
  });

  describe('배열 값 처리', () => {
    it('배열 값은 무시하고 기본값을 사용해야 한다', () => {
      const result = parseGatheringFiltersFromSearchParams({
        id: ['123', '456'],
        type: ['OFFICE_STRETCHING', 'MINDFULNESS'],
        location: ['건대입구', '홍대입구'],
      });

      expect(result).toEqual({
        type: 'DALLAEMFIT',
        sortBy: 'registrationEnd',
      });
    });
  });

  describe('복합 필터', () => {
    it('여러 필드가 모두 유효하면 모두 파싱해야 한다', () => {
      const result = parseGatheringFiltersFromSearchParams({
        id: '123',
        type: 'OFFICE_STRETCHING',
        location: '건대입구',
        date: '2024-01-01',
        createdBy: '456',
        sortBy: 'name',
        sortOrder: 'desc',
      });

      expect(result).toEqual({
        id: '123',
        type: 'OFFICE_STRETCHING',
        location: '건대입구',
        date: '2024-01-01',
        createdBy: 456,
        sortBy: 'name',
        sortOrder: 'desc',
      });
    });

    it('일부 필드만 유효해도 파싱해야 한다', () => {
      const result = parseGatheringFiltersFromSearchParams({
        id: '123',
        type: 'OFFICE_STRETCHING',
        // location은 배열이므로 무시됨
        location: ['건대입구', '홍대입구'],
        // date는 undefined이므로 무시됨
        date: undefined,
      });

      expect(result).toEqual({
        id: '123',
        type: 'OFFICE_STRETCHING',
        sortBy: 'registrationEnd',
      });
    });
  });

  describe('기본값 동작', () => {
    it('type이 없으면 DALLAEMFIT을 기본값으로 설정해야 한다', () => {
      const result = parseGatheringFiltersFromSearchParams({});

      expect(result.type).toBe('DALLAEMFIT');
    });

    it('sortBy가 없으면 registrationEnd를 기본값으로 설정해야 한다', () => {
      const result = parseGatheringFiltersFromSearchParams({});

      expect(result.sortBy).toBe('registrationEnd');
    });

    it('type이 빈 문자열이면 빈 문자열로 설정되어야 한다', () => {
      const result = parseGatheringFiltersFromSearchParams({
        type: '',
      });

      expect(result.type).toBe('');
    });

    it('sortBy가 빈 문자열이면 빈 문자열로 설정되어야 한다', () => {
      const result = parseGatheringFiltersFromSearchParams({
        sortBy: '',
      });

      expect(result.sortBy).toBe('');
    });
  });

  describe('타입 안전성', () => {
    it('반환된 객체가 GatheringFilters 타입과 호환되어야 한다', () => {
      const result = parseGatheringFiltersFromSearchParams({
        id: '123',
        type: 'OFFICE_STRETCHING',
        location: '건대입구',
        date: '2024-01-01',
        createdBy: '456',
        sortBy: 'name',
        sortOrder: 'desc',
      });

      // 타입 체크 (런타임 에러 없음)
      expect(typeof result.id).toBe('string');
      expect(typeof result.type).toBe('string');
      expect(typeof result.location).toBe('string');
      expect(typeof result.date).toBe('string');
      expect(typeof result.createdBy).toBe('number');
      expect(typeof result.sortBy).toBe('string');
      expect(typeof result.sortOrder).toBe('string');
    });
  });
});
