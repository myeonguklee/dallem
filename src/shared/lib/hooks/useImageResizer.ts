import { useCallback, useState } from 'react';
import { IMAGE_SIZE_CONFIG, imageResizer } from '@/shared/lib/image';

interface UseImageResizerOptions {
  sizeConfig: keyof typeof IMAGE_SIZE_CONFIG; // 'gathering' | 'profile'
  onSuccess: (file: File) => void; // setValue 함수 전달
  onError?: (error: unknown) => void; // 선택적 에러 핸들러
  onProgress?: (progress: number) => void; // 진행률 콜백
}

interface UseImageResizerReturn {
  isProcessing: boolean;
  fileName: string;
  displayFileName: string; // 자른 파일명
  handleImageChange: (file: File | null, onProgress?: (progress: number) => void) => Promise<void>;
  reset: () => void;
}

// 파일명 자르기 유틸리티 함수
const truncateFileName = (fileName: string, maxLength: number = 20): string => {
  if (fileName.length <= maxLength) return fileName;
  const extension = fileName.split('.').pop();
  const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
  return `${nameWithoutExt.substring(0, maxLength - 3)}...${extension ? `.${extension}` : ''}`;
};

// 파일 유효성 검사 함수
const validateImageFile = (file: File): { isValid: boolean; error?: unknown } => {
  // 파일 타입 체크
  if (!file.type.startsWith('image/')) {
    return {
      isValid: false,
      error: { code: 'IMAGE_TYPE', message: '유효한 이미지 파일이 아닙니다.' },
    };
  }

  // 파일 크기 제한 (20MB)
  const MAX_FILE_SIZE = 20 * 1024 * 1024;
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: { code: 'FILE_SIZE', message: '파일 크기가 너무 큽니다. (최대 20MB)' },
    };
  }

  // 지원하는 이미지 형식 확인
  const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (!supportedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: { code: 'UNSUPPORTED_TYPE', message: '지원하지 않는 이미지 형식입니다.' },
    };
  }

  return { isValid: true };
};

export const useImageResizer = (options: UseImageResizerOptions): UseImageResizerReturn => {
  const { sizeConfig, onSuccess, onError, onProgress } = options;
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState('');
  const [displayFileName, setDisplayFileName] = useState('');

  const handleImageChange = useCallback(
    async (file: File | null, customOnProgress?: (progress: number) => void) => {
      if (!file) {
        setFileName('');
        setDisplayFileName('');
        return;
      }

      // 파일 유효성 검사
      const validation = validateImageFile(file);
      if (!validation.isValid) {
        onError?.(validation.error);
        return;
      }

      // 이미 처리 중인지 확인
      if (imageResizer.isCurrentlyProcessing()) {
        onError?.({
          code: 'PROCESSING',
          message: '이미지 처리 중입니다. 잠시 후 다시 시도해주세요.',
        });
        return;
      }

      setIsProcessing(true);
      setFileName(file.name);
      setDisplayFileName(truncateFileName(file.name));

      try {
        // 이미지 리사이징
        const result = await imageResizer.resizeImage(
          file,
          {
            ...IMAGE_SIZE_CONFIG[sizeConfig],
            format: 'webp',
          },
          customOnProgress || onProgress,
        );

        // Blob을 File로 변환
        const resizedFile = new File([result.blob], file.name.replace(/\.[^/.]+$/, '.webp'), {
          type: 'image/webp',
        });

        // 성공 콜백 호출
        onSuccess(resizedFile);
        setFileName(resizedFile.name);
        setDisplayFileName(truncateFileName(resizedFile.name));
      } catch (error) {
        // 테스트 환경이 아닐 때만 콘솔 에러 출력
        if (process.env.NODE_ENV !== 'test') {
          console.error('이미지 처리 오류:', error);
        }
        onError?.(error);
        setFileName(file.name);
        setDisplayFileName(truncateFileName(file.name));
      } finally {
        setIsProcessing(false);
      }
    },
    [sizeConfig, onSuccess, onError, onProgress],
  );

  const reset = useCallback(() => {
    setFileName('');
    setDisplayFileName('');
    setIsProcessing(false);
  }, []);

  return {
    isProcessing,
    fileName,
    displayFileName,
    handleImageChange,
    reset,
  };
};
