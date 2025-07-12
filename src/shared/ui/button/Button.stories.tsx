import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from './Button';

const meta = {
  title: 'shared/ui/button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'outline', 'default', 'ghost'],
      description: ' 버튼의 색상을 지정합니다. ',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '버튼 비활성화 여부 입니다. ',
    },

    children: {
      control: { type: 'text' },
      description: '버튼의 내용을 입력해주세요',
    },
    className: {
      control: { type: 'text' },
      description: '추가하고자 하는 스타일을 입력해주세요 ',
    },
    isActive: {
      control: { type: 'boolean' },
      description: '페이지네이션 활성상태의 버튼 css 입히는 용도입니다. ',
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 핸들러 입니다. ',
    },
  },
  args: {
    children: '버튼',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryBtn: Story = {
  args: {
    variant: 'primary',
  },
};

export const OutlineBtn: Story = {
  args: {
    variant: 'outline',
  },
};

export const DefaultBtn: Story = {
  args: {
    variant: 'default',
  },
};

export const GhostBtn: Story = {
  args: {
    variant: 'ghost',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'default',
    disabled: true,
  },
};

export const FixedWidthButton: Story = {
  args: {
    variant: 'default',
    className: 'w-[420px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'className = w-[420px] 으로 주시면 px으로 값을 조절 가능합니다. ',
      },
    },
  },
};

export const FullWidthButton: Story = {
  render: (args) => (
    <div className="w-[800px]">
      <Button
        {...args}
        className="w-full"
      >
        수정하기
      </Button>
    </div>
  ),
  args: {
    variant: 'outline',
  },
  parameters: {
    docs: {
      description: {
        story: 'classNama 으로 w-full 을 주시면 부모 넓이에 맞춰 버튼의 width가 조정됩니다.',
      },
    },
  },
};

export const HalfWidthButtons: Story = {
  render: (args) => (
    <div className="flex w-[1000px] items-center justify-center gap-4">
      <Button
        {...args}
        variant="primary"
        className="w-1/2"
      >
        수정하기
      </Button>
      <Button
        {...args}
        variant="outline"
        className="w-1/2"
      >
        취소하기
      </Button>
    </div>
  ),
  args: {
    variant: 'primary',
  },
};

export const Clickable: Story = {
  args: {
    variant: 'primary',
    children: '클릭 테스트',
    onClick: () => alert('버튼 클릭됨!'),
  },
};
