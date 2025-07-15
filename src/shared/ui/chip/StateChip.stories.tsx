import type { Meta, StoryObj } from '@storybook/nextjs';
import { StateChip } from './StateChip';

const meta: Meta<typeof StateChip> = {
  title: 'shared/ui/Chip/StateChip',
  component: StateChip,
  tags: ['autodocs'],

  argTypes: {
    variant: {
      control: 'select',
      options: ['scheduled', 'completed', 'confirmed', 'pending'],
    },
    children: {
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof StateChip>;

export const Scheduled: Story = {
  args: {
    variant: 'scheduled',
    children: '이용 예정',
  },
};

export const Completed: Story = {
  args: {
    variant: 'completed',
    children: '이용 완료',
  },
};

export const Confirmed: Story = {
  args: {
    variant: 'confirmed',
    children: '개설확정',
  },
};

export const Pending: Story = {
  args: {
    variant: 'pending',
    children: '개설대기',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <StateChip variant="scheduled">이용 예정</StateChip>
      <StateChip variant="completed">이용 완료</StateChip>
      <StateChip variant="confirmed">개설확정</StateChip>
      <StateChip variant="pending">개설대기</StateChip>
    </div>
  ),
};
