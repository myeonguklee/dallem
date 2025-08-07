import { mapImageErrorToMessage } from './imageErrorMapper';

describe('mapImageErrorToMessage', () => {
  const mockTranslator = (key: string): string => {
    const translations: Record<string, string> = {
      'errors.timeout': '시간 초과',
      'errors.memory': '메모리 부족',
      'errors.unsupportedType': '지원하지 않는 형식',
      'errors.corrupted': '손상된 파일',
      'errors.processing': '처리 중',
      'errors.fileSize': '파일 크기 초과',
      'errors.imageType': '이미지 타입 오류',
      'errors.default': '알 수 없는 오류',
    };
    return translations[key] || key;
  };

  describe('에러 코드별 메시지 매핑', () => {
    it('TIMEOUT 에러 코드에 대해 적절한 메시지를 반환해야 한다', () => {
      const error = { code: 'TIMEOUT' };
      const result = mapImageErrorToMessage(error, mockTranslator);
      expect(result).toBe('시간 초과');
    });

    it('MEMORY 에러 코드에 대해 적절한 메시지를 반환해야 한다', () => {
      const error = { code: 'MEMORY' };
      const result = mapImageErrorToMessage(error, mockTranslator);
      expect(result).toBe('메모리 부족');
    });

    it('UNSUPPORTED_TYPE 에러 코드에 대해 적절한 메시지를 반환해야 한다', () => {
      const error = { code: 'UNSUPPORTED_TYPE' };
      const result = mapImageErrorToMessage(error, mockTranslator);
      expect(result).toBe('지원하지 않는 형식');
    });

    it('CORRUPTED 에러 코드에 대해 적절한 메시지를 반환해야 한다', () => {
      const error = { code: 'CORRUPTED' };
      const result = mapImageErrorToMessage(error, mockTranslator);
      expect(result).toBe('손상된 파일');
    });

    it('PROCESSING 에러 코드에 대해 적절한 메시지를 반환해야 한다', () => {
      const error = { code: 'PROCESSING' };
      const result = mapImageErrorToMessage(error, mockTranslator);
      expect(result).toBe('처리 중');
    });

    it('FILE_SIZE 에러 코드에 대해 적절한 메시지를 반환해야 한다', () => {
      const error = { code: 'FILE_SIZE' };
      const result = mapImageErrorToMessage(error, mockTranslator);
      expect(result).toBe('파일 크기 초과');
    });

    it('IMAGE_TYPE 에러 코드에 대해 적절한 메시지를 반환해야 한다', () => {
      const error = { code: 'IMAGE_TYPE' };
      const result = mapImageErrorToMessage(error, mockTranslator);
      expect(result).toBe('이미지 타입 오류');
    });
  });

  describe('알 수 없는 에러 코드 처리', () => {
    it('알 수 없는 에러 코드에 대해 기본 메시지를 반환해야 한다', () => {
      const error = { code: 'UNKNOWN_ERROR' };
      const result = mapImageErrorToMessage(error, mockTranslator);
      expect(result).toBe('알 수 없는 오류');
    });

    it('code 속성이 없는 에러에 대해 기본 메시지를 반환해야 한다', () => {
      const error = { message: 'Some error' };
      const result = mapImageErrorToMessage(error, mockTranslator);
      expect(result).toBe('알 수 없는 오류');
    });

    it('null 에러에 대해 기본 메시지를 반환해야 한다', () => {
      const result = mapImageErrorToMessage(null, mockTranslator);
      expect(result).toBe('알 수 없는 오류');
    });

    it('undefined 에러에 대해 기본 메시지를 반환해야 한다', () => {
      const result = mapImageErrorToMessage(undefined, mockTranslator);
      expect(result).toBe('알 수 없는 오류');
    });

    it('문자열 에러에 대해 기본 메시지를 반환해야 한다', () => {
      const result = mapImageErrorToMessage('Some error string', mockTranslator);
      expect(result).toBe('알 수 없는 오류');
    });

    it('숫자 에러에 대해 기본 메시지를 반환해야 한다', () => {
      const result = mapImageErrorToMessage(500, mockTranslator);
      expect(result).toBe('알 수 없는 오류');
    });
  });

  describe('에러 객체 구조 검증', () => {
    it('code 속성이 문자열이 아닌 경우 기본 메시지를 반환해야 한다', () => {
      const error = { code: 404 };
      const result = mapImageErrorToMessage(error, mockTranslator);
      expect(result).toBe('알 수 없는 오류');
    });

    it('빈 객체에 대해 기본 메시지를 반환해야 한다', () => {
      const error = {};
      const result = mapImageErrorToMessage(error, mockTranslator);
      expect(result).toBe('알 수 없는 오류');
    });

    it('빈 문자열 code에 대해 기본 메시지를 반환해야 한다', () => {
      const error = { code: '' };
      const result = mapImageErrorToMessage(error, mockTranslator);
      expect(result).toBe('알 수 없는 오류');
    });
  });

  describe('번역 함수 호출', () => {
    it('번역 함수가 올바른 키로 호출되어야 한다', () => {
      const mockTranslator = jest.fn().mockReturnValue('번역된 메시지');
      const error = { code: 'TIMEOUT' };

      mapImageErrorToMessage(error, mockTranslator);

      expect(mockTranslator).toHaveBeenCalledWith('errors.timeout');
    });

    it('알 수 없는 에러 코드에 대해 기본 에러 키로 번역 함수를 호출해야 한다', () => {
      const mockTranslator = jest.fn().mockReturnValue('기본 에러 메시지');
      const error = { code: 'UNKNOWN' };

      mapImageErrorToMessage(error, mockTranslator);

      expect(mockTranslator).toHaveBeenCalledWith('errors.default');
    });
  });
});
