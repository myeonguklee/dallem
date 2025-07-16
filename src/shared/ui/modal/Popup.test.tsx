import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popup } from './Popup';

// 테스트를 위한 기본 props 객체. 각 테스트에서 재사용합니다.
const defaultProps = {
  isOpen: true,
  onClose: jest.fn(),
  onConfirm: jest.fn(),
  message: '테스트 메시지입니다.',
  primaryButtonText: '확인',
  secondaryButtonText: '취소',
};

describe('Popup 컴포넌트', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('isOpen이 true일 때 제목, 메시지, 버튼들이 올바르게 렌더링된다   ', () => {
    render(<Popup {...defaultProps} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // 메세지 검증
    expect(screen.getByText(defaultProps.message)).toBeInTheDocument();
    // 버튼 존재 검증
    expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument();
  });

  it('isOpen이 false일 때 팝업이 렌더링되지 않는다 ', () => {
    render(
      <Popup
        {...defaultProps}
        isOpen={false}
      />,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('확인 버튼을 클릭하면 onConfirm 함수가 호출된다 ', async () => {
    const user = userEvent.setup();
    render(<Popup {...defaultProps} />);

    const ConfirmBtn = screen.getByRole('button', { name: '확인' });
    await user.click(ConfirmBtn);

    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  it(' 취소 버튼을 클릭하면 onClose 함수가 호출된다', async () => {
    const user = userEvent.setup();
    render(<Popup {...defaultProps} />);

    const closeBtn = screen.getByRole('button', { name: '취소' });
    await user.click(closeBtn);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('ESC 키를 누르면 onClose 함수가 호출된다 ', async () => {
    const user = userEvent.setup();
    render(<Popup {...defaultProps} />);

    await user.keyboard('{Escape}');
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('X 닫기 버튼을 클릭하면 onClose 함수가 호출된다', async () => {
    const user = userEvent.setup();
    render(<Popup {...defaultProps} />);

    const closeButton = screen.getByRole('button', { name: 'close' });
    await user.click(closeButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });
});
