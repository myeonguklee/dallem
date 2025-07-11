import { Meta, StoryObj } from '@storybook/nextjs';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'shared/ui/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'toggle',
        'hover',
        'typing',
        'done',
        'error',
        'password_default',
        'password_off',
        'password_on',
        'password_error',
      ],
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
    hasIcon: false,
    errorMessage: '',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    variant: 'error',
    errorMessage: '에러 메시지를 입력하세요',
  },
};

export const WithIconPadding: Story = {
  args: {
    hasIcon: true,
    placeholder: '오른쪽에 아이콘이 올 예정',
  },
};

export const Password_Toggle: Story = {
  args: {
    variant: 'password_off',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input
        variant="default"
        placeholder="default"
      />
      <Input
        variant="toggle"
        placeholder="toggle"
      />
      <Input
        variant="hover"
        placeholder="hover"
      />
      <Input
        variant="typing"
        placeholder="typing"
      />
      <Input
        variant="done"
        placeholder="done"
      />
      <Input
        variant="error"
        placeholder="error"
        errorMessage="에러 메시지"
      />
      <Input
        variant="password_default"
        placeholder="password_default"
      />
      <Input
        variant="password_off"
        placeholder="password_off"
      />
      <Input
        variant="password_on"
        placeholder="password_on"
      />
      <Input
        variant="password_error"
        placeholder="password_error"
        errorMessage="비밀번호 오류"
      />
    </div>
  ),
};
