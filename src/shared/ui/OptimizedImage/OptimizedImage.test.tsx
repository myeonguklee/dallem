import type { ImageProps } from 'next/image';
import { render } from '@testing-library/react';
import { OptimizedImage } from './OptimizedImage';

// next/image 모킹
jest.mock('next/image', () => {
  return function MockedImage(props: ImageProps) {
    const { src, alt, ...rest } = props;
    // fill과 priority는 rest에서 제거
    delete rest.fill;
    delete rest.priority;

    return (
      <img
        src={typeof src === 'string' ? src : 'mock-src'}
        alt={alt}
        data-testid="optimized-image"
        {...rest}
      />
    );
  };
});

describe('OptimizedImage 컴포넌트', () => {
  it('index가 0이면 loading 속성이 없어야 한다 (즉 priority인 상태)', () => {
    const { getByTestId } = render(
      <OptimizedImage
        src="/test.jpg"
        alt="테스트 이미지"
        index={0}
      />,
    );

    const img = getByTestId('optimized-image');
    expect(img).not.toHaveAttribute('loading'); // priority면 loading이 undefined
  });

  it('index가 0이 아닐 때 lazy 로딩되는 이미지를 렌더링해야 한다', () => {
    const { getByTestId } = render(
      <OptimizedImage
        src="/test2.jpg"
        alt="다음 이미지"
        index={3}
      />,
    );

    const img = getByTestId('optimized-image');
    expect(img).toHaveAttribute('src', '/test2.jpg');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).not.toHaveAttribute('priority');
  });

  it('className과 sizes props가 올바르게 반영되어야 한다', () => {
    const { getByTestId } = render(
      <OptimizedImage
        src="/custom.jpg"
        alt="커스텀 이미지"
        className="rounded-md shadow"
        sizes="100vw"
      />,
    );

    const img = getByTestId('optimized-image');
    expect(img).toHaveAttribute('class', expect.stringContaining('rounded-md'));
    expect(img).toHaveAttribute('sizes', '100vw');
  });
});
