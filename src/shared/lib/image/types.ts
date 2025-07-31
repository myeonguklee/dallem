export interface ResizeOptions {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  format: 'webp' | 'jpeg';
}

export interface ResizeResult {
  blob: Blob;
  width: number;
  height: number;
  size: number;
}

export interface WorkerMessage {
  type: 'progress' | 'complete' | 'error';
  progress?: number;
  data?: ResizeResult;
  error?: string;
}

export interface ImageSizeConfig {
  gathering: {
    maxWidth: 800;
    maxHeight: 600;
    quality: 0.8;
  };
  profile: {
    maxWidth: 200;
    maxHeight: 200;
    quality: 0.8;
  };
}

export const IMAGE_SIZE_CONFIG: ImageSizeConfig = {
  gathering: {
    maxWidth: 800,
    maxHeight: 600,
    quality: 0.8,
  },
  profile: {
    maxWidth: 200,
    maxHeight: 200,
    quality: 0.8,
  },
} as const;
