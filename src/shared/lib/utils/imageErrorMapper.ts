export const mapImageErrorToMessage = (error: unknown, t: (key: string) => string): string => {
  if (error && typeof error === 'object' && 'code' in error) {
    switch ((error as { code: string }).code) {
      case 'TIMEOUT':
        return t('errors.timeout');
      case 'MEMORY':
        return t('errors.memory');
      case 'UNSUPPORTED_TYPE':
        return t('errors.unsupportedType');
      case 'CORRUPTED':
        return t('errors.corrupted');
      case 'PROCESSING':
        return t('errors.processing');
      case 'FILE_SIZE':
        return t('errors.fileSize');
      case 'IMAGE_TYPE':
        return t('errors.imageType');
      default:
        return t('errors.default');
    }
  }
  return t('errors.default');
};
