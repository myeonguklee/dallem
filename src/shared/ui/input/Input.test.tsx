import { render, screen } from '@testing-library/react';
import Input from './Input';

describe('Input 컴포넌트', () => {
  it('placeholder가 잘 렌더링되어야 한다', () => {
    render(<Input placeholder="이메일을 입력하세요" />);

    expect(screen.getByPlaceholderText('이메일을 입력하세요')).toBeInTheDocument();
  });
});
