import type { Meta, StoryObj } from '@storybook/nextjs';
import { Dropdown, DropdownItem, DropdownList, DropdownTrigger } from './index';

const meta: Meta<typeof DropdownTrigger> = {
  title: 'shared/ui/Dropdown',
  component: DropdownTrigger,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'radio' }, options: ['large', 'small'] },
    state: { control: { type: 'radio' }, options: ['default', 'hover', 'selected'] },
  },
  args: {
    size: 'large',
    state: 'default',
    children: '을지로 3가',
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

type Story = StoryObj<typeof DropdownTrigger>;

// ✅ 기본 트리거 스토리
export const Default: Story = {};

// ✅ 호버 상태
export const Hover: Story = {
  args: { state: 'hover' },
};

// ✅ 선택된 상태
export const Selected: Story = {
  args: { state: 'selected' },
};

// ✅ 스몰 사이즈
export const Small: Story = {
  args: { size: 'small' },
};

export const WithList: StoryObj = {
  render: () => (
    <Dropdown>
      {({ isOpen, toggle }) => (
        <div>
          <DropdownTrigger
            onClick={toggle}
            size="large"
            state={isOpen ? 'selected' : 'default'}
          >
            을지로 3가
          </DropdownTrigger>
          <DropdownList isOpen={isOpen}>
            <DropdownItem state="default">건대입구</DropdownItem>
            <DropdownItem state="hover">을지로 3가</DropdownItem>
            <DropdownItem state="selected">신림</DropdownItem>
            <DropdownItem state="default">홍대입구</DropdownItem>
          </DropdownList>
        </div>
      )}
    </Dropdown>
  ),
};
