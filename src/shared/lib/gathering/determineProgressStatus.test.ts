import { PROGRESS_STATE } from '@/shared/types/progressStatus';
import determineProgressStatus from './determineProgressStatus';

describe('진행 상태 판단 로직', () => {
  it('개설 확정 인원 미만일 때 OPEN 상태를 반환해야 한다', () => {
    const result = determineProgressStatus({
      current: 20,
      total: 100,
      minToConfirm: 50,
    });
    expect(result).toBe(PROGRESS_STATE.OPEN);
  });

  it('개설 확정 인원 이상이고 정원 미만일 때 CONFIRMED 상태를 반환해야 한다', () => {
    const result = determineProgressStatus({
      current: 75,
      total: 100,
      minToConfirm: 50,
    });
    expect(result).toBe(PROGRESS_STATE.CONFIRMED);
  });

  it('정원 이상일 때 FULL 상태를 반환해야 한다', () => {
    const result = determineProgressStatus({
      current: 100,
      total: 100,
      minToConfirm: 50,
    });
    expect(result).toBe(PROGRESS_STATE.FULL);
  });

  it('정원을 초과할 때도 FULL 상태를 반환해야 한다', () => {
    const result = determineProgressStatus({
      current: 120,
      total: 100,
      minToConfirm: 50,
    });
    expect(result).toBe(PROGRESS_STATE.FULL);
  });

  it('현재 인원이 0일 때 OPEN 상태를 반환해야 한다', () => {
    const result = determineProgressStatus({
      current: 0,
      total: 100,
      minToConfirm: 50,
    });
    expect(result).toBe(PROGRESS_STATE.OPEN);
  });
});
