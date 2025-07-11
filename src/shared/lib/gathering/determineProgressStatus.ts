import { PROGRESS_STATE, ProgressState } from '@/shared/types/progressStatus';

export default function determineProgressStatus({
  current,
  total,
  minToConfirm,
}: {
  current: number;
  total: number;
  minToConfirm: number;
}) {
  let state: ProgressState = PROGRESS_STATE.OPEN;
  if (current >= total) {
    state = PROGRESS_STATE.FULL;
  } else if (current >= minToConfirm) {
    state = PROGRESS_STATE.CONFIRMED;
  } else {
    state = PROGRESS_STATE.OPEN;
  }
  return state;
}
