import React from 'react';
import determineProgressStatus from '@/shared/lib/gathering/determineProgressStatus';
import { PROGRESS_STATE } from '@/shared/types/progressStatus';
import { render, screen } from '@testing-library/react';
import ProgressBar from '../../shared/ui/progressbar/ProgressBar';

jest.mock('@/shared/lib/gathering/determineProgressStatus');
const mockDetermineProgressStatus = determineProgressStatus as jest.Mock;

describe('진행바 컴포넌트', () => {
  beforeEach(() => {
    mockDetermineProgressStatus.mockReturnValue(PROGRESS_STATE.OPEN);
  });

  afterEach(() => {
    mockDetermineProgressStatus.mockClear();
  });

  it('진행률에 따라 올바른 너비가 적용된다', () => {
    const current = 50;
    const total = 100;
    const minToConfirm = 75;

    render(
      <ProgressBar
        current={current}
        total={total}
        minToConfirm={minToConfirm}
      />,
    );

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveStyle({ width: '50%' });
  });

  it('최소 확정 인원 미만일 때 OPEN 상태에 맞는 컬러를 적용해야 한다', () => {
    const current = 50;
    const total = 100;
    const minToConfirm = 75;

    render(
      <ProgressBar
        current={current}
        total={total}
        minToConfirm={minToConfirm}
      />,
    );

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('bg-orange-600'); // 실제 적용 클래스
  });

  it('최소 확정 인원 이상일 때 CONFIRMED 상태에 맞는 컬러를 적용해야 한다', () => {
    mockDetermineProgressStatus.mockReturnValue(PROGRESS_STATE.CONFIRMED);

    render(
      <ProgressBar
        current={75}
        total={100}
        minToConfirm={75}
      />,
    );

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('bg-primary');
  });

  it('정원을 채웠을 때 FULL 상태에 맞는 컬러를 적용해야 한다', () => {
    mockDetermineProgressStatus.mockReturnValue(PROGRESS_STATE.FULL);

    render(
      <ProgressBar
        current={100}
        total={100}
        minToConfirm={75}
      />,
    );

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('bg-orange-400');
  });
  it('정원이 0이면 진행바가 0%로 표시된다', () => {
    const current = 50;
    const total = 0;
    const minToConfirm = 75;

    render(
      <ProgressBar
        current={current}
        total={total}
        minToConfirm={minToConfirm}
      />,
    );

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveStyle({ width: '0%' });
  });

  it('현재 인원이 정원을 초과하면 최대 너비 100%로 제한된다', () => {
    const current = 150;
    const total = 100;
    const minToConfirm = 75;
    mockDetermineProgressStatus.mockReturnValue(PROGRESS_STATE.FULL);

    render(
      <ProgressBar
        current={current}
        total={total}
        minToConfirm={minToConfirm}
      />,
    );

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveStyle({ width: '100%' });
  });
});
