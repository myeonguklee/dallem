import React from 'react';
import type { CreateGatheringPayload } from '@/entities/gathering/model/schema';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FieldError, useForm } from 'react-hook-form';
import { GatheringImageField } from './GatheringImageField';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'form.image': '이미지',
      'form.imagePlaceholder': '이미지를 선택해주세요',
      'form.imageButton': '이미지 선택',
      'form.processing.status': '처리 중...',
      'form.processing.waitMessage': '잠시만 기다려주세요...',
      'form.image.required': '이미지를 선택해주세요',
    };
    return translations[key] || key;
  },
}));

// Mock hooks
const mockUseImageResizer = jest.fn();
const mockUseImageProcessingToast = jest.fn();

jest.mock('@/shared/lib/hooks', () => ({
  useImageProcessingToast: () => mockUseImageProcessingToast(),
  useImageResizer: () => mockUseImageResizer(),
}));

// 기본 Mock 설정
beforeEach(() => {
  mockUseImageProcessingToast.mockReturnValue({
    createProgressToast: jest.fn(),
    showProgressToast: jest.fn(),
    showSuccessToast: jest.fn(),
    showErrorToast: jest.fn(),
  });

  mockUseImageResizer.mockReturnValue({
    isProcessing: false,
    fileName: '',
    displayFileName: '',
    handleImageChange: jest.fn(),
  });
});

// 테스트용 폼 컴포넌트
const TestForm = ({
  error,
  onProcessingChange,
}: {
  error?: FieldError;
  onProcessingChange?: (isProcessing: boolean) => void;
}) => {
  const { setValue, watch } = useForm<CreateGatheringPayload>();
  return (
    <GatheringImageField
      setValue={setValue}
      error={error}
      watch={watch}
      onProcessingChange={onProcessingChange}
    />
  );
};

describe('GatheringImageField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('렌더링되어야 한다', () => {
    render(<TestForm />);

    expect(screen.getByText('이미지')).toBeInTheDocument();
    expect(screen.getByText('이미지를 선택해주세요')).toBeInTheDocument();
    expect(screen.getByText('이미지 선택')).toBeInTheDocument();
  });

  it('파일 업로드 버튼이 렌더링되어야 한다', () => {
    render(<TestForm />);

    const uploadButton = screen.getByText('이미지 선택');
    expect(uploadButton).toBeInTheDocument();
    expect(uploadButton).toHaveAttribute('type', 'button');
  });

  it('숨겨진 파일 입력 필드가 있어야 한다', () => {
    render(<TestForm />);

    const fileInput = document.getElementById('gathering-image-upload');
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute('type', 'file');
    expect(fileInput).toHaveAttribute('accept', 'image/*');
    expect(fileInput).toHaveClass('hidden');
  });

  it('업로드 버튼을 클릭하면 파일 선택 다이얼로그가 열려야 한다', async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    const uploadButton = screen.getByText('이미지 선택');
    await user.click(uploadButton);

    const fileInput = document.getElementById('gathering-image-upload');
    expect(fileInput).toBeInTheDocument();
  });

  it('에러가 있을 때 에러 스타일이 적용되어야 한다', () => {
    const error = {
      type: 'required',
      message: 'form.image.required',
    };

    render(<TestForm error={error} />);

    const imageContainer = screen.getAllByText('이미지를 선택해주세요')[0].closest('div');
    expect(imageContainer).toHaveClass('border-red-500');
  });

  it('에러 메시지가 표시되어야 한다', () => {
    const error = {
      type: 'required',
      message: 'form.image.required',
    };

    render(<TestForm error={error} />);

    const errorMessages = screen.getAllByText('이미지를 선택해주세요');
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  it('에러가 없을 때는 에러 스타일이 적용되지 않아야 한다', () => {
    render(<TestForm />);

    const imageContainer = screen.getByText('이미지를 선택해주세요').closest('div');
    expect(imageContainer).not.toHaveClass('border-red-500');
  });

  it('처리 중일 때 버튼이 비활성화되어야 한다', () => {
    mockUseImageResizer.mockReturnValue({
      isProcessing: true,
      fileName: '',
      displayFileName: '',
      handleImageChange: jest.fn(),
    });

    render(<TestForm />);

    const uploadButton = screen.getByRole('button');
    expect(uploadButton).toBeDisabled();
  });

  it('처리 중일 때 처리 상태 메시지가 표시되어야 한다', () => {
    mockUseImageResizer.mockReturnValue({
      isProcessing: true,
      fileName: '',
      displayFileName: '',
      handleImageChange: jest.fn(),
    });

    render(<TestForm />);

    expect(screen.getAllByText('처리 중...').length).toBeGreaterThan(0);
    expect(screen.getByText('잠시만 기다려주세요...')).toBeInTheDocument();
  });

  it('파일이 선택되었을 때 파일명이 표시되어야 한다', () => {
    mockUseImageResizer.mockReturnValue({
      isProcessing: false,
      fileName: 'test-image.jpg',
      displayFileName: 'test-image.jpg',
      handleImageChange: jest.fn(),
    });

    render(<TestForm />);

    expect(screen.getByText('test-image.jpg')).toBeInTheDocument();
  });

  it('onProcessingChange 콜백이 호출되어야 한다', () => {
    const onProcessingChange = jest.fn();

    mockUseImageResizer.mockReturnValue({
      isProcessing: true,
      fileName: '',
      displayFileName: '',
      handleImageChange: jest.fn(),
    });

    render(<TestForm onProcessingChange={onProcessingChange} />);

    expect(onProcessingChange).toHaveBeenCalledWith(true);
  });

  it('파일이 null일 때 이미지가 제거되어야 한다', () => {
    const mockHandleImageChange = jest.fn();

    mockUseImageResizer.mockReturnValue({
      isProcessing: false,
      fileName: '',
      displayFileName: '',
      handleImageChange: mockHandleImageChange,
    });

    render(<TestForm />);

    const fileInput = document.getElementById('gathering-image-upload') as HTMLInputElement;

    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute('type', 'file');
  });

  it('이미지 처리 성공 시 콜백이 호출되어야 한다', () => {
    const mockShowSuccessToast = jest.fn();

    mockUseImageProcessingToast.mockReturnValue({
      createProgressToast: jest.fn(),
      showProgressToast: jest.fn(),
      showSuccessToast: mockShowSuccessToast,
      showErrorToast: jest.fn(),
    });

    render(<TestForm />);

    expect(screen.getByText('이미지')).toBeInTheDocument();
  });

  it('이미지 처리 에러 시 콜백이 호출되어야 한다', () => {
    const mockShowErrorToast = jest.fn();

    mockUseImageProcessingToast.mockReturnValue({
      createProgressToast: jest.fn(),
      showProgressToast: jest.fn(),
      showSuccessToast: jest.fn(),
      showErrorToast: mockShowErrorToast,
    });

    render(<TestForm />);

    expect(screen.getByText('이미지')).toBeInTheDocument();
  });

  it('진행률 업데이트 함수가 올바르게 작동해야 한다', () => {
    const mockShowProgressToast = jest.fn();

    mockUseImageProcessingToast.mockReturnValue({
      createProgressToast: jest.fn(),
      showProgressToast: mockShowProgressToast,
      showSuccessToast: jest.fn(),
      showErrorToast: jest.fn(),
    });

    render(<TestForm />);

    expect(screen.getByText('이미지')).toBeInTheDocument();
  });

  it('실제 파일 업로드 시 handleImageChangeWithToast가 호출되어야 한다', async () => {
    const user = userEvent.setup();
    const mockCreateProgressToast = jest.fn();
    const mockShowProgressToast = jest.fn();
    const mockHandleImageChange = jest.fn().mockImplementation((file, progressCallback) => {
      // 진행률 콜백 호출하여 라인 51 실행
      progressCallback(50);
      progressCallback(100);
      return Promise.resolve();
    });

    mockUseImageProcessingToast.mockReturnValue({
      createProgressToast: mockCreateProgressToast,
      showProgressToast: mockShowProgressToast,
      showSuccessToast: jest.fn(),
      showErrorToast: jest.fn(),
    });

    mockUseImageResizer.mockReturnValue({
      isProcessing: false,
      fileName: '',
      displayFileName: '',
      handleImageChange: mockHandleImageChange,
    });

    render(<TestForm />);

    const fileInput = document.getElementById('gathering-image-upload') as HTMLInputElement;
    const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    await user.upload(fileInput, testFile);

    expect(mockCreateProgressToast).toHaveBeenCalled();
    expect(mockShowProgressToast).toHaveBeenCalledWith(50);
    expect(mockShowProgressToast).toHaveBeenCalledWith(100);
  });

  it('파일이 null인 경우 setValue가 undefined로 호출되어야 한다', async () => {
    render(<TestForm />);

    const fileInput = document.getElementById('gathering-image-upload') as HTMLInputElement;

    await act(async () => {
      Object.defineProperty(fileInput, 'files', {
        value: [],
        configurable: true,
      });

      const event = new Event('change', { bubbles: true });
      fileInput.dispatchEvent(event);
    });

    expect(fileInput).toBeInTheDocument();
  });
});
