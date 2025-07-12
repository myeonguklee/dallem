import { getPaginationRange } from './getPaginationRange';

describe('getPaginationRange 함수 유닛 테스트 ', () => {
  it('총 페이지가 5 이하일 때 전체 페이지 표시', () => {
    // AAA 패턴
    // Arrange 현재페이지, 토탈 페이지
    const currentPage = 3;
    const totalPages = 5;

    // Act: getPaginationRange 함수 실행
    const result = getPaginationRange(currentPage, totalPages);

    //Assert : 결과가 [1,2,3,4,5] 인지 확인
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('총페이지가 5개가 넘어가고 앞 쪽 ( 1  ~ 4 ) 위치할때  ', () => {
    const array = [1, 2, 3, 4, 5, '...', 10];

    const result = getPaginationRange(2, 10);
    expect(result).toEqual(array);
  });

  it('총 페이지가 5개가 넘어가고 현재페이지가 중간에 위치할떄', () => {
    const array = [1, '...', 4, 5, 6, '...', 10];
    const result = getPaginationRange(5, 10);
    expect(result).toEqual(array);
  });

  it('총 페이짖가 5개가 넘어가고 현재페이지가 뒤쪽(총 페이지 - 3 이상) 일때 ', () => {
    const array = [1, '...', 6, 7, 8, 9, 10];
    const result = getPaginationRange(9, 10);
    expect(result).toEqual(array);
  });
});
