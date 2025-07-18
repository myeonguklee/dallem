import { render, screen } from '@testing-library/react';
import { MyPageGatheringCard } from './MyPageGatheringCard';

// Mock the entity components
jest.mock('@/entities/gathering/ui/GatheringDateTimeDisplay', () => ({
  GatheringDateTimeDisplay: ({ dateTime }: { dateTime: Date }) => (
    <div data-testid="gathering-date-time">{dateTime.toLocaleDateString()}</div>
  ),
}));

jest.mock('@/entities/gathering/ui/GatheringStatusChip', () => ({
  GatheringStatusChip: ({
    gatheringDateTime,
    participantCount,
  }: {
    gatheringDateTime: Date;
    participantCount: number;
  }) => {
    // 테스트에서 날짜 비교를 더 정확하게 하기 위해 시간대 고려
    const now = new Date();
    const gatheringDate = new Date(gatheringDateTime);
    const isUpcoming = gatheringDate.getTime() > now.getTime();
    const isConfirmed = participantCount >= 5;

    return (
      <div data-testid="gathering-status-chip">
        {isUpcoming ? '이용 예정' : '이용 완료'}
        {isConfirmed && '개설확정'}
      </div>
    );
  },
}));

jest.mock('@/features/gathering/ui/MyPageActionButton', () => ({
  MyPageActionButton: ({ gatheringDateTime }: { gatheringDateTime: Date }) => {
    const now = new Date();
    const gatheringDate = new Date(gatheringDateTime);
    const isUpcoming = gatheringDate.getTime() > now.getTime();

    return (
      <div data-testid="my-page-action-button">
        {isUpcoming ? '예약 취소하기' : '리뷰 작성하기'}
      </div>
    );
  },
}));

const mockGatheringData = {
  gatheringId: 1,
  gatheringName: '달램핏 오피스 스트레칭',
  gatheringLocation: '을지로 3가',
  gatheringDateTime: new Date('2024-01-07T17:30:00'),
  gatheringParticipantCount: 20,
  gatheringCapacity: 20,
  gatheringImage: 'https://example.com/image.jpg',
  isCanceled: false,
};

describe('MyPageGatheringCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('모든 필수 정보와 함께 모임 카드를 렌더링한다', () => {
    render(<MyPageGatheringCard {...mockGatheringData} />);

    expect(screen.getByText('달램핏 오피스 스트레칭')).toBeInTheDocument();
    expect(screen.getByText('을지로 3가')).toBeInTheDocument();
    expect(screen.getByText('20/20')).toBeInTheDocument();
    expect(screen.getByAltText('달램핏 오피스 스트레칭 이미지')).toBeInTheDocument();
    expect(screen.getByTestId('gathering-date-time')).toBeInTheDocument();
    expect(screen.getByTestId('gathering-status-chip')).toBeInTheDocument();
    expect(screen.getByTestId('my-page-action-button')).toBeInTheDocument();
  });

  it('이용 예정 상태일 때 올바른 칩을 표시한다', () => {
    const upcomingData = {
      ...mockGatheringData,
      gatheringDateTime: new Date('2030-12-31T17:30:00'), // 확실히 미래 날짜
    };

    render(<MyPageGatheringCard {...upcomingData} />);

    expect(screen.getByTestId('gathering-status-chip')).toHaveTextContent('이용 예정');
    expect(screen.getByTestId('my-page-action-button')).toHaveTextContent('예약 취소하기');
  });

  it('완료 상태일 때 올바른 칩을 표시한다', () => {
    const completedData = {
      ...mockGatheringData,
      gatheringDateTime: new Date('2023-01-07T17:30:00'), // 과거 날짜
    };

    render(<MyPageGatheringCard {...completedData} />);

    expect(screen.getByTestId('gathering-status-chip')).toHaveTextContent('이용 완료');
    expect(screen.getByTestId('my-page-action-button')).toHaveTextContent('리뷰 작성하기');
  });

  it('취소 상태일 때 오버레이를 표시한다', () => {
    const canceledData = {
      ...mockGatheringData,
      isCanceled: true,
    };

    render(<MyPageGatheringCard {...canceledData} />);

    expect(screen.getByText('모집 취소된 모임이에요, 다음 기회에 만나요 🙏')).toBeInTheDocument();
  });

  it('참여자 수가 5명 이상일 때 개설확정 칩을 표시한다', () => {
    const confirmedData = {
      ...mockGatheringData,
      gatheringParticipantCount: 5,
      gatheringCapacity: 10,
    };

    render(<MyPageGatheringCard {...confirmedData} />);

    expect(screen.getByTestId('gathering-status-chip')).toHaveTextContent('개설확정');
  });

  it('참여자 수가 5명 미만일 때 개설확정 칩을 표시하지 않는다', () => {
    const notConfirmedData = {
      ...mockGatheringData,
      gatheringParticipantCount: 3,
      gatheringCapacity: 10,
    };

    render(<MyPageGatheringCard {...notConfirmedData} />);

    expect(screen.getByTestId('gathering-status-chip')).not.toHaveTextContent('개설확정');
  });

  it('올바른 참여자 수와 최대 인원을 표시한다', () => {
    const data = {
      ...mockGatheringData,
      gatheringParticipantCount: 12,
      gatheringCapacity: 15,
    };

    render(<MyPageGatheringCard {...data} />);

    expect(screen.getByText('12/15')).toBeInTheDocument();
  });

  it('이미지가 없을 때 기본 이미지를 사용한다', () => {
    const dataWithoutImage = {
      ...mockGatheringData,
      gatheringImage: '',
    };

    render(<MyPageGatheringCard {...dataWithoutImage} />);

    const image = screen.getByAltText('달램핏 오피스 스트레칭 이미지');
    expect(image).toHaveAttribute('src');
    expect(image.getAttribute('src')).toContain('unsplash.com');
  });

  it('취소된 모임에서도 기본 정보가 렌더링된다', () => {
    const canceledData = {
      ...mockGatheringData,
      isCanceled: true,
    };

    render(<MyPageGatheringCard {...canceledData} />);

    // 기본 정보는 여전히 렌더링되어야 함
    expect(screen.getByText('달램핏 오피스 스트레칭')).toBeInTheDocument();
    expect(screen.getByText('을지로 3가')).toBeInTheDocument();
    expect(screen.getByText('20/20')).toBeInTheDocument();
    expect(screen.getByAltText('달램핏 오피스 스트레칭 이미지')).toBeInTheDocument();

    // 오버레이도 표시되어야 함
    expect(screen.getByText('모집 취소된 모임이에요, 다음 기회에 만나요 🙏')).toBeInTheDocument();
  });

  it('긴 텍스트로도 레이아웃이 깨지지 않고 렌더링된다', () => {
    const dataWithLongText = {
      ...mockGatheringData,
      gatheringName: '매우 긴 모임 이름입니다 이것은 테스트를 위한 것입니다',
      gatheringLocation: '매우 긴 장소 이름입니다 이것도 테스트를 위한 것입니다',
    };

    render(<MyPageGatheringCard {...dataWithLongText} />);

    expect(
      screen.getByText('매우 긴 모임 이름입니다 이것은 테스트를 위한 것입니다'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('매우 긴 장소 이름입니다 이것도 테스트를 위한 것입니다'),
    ).toBeInTheDocument();
  });

  it('참여자 수가 0명일 때 올바르게 처리한다', () => {
    const emptyData = {
      ...mockGatheringData,
      gatheringParticipantCount: 0,
      gatheringCapacity: 10,
    };

    render(<MyPageGatheringCard {...emptyData} />);

    expect(screen.getByText('0/10')).toBeInTheDocument();
    expect(screen.getByTestId('gathering-status-chip')).not.toHaveTextContent('개설확정');
  });

  it('최대 인원에 도달했을 때 올바르게 처리한다', () => {
    const fullData = {
      ...mockGatheringData,
      gatheringParticipantCount: 20,
      gatheringCapacity: 20,
    };

    render(<MyPageGatheringCard {...fullData} />);

    expect(screen.getByText('20/20')).toBeInTheDocument();
    expect(screen.getByTestId('gathering-status-chip')).toHaveTextContent('개설확정');
  });
});
