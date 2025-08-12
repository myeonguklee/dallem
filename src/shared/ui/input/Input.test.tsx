import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input 컴포넌트', () => {
  it('placeholder가 잘 렌더링되어야 한다', () => {
    render(<Input placeholder="할 일의 제목을 적어주세요." />);
    const input = screen.getByPlaceholderText('할 일의 제목을 적어주세요.');
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
        placeholder="비밀번호를 입력해주세요."
        errorMessage="비밀번호가 일치하지 않습니다."
        variant="error"
        isError={true}
      />,
    );
    expect(screen.getByText('비밀번호가 일치하지 않습니다.')).toBeInTheDocument();
  });
});
