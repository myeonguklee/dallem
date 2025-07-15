import type { Meta, StoryObj } from '@storybook/nextjs';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'shared/ui/Chip/chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    active: { control: 'boolean' },
    size: {
      control: { type: 'inline-radio' },
      options: ['lg', 'sm'],
    },
  },
  args: {
    children: '전체',
    active: false,
    size: 'sm',
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

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    active: false,
    size: 'lg',
  },
};

export const Active: Story = {
  args: {
    active: true,
    size: 'lg',
  },
};

export const Small: Story = {
  args: {
    active: false,
    size: 'sm',
  },
};

export const ActiveSmall: Story = {
  args: {
    active: true,
    size: 'sm',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <Chip
        size="lg"
        active={false}
      >
        전체
      </Chip>
      <Chip
        size="lg"
        active={true}
      >
        전체
      </Chip>
      <Chip
        size="sm"
        active={false}
      >
        전체
      </Chip>
      <Chip
        size="sm"
        active={true}
      >
        전체
      </Chip>
    </div>
  ),
};
