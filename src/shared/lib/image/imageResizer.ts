import { ResizeOptions, ResizeResult, WorkerMessage } from './types';

export class ImageResizer {
  private worker: Worker | null = null;
  private isSupported: boolean;
  private isProcessing: boolean = false;

  constructor() {
    // Web Worker 지원 여부 확인
    this.isSupported = typeof Worker !== 'undefined' && typeof OffscreenCanvas !== 'undefined';
  }

  private createWorker(): Worker {
    if (!this.isSupported) {
      throw { code: 'WORKER_UNSUPPORTED', message: 'Web Worker가 지원되지 않는 브라우저입니다.' };
    }

    if (!this.worker) {
      try {
        this.worker = new Worker(new URL('./imageResizer.worker.ts', import.meta.url), {
          type: 'module',
        });
      } catch (error) {
        throw new Error(
          `Worker 생성 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
        );
      }
    }

    return this.worker;
  }

  // 메인 스레드 폴백 리사이징 (Worker 실패 시)
  private async fallbackResize(
    file: File,
    options: ResizeOptions,
    onProgress?: (progress: number) => void,
  ): Promise<ResizeResult> {
    try {
      onProgress?.(10);

      // ImageBitmap 생성
      const imageBitmap = await createImageBitmap(file);
      onProgress?.(30);

      // Canvas 생성
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw { code: 'CANVAS_CONTEXT', message: 'Canvas context를 생성할 수 없습니다.' };
      }

      // 크기 계산
      const { maxWidth, maxHeight, quality, format } = options;
      const { width: originalWidth, height: originalHeight } = imageBitmap;

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

      newWidth = Math.round(newWidth);
      newHeight = Math.round(newHeight);

      onProgress?.(50);

      // Canvas 설정
      canvas.width = newWidth;
      canvas.height = newHeight;

      // 이미지 그리기
      ctx.drawImage(imageBitmap, 0, 0, newWidth, newHeight);
      onProgress?.(80);

      // Blob 변환
      const mimeType = format === 'webp' ? 'image/webp' : 'image/jpeg';
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Blob 변환 실패'));
            }
          },
          mimeType,
          quality,
        );
      });

      onProgress?.(100);

      return {
        blob,
        width: newWidth,
        height: newHeight,
        size: blob.size,
      };
    } catch (error) {
      throw new Error(
        `폴백 리사이징 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      );
    }
  }

  async resizeImage(
    file: File,
    options: ResizeOptions,
    onProgress?: (progress: number) => void,
  ): Promise<ResizeResult> {
    // 중복 처리 방지
    if (this.isProcessing) {
      throw { code: 'PROCESSING', message: '이미지 처리 중입니다. 잠시 후 다시 시도해주세요.' };
    }

    this.isProcessing = true;

    try {
      // 파일 유효성 검사
      if (!file || !file.type.startsWith('image/')) {
        throw { code: 'IMAGE_TYPE', message: '유효한 이미지 파일이 아닙니다.' };
      }

      // 파일 크기 제한 (20MB)
      const MAX_FILE_SIZE = 20 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        throw { code: 'FILE_SIZE', message: '파일 크기가 너무 큽니다. (최대 20MB)' };
      }

      // 지원하는 이미지 형식 확인
      const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!supportedTypes.includes(file.type)) {
        throw {
          code: 'UNSUPPORTED_TYPE',
          message: '지원하지 않는 이미지 형식입니다. (JPEG, PNG, WebP, GIF만 지원)',
        };
      }

      // Worker 사용 시도
      if (this.isSupported) {
        try {
          return await this.resizeWithWorker(file, options, onProgress);
        } catch (workerError) {
          console.warn('Worker 처리 실패, 폴백 메서드 사용:', workerError);
          return await this.fallbackResize(file, options, onProgress);
        }
      } else {
        // Worker 미지원 시 폴백
        return await this.fallbackResize(file, options, onProgress);
      }
    } finally {
      this.isProcessing = false;
    }
  }

  private async resizeWithWorker(
    file: File,
    options: ResizeOptions,
    onProgress?: (progress: number) => void,
  ): Promise<ResizeResult> {
    return new Promise((resolve, reject) => {
      try {
        const worker = this.createWorker();
        const timeoutId: NodeJS.Timeout = setTimeout(() => {
          reject({ code: 'TIMEOUT', message: '이미지 처리 시간이 초과되었습니다.' });
        }, 30000);

        worker.onmessage = (e) => {
          clearTimeout(timeoutId);
          const { type, progress, data, error } = e.data as WorkerMessage;

          switch (type) {
            case 'progress':
              onProgress?.(progress || 0);
              break;
            case 'complete':
              if (data) {
                resolve(data);
              } else {
                reject({ code: 'NO_RESULT', message: '처리 결과가 없습니다.' });
              }
              break;
            case 'error':
              reject(error || { code: 'UNKNOWN', message: '이미지 처리 중 오류가 발생했습니다.' });
              break;
            default:
              reject({ code: 'UNKNOWN', message: '알 수 없는 메시지 타입입니다.' });
          }
        };

        worker.onerror = (error) => {
          clearTimeout(timeoutId);
          reject(new Error(`Worker 오류: ${error.message}`));
        };

        // Worker에 작업 전송
        worker.postMessage({ file, options });
      } catch (error) {
        reject(error);
      }
    });
  }

  // Worker 정리
  destroy() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }

  // 지원 여부 확인
  isWorkerSupported(): boolean {
    return this.isSupported;
  }

  // 처리 중 여부 확인
  isCurrentlyProcessing(): boolean {
    return this.isProcessing;
  }
}

// 싱글톤 인스턴스
export const imageResizer = new ImageResizer();
