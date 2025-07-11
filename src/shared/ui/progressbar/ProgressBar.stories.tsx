import ProgressBar from './ProgressBar';

export default {
  title: 'shared/ui/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: { type: 'number' },
      description: '현재 인원 수',
    },
    total: {
      control: { type: 'number' },
      description: '정원',
    },
    minToConfirm: {
      control: { type: 'number' },
      description: '개설 확정 인원',
    },
  },
};

type ProgressBarStory = {
  args: {
    current: number;
    total: number;
    minToConfirm: number;
  };
};

export const OpenZero: ProgressBarStory = {
  args: {
    current: 0,
    total: 5,
    minToConfirm: 2,
  },
};

export const Open: ProgressBarStory = {
  args: {
    current: 2,
    total: 10,
    minToConfirm: 5,
  },
};

export const Confirmed: ProgressBarStory = {
  args: {
    current: 5,
    total: 10,
    minToConfirm: 5,
  },
};

export const Full: ProgressBarStory = {
  args: {
    current: 10,
    total: 10,
    minToConfirm: 5,
  },
};
