import { parseReviewFilters } from './filters';

describe('parseReviewFilters 타입 검증 테스트 ', () => {
  //참일 경우 테스트
  it('모든 필터가 제공 된 경우 ', () => {
    const filterQuery = {
      type: 'DALLAEMFIT',
      location: '건대입구',
      date: '2024-01-01',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };

    const result = parseReviewFilters(filterQuery);
    expect(result).toEqual({
      type: 'DALLAEMFIT',
      location: '건대입구',
      date: '2024-01-01',
      sortBy: 'createdAt',
      sortOrder: 'desc',
      limit: 10,
      offset: 0,
    });
  });

  //참일 경우 테스트
  it('일부 필터만 제공된 경우 ', () => {
    const filterQuery = {
      type: 'DALLAEMFIT',
      location: '건대입구',
    };
    const result = parseReviewFilters(filterQuery);
    expect(result).toEqual({
      type: 'DALLAEMFIT',
      location: '건대입구',
      date: undefined,
      sortBy: 'createdAt',
      sortOrder: 'desc',
      limit: 10,
      offset: 0,
    });
  });

  //참일 경우 테스트
  it('빈 문자열이 제공된 경우 ', () => {
    const filterQuery = {
      type: 'DALLAEMFIT',
      location: '',
    };
    const result = parseReviewFilters(filterQuery);
    expect(result).toEqual({
      type: 'DALLAEMFIT',
      location: '',
      date: undefined,
      sortBy: 'createdAt',
      sortOrder: 'desc',
      limit: 10,
      offset: 0,
    });
  });

  // false인 경우 테스트 필요
  it('type 필터가 제공되지 않은 경우', () => {
    const filterQuery = {
      // type 프로퍼티가 없음
      location: '건대입구',
      date: '2024-01-01',
    };

    const result = parseReviewFilters(filterQuery);

    // type이 undefined로 잘 처리되는지 확인
    expect(result).toEqual({
      type: undefined,
      location: '건대입구',
      date: '2024-01-01',
      sortBy: 'createdAt',
      sortOrder: 'desc',
      limit: 10,
      offset: 0,
    });
  });

  it('location 필터가 제공되지 않은 경우', () => {
    const filterQuery = {
      type: 'DALLAEMFIT',
      date: '2024-01-01',
    };

    const result = parseReviewFilters(filterQuery);

    // type이 undefined로 잘 처리되는지 확인
    expect(result).toEqual({
      type: 'DALLAEMFIT',
      location: undefined,
      date: '2024-01-01',
      sortBy: 'createdAt',
      sortOrder: 'desc',
      limit: 10,
      offset: 0,
    });
  });

  it('date 필터가 제공되지 않은 경우', () => {
    const filterQuery = {
      type: 'DALLAEMFIT',
      location: '건대입구',
    };

    const result = parseReviewFilters(filterQuery);

    // type이 undefined로 잘 처리되는지 확인
    expect(result).toEqual({
      type: 'DALLAEMFIT',
      location: '건대입구',
      date: undefined,
      sortBy: 'createdAt',
      sortOrder: 'desc',
      limit: 10,
      offset: 0,
    });
  });
});
