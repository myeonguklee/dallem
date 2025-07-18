/**
 * 아이콘의 가로/세로 비율을 유지하면서 크기를 계산하는 유틸리티 함수 (width 기준)
 * @param size - 원하는 크기 (number | string)
 * @param aspectRatio - 가로/세로 비율 (width/height)
 * @returns { width: number, height: number }
 */
export const calculateIconSizeByWidth = (size: number | string, aspectRatio: number) => {
  const width = typeof size === 'number' ? size : Number(size);
  const height = width / aspectRatio;

  return { width, height };
};

/**
 * 아이콘의 가로/세로 비율을 유지하면서 크기를 계산하는 유틸리티 함수 (height 기준)
 * @param size - 원하는 크기 (number | string)
 * @param aspectRatio - 가로/세로 비율 (width/height)
 * @returns { width: number, height: number }
 */
export const calculateIconSizeByHeight = (size: number | string, aspectRatio: number) => {
  const height = typeof size === 'number' ? size : Number(size);
  const width = height * aspectRatio;

  return { width, height };
};
