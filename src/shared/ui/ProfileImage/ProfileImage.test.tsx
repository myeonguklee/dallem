import { JSX } from 'react';
import { render, screen } from '@testing-library/react';
import { ProfileImage } from './ProfileImage';

// next/image 모킹
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: JSX.IntrinsicElements['img']) => {
    const { src, ...rest } = props;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        data-testid="profile-image"
        src={src}
        alt=""
        {...rest}
      />
    );
  },
}));

describe('ProfileImage 컴포넌트', () => {
  it('URL이 제공되지 않았을 때 기본 크기와 폴백 아이콘을 렌더링해야 함', () => {
    const { container } = render(<ProfileImage />);

    // 컨테이너가 올바른 기본 크기(40 + 6 테두리)를 가지는지 확인
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({ width: '46px', height: '46px' });

    // 폴백 아이콘이 렌더링되는지 확인

    expect(screen.getByTestId('profile-icon')).toBeInTheDocument();
  });

  it('사용자 정의 크기로 렌더링해야 함', () => {
    const customSize = 60;
    const { container } = render(<ProfileImage size={customSize} />);

    // 컨테이너가 올바른 사용자 정의 크기(60 + 6 테두리)를 가지는지 확인
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({
      width: `${customSize + 6}px`,
      height: `${customSize + 6}px`,
    });
  });

  it('URL이 제공되었을 때 이미지를 렌더링해야 함', () => {
    const testUrl = 'https://example.com/user.png';
    render(<ProfileImage url={testUrl} />);

    // 이미지가 올바른 URL과 기본 alt 텍스트로 렌더링되는지 확인
    const image = screen.getByTestId('profile-image');
    expect(image).toHaveAttribute('src', testUrl);
    expect(image).toHaveAttribute('alt', 'user profile image'); // 컴포넌트에서 하드코딩된 값
    expect(image).toHaveClass('object-cover');
  });

  it('사용자 정의 클래스명을 적용해야 함', () => {
    const customClass = 'custom-class';
    const { container } = render(<ProfileImage className={customClass} />);

    // 컨테이너에 사용자 정의 클래스가 적용되었는지 확인
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass(customClass);
  });

  it('적절한 스타일 클래스를 가지고 있어야 함', () => {
    const { container } = render(<ProfileImage />);

    // 컨테이너가 올바른 기본 클래스들을 가지고 있는지 확인
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass(
      'relative',
      'overflow-hidden',
      'rounded-full',
      'border-3',
      'border-white',
    );
  });
});
