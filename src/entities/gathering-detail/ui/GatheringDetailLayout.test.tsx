import { Suspense } from 'react';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import {
  useCancelGathering,
  useGetGatheringDetail,
  useJoinGathering,
  useLeaveGathering,
} from '@/entities/gathering-detail/api/queries';
//import { useGetGatheringDetail } from '@/entities/gathering-detail/api/queries';
import { useGetParticipants } from '@/entities/participant/api/queries';
import { Participant } from '@/entities/participant/model/types';
import { useRouter } from '@/i18n';
import { BottomFloatingBarProps } from '@/widgets/BottomFloatingBar/BottomFloatingBar';
import { QueryClient, QueryClientProvider, UseSuspenseQueryResult } from '@tanstack/react-query';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GatheringDetail } from '../model/types';
import { GatheringDetailLayout } from './GatheringDetailLayout';

// 2. 모킹할 모듈의 경로 선언
jest.mock('next-auth/react');
jest.mock('@/i18n');
jest.mock('@/entities/gathering-detail/api/queries');
jest.mock('@/entities/participant/api/queries');
jest.mock('@/widgets/ReviewList/ui/DetailPageReviewList', () => {
  const MockedReviewList = () => <div data-testid="mock-review-list" />;
  MockedReviewList.displayName = 'MockedReviewList';

  return { DetailPageReviewList: MockedReviewList };
});
jest.mock('@/widgets/BottomFloatingBar', () => {
  const MockedBottomFloatingBar = (props: BottomFloatingBarProps) => (
    <div data-testid="mock-bottom-bar">
      {/* 참여하기 버튼 (GUEST 또는 로그인했지만 참여 안 한 사용자용) */}
      <button onClick={props.onJoin}>참여하기</button>

      {/* 참여 취소 버튼 (PARTICIPANT용) */}
      <button onClick={props.onCancelJoin}>참여 취소</button>

      {/* 모임 취소 버튼 (HOST용) */}
      <button onClick={props.onCancelProject}>모임 취소</button>

      {/* 공유하기 버튼 */}
      <button onClick={props.onShare}>공유하기</button>
    </div>
  );
  return { BottomFloatingBar: MockedBottomFloatingBar };
});

jest.mock('@/shared/ui/modal', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MockedPopup = (props: any) =>
    props.isOpen ? (
      <div
        data-testid="popup"
        role="dialog"
      >
        <p>{props.message}</p>
        <button onClick={props.onConfirm}>{props.primaryButtonText}</button>
        <button onClick={props.onClose}>{props.secondaryButtonText}</button>
      </div>
    ) : null;
  MockedPopup.displayName = 'MockedPopup';

  return { Popup: MockedPopup };
});

// 3. jest.mocked()로 타입이 지원되는 모의 함수
const mockedUseSession = jest.mocked(useSession);
const mockedUseRouter = jest.mocked(useRouter);
const mockedUseGetGatheringDetail = jest.mocked(useGetGatheringDetail);
const mockedUseGetParticipants = jest.mocked(useGetParticipants);
const mockedUseJoinGathering = jest.mocked(useJoinGathering);
const mockedUseCancelGathering = jest.mocked(useCancelGathering);
const mockedUseLeaveGathering = jest.mocked(useLeaveGathering);

describe('GatheringDetailLayout', () => {
  const mockGathering: GatheringDetail = {
    id: 1,
    teamId: 101,
    type: '스터디',
    name: '테스트 모임',
    dateTime: '2025-08-07T18:00:00Z',
    registrationEnd: '2025-08-06T23:59:59Z',
    location: '서울시 강남구 테헤란로 123',
    participantCount: 5,
    capacity: 10,
    image: 'https://example.com/image.png',
    createdBy: 100,
    canceledAt: null,
  };

  const mockParticipants: Participant[] = [
    {
      teamId: 101,
      userId: 1,
      gatheringId: 1,
      joinedAt: '2025-08-01T12:00:00Z',
      User: {
        id: 1,
        email: 'tester@example.com',
        name: '테스터',
        companyName: '테스트회사',
        image: 'https://example.com/profile.png',
      },
    },
  ];

  const mockSession: Session = {
    user: {
      id: '99',
      name: '테스트 유저',
      email: 'test@example.com',
      image: undefined,
    },
    expires: new Date(Date.now() + 2 * 86400 * 1000).toISOString(),
  };
  const mockSessionHost: Session = {
    user: {
      id: '100',
      name: '테스트 유저',
      email: 'test@example.com',
      image: undefined,
    },
    expires: new Date(Date.now() + 2 * 86400 * 1000).toISOString(),
  };
  beforeEach(() => {
    // useSession은 기본적으로 비로그인 상태를 반환
    mockedUseSession.mockReturnValue({ data: null, status: 'unauthenticated', update: jest.fn() });
    // useRouter는 가짜 push 함수를 반환
    mockedUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    } as unknown as ReturnType<typeof useRouter>);

    mockedUseGetGatheringDetail.mockReturnValue({
      data: mockGathering,
      status: 'success',
      fetchStatus: 'idle',
      isError: false,
      isSuccess: true,
      isLoading: false,
      refetch: jest.fn(),
    } as unknown as UseSuspenseQueryResult<GatheringDetail, Error>);

    mockedUseGetParticipants.mockReturnValue({
      data: mockParticipants,
      isPending: false,
      isError: false,
      isSuccess: true,
      isLoading: false,
      refetch: jest.fn(),
      error: null,
      status: 'success',
      fetchStatus: 'idle',
    } as unknown as ReturnType<typeof useGetParticipants>);
  });

  const mockMutationResult = {
    mutate: jest.fn(),
    isPending: false,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockedUseJoinGathering.mockReturnValue(mockMutationResult as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockedUseLeaveGathering.mockReturnValue(mockMutationResult as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockedUseCancelGathering.mockReturnValue(mockMutationResult as any);

  const renderComponent = () => {
    // 1. 테스트용 QueryClient 인스턴스
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    // 2. QueryClientProvider로 컴포넌트를 감싸준다
    return render(
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>로딩 중...</div>}>
          <GatheringDetailLayout
            id={1}
            locale="ko"
          />
        </Suspense>
      </QueryClientProvider>,
    );
  };

  it('데이터 로딩 성공 시 모임 제목이 표시되어야 한다', async () => {
    renderComponent();

    // findBy* 쿼리는 요소가 나타날 때까지 기다린다 (Suspense에 필수)
    const titleElement = await screen.findByText('테스트 모임');
    expect(titleElement).toBeInTheDocument();
  });

  it('로그인한 사용자가 참여 버튼을 누르면, join mutate 함수가 호출되어야 한다', async () => {
    const user = userEvent.setup();
    const GATHERING_ID = 1;

    mockedUseSession.mockReturnValue({
      data: mockSession,
      status: 'authenticated',
      update: jest.fn(),
    });

    renderComponent();

    // 2. Act (실행)을 위해 컴포넌트를 렌더링
    const joinButton = await screen.findByRole('button', { name: /참여하기/i });
    await user.click(joinButton);

    // 3. Assert (검증)
    // useJoinGathering 훅의 mutate 함수가 올바른 인자(GATHERING_ID)와 함께
    // 호출되었는지 확인
    expect(mockedUseJoinGathering().mutate).toHaveBeenCalledWith(GATHERING_ID);
  });

  it('참여자가 참여 취소 버튼을 누르면, leave mutate 함수가 호출되어야 한다', async () => {
    // Arrange
    const user = userEvent.setup();
    const GATHERING_ID = 1;

    mockedUseSession.mockReturnValue({
      data: mockSession,
      status: 'authenticated',
      update: jest.fn(),
    });

    renderComponent();

    // Act
    const leaveButton = await screen.findByRole('button', { name: /참여 취소/i });
    await user.click(leaveButton);

    // Assert
    expect(mockedUseLeaveGathering().mutate).toHaveBeenCalled();
    expect(mockedUseLeaveGathering().mutate).toHaveBeenCalledWith(GATHERING_ID);
  });

  it('주최자가 모임 취소 버튼을 누르고 팝업에서 확인하면, cancel mutate 함수가 호출되어야 한다', async () => {
    // 1. Arrange (테스트 환경 설정)
    const user = userEvent.setup();
    const GATHERING_ID = 1;

    // useSession 훅이 "주최자"로 로그인된 상태를 반환하도록 설정
    // mockGathering 데이터의 hostId와 동일한 ID를 사용
    mockedUseSession.mockReturnValue({
      data: mockSessionHost,
      status: 'authenticated',
      update: jest.fn(),
    });

    renderComponent();

    // 2. Act 1 (첫 번째 행동: 버튼 클릭)
    // "모임 취소" 버튼이 화면에 나타날 때까지 기다린 후, 클릭
    const cancelProjectButton = await screen.findByRole('button', {
      name: /모임 취소/i,
    });
    await user.click(cancelProjectButton);

    // 3. Assert 1 (첫 번째 결과: 팝업 확인)
    const popup = await screen.findByRole('dialog');
    expect(popup).toBeInTheDocument();

    // 팝업의 메시지가 올바른지 확인하여 정확도를 높입니다.
    // useTranslations 모킹에 따라 'confirmCancel' 문자열이 포함되었는지 확인
    expect(popup).toHaveTextContent(/confirmCancel/i);

    // 4. Act 2 (두 번째 행동: 팝업 내 버튼 클릭)
    // 팝업(popup) 안에서만 "확인" 버튼을 찾아서 클릭
    const confirmButton = within(popup).getByRole('button', {
      name: /confirm/i, // useTranslations 모킹 결과 'confirm'
    });
    await user.click(confirmButton);

    // 5. Assert 2 (최종 결과: 함수 호출 확인)
    // useCancelGathering 훅의 mutate 함수가 올바른 인자와 함께 호출되었는지 확인
    expect(mockedUseCancelGathering().mutate).toHaveBeenCalledWith(
      GATHERING_ID,
      expect.any(Object),
    );

    expect(mockedUseCancelGathering().mutate).toHaveBeenCalled();
  });
});
