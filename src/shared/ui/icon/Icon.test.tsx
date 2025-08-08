import React from 'react';
import { render, screen } from '@testing-library/react';
import { Icon, IconMapProps } from './Icon';

// SVG 모킹
jest.mock('./svg/hamburger-menu-icon.svg', () => {
  return function HamburgerMenuIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        data-testid="hamburger-menu-icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M4 18H20M4 12H20M4 6H20"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    );
  };
});

describe('Icon 컴포넌트', () => {
  it('존재하는 아이콘 이름을 전달하면 해당 아이콘을 렌더링해야 한다', () => {
    render(
      <Icon
        name="hamburger-menu"
        data-testid="hamburger-icon"
      />,
    );

    const icon = screen.getByTestId('hamburger-icon');
    expect(icon).toBeInTheDocument();
  });

  it('존재하지 않는 아이콘 이름을 전달하면 null을 반환해야 한다', () => {
    const { container } = render(<Icon name={'non-existent-icon' as IconMapProps['name']} />);

    // null을 반환하므로 container가 비어있어야 함
    expect(container.firstChild).toBeNull();
  });

  it('SVG props가 올바르게 전달되어야 한다', () => {
    render(
      <Icon
        name="hamburger-menu"
        width={32}
        height={32}
        className="custom-class"
        data-testid="custom-icon"
      />,
    );

    const icon = screen.getByTestId('custom-icon');
    expect(icon).toHaveAttribute('width', '32');
    expect(icon).toHaveAttribute('height', '32');
    expect(icon).toHaveClass('custom-class');
  });

  it('기본 SVG 속성들이 올바르게 설정되어야 한다', () => {
    render(
      <Icon
        name="hamburger-menu"
        data-testid="hamburger-icon"
      />,
    );

    const icon = screen.getByTestId('hamburger-icon');
    expect(icon).toHaveAttribute('width', '24');
    expect(icon).toHaveAttribute('height', '24');
    expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
    expect(icon).toHaveAttribute('fill', 'none');
  });

  it('여러 props가 함께 전달되어도 올바르게 렌더링되어야 한다', () => {
    render(
      <Icon
        name="hamburger-menu"
        width={48}
        height={48}
        style={{ color: 'red' }}
        onClick={() => {}}
        data-testid="complex-icon"
      />,
    );

    const icon = screen.getByTestId('complex-icon');
    expect(icon).toHaveAttribute('width', '48');
    expect(icon).toHaveAttribute('height', '48');
    expect(icon).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });
});
