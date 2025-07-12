export const getPagiNationRange = (currentPage: number, totalPages: number) => {
  const pages: (number | string)[] = [];

  // 총 페이지가 7개 이하면 모두 표시
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // 8개 이상일 때는 항상 최소 5개 + ... + 마지막 형태로 표시

  if (currentPage <= 4) {
    // 앞쪽에 있을 때: 1 2 3 4 5 ... 15
    pages.push(1, 2, 3, 4, 5);
    pages.push('...');
    pages.push(totalPages);
  } else if (currentPage >= totalPages - 3) {
    // 뒤쪽에 있을 때: 1 ... 11 12 13 14 15
    pages.push(1);
    pages.push('...');
    for (let i = totalPages - 4; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // 중간에 있을 때: 1 ... 6 7 8 9 10 ... 15
    pages.push(1);
    pages.push('...');
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      pages.push(i);
    }
    pages.push('...');
    pages.push(totalPages);
  }

  return pages;
};
