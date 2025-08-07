import { imageResizer } from '@/shared/lib/image';
import { act, renderHook } from '@testing-library/react';
import { useImageResizer } from './useImageResizer';

// imageResizer 모킹
jest.mock('@/shared/lib/image', () => ({
  imageResizer: {
    resizeImage: jest.fn(),
    isCurrentlyProcessing: jest.fn(),
  },
  IMAGE_SIZE_CONFIG: {
    gathering: { width: 800, height: 600 },
    profile: { width: 200, height: 200 },
  },
}));

describe('useImageResizer', () => {
  const mockImageResizer = imageResizer as jest.Mocked<typeof imageResizer>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createMockFile = (name: string, type: string, size: number): File => {
    const file = new File(['mock content'], name, { type });
    Object.defineProperty(file, 'size', { value: size });
    return file;
  };

  describe('handleImageChange', () => {
    it('null 파일이 전달되면 상태를 초기화해야 한다', async () => {
      const onSuccess = jest.fn();
      const { result } = renderHook(() =>
        useImageResizer({
          sizeConfig: 'gathering',
          onSuccess,
        }),
      );

      await act(async () => {
        await result.current.handleImageChange(null);
      });

      expect(result.current.fileName).toBe('');
      expect(result.current.displayFileName).toBe('');
      expect(onSuccess).not.toHaveBeenCalled();
    });

    it('유효한 이미지 파일을 처리해야 한다', async () => {
      const onSuccess = jest.fn();
      const mockFile = createMockFile('test.jpg', 'image/jpeg', 1024 * 1024);
      const mockBlob = new Blob(['resized content'], { type: 'image/webp' });

      mockImageResizer.isCurrentlyProcessing.mockReturnValue(false);
      mockImageResizer.resizeImage.mockResolvedValue({ blob: mockBlob });

      const { result } = renderHook(() =>
        useImageResizer({
          sizeConfig: 'gathering',
          onSuccess,
        }),
      );

      await act(async () => {
        await result.current.handleImageChange(mockFile);
      });

      expect(mockImageResizer.resizeImage).toHaveBeenCalledWith(
        mockFile,
        {
          width: 800,
          height: 600,
          format: 'webp',
        },
        undefined,
      );
      expect(onSuccess).toHaveBeenCalled();
      expect(result.current.isProcessing).toBe(false);
    });

    it('이미지가 아닌 파일을 거부해야 한다', async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();
      const mockFile = createMockFile('test.txt', 'text/plain', 1024);

      const { result } = renderHook(() =>
        useImageResizer({
          sizeConfig: 'gathering',
          onSuccess,
          onError,
        }),
      );

      await act(async () => {
        await result.current.handleImageChange(mockFile);
      });

      expect(onError).toHaveBeenCalledWith({
        code: 'IMAGE_TYPE',
        message: '유효한 이미지 파일이 아닙니다.',
      });
      expect(onSuccess).not.toHaveBeenCalled();
    });

    it('파일 크기가 너무 큰 경우 거부해야 한다', async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();
      const mockFile = createMockFile('large.jpg', 'image/jpeg', 25 * 1024 * 1024); // 25MB

      const { result } = renderHook(() =>
        useImageResizer({
          sizeConfig: 'gathering',
          onSuccess,
          onError,
        }),
      );

      await act(async () => {
        await result.current.handleImageChange(mockFile);
      });

      expect(onError).toHaveBeenCalledWith({
        code: 'FILE_SIZE',
        message: '파일 크기가 너무 큽니다. (최대 20MB)',
      });
      expect(onSuccess).not.toHaveBeenCalled();
    });

    it('지원하지 않는 이미지 형식을 거부해야 한다', async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();
      const mockFile = createMockFile('test.bmp', 'image/bmp', 1024 * 1024);

      const { result } = renderHook(() =>
        useImageResizer({
          sizeConfig: 'gathering',
          onSuccess,
          onError,
        }),
      );

      await act(async () => {
        await result.current.handleImageChange(mockFile);
      });

      expect(onError).toHaveBeenCalledWith({
        code: 'UNSUPPORTED_TYPE',
        message: '지원하지 않는 이미지 형식입니다.',
      });
      expect(onSuccess).not.toHaveBeenCalled();
    });

    it('이미 처리 중일 때 에러를 반환해야 한다', async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();
      const mockFile = createMockFile('test.jpg', 'image/jpeg', 1024 * 1024);

      mockImageResizer.isCurrentlyProcessing.mockReturnValue(true);

      const { result } = renderHook(() =>
        useImageResizer({
          sizeConfig: 'gathering',
          onSuccess,
          onError,
        }),
      );

      await act(async () => {
        await result.current.handleImageChange(mockFile);
      });

      expect(onError).toHaveBeenCalledWith({
        code: 'PROCESSING',
        message: '이미지 처리 중입니다. 잠시 후 다시 시도해주세요.',
      });
      expect(onSuccess).not.toHaveBeenCalled();
    });

    it('리사이징 중 에러가 발생하면 onError를 호출해야 한다', async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();
      const mockFile = createMockFile('test.jpg', 'image/jpeg', 1024 * 1024);
      const mockError = new Error('Resize failed');

      mockImageResizer.isCurrentlyProcessing.mockReturnValue(false);
      mockImageResizer.resizeImage.mockRejectedValue(mockError);

      const { result } = renderHook(() =>
        useImageResizer({
          sizeConfig: 'gathering',
          onSuccess,
          onError,
        }),
      );

      await act(async () => {
        await result.current.handleImageChange(mockFile);
      });

      expect(onError).toHaveBeenCalledWith(mockError);
      expect(onSuccess).not.toHaveBeenCalled();
      expect(result.current.isProcessing).toBe(false);
    });

    it('진행률 콜백을 호출해야 한다', async () => {
      const onSuccess = jest.fn();
      const onProgress = jest.fn();
      const mockFile = createMockFile('test.jpg', 'image/jpeg', 1024 * 1024);
      const mockBlob = new Blob(['resized content'], { type: 'image/webp' });

      mockImageResizer.isCurrentlyProcessing.mockReturnValue(false);
      mockImageResizer.resizeImage.mockImplementation(async (file, options, progressCallback) => {
        if (progressCallback) {
          progressCallback(50);
          progressCallback(100);
        }
        return { blob: mockBlob };
      });

      const { result } = renderHook(() =>
        useImageResizer({
          sizeConfig: 'gathering',
          onSuccess,
          onProgress,
        }),
      );

      await act(async () => {
        await result.current.handleImageChange(mockFile);
      });

      expect(onProgress).toHaveBeenCalledWith(50);
      expect(onProgress).toHaveBeenCalledWith(100);
    });
  });

  describe('reset', () => {
    it('상태를 초기화해야 한다', () => {
      const onSuccess = jest.fn();
      const { result } = renderHook(() =>
        useImageResizer({
          sizeConfig: 'gathering',
          onSuccess,
        }),
      );

      act(() => {
        result.current.reset();
      });

      expect(result.current.fileName).toBe('');
      expect(result.current.displayFileName).toBe('');
      expect(result.current.isProcessing).toBe(false);
    });
  });

  describe('파일명 자르기', () => {
    it('긴 파일명을 적절히 자르고 표시해야 한다', async () => {
      const onSuccess = jest.fn();
      const mockFile = createMockFile(
        'very-long-filename-that-exceeds-maximum-length.jpg',
        'image/jpeg',
        1024 * 1024,
      );
      const mockBlob = new Blob(['resized content'], { type: 'image/webp' });

      mockImageResizer.isCurrentlyProcessing.mockReturnValue(false);
      mockImageResizer.resizeImage.mockResolvedValue({ blob: mockBlob });

      const { result } = renderHook(() =>
        useImageResizer({
          sizeConfig: 'gathering',
          onSuccess,
        }),
      );

      await act(async () => {
        await result.current.handleImageChange(mockFile);
      });

      // truncateFileName 함수가 20자로 제한하므로 실제로는 자르기된 파일명이 반환됨
      expect(result.current.displayFileName).toBe('very-long-filenam....webp');
    });

    it('짧은 파일명은 그대로 표시해야 한다', async () => {
      const onSuccess = jest.fn();
      const mockFile = createMockFile('short.jpg', 'image/jpeg', 1024 * 1024);
      const mockBlob = new Blob(['resized content'], { type: 'image/webp' });

      mockImageResizer.isCurrentlyProcessing.mockReturnValue(false);
      mockImageResizer.resizeImage.mockResolvedValue({ blob: mockBlob });

      const { result } = renderHook(() =>
        useImageResizer({
          sizeConfig: 'gathering',
          onSuccess,
        }),
      );

      await act(async () => {
        await result.current.handleImageChange(mockFile);
      });

      expect(result.current.displayFileName).toBe('short.webp');
    });
  });
});
