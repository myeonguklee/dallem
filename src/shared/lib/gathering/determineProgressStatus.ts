import { CONFIRMED, FULL, OPEN, ProgressState } from '@/shared/types/progressStatus';

export default function determineProgressStatus({
  current,
  total,
  minToConfirm,
}: {
  current: number;
  total: number;
  minToConfirm: number;
}) {
  let state: ProgressState = OPEN;
  if (current === total) {
    state = FULL;
  } else if (current >= minToConfirm) {
    state = CONFIRMED;
  } else {
    state = OPEN;
  }
  return state;
}
