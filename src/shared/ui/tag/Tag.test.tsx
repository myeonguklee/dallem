import { render, screen } from '@testing-library/react';
import { Tag } from './Tag';

describe('Tag', () => {
  // 기본 렌더링 테스트
  describe('기본 렌더링', () => {
    it('children을 올바르게 렌더링한다', () => {
      render(<Tag>테스트 태그</Tag>);
      expect(screen.getByText('테스트 태그')).toBeInTheDocument();
    });
  });

  // 색상 variants 테스트
  describe('tagColor variants', () => {
    it('primary 색상을 올바르게 적용한다', () => {
      render(<Tag tagColor="primary">테스트</Tag>);
      const tag = screen.getByText('테스트').closest('div');
      expect(tag).toHaveClass('bg-[var(--color-primary)]', 'text-white');
    });

    it('secondary 색상을 올바르게 적용한다', () => {
      render(<Tag tagColor="secondary">테스트</Tag>);
      const tag = screen.getByText('테스트').closest('div');
      expect(tag).toHaveClass('bg-orange-400', 'text-white');
    });

    it('tertiary 색상을 올바르게 적용한다', () => {
      render(<Tag tagColor="tertiary">테스트</Tag>);
      const tag = screen.getByText('테스트').closest('div');
      expect(tag).toHaveClass('bg-orange-300', 'text-white');
    });

    it('red 색상을 올바르게 적용한다', () => {
      render(<Tag tagColor="red">테스트</Tag>);
      const tag = screen.getByText('테스트').closest('div');
      expect(tag).toHaveClass('bg-red-500', 'text-white');
    });

    it('green 색상을 올바르게 적용한다', () => {
      render(<Tag tagColor="green">테스트</Tag>);
      const tag = screen.getByText('테스트').closest('div');
      expect(tag).toHaveClass('bg-green-500', 'text-white');
    });

    it('blue 색상을 올바르게 적용한다', () => {
      render(<Tag tagColor="blue">테스트</Tag>);
      const tag = screen.getByText('테스트').closest('div');
      expect(tag).toHaveClass('bg-blue-500', 'text-white');
    });

    it('gray 색상을 올바르게 적용한다', () => {
      render(<Tag tagColor="gray">테스트</Tag>);
      const tag = screen.getByText('테스트').closest('div');
      expect(tag).toHaveClass('bg-gray-500', 'text-white');
    });
  });

  // 크기 variants 테스트
  describe('tagSize variants', () => {
    it('sm 크기를 올바르게 적용한다', () => {
      render(<Tag tagSize="sm">테스트</Tag>);
      const tag = screen.getByText('테스트').closest('div');
      expect(tag).toHaveClass('h-6', 'text-xs');
    });

    it('md 크기를 올바르게 적용한다', () => {
      render(<Tag tagSize="md">테스트</Tag>);
      const tag = screen.getByText('테스트').closest('div');
      expect(tag).toHaveClass('h-8', 'text-sm');
    });

    it('lg 크기를 올바르게 적용한다', () => {
      render(<Tag tagSize="lg">테스트</Tag>);
      const tag = screen.getByText('테스트').closest('div');
      expect(tag).toHaveClass('h-10', 'text-base');
    });
  });

  // 모서리 둥근 정도 variants 테스트
  describe('borderRadius variants', () => {
    it('square 모서리를 올바르게 적용한다', () => {
      render(<Tag borderRadius="square">테스트</Tag>);
      const tag = screen.getByText('테스트').closest('div');
      expect(tag).toHaveClass('rounded-bl-xl', 'rounded-tr-lg', 'tablet:rounded-tr-none');
    });

    it('rounded 모서리를 올바르게 적용한다', () => {
      render(<Tag borderRadius="rounded">테스트</Tag>);
      const tag = screen.getByText('테스트').closest('div');
      expect(tag).toHaveClass('rounded-bl-xl', 'rounded-tr-lg');
    });

    it('full 모서리를 올바르게 적용한다', () => {
      render(<Tag borderRadius="full">테스트</Tag>);
      const tag = screen.getByText('테스트').closest('div');
      expect(tag).toHaveClass('rounded-full');
    });
  });

  // 기본값 테스트
  describe('기본값', () => {
    it('기본값이 올바르게 적용된다', () => {
      render(<Tag>테스트</Tag>);
      const tag = screen.getByText('테스트').closest('div');
      expect(tag).toHaveClass(
        'bg-[var(--color-primary)]',
        'text-white',
        'h-8',
        'text-sm',
        'rounded-bl-xl',
        'rounded-tr-lg',
        'tablet:rounded-tr-none',
      );
    });
  });

  // className 오버라이드 테스트
  describe('className 오버라이드', () => {
    it('사용자 정의 className을 올바르게 적용한다', () => {
      render(<Tag className="custom-class">테스트</Tag>);
      const tag = screen.getByText('테스트').closest('div');
      expect(tag).toHaveClass('custom-class');
    });

    it('사용자 정의 배경색 클래스가 기본 배경색 클래스를 오버라이드한다', () => {
      render(<Tag className="bg-purple-500">테스트</Tag>);
      const tag = screen.getByText('테스트').closest('div');
      expect(tag).toHaveClass('bg-purple-500');
      expect(tag).not.toHaveClass('bg-[var(--color-primary)]');
    });
  });

  // HTML 속성 전달 테스트
  describe('HTML 속성 전달', () => {
    it('data-testid를 올바르게 전달한다', () => {
      render(<Tag data-testid="custom-tag">테스트</Tag>);
      expect(screen.getByTestId('custom-tag')).toBeInTheDocument();
    });

    it('onClick 이벤트를 올바르게 전달한다', () => {
      const handleClick = jest.fn();
      render(<Tag onClick={handleClick}>테스트</Tag>);
      screen.getByText('테스트').click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('aria-label을 올바르게 전달한다', () => {
      render(<Tag aria-label="마감 태그">테스트</Tag>);
      expect(screen.getByLabelText('마감 태그')).toBeInTheDocument();
    });
  });

  // 복합 variants 테스트
  describe('복합 variants', () => {
    it('모든 variants를 조합하여 올바르게 렌더링한다', () => {
      render(
        <Tag
          tagColor="red"
          tagSize="lg"
          borderRadius="full"
          className="custom-class"
        >
          복합 테스트
        </Tag>,
      );
      const tag = screen.getByText('복합 테스트').closest('div');
      expect(tag).toHaveClass(
        'bg-red-500',
        'text-white',
        'h-10',
        'text-base',
        'rounded-full',
        'custom-class',
      );
    });
  });

  // 접근성 테스트
  describe('접근성', () => {
    it('올바른 HTML 구조를 가진다', () => {
      render(<Tag>테스트</Tag>);
      const tag = screen.getByText('테스트').closest('div');
      expect(tag).toBeInTheDocument();
      expect(tag?.tagName).toBe('DIV');
    });

    it('텍스트가 스크린 리더에서 읽을 수 있다', () => {
      render(<Tag>마감 태그</Tag>);
      expect(screen.getByText('마감 태그')).toBeInTheDocument();
    });
  });
});
