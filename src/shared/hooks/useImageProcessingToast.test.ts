import { act, renderHook } from '@testing-library/react';
import toast from 'react-hot-toast';
import { useImageProcessingToast } from './useImageProcessingToast';

// react-hot-toast 모킹
jest.mock('react-hot-toast', () => ({
  loading: jest.fn(),
  success: jest.fn(),
  error: jest.fn(),
}));

// next-intl 모킹
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string, values?: Record<string, string>) => {
    const translations: Record<string, string> = {
      'processing.progress': '처리 중... {progress}%',
      'processing.complete': '처리 완료',
      'errors.timeout': '시간 초과',
      'errors.memory': '메모리 부족',
      'errors.unsupportedType': '지원하지 않는 형식',
      'errors.corrupted': '손상된 파일',
      'errors.processing': '처리 중',
      'errors.fileSize': '파일 크기 초과',
      'errors.imageType': '이미지 타입 오류',
      'errors.default': '알 수 없는 오류',
    };
    let message = translations[key] || key;
    if (values && typeof values === 'object') {
      Object.entries(values).forEach(([key, value]) => {
        message = message.replace(`{${key}}`, String(value));
      });
    }
    return message;
  },
}));

describe('useImageProcessingToast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createProgressToast', () => {
    it('진행률 토스트를 생성하고 ID를 반환해야 한다', () => {
      const mockToastId = 'toast-123';
      (toast.loading as jest.Mock).mockReturnValue(mockToastId);

      const { result } = renderHook(() => useImageProcessingToast());

      act(() => {
        result.current.createProgressToast();
      });

      expect(toast.loading).toHaveBeenCalledWith('처리 중... 0%', {
        duration: Infinity,
      });
    });
  });

  describe('showProgressToast', () => {
    it('진행률 토스트를 업데이트해야 한다', () => {
      const mockToastId = 'toast-123';
      (toast.loading as jest.Mock).mockReturnValue(mockToastId);

      const { result } = renderHook(() => useImageProcessingToast());

      act(() => {
        result.current.createProgressToast();
        result.current.showProgressToast(50);
      });

      expect(toast.loading).toHaveBeenCalledWith('처리 중... 50%', {
        id: mockToastId,
      });
    });

    it('토스트 ID가 없으면 아무것도 하지 않아야 한다', () => {
      const { result } = renderHook(() => useImageProcessingToast());

      act(() => {
        result.current.showProgressToast(50);
      });

      expect(toast.loading).not.toHaveBeenCalled();
    });
  });

  describe('showSuccessToast', () => {
    it('성공 토스트를 표시하고 토스트 ID를 초기화해야 한다', () => {
      const mockToastId = 'toast-123';
      (toast.loading as jest.Mock).mockReturnValue(mockToastId);

      const { result } = renderHook(() => useImageProcessingToast());

      act(() => {
        result.current.createProgressToast();
        result.current.showSuccessToast();
      });

      expect(toast.success).toHaveBeenCalledWith('처리 완료', {
        id: mockToastId,
        duration: 3000,
      });
    });

    it('토스트 ID가 없으면 아무것도 하지 않아야 한다', () => {
      const { result } = renderHook(() => useImageProcessingToast());

      act(() => {
        result.current.showSuccessToast();
      });

      expect(toast.success).not.toHaveBeenCalled();
    });
  });

  describe('showErrorToast', () => {
    it('에러 토스트를 표시하고 토스트 ID를 초기화해야 한다', () => {
      const mockToastId = 'toast-123';
      (toast.loading as jest.Mock).mockReturnValue(mockToastId);
      const error = { code: 'TIMEOUT', message: '시간 초과' };

      const { result } = renderHook(() => useImageProcessingToast());

      act(() => {
        result.current.createProgressToast();
        result.current.showErrorToast(error);
      });

      expect(toast.error).toHaveBeenCalledWith('시간 초과', {
        id: mockToastId,
        duration: 3000,
      });
    });

    it('다양한 에러 코드에 대해 적절한 메시지를 표시해야 한다', () => {
      const mockToastId = 'toast-123';
      (toast.loading as jest.Mock).mockReturnValue(mockToastId);

      const { result } = renderHook(() => useImageProcessingToast());

      const testCases = [
        { error: { code: 'MEMORY' }, expectedMessage: '메모리 부족' },
        { error: { code: 'UNSUPPORTED_TYPE' }, expectedMessage: '지원하지 않는 형식' },
        { error: { code: 'CORRUPTED' }, expectedMessage: '손상된 파일' },
        { error: { code: 'PROCESSING' }, expectedMessage: '처리 중' },
        { error: { code: 'FILE_SIZE' }, expectedMessage: '파일 크기 초과' },
        { error: { code: 'IMAGE_TYPE' }, expectedMessage: '이미지 타입 오류' },
        { error: { code: 'UNKNOWN' }, expectedMessage: '알 수 없는 오류' },
      ];

      testCases.forEach(({ error, expectedMessage }) => {
        act(() => {
          result.current.createProgressToast();
          result.current.showErrorToast(error);
        });

        expect(toast.error).toHaveBeenCalledWith(expectedMessage, {
          id: mockToastId,
          duration: 3000,
        });
      });
    });

    it('토스트 ID가 없으면 아무것도 하지 않아야 한다', () => {
      const { result } = renderHook(() => useImageProcessingToast());
      const error = { code: 'TIMEOUT', message: '시간 초과' };

      act(() => {
        result.current.showErrorToast(error);
      });

      expect(toast.error).not.toHaveBeenCalled();
    });
  });
});
