import type { Meta, StoryObj } from '@storybook/nextjs';
import { InputTextarea } from './InputTextarea';

const meta: Meta<typeof InputTextarea> = {
  title: 'shared/ui/InputTextarea',
  component: InputTextarea,
  args: {
    placeholder: '할 일의 제목을 적어주세요.',
  },
  argTypes: {
    state: {
      control: 'radio',
      options: ['default', 'disabled'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputTextarea>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    state: 'disabled',
  },
};
