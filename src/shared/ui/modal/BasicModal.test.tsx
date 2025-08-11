import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../button';
import { BasicModal } from './BasicModal';

const defaultProps = {
  isOpen: true,
  onClose: jest.fn(),
  title: '기본 모달 제목',
  children: <div>테스트용 자식 요소입니다.</div>,
};

describe('BasicModal 컴포넌트', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('isOpen이 true일때 제목과 children을 렌더링한다. ', () => {
    render(<BasicModal {...defaultProps} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText('테스트용 자식 요소입니다.')).toBeInTheDocument();
  });
  it('isOpen이 false일 때 모달이 렌더링되지 않는다', () => {
    render(
      <BasicModal
        {...defaultProps}
        isOpen={false}
      />,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('ESC 키를 누르면 onClose 함수가 호출된다', async () => {
    const user = userEvent.setup();
    render(<BasicModal {...defaultProps} />);

    await user.keyboard('{Escape}');
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('닫기(X) 버튼을 클릭하면 onClose 함수가 호출된다', async () => {
    const user = userEvent.setup();
    render(<BasicModal {...defaultProps} />);

    const closeButton = screen.getByRole('button', { name: 'close' });
    await user.click(closeButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });
  it('children 내부에 있는 상호작용 가능한 요소가 정상 동작한다', async () => {
    const user = userEvent.setup();
    const mockButtonClick = jest.fn();

    render(
      <BasicModal {...defaultProps}>
        <div>
          <p>내부 컨텐츠</p>
          <Button onClick={mockButtonClick}>내부 버튼</Button>
        </div>
      </BasicModal>,
    );

    const clickBtn = screen.getByRole('button', { name: '내부 버튼' });
    await user.click(clickBtn);

    // 모달 내부의 버튼이 잘 클릭되었는지 확인
    expect(mockButtonClick).toHaveBeenCalledTimes(1);

    // 이 버튼 클릭이 모달을 닫는 onClose와는 관계 없는지 확인
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });
});
