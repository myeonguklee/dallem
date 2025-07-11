import type { Meta, StoryObj } from '@storybook/nextjs';
import { TimeChip } from './timeChip';

const meta: Meta<typeof TimeChip> = {
  title: 'shared/ui/Chip/timeChip',
  component: TimeChip,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['available', 'selected', 'disabled'],
    },
  },
  args: {
    children: '15:00',
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TimeChip>;

export const Available: Story = { args: { variant: 'available' } };
export const Selected: Story = { args: { variant: 'selected' } };
export const Disabled: Story = { args: { variant: 'disabled' } };
