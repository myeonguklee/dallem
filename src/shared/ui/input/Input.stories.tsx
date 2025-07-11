import { Meta, StoryObj } from '@storybook/nextjs';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Shared/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: '입력해주세요',
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const 기본: Story = {};
