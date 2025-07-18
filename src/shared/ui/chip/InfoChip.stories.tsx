import type { Meta, StoryObj } from '@storybook/nextjs';
import { InfoChip } from './InfoChip';

const meta: Meta<typeof InfoChip> = {
  title: 'shared/ui/Chip/InfoChip',
  component: InfoChip,
  tags: ['autodocs'],

  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'time'],
    },
    info: {
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

  args: {
    info: '1월 7일',
  },
};

export default meta;

type Story = StoryObj<typeof InfoChip>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Time: Story = {
  args: {
    variant: 'time',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <InfoChip
        variant="default"
        info="1월 7일"
      />
      <InfoChip
        variant="time"
        info="1월 7일"
      />
    </div>
  ),
};
