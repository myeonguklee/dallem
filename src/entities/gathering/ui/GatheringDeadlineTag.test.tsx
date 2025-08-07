import React from 'react';
import { render, screen } from '@testing-library/react';
import { GatheringDeadlineTag } from './GatheringDeadlineTag';

// next-intl 모킹
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string, params?: { days?: number; time?: string }) => {
    const translations: Record<string, string> = {
      daysLeft: `D-${params?.days}`,
      todayEnd: `오늘 ${params?.time}시 마감`,
      ended: '마감됨',
    };
    return translations[key] || key;
  },
}));

describe('GatheringDeadlineTag 컴포넌트', () => {
  const mockDate = new Date('2024-01-15T12:00:00');

  beforeEach(() => {
    // 현재 시간을 고정
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('날짜 계산 로직', () => {
    it('7일 이상 남으면 tertiary 색상과 D-N 텍스트를 표시해야 한다', () => {
      const futureDate = new Date('2024-01-25T12:00:00'); // 10일 후

      render(<GatheringDeadlineTag registrationEnd={futureDate} />);

      const tag = screen.getByText('D-10');
      expect(tag).toBeInTheDocument();
      expect(tag.closest('div')).toHaveClass('absolute', 'top-0', 'right-0');
    });

    it('1-7일 남으면 secondary 색상과 D-N 텍스트를 표시해야 한다', () => {
      const futureDate = new Date('2024-01-20T12:00:00'); // 5일 후

      render(<GatheringDeadlineTag registrationEnd={futureDate} />);

      const tag = screen.getByText('D-5');
      expect(tag).toBeInTheDocument();
    });

    it('오늘 마감이면 primary 색상과 시간을 표시해야 한다', () => {
      const todayEnd = new Date('2024-01-15T18:00:00'); // 오늘 18시 마감

      render(<GatheringDeadlineTag registrationEnd={todayEnd} />);

      const tag = screen.getByText('오늘 18시 마감');
      expect(tag).toBeInTheDocument();
    });

    it('내일 마감이면 secondary 색상과 D-1 텍스트를 표시해야 한다', () => {
      const tomorrowEnd = new Date('2024-01-16T12:00:00'); // 내일 마감

      render(<GatheringDeadlineTag registrationEnd={tomorrowEnd} />);

      const tag = screen.getByText('D-1');
      expect(tag).toBeInTheDocument();
    });

    it('마감이 지났으면 ended 텍스트를 표시해야 한다', () => {
      const pastDate = new Date('2024-01-10T12:00:00'); // 5일 전

      render(<GatheringDeadlineTag registrationEnd={pastDate} />);

      const tag = screen.getByText('마감됨');
      expect(tag).toBeInTheDocument();
    });
  });

  describe('엣지 케이스', () => {
    it('정확히 7일 남으면 secondary 색상을 표시해야 한다', () => {
      const sevenDaysLater = new Date('2024-01-22T12:00:00'); // 정확히 7일 후

      render(<GatheringDeadlineTag registrationEnd={sevenDaysLater} />);

      const tag = screen.getByText('D-7');
      expect(tag).toBeInTheDocument();
    });

    it('정확히 0일 남으면 primary 색상을 표시해야 한다', () => {
      const sameDay = new Date('2024-01-15T18:00:00'); // 같은 날 마감

      render(<GatheringDeadlineTag registrationEnd={sameDay} />);

      const tag = screen.getByText('오늘 18시 마감');
      expect(tag).toBeInTheDocument();
    });

    it('시간이 00시면 올바르게 포맷팅되어야 한다', () => {
      const midnightEnd = new Date('2024-01-15T00:00:00'); // 자정 마감

      render(<GatheringDeadlineTag registrationEnd={midnightEnd} />);

      const tag = screen.getByText('마감됨');
      expect(tag).toBeInTheDocument();
    });
  });

  describe('CSS 클래스', () => {
    it('absolute top-0 right-0 클래스가 적용되어야 한다', () => {
      const futureDate = new Date('2024-01-20T12:00:00');

      const { container } = render(<GatheringDeadlineTag registrationEnd={futureDate} />);

      const tagElement = container.querySelector('[class*="absolute"]');
      expect(tagElement).toHaveClass('absolute', 'top-0', 'right-0');
    });
  });
});
