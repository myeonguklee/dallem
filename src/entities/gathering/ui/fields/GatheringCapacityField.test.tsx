import type { CreateGatheringPayload } from '@/entities/gathering/model/schema';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FieldError, useForm } from 'react-hook-form';
import { GatheringCapacityField } from './GatheringCapacityField';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'form.participants': '참가 인원',
      'form.participantsPlaceholder': '참가 인원을 입력해주세요',
      'form.participants.min': '최소 5명 이상 입력해주세요',
    };
    return translations[key] || key;
  },
}));

// 테스트용 폼 컴포넌트
const TestForm = ({ error }: { error?: FieldError }) => {
  const { register } = useForm<CreateGatheringPayload>();
  return (
    <GatheringCapacityField
      register={register}
      error={error}
    />
  );
};

describe('GatheringCapacityField', () => {
  it('렌더링되어야 한다', () => {
    render(<TestForm />);

    expect(screen.getByText('참가 인원')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('참가 인원을 입력해주세요')).toBeInTheDocument();
  });

  it('숫자 입력 필드여야 한다', () => {
    render(<TestForm />);

    const input = screen.getByPlaceholderText('참가 인원을 입력해주세요');
    expect(input).toHaveAttribute('type', 'number');
  });

  it('최소값이 5로 설정되어야 한다', () => {
    render(<TestForm />);

    const input = screen.getByPlaceholderText('참가 인원을 입력해주세요');
    expect(input).toHaveAttribute('min', '5');
  });

  it('사용자가 숫자를 입력할 수 있어야 한다', async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    const input = screen.getByPlaceholderText('참가 인원을 입력해주세요');
    await user.type(input, '10');

    expect(input).toHaveValue(10);
  });

  it('에러가 있을 때 에러 스타일이 적용되어야 한다', () => {
    const error = {
      type: 'min',
      message: 'form.participants.min',
    };

    render(<TestForm error={error} />);

    const input = screen.getByPlaceholderText('참가 인원을 입력해주세요');
    expect(input).toHaveClass('border-red-600');
  });

  it('에러 메시지가 표시되어야 한다', () => {
    const error = {
      type: 'min',
      message: 'form.participants.min',
    };

    render(<TestForm error={error} />);

    // 에러 메시지만 찾기 위해 getAllByText 사용
    const errorMessages = screen.getAllByText('최소 5명 이상 입력해주세요');
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  it('에러가 없을 때는 에러 스타일이 적용되지 않아야 한다', () => {
    render(<TestForm />);

    const input = screen.getByPlaceholderText('참가 인원을 입력해주세요');
    expect(input).not.toHaveClass('border-red-600');
  });
});
