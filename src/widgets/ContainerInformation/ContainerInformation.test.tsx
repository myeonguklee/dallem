import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ContainerInformation } from './ContainerInformation';

const participants = [
  { id: '1', avatarUrl: 'url1' },
  { id: '2', avatarUrl: 'url2' },
  { id: '3', avatarUrl: 'url3' },
  { id: '4', avatarUrl: 'url4' },
  { id: '5', avatarUrl: 'url5' }, // 5명: extraCount=1
];

describe('ContainerInformation', () => {
  it('제목, 위치, 날짜, 시간, 참가자 수 등을 정상 렌더링한다', () => {
    render(
      <ContainerInformation
        title="테스트 모임"
        location="서울 강남"
        date="1월 7일"
        time="17:30"
        participants={participants}
        maxParticipants={10}
        minParticipants={3}
      />,
    );

    expect(screen.getByText('테스트 모임')).toBeInTheDocument();
    expect(screen.getByText('서울 강남')).toBeInTheDocument();
    expect(screen.getByText('1월 7일')).toBeInTheDocument();
    expect(screen.getByText('17:30')).toBeInTheDocument();
    expect(screen.getByText(/모집 정원 5명/)).toBeInTheDocument();
    expect(screen.getByText(/최소인원 3명/)).toBeInTheDocument();
    expect(screen.getByText(/최대인원 10명/)).toBeInTheDocument();
  });

  it('좋아요 버튼 클릭 시 아이콘 상태가 토글된다', () => {
    render(
      <ContainerInformation
        title="테스트 모임"
        location="서울 강남"
        date="1월 7일"
        time="17:30"
        participants={participants}
        maxParticipants={10}
        minParticipants={3}
      />,
    );

    const button = screen.getByRole('button', { name: '좋아요' });
    expect(button).toBeInTheDocument();

    // 처음엔 UnlikeIcon (aria-label: 좋아요)
    fireEvent.click(button);
    // 클릭 후: LikeIcon (aria-label: 좋아요 취소)
    expect(button).toHaveAttribute('aria-label', '좋아요 취소');
  });

  it('participants.length >= minParticipants 인 경우 개설확정 뱃지가 나타난다', () => {
    render(
      <ContainerInformation
        title="테스트 모임"
        location="서울 강남"
        date="1월 7일"
        time="17:30"
        participants={participants}
        maxParticipants={10}
        minParticipants={3}
      />,
    );

    // StateChip 확인
    expect(screen.getByText('개설확정')).toBeInTheDocument();
  });

  it('size가 small일 때 클래스가 적용된다', () => {
    const { container } = render(
      <ContainerInformation
        title="테스트 모임"
        location="서울 강남"
        date="1월 7일"
        time="17:30"
        participants={participants}
        maxParticipants={10}
        minParticipants={3}
        size="small"
      />,
    );

    // CVA 적용된 class에 small 사이즈 스타일이 포함되어 있는지 확인
    expect(container.firstChild).toHaveClass('h-[240px]');
    expect(container.firstChild).toHaveClass('w-[340px]');
  });
});
