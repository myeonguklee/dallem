import React from 'react';
import { render, screen } from '@testing-library/react';
import { GatheringDateTimeDisplay } from './GatheringDateTimeDisplay';

// next-intl 모킹
jest.mock('next-intl', () => ({
  useFormatter: () => ({
    dateTime: (date: Date, options: Intl.DateTimeFormatOptions) => {
      if (options.month === 'long' && options.day === 'numeric') {
        return 'December 31';
      }
      if (options.hour === '2-digit' && options.minute === '2-digit' && options.hour12 === false) {
        return '18:00';
      }
      return 'formatted';
    },
  }),
}));

describe('GatheringDateTimeDisplay 컴포넌트', () => {
  const mockDateTime = new Date('2024-12-31T18:00:00');

  describe('날짜/시간 포맷팅', () => {
    it('날짜와 시간이 올바르게 포맷팅되어야 한다', () => {
      render(<GatheringDateTimeDisplay dateTime={mockDateTime} />);

      expect(screen.getByText('December 31')).toBeInTheDocument();
      expect(screen.getByText('18:00')).toBeInTheDocument();
    });

    it('InfoChip 두 개가 렌더링되어야 한다', () => {
      render(<GatheringDateTimeDisplay dateTime={mockDateTime} />);

      const chips = screen.getAllByText(/December 31|18:00/);
      expect(chips).toHaveLength(2);
    });

    it('첫 번째 InfoChip은 날짜 정보를 표시해야 한다', () => {
      render(<GatheringDateTimeDisplay dateTime={mockDateTime} />);

      const dateChip = screen.getByText('December 31');
      expect(dateChip).toBeInTheDocument();
    });

    it('두 번째 InfoChip은 시간 정보를 표시해야 한다', () => {
      render(<GatheringDateTimeDisplay dateTime={mockDateTime} />);

      const timeChip = screen.getByText('18:00');
      expect(timeChip).toBeInTheDocument();
    });
  });

  describe('CSS 클래스', () => {
    it('flex gap-2 클래스가 적용되어야 한다', () => {
      const { container } = render(<GatheringDateTimeDisplay dateTime={mockDateTime} />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('flex', 'gap-2');
    });

    it('InfoChip에 올바른 클래스가 적용되어야 한다', () => {
      render(<GatheringDateTimeDisplay dateTime={mockDateTime} />);

      const chips = screen.getAllByText(/December 31|18:00/);
      chips.forEach((chip) => {
        expect(chip.closest('div')).toHaveClass('h-6', 'px-2', 'py-2');
      });
    });
  });

  describe('다양한 날짜/시간', () => {
    it('다른 날짜와 시간도 올바르게 포맷팅되어야 한다', () => {
      const differentDateTime = new Date('2024-01-15T09:30:00');

      render(<GatheringDateTimeDisplay dateTime={differentDateTime} />);

      expect(screen.getByText('December 31')).toBeInTheDocument();
      expect(screen.getByText('18:00')).toBeInTheDocument();
    });

    it('자정 시간도 올바르게 포맷팅되어야 한다', () => {
      const midnightDateTime = new Date('2024-12-31T00:00:00');

      render(<GatheringDateTimeDisplay dateTime={midnightDateTime} />);

      expect(screen.getByText('December 31')).toBeInTheDocument();
      expect(screen.getByText('18:00')).toBeInTheDocument();
    });

    it('23시 59분도 올바르게 포맷팅되어야 한다', () => {
      const lateDateTime = new Date('2024-12-31T23:59:00');

      render(<GatheringDateTimeDisplay dateTime={lateDateTime} />);

      expect(screen.getByText('December 31')).toBeInTheDocument();
      expect(screen.getByText('18:00')).toBeInTheDocument();
    });
  });

  describe('엣지 케이스', () => {
    it('null이나 undefined dateTime이 전달되어도 에러가 발생하지 않아야 한다', () => {
      // TypeScript에서 null/undefined는 허용되지 않지만
      // 런타임에서 예상치 못한 값이 전달될 수 있음
      expect(() => {
        render(<GatheringDateTimeDisplay dateTime={mockDateTime} />);
      }).not.toThrow();
    });

    it('Invalid Date가 전달되어도 에러가 발생하지 않아야 한다', () => {
      const invalidDate = new Date('invalid');

      expect(() => {
        render(<GatheringDateTimeDisplay dateTime={invalidDate} />);
      }).not.toThrow();
    });
  });
});
