import { calculateIconSizeByHeight, calculateIconSizeByWidth } from './iconUtils';

describe('calculateIconSizeByWidth', () => {
  it('숫자 크기와 비율을 받아서 올바른 width와 height를 반환해야 한다', () => {
    const result = calculateIconSizeByWidth(24, 1);

    expect(result).toEqual({
      width: 24,
      height: 24,
    });
  });

  it('문자열 크기와 비율을 받아서 올바른 width와 height를 반환해야 한다', () => {
    const result = calculateIconSizeByWidth('32', 1);

    expect(result).toEqual({
      width: 32,
      height: 32,
    });
  });

  it('가로가 세로보다 큰 비율(2:1)에서 올바른 크기를 계산해야 한다', () => {
    const result = calculateIconSizeByWidth(20, 2);

    expect(result).toEqual({
      width: 20,
      height: 10,
    });
  });

  it('세로가 가로보다 큰 비율(1:2)에서 올바른 크기를 계산해야 한다', () => {
    const result = calculateIconSizeByWidth(20, 0.5);

    expect(result).toEqual({
      width: 20,
      height: 40,
    });
  });

  it('소수점이 있는 비율에서 올바른 크기를 계산해야 한다', () => {
    const result = calculateIconSizeByWidth(16, 1.5);

    expect(result).toEqual({
      width: 16,
      height: 10.666666666666666,
    });
  });
});

describe('calculateIconSizeByHeight', () => {
  it('숫자 크기와 비율을 받아서 올바른 width와 height를 반환해야 한다', () => {
    const result = calculateIconSizeByHeight(24, 1);

    expect(result).toEqual({
      width: 24,
      height: 24,
    });
  });

  it('문자열 크기와 비율을 받아서 올바른 width와 height를 반환해야 한다', () => {
    const result = calculateIconSizeByHeight('32', 1);

    expect(result).toEqual({
      width: 32,
      height: 32,
    });
  });

  it('가로가 세로보다 큰 비율(2:1)에서 올바른 크기를 계산해야 한다', () => {
    const result = calculateIconSizeByHeight(10, 2);

    expect(result).toEqual({
      width: 20,
      height: 10,
    });
  });

  it('세로가 가로보다 큰 비율(1:2)에서 올바른 크기를 계산해야 한다', () => {
    const result = calculateIconSizeByHeight(40, 0.5);

    expect(result).toEqual({
      width: 20,
      height: 40,
    });
  });

  it('소수점이 있는 비율에서 올바른 크기를 계산해야 한다', () => {
    const result = calculateIconSizeByHeight(10.666666666666666, 1.5);

    expect(result).toEqual({
      width: 16,
      height: 10.666666666666666,
    });
  });
});

describe('calculateIconSizeByWidth와 calculateIconSizeByHeight의 일관성', () => {
  it('같은 크기와 비율로 서로 역함수 관계가 되어야 한다', () => {
    const size = 24;
    const aspectRatio = 1.5;

    const byWidth = calculateIconSizeByWidth(size, aspectRatio);
    const byHeight = calculateIconSizeByHeight(byWidth.height, aspectRatio);

    expect(byHeight.width).toBeCloseTo(byWidth.width, 10);
    expect(byHeight.height).toBeCloseTo(byWidth.height, 10);
  });

  it('정사각형 비율(1:1)에서 두 함수의 결과가 동일해야 한다', () => {
    const size = 32;
    const aspectRatio = 1;

    const byWidth = calculateIconSizeByWidth(size, aspectRatio);
    const byHeight = calculateIconSizeByHeight(size, aspectRatio);

    expect(byWidth).toEqual(byHeight);
  });
});
