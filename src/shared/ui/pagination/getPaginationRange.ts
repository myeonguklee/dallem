export const getPaginationRange = (currentPage: number, totalPages: number) => {
  const pages: (number | string)[] = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

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
    // 중간에 있을 때: 1 ...  7 8 9  ... 15
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
