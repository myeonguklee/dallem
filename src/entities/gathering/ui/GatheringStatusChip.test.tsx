import React from 'react';
import { render, screen } from '@testing-library/react';
import { GatheringStatusChip } from './GatheringStatusChip';

// next-intl 모킹
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      scheduled: '예정',
      completed: '완료',
      pending: '대기',
      confirmed: '확정',
    };
    return translations[key] || key;
  },
}));

describe('GatheringStatusChip 컴포넌트', () => {
  const mockDate = new Date('2024-01-15T12:00:00');

  beforeEach(() => {
    // 현재 시간을 고정
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('미래 날짜 + 참가자 수에 따른 상태', () => {
    it('미래 날짜 + 5명 이상이면 scheduled와 confirmed를 표시해야 한다', () => {
      const futureDate = new Date('2024-01-20T12:00:00'); // 5일 후

      render(
        <GatheringStatusChip
          gatheringDateTime={futureDate}
          participantCount={6}
        />,
      );

      expect(screen.getByText('예정')).toBeInTheDocument();
      expect(screen.getByText('확정')).toBeInTheDocument();
    });

    it('미래 날짜 + 5명 미만이면 scheduled와 pending을 표시해야 한다', () => {
      const futureDate = new Date('2024-01-20T12:00:00'); // 5일 후

      render(
        <GatheringStatusChip
          gatheringDateTime={futureDate}
          participantCount={3}
        />,
      );

      expect(screen.getByText('예정')).toBeInTheDocument();
      expect(screen.getByText('대기')).toBeInTheDocument();
    });

    it('미래 날짜 + 정확히 5명이면 scheduled와 confirmed를 표시해야 한다', () => {
      const futureDate = new Date('2024-01-20T12:00:00'); // 5일 후

      render(
        <GatheringStatusChip
          gatheringDateTime={futureDate}
          participantCount={5}
        />,
      );

      expect(screen.getByText('예정')).toBeInTheDocument();
      expect(screen.getByText('확정')).toBeInTheDocument();
    });
  });

  describe('과거 날짜 + 참가자 수에 따른 상태', () => {
    it('과거 날짜 + 5명 이상이면 completed와 confirmed를 표시해야 한다', () => {
      const pastDate = new Date('2024-01-10T12:00:00'); // 5일 전

      render(
        <GatheringStatusChip
          gatheringDateTime={pastDate}
          participantCount={7}
        />,
      );

      expect(screen.getByText('완료')).toBeInTheDocument();
      expect(screen.getByText('확정')).toBeInTheDocument();
    });

    it('과거 날짜 + 5명 미만이면 pending만 표시해야 한다', () => {
      const pastDate = new Date('2024-01-10T12:00:00'); // 5일 전

      render(
        <GatheringStatusChip
          gatheringDateTime={pastDate}
          participantCount={2}
        />,
      );

      expect(screen.getByText('대기')).toBeInTheDocument();
      expect(screen.queryByText('완료')).not.toBeInTheDocument();
      expect(screen.queryByText('예정')).not.toBeInTheDocument();
    });
  });

  describe('엣지 케이스', () => {
    it('현재 시간과 정확히 같으면 과거로 처리해야 한다', () => {
      const currentDate = new Date('2024-01-15T12:00:00'); // 현재 시간과 동일

      render(
        <GatheringStatusChip
          gatheringDateTime={currentDate}
          participantCount={6}
        />,
      );

      expect(screen.getByText('완료')).toBeInTheDocument();
      expect(screen.getByText('확정')).toBeInTheDocument();
    });

    it('참가자 수가 0이면 pending을 표시해야 한다', () => {
      const futureDate = new Date('2024-01-20T12:00:00');

      render(
        <GatheringStatusChip
          gatheringDateTime={futureDate}
          participantCount={0}
        />,
      );

      expect(screen.getByText('예정')).toBeInTheDocument();
      expect(screen.getByText('대기')).toBeInTheDocument();
    });

    it('참가자 수가 음수여도 올바르게 처리해야 한다', () => {
      const futureDate = new Date('2024-01-20T12:00:00');

      render(
        <GatheringStatusChip
          gatheringDateTime={futureDate}
          participantCount={-1}
        />,
      );

      expect(screen.getByText('예정')).toBeInTheDocument();
      expect(screen.getByText('대기')).toBeInTheDocument();
    });
  });

  describe('CSS 클래스', () => {
    it('flex items-center gap-2 클래스가 적용되어야 한다', () => {
      const futureDate = new Date('2024-01-20T12:00:00');

      const { container } = render(
        <GatheringStatusChip
          gatheringDateTime={futureDate}
          participantCount={6}
        />,
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('flex', 'items-center', 'gap-2');
    });
  });

  describe('조건부 렌더링', () => {
    it('isUpcoming이 false이고 isConfirmed가 false이면 pending만 표시해야 한다', () => {
      const pastDate = new Date('2024-01-10T12:00:00');

      render(
        <GatheringStatusChip
          gatheringDateTime={pastDate}
          participantCount={3}
        />,
      );

      expect(screen.getByText('대기')).toBeInTheDocument();
      expect(screen.queryByText('예정')).not.toBeInTheDocument();
      expect(screen.queryByText('완료')).not.toBeInTheDocument();
      expect(screen.queryByText('확정')).not.toBeInTheDocument();
    });

    it('isUpcoming이 true이고 isConfirmed가 true이면 scheduled와 confirmed를 표시해야 한다', () => {
      const futureDate = new Date('2024-01-20T12:00:00');

      render(
        <GatheringStatusChip
          gatheringDateTime={futureDate}
          participantCount={6}
        />,
      );

      expect(screen.getByText('예정')).toBeInTheDocument();
      expect(screen.getByText('확정')).toBeInTheDocument();
      expect(screen.queryByText('완료')).not.toBeInTheDocument();
      expect(screen.queryByText('대기')).not.toBeInTheDocument();
    });
  });
});
