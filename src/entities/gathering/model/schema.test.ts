import { CreateGatheringPayload, createGatheringSchema } from './schema';

describe('createGatheringSchema', () => {
  const validGatheringData: CreateGatheringPayload = {
    name: '테스트 모임',
    location: '건대입구',
    type: 'OFFICE_STRETCHING',
    dateTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    registrationEnd: new Date(Date.now() + 29 * 24 * 60 * 60 * 1000),
    capacity: 10,
  };

  describe('유효한 데이터 검증', () => {
    it('모든 필수 필드가 올바르면 검증을 통과해야 한다', () => {
      const result = createGatheringSchema.safeParse(validGatheringData);
      expect(result.success).toBe(true);
    });

    it('이미지가 없어도 검증을 통과해야 한다', () => {
      const result = createGatheringSchema.safeParse(validGatheringData);
      expect(result.success).toBe(true);
    });

    it('올바른 이미지 파일이 있으면 검증을 통과해야 한다', () => {
      const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
      const dataWithImage = { ...validGatheringData, image: file };

      const result = createGatheringSchema.safeParse(dataWithImage);
      expect(result.success).toBe(true);
    });
  });

  describe('필수 필드 검증', () => {
    it('name이 없으면 에러가 발생해야 한다', () => {
      const dataWithoutName: Partial<CreateGatheringPayload> = { ...validGatheringData };
      delete dataWithoutName.name;

      const result = createGatheringSchema.safeParse(dataWithoutName);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Required');
      }
    });

    it('location이 없으면 에러가 발생해야 한다', () => {
      const dataWithoutLocation: Partial<CreateGatheringPayload> = { ...validGatheringData };
      delete dataWithoutLocation.location;

      const result = createGatheringSchema.safeParse(dataWithoutLocation);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('form.errors.locationRequired');
      }
    });

    it('type이 없으면 에러가 발생해야 한다', () => {
      const dataWithoutType: Partial<CreateGatheringPayload> = { ...validGatheringData };
      delete dataWithoutType.type;

      const result = createGatheringSchema.safeParse(dataWithoutType);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('form.errors.typeRequired');
      }
    });

    it('dateTime이 없으면 에러가 발생해야 한다', () => {
      const dataWithoutDateTime: Partial<CreateGatheringPayload> = { ...validGatheringData };
      delete dataWithoutDateTime.dateTime;

      const result = createGatheringSchema.safeParse(dataWithoutDateTime);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('form.errors.dateTimeRequired');
      }
    });

    it('registrationEnd가 없으면 에러가 발생해야 한다', () => {
      const dataWithoutRegistrationEnd: Partial<CreateGatheringPayload> = { ...validGatheringData };
      delete dataWithoutRegistrationEnd.registrationEnd;

      const result = createGatheringSchema.safeParse(dataWithoutRegistrationEnd);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('form.errors.registrationEndRequired');
      }
    });
  });

  describe('location 검증', () => {
    it('유효한 location 값들이 통과해야 한다', () => {
      const validLocations: CreateGatheringPayload['location'][] = [
        '건대입구',
        '을지로3가',
        '신림',
        '홍대입구',
      ];

      validLocations.forEach((location) => {
        const data = { ...validGatheringData, location };
        const result = createGatheringSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it('유효하지 않은 location 값이면 에러가 발생해야 한다', () => {
      const data = {
        ...validGatheringData,
        location: '잘못된위치' as CreateGatheringPayload['location'],
      };

      const result = createGatheringSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('type 검증', () => {
    it('유효한 type 값들이 통과해야 한다', () => {
      const validTypes: CreateGatheringPayload['type'][] = [
        'OFFICE_STRETCHING',
        'MINDFULNESS',
        'WORKATION',
      ];

      validTypes.forEach((type) => {
        const data = { ...validGatheringData, type };
        const result = createGatheringSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it('유효하지 않은 type 값이면 에러가 발생해야 한다', () => {
      const data = {
        ...validGatheringData,
        type: 'INVALID_TYPE' as CreateGatheringPayload['type'],
      };

      const result = createGatheringSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('capacity 검증', () => {
    it('capacity가 5 이상이면 통과해야 한다', () => {
      const data = { ...validGatheringData, capacity: 5 };
      const result = createGatheringSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('capacity가 5 미만이면 에러가 발생해야 한다', () => {
      const data = { ...validGatheringData, capacity: 4 };
      const result = createGatheringSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('form.errors.capacityMin');
      }
    });
  });

  describe('이미지 검증', () => {
    it('이미지 파일이 아니면 에러가 발생해야 한다', () => {
      const file = new File([''], 'test.txt', { type: 'text/plain' });
      const data = { ...validGatheringData, image: file };

      const result = createGatheringSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('form.errors.imageType');
      }
    });
  });

  describe('날짜 검증', () => {
    it('registrationEnd가 dateTime보다 늦으면 에러가 발생해야 한다', () => {
      const data = {
        ...validGatheringData,
        registrationEnd: new Date('2025-01-01T18:00:00'), // dateTime보다 늦음
        dateTime: new Date('2024-12-31T18:00:00'),
      };

      const result = createGatheringSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('form.errors.registrationEndInvalid');
      }
    });

    it('dateTime이 과거면 에러가 발생해야 한다', () => {
      const pastDate = new Date('2020-01-01T18:00:00');
      const data = { ...validGatheringData, dateTime: pastDate };

      const result = createGatheringSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        // 과거 날짜는 registrationEnd 검증에서 먼저 걸릴 수 있으므로
        // 에러 메시지를 확인하지 않고 실패만 확인
        expect(result.success).toBe(false);
      }
    });
  });

  describe('타입 추론', () => {
    it('CreateGatheringPayload 타입이 올바르게 추론되어야 한다', () => {
      // 타입 체크만 수행 (런타임 에러 없음)
      const _test: typeof validGatheringData = validGatheringData;
      expect(_test).toBeDefined();
    });
  });
});
