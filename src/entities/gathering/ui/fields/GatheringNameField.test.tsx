import type { CreateGatheringPayload } from '@/entities/gathering/model/schema';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FieldError, useForm } from 'react-hook-form';
import { GatheringNameField } from './GatheringNameField';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'form.title': '제목',
      'form.titlePlaceholder': '모임 제목을 입력해주세요',
      'form.title.required': '제목을 입력해주세요',
    };
    return translations[key] || key;
  },
}));

// 테스트용 폼 컴포넌트
const TestForm = ({ error }: { error?: FieldError }) => {
  const { register } = useForm<CreateGatheringPayload>();
  return (
    <GatheringNameField
      register={register}
      error={error}
    />
  );
};

describe('GatheringNameField', () => {
  it('렌더링되어야 한다', () => {
    render(<TestForm />);

    expect(screen.getByText('제목')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('모임 제목을 입력해주세요')).toBeInTheDocument();
  });

  it('사용자가 입력할 수 있어야 한다', async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    const input = screen.getByPlaceholderText('모임 제목을 입력해주세요');
    await user.type(input, '테스트 모임');

    expect(input).toHaveValue('테스트 모임');
  });

  it('에러가 있을 때 에러 스타일이 적용되어야 한다', () => {
    const error = {
      type: 'required',
      message: 'form.title.required',
    };

    render(<TestForm error={error} />);

    const input = screen.getByPlaceholderText('모임 제목을 입력해주세요');
    expect(input).toHaveClass('border-red-600');
  });

  it('에러 메시지가 표시되어야 한다', () => {
    const error = {
      type: 'required',
      message: 'form.title.required',
    };

    render(<TestForm error={error} />);

    // 에러 메시지만 찾기 위해 getAllByText 사용
    const errorMessages = screen.getAllByText('제목을 입력해주세요');
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  it('에러가 없을 때는 에러 스타일이 적용되지 않아야 한다', () => {
    render(<TestForm />);

    const input = screen.getByPlaceholderText('모임 제목을 입력해주세요');
    expect(input).not.toHaveClass('border-red-600');
  });
});
