import { fireEvent, render, screen } from '@testing-library/react';
import { BottomFloatingBar, GatheringRole } from './BottomFloatingBar';

describe('BottomFloatingBar', () => {
  test('GUEST 역할일 때 참여하기 버튼이 렌더링된다', () => {
    render(
      <BottomFloatingBar
        role={GatheringRole.GUEST}
        title="테스트 타이틀"
        content="테스트 내용"
        onJoin={jest.fn()}
      />,
    );

    expect(screen.getByText('참여하기')).toBeInTheDocument();
  });

  test('MEMBER 역할일 때 참여 취소하기 버튼이 렌더링된다', () => {
    render(
      <BottomFloatingBar
        role={GatheringRole.MEMBER}
        title="타이틀"
        content="내용"
        onCancelJoin={jest.fn()}
      />,
    );

    expect(screen.getByText('참여 취소하기')).toBeInTheDocument();
  });

  test('HOST 역할일 때 취소하기, 공유하기 버튼이 둘 다 렌더링된다', () => {
    render(
      <BottomFloatingBar
        role={GatheringRole.HOST}
        title="타이틀"
        content="내용"
        onCancelProject={jest.fn()}
        onShare={jest.fn()}
      />,
    );

    expect(screen.getByText('취소하기')).toBeInTheDocument();
    expect(screen.getByText('공유하기')).toBeInTheDocument();
  });

  test('isFull이 true일 때 참여하기 버튼이 비활성화된다', () => {
    render(
      <BottomFloatingBar
        role={GatheringRole.GUEST}
        title="타이틀"
        content="내용"
        isFull={true}
        onJoin={jest.fn()}
      />,
    );

    const button = screen.getByText('참여하기');
    expect(button).toBeDisabled();
  });

  test('참여하기 버튼 클릭 시 onJoin 콜백이 호출된다', () => {
    const onJoinMock = jest.fn();
    render(
      <BottomFloatingBar
        role={GatheringRole.GUEST}
        title="타이틀"
        content="내용"
        onJoin={onJoinMock}
      />,
    );

    const button = screen.getByText('참여하기');
    fireEvent.click(button);
    expect(onJoinMock).toHaveBeenCalled();
  });
});
