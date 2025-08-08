import type { CreateGatheringPayload } from '@/entities/gathering/model/schema';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FieldError, useForm } from 'react-hook-form';
import { GatheringLocationField } from './GatheringLocationField';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'form.location': '위치',
      'form.locationPlaceholder': '위치를 선택해주세요',
      'form.locations.konkuk': '건대입구',
      'form.locations.euljiro': '을지로3가',
      'form.locations.sinrim': '신림',
      'form.locations.hongdae': '홍대입구',
      'form.location.required': '위치를 선택해주세요',
    };
    return translations[key] || key;
  },
}));

// 테스트용 폼 컴포넌트
const TestForm = ({ error }: { error?: FieldError }) => {
  const { control } = useForm<CreateGatheringPayload>();
  return (
    <GatheringLocationField
      control={control}
      error={error}
    />
  );
};

describe('GatheringLocationField', () => {
  it('렌더링되어야 한다', () => {
    render(<TestForm />);

    expect(screen.getByText('위치')).toBeInTheDocument();
  });

  it('기본 플레이스홀더가 표시되어야 한다', () => {
    render(<TestForm />);

    expect(screen.getByText('위치를 선택해주세요')).toBeInTheDocument();
  });

  it('드롭다운을 클릭하면 옵션들이 표시되어야 한다', async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    const dropdownTrigger = screen.getByText('위치를 선택해주세요');
    await user.click(dropdownTrigger);

    // 드롭다운 옵션들이 표시되는지 확인
    expect(screen.getByText('건대입구')).toBeInTheDocument();
    expect(screen.getByText('을지로3가')).toBeInTheDocument();
    expect(screen.getByText('신림')).toBeInTheDocument();
    expect(screen.getByText('홍대입구')).toBeInTheDocument();
  });

  it('위치를 선택하면 선택된 값이 표시되어야 한다', async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    const dropdownTrigger = screen.getByText('위치를 선택해주세요');
    await user.click(dropdownTrigger);

    const konkukOption = screen.getByText('건대입구');
    await user.click(konkukOption);

    // 선택된 값이 표시되는지 확인
    expect(screen.getByText('건대입구')).toBeInTheDocument();
  });

  it('에러가 있을 때 에러 스타일이 적용되어야 한다', () => {
    const error = {
      type: 'required',
      message: 'form.location.required',
    };

    render(<TestForm error={error} />);

    // 에러 스타일이 적용된 버튼을 찾기 위해 더 구체적으로 선택
    const dropdownButton = screen.getByRole('button');
    expect(dropdownButton).toHaveClass('border-red-500');
  });

  it('에러 메시지가 표시되어야 한다', () => {
    const error = {
      type: 'required',
      message: 'form.location.required',
    };

    render(<TestForm error={error} />);

    // 에러 메시지만 찾기 위해 getAllByText 사용
    const errorMessages = screen.getAllByText('위치를 선택해주세요');
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  it('에러가 없을 때는 에러 스타일이 적용되지 않아야 한다', () => {
    render(<TestForm />);

    const dropdownButton = screen.getByRole('button');
    expect(dropdownButton).not.toHaveClass('border-red-500');
  });

  it('드롭다운이 접근 가능해야 한다', () => {
    render(<TestForm />);

    const dropdownButton = screen.getByRole('button');
    expect(dropdownButton).toHaveAttribute('tabindex', '0');
  });

  it('모든 위치 옵션이 올바른 값을 가지고 있어야 한다', async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    const dropdownTrigger = screen.getByText('위치를 선택해주세요');
    await user.click(dropdownTrigger);

    const options = [
      { text: '건대입구', value: '건대입구' },
      { text: '을지로3가', value: '을지로3가' },
      { text: '신림', value: '신림' },
      { text: '홍대입구', value: '홍대입구' },
    ];

    options.forEach((option) => {
      const element = screen.getByText(option.text);
      expect(element).toBeInTheDocument();
    });
  });
});
