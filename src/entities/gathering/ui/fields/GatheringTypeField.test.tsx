import type { CreateGatheringPayload } from '@/entities/gathering/model/schema';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FieldError, useForm } from 'react-hook-form';
import { GatheringTypeField } from './GatheringTypeField';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'form.type': '서비스 유형',
      'form.services.officeStretching.label': '오피스 스트레칭',
      'form.services.officeStretching.subtitle': '업무 중 스트레칭으로 몸을 풀어보세요',
      'form.services.mindfulness.label': '마인드풀니스',
      'form.services.mindfulness.subtitle': '명상으로 마음을 정리해보세요',
      'form.services.workation.label': '워케이션',
      'form.services.workation.subtitle': '새로운 환경에서 업무를 해보세요',
      'form.type.required': '서비스 유형을 선택해주세요',
    };
    return translations[key] || key;
  },
}));

// 테스트용 폼 컴포넌트
const TestForm = ({ error }: { error?: FieldError }) => {
  const { control } = useForm<CreateGatheringPayload>();
  return (
    <GatheringTypeField
      control={control}
      error={error}
    />
  );
};

describe('GatheringTypeField', () => {
  it('렌더링되어야 한다', () => {
    render(<TestForm />);

    expect(screen.getByText('서비스 유형')).toBeInTheDocument();
  });

  it('모든 서비스 옵션이 표시되어야 한다', () => {
    render(<TestForm />);

    expect(screen.getByText('오피스 스트레칭')).toBeInTheDocument();
    expect(screen.getByText('마인드풀니스')).toBeInTheDocument();
    expect(screen.getByText('워케이션')).toBeInTheDocument();
  });

  it('서비스 옵션의 부제목이 표시되어야 한다', () => {
    render(<TestForm />);

    expect(screen.getByText('업무 중 스트레칭으로 몸을 풀어보세요')).toBeInTheDocument();
    expect(screen.getByText('명상으로 마음을 정리해보세요')).toBeInTheDocument();
    expect(screen.getByText('새로운 환경에서 업무를 해보세요')).toBeInTheDocument();
  });

  it('사용자가 서비스 옵션을 선택할 수 있어야 한다', async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    const officeStretchingOption = screen.getByText('오피스 스트레칭');
    await user.click(officeStretchingOption);

    // BoxSelector가 클릭 가능한지 확인 (부모 div에서 cursor-pointer 클래스 찾기)
    const boxSelectorDiv = officeStretchingOption.parentElement?.parentElement;
    expect(boxSelectorDiv).toHaveClass('cursor-pointer');
  });

  it('에러가 있을 때 에러 메시지가 표시되어야 한다', () => {
    const error = {
      type: 'required',
      message: 'form.type.required',
    };

    render(<TestForm error={error} />);

    expect(screen.getByText('서비스 유형을 선택해주세요')).toBeInTheDocument();
  });

  it('에러가 없을 때는 에러 메시지가 표시되지 않아야 한다', () => {
    render(<TestForm />);

    expect(screen.queryByText('서비스 유형을 선택해주세요')).not.toBeInTheDocument();
  });

  it('세 개의 BoxSelector가 렌더링되어야 한다', () => {
    render(<TestForm />);

    // BoxSelector는 div로 렌더링되므로 div 요소를 찾음
    const boxSelectors = screen.getAllByText(/오피스 스트레칭|마인드풀니스|워케이션/);
    expect(boxSelectors).toHaveLength(3);
  });

  it('각 BoxSelector가 올바른 제목을 가지고 있어야 한다', () => {
    render(<TestForm />);

    const officeStretching = screen.getByText('오피스 스트레칭');
    const mindfulness = screen.getByText('마인드풀니스');
    const workation = screen.getByText('워케이션');

    expect(officeStretching).toBeInTheDocument();
    expect(mindfulness).toBeInTheDocument();
    expect(workation).toBeInTheDocument();
  });
});
