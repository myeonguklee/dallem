import type { Meta, StoryObj } from '@storybook/nextjs';
import { InfoChip } from './InfoChip';

const meta: Meta<typeof InfoChip> = {
  title: 'shared/ui/Chip/InfoChip',
  component: InfoChip,
  tags: ['autodocs'],

  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'variant2'],
    },
    date: {
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
    date: '1월 7일',
  },
};

export default meta;

type Story = StoryObj<typeof InfoChip>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Variant2: Story = {
  args: {
    variant: 'variant2',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <InfoChip
        variant="default"
        date="1월 7일"
      />
      <InfoChip
        variant="variant2"
        date="1월 7일"
      />
    </div>
  ),
};
