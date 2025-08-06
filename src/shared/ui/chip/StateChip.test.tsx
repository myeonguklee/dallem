import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { StateChip } from './StateChip';

// 컴포넌트 경로를 확인해주세요.

jest.mock('../icon/icons/CheckBoxIcon', () => ({
  CheckBoxIcon: () => <div data-testid="checkbox-icon" />,
}));

describe('StateChip 컴포넌트', () => {
  it('자식 요소를 span 태그 안에 정상적으로 렌더링한다.', () => {
    render(<StateChip>테스트</StateChip>);
    const childElement = screen.getByText('테스트');
    expect(childElement).toBeInTheDocument();
    expect(childElement.tagName).toBe('SPAN');
  });

  it('기본적으로 "pending" 스타일을 적용하고 아이콘은 렌더링하지 않는다.', () => {
    render(<StateChip>개설 대기</StateChip>);
    const chipElement = screen.getByText('개설 대기').parentElement;

    expect(chipElement).toHaveClass('bg-white', 'text-gray-500', 'border', 'border-gray-200');
    expect(screen.queryByTestId('checkbox-icon')).not.toBeInTheDocument();
  });

  describe('variant에 따른 아이콘 렌더링', () => {
    it('variant가 "confirmed"일 때 CheckBoxIcon을 렌더링한다.', () => {
      render(<StateChip variant="confirmed">개설 확정</StateChip>);
      expect(screen.getByTestId('checkbox-icon')).toBeInTheDocument();
    });

    it('"confirmed" 이외의 variant에서는 아이콘을 렌더링하지 않는다.', () => {
      render(<StateChip variant="scheduled">이용 예정</StateChip>);
      expect(screen.queryByTestId('checkbox-icon')).not.toBeInTheDocument();
    });
  });

  describe.each([
    {
      variant: 'scheduled' as const,
      text: '이용 예정',
      expectedClasses: ['bg-orange-100', 'text-orange-600'],
    },
    {
      variant: 'completed' as const,
      text: '이용 완료',
      expectedClasses: ['bg-gray-200', 'text-gray-500'],
    },
    {
      variant: 'confirmed' as const,
      text: '개설 확정',
      expectedClasses: ['bg-white', 'text-orange-500', 'border', 'border-orange-100'],
    },
    {
      variant: 'pending' as const,
      text: '개설 대기',
      expectedClasses: ['bg-white', 'text-gray-500', 'border', 'border-gray-200'],
    },
  ])('variant가 "$variant"일 때', ({ variant, text, expectedClasses }) => {
    it(`올바른 스타일을 적용한다.`, () => {
      render(<StateChip variant={variant}>{text}</StateChip>);
      const chipElement = screen.getByText(text).parentElement;

      expectedClasses.forEach((className) => {
        expect(chipElement).toHaveClass(className);
      });
    });
  });

  it('추가 className을 올바르게 병합한다.', () => {
    const customClass = 'mt-4';
    render(
      <StateChip
        variant="completed"
        className={customClass}
      >
        추가 클래스
      </StateChip>,
    );
    const chipElement = screen.getByText('추가 클래스').parentElement;

    expect(chipElement).toHaveClass('bg-gray-200'); // 'completed' 스타일 유지 확인
    expect(chipElement).toHaveClass(customClass); // 추가 클래스 적용 확인
  });
});
