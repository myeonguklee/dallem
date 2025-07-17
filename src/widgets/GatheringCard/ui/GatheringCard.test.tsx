import { render, screen } from '@testing-library/react';
import { GatheringCard } from './GatheringCard';

// Mock the entity components
jest.mock('@/entities/gathering/ui/GatheringDateTimeDisplay', () => ({
  GatheringDateTimeDisplay: ({ dateTime }: { dateTime: Date }) => (
    <div data-testid="gathering-date-time">{dateTime.toLocaleDateString()}</div>
  ),
}));

jest.mock('@/entities/gathering/ui/GatheringDeadlineTag', () => ({
  GatheringDeadlineTag: ({ registrationEnd }: { registrationEnd: Date }) => (
    <div data-testid="gathering-deadline-tag">{registrationEnd.toLocaleDateString()}</div>
  ),
}));

jest.mock('@/entities/gathering/ui/GatheringJoinButton', () => ({
  GatheringJoinButton: ({
    gatheringId,
    participantCount,
    capacity,
  }: {
    gatheringId: number;
    participantCount: number;
    capacity: number;
  }) => {
    const isFull = participantCount >= capacity;
    return (
      <button
        data-testid="gathering-join-button"
        disabled={isFull}
      >
        {isFull ? '모집 마감' : `참여하기 (${gatheringId})`}
      </button>
    );
  },
}));

jest.mock('@/entities/gathering/ui/GatheringLikeButton', () => ({
  GatheringLikeButton: ({ gatheringId }: { gatheringId: number }) => (
    <button data-testid="gathering-like-button">좋아요 ({gatheringId})</button>
  ),
}));

const mockGatheringData = {
  gatheringId: 1,
  gatheringType: '워케이션',
  gatheringName: '워케이션',
  gatheringLocation: '을지로 3가',
  gatheringDateTime: new Date('2024-01-15T17:30:00'),
  gatheringRegistraionEnd: new Date('2024-01-20T21:00:00'),
  gatheringParticipantCount: 8,
  gatheringCapacity: 20,
  gatheringImage: 'https://example.com/image.jpg',
};

describe('GatheringCard', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('모든 필수 정보와 함께 모임 카드를 렌더링한다', () => {
    render(<GatheringCard {...mockGatheringData} />);

    // Check if main elements are rendered
    expect(screen.getByText('워케이션 | 을지로 3가')).toBeInTheDocument();
    expect(screen.getByText('8/20')).toBeInTheDocument();
    expect(screen.getByAltText('워케이션 이미지')).toBeInTheDocument();

    // Check if entity components are rendered
    expect(screen.getByTestId('gathering-date-time')).toBeInTheDocument();
    expect(screen.getByTestId('gathering-deadline-tag')).toBeInTheDocument();
    expect(screen.getByTestId('gathering-join-button')).toBeInTheDocument();
    expect(screen.getByTestId('gathering-like-button')).toBeInTheDocument();
  });

  it('참여자 수가 5명 이상일 때 개설확정 칩을 표시한다', () => {
    const confirmedData = {
      ...mockGatheringData,
      gatheringParticipantCount: 5,
      gatheringCapacity: 10,
    };

    render(<GatheringCard {...confirmedData} />);

    expect(screen.getByText('개설확정')).toBeInTheDocument();
  });

  it('참여자 수가 5명 미만일 때 개설확정 칩을 표시하지 않는다', () => {
    const notConfirmedData = {
      ...mockGatheringData,
      gatheringParticipantCount: 3,
      gatheringCapacity: 10,
    };

    render(<GatheringCard {...notConfirmedData} />);

    expect(screen.queryByText('개설확정')).not.toBeInTheDocument();
  });

  it('올바른 참여자 수와 최대 인원을 표시한다', () => {
    const data = {
      ...mockGatheringData,
      gatheringParticipantCount: 12,
      gatheringCapacity: 15,
    };

    render(<GatheringCard {...data} />);

    expect(screen.getByText('12/15')).toBeInTheDocument();
  });

  it('이미지가 없을 때 기본 이미지를 사용한다', () => {
    const dataWithoutImage = {
      ...mockGatheringData,
      gatheringImage: '',
    };

    render(<GatheringCard {...dataWithoutImage} />);

    const image = screen.getByAltText('워케이션 이미지');
    expect(image).toHaveAttribute('src');
    // Should use the fallback image URL
    expect(image.getAttribute('src')).toContain('unsplash.com');
  });

  it('모임 이름과 장소를 올바르게 표시한다', () => {
    const data = {
      ...mockGatheringData,
      gatheringName: 'React 스터디',
      gatheringLocation: '강남역',
    };

    render(<GatheringCard {...data} />);

    expect(screen.getByText('React 스터디 | 강남역')).toBeInTheDocument();
    expect(screen.getByAltText('React 스터디 이미지')).toBeInTheDocument();
  });

  it('긴 텍스트로도 레이아웃이 깨지지 않고 렌더링된다', () => {
    const dataWithLongText = {
      ...mockGatheringData,
      gatheringName: '매우 긴 모임 이름입니다 이것은 테스트를 위한 것입니다',
      gatheringLocation: '매우 긴 장소 이름입니다 이것도 테스트를 위한 것입니다',
    };

    render(<GatheringCard {...dataWithLongText} />);

    expect(screen.getByText(/매우 긴 모임 이름입니다/)).toBeInTheDocument();
    expect(screen.getByText(/매우 긴 장소 이름입니다/)).toBeInTheDocument();
  });

  it('entity 컴포넌트에 올바른 props를 전달한다', () => {
    const testData = {
      ...mockGatheringData,
      gatheringId: 123,
      gatheringDateTime: new Date('2024-01-15T17:30:00'),
      gatheringRegistraionEnd: new Date('2024-01-20T21:00:00'),
    };

    render(<GatheringCard {...testData} />);

    // Check if entity components receive correct props
    expect(screen.getByTestId('gathering-join-button')).toHaveTextContent('참여하기 (123)');
    expect(screen.getByTestId('gathering-like-button')).toHaveTextContent('좋아요 (123)');
  });

  it('올바른 값으로 진행률 바를 렌더링한다', () => {
    const data = {
      ...mockGatheringData,
      gatheringParticipantCount: 6,
      gatheringCapacity: 10,
    };

    render(<GatheringCard {...data} />);

    // ProgressBar should be rendered (it's a shared component)
    // The actual progress bar testing would be done in its own test file
    expect(screen.getByText('6/10')).toBeInTheDocument();
  });

  it('참여자 수가 0명일 때 올바르게 처리한다', () => {
    const emptyData = {
      ...mockGatheringData,
      gatheringParticipantCount: 0,
      gatheringCapacity: 10,
    };

    render(<GatheringCard {...emptyData} />);

    expect(screen.getByText('0/10')).toBeInTheDocument();
    expect(screen.queryByText('개설확정')).not.toBeInTheDocument();
  });

  it('최대 인원에 도달했을 때 올바르게 처리한다', () => {
    const fullData = {
      ...mockGatheringData,
      gatheringParticipantCount: 20,
      gatheringCapacity: 20,
    };

    render(<GatheringCard {...fullData} />);

    expect(screen.getByText('20/20')).toBeInTheDocument();
    expect(screen.getByText('개설확정')).toBeInTheDocument();
  });

  it('인원이 가득 찼을 때 모집 마감을 표시한다', () => {
    const fullData = {
      ...mockGatheringData,
      gatheringParticipantCount: 20,
      gatheringCapacity: 20,
    };

    render(<GatheringCard {...fullData} />);

    const joinButton = screen.getByTestId('gathering-join-button');
    expect(joinButton).toHaveTextContent('모집 마감');
    expect(joinButton).toBeDisabled();
  });

  it('인원이 가득 차지 않았을 때 참여하기 버튼을 표시한다', () => {
    const notFullData = {
      ...mockGatheringData,
      gatheringParticipantCount: 15,
      gatheringCapacity: 20,
    };

    render(<GatheringCard {...notFullData} />);

    const joinButton = screen.getByTestId('gathering-join-button');
    expect(joinButton).toHaveTextContent('참여하기 (1)');
    expect(joinButton).not.toBeDisabled();
  });
});
