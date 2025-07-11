import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input 컴포넌트', () => {
  it('placeholder가 잘 렌더링되어야 한다', () => {
    render(<Input placeholder="내용 입력" />);
    const input = screen.getByPlaceholderText('내용 입력');
    expect(input).toBeInTheDocument();
  });

  it('입력값이 변경되어야 한다', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="입력하세요" />);
    const input = screen.getByPlaceholderText('입력하세요');
    await user.type(input, '테스트 입력');
    expect(input).toHaveValue('테스트 입력');
  });

  it('errorMessage가 보이는 경우, 에러 메시지가 렌더링되어야 한다', () => {
    render(
      <Input
        placeholder="이메일"
        errorMessage="이메일을 입력해주세요"
        variant="error"
      />,
    );
    expect(screen.getByText('이메일을 입력해주세요')).toBeInTheDocument();
  });

  it('hasIcon이 true일 때 클래스에 pr-10이 포함되어야 한다', () => {
    const { container } = render(<Input hasIcon />);
    const input = container.querySelector('input');
    expect(input?.className).toContain('pr-10');
  });

  it('inputSize가 sm일 경우, text-sm이 포함되어야 한다', () => {
    const { container } = render(<Input inputSize="sm" />);
    const input = container.querySelector('input');
    expect(input?.className).toContain('text-sm');
  });
});
