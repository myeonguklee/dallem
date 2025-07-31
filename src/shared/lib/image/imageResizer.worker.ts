import { ResizeOptions, ResizeResult, WorkerMessage } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ctx: Worker = self as any;

// 진행률 단계 정의
const PROGRESS_STAGES = {
  LOADING: 10, // ImageBitmap 생성
  RESIZING: 50, // 리사이징 처리
  CONVERTING: 80, // WebP 변환
  COMPLETE: 100, // 완료
} as const;

// 진행률 업데이트 함수
const updateProgress = (progress: number) => {
  ctx.postMessage({ type: 'progress', progress } as WorkerMessage);
};

// 이미지 리사이징 함수
const resizeImage = async (
  imageBitmap: ImageBitmap,
  options: ResizeOptions,
): Promise<ResizeResult> => {
  const { maxWidth, maxHeight, quality, format } = options;

  // 원본 크기
  const { width: originalWidth, height: originalHeight } = imageBitmap;

  // 비율 유지하면서 크기 계산
  const aspectRatio = originalWidth / originalHeight;
  let newWidth = originalWidth;
  let newHeight = originalHeight;

  if (newWidth > maxWidth) {
    newWidth = maxWidth;
    newHeight = newWidth / aspectRatio;
  }

  if (newHeight > maxHeight) {
    newHeight = maxHeight;
    newWidth = newHeight * aspectRatio;
  }

  // 정수로 반올림
  newWidth = Math.round(newWidth);
  newHeight = Math.round(newHeight);

  updateProgress(PROGRESS_STAGES.RESIZING);

  // OffscreenCanvas 생성
  const canvas = new OffscreenCanvas(newWidth, newHeight);
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const error = { code: 'CANVAS_CONTEXT', message: 'Canvas context를 생성할 수 없습니다.' };
    throw error;
  }

  // 이미지 그리기
  ctx.drawImage(imageBitmap, 0, 0, newWidth, newHeight);

  updateProgress(PROGRESS_STAGES.CONVERTING);

  // Blob으로 변환
  const mimeType = format === 'webp' ? 'image/webp' : 'image/jpeg';
  const blob = await canvas.convertToBlob({
    type: mimeType,
    quality,
  });

  updateProgress(PROGRESS_STAGES.COMPLETE);

  return {
    blob,
    width: newWidth,
    height: newHeight,
    size: blob.size,
  };
};

function getErrorCodeMessage(error: unknown): string | null {
  if (
    error &&
    typeof error === 'object' &&
    'code' in error &&
    typeof (error as { code?: unknown }).code === 'string' &&
    'message' in error &&
    typeof (error as { message?: unknown }).message === 'string'
  ) {
    return `[${(error as { code: string }).code}] ${(error as { message: string }).message}`;
  }
  return null;
}

// Worker 메시지 처리
ctx.addEventListener('message', async (e) => {
  const { file, options } = e.data;

  try {
    updateProgress(PROGRESS_STAGES.LOADING);

    // ImageBitmap 생성
    const imageBitmap = await createImageBitmap(file);

    // 이미지 리사이징
    const result = await resizeImage(imageBitmap, options);

    // 완료 메시지 전송
    ctx.postMessage({
      type: 'complete',
      data: result,
    } as WorkerMessage);
  } catch (error) {
    // 에러 메시지 전송
    ctx.postMessage({
      type: 'error',
      error: (() => {
        const codeMsg = getErrorCodeMessage(error);
        if (codeMsg) return codeMsg;
        if (error instanceof Error) return error.message;
        return '알 수 없는 오류가 발생했습니다.';
      })(),
    } as WorkerMessage);
  }
});
