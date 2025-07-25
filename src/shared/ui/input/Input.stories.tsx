import { Meta, StoryObj } from '@storybook/nextjs';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'shared/ui/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'toggle', 'hover', 'typing', 'done', 'error'],
    },
    inputSize: {
      control: 'radio',
      options: ['lg', 'sm'],
    },
    errorMessage: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
  },
  args: {
    variant: 'default',
    inputSize: 'lg',
    placeholder: '내용을 입력하세요',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    variant: 'default',
    inputSize: 'lg',
  },
};

export const Typing: Story = {
  args: {
    variant: 'typing',
    inputSize: 'lg',
  },
};

export const ErrorState: Story = {
  args: {
    variant: 'error',
    errorMessage: '에러 메시지를 입력하세요',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Input
        variant="default"
        placeholder="할 일의 제목을 적어주세요."
      />
      <Input
        variant="toggle"
        placeholder="할 일의 제목을 적어주세요."
      />
      <Input
        variant="hover"
        placeholder="할 일의 제목을 적어주세요."
      />
      <Input
        variant="typing"
        placeholder="할 일의 제목을 적어주세요."
      />
      <Input
        variant="done"
        placeholder="할 일의 제목을 적어주세요."
      />
      <Input
        variant="error"
        placeholder="할 일의 제목을 적어주세요."
        errorMessage="입력해주세요."
      />
    </div>
  ),
};
