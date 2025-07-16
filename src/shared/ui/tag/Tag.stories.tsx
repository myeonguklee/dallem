import type { Meta, StoryObj } from '@storybook/nextjs';
import { Tag } from './Tag';

const meta = {
  title: 'shared/ui/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    borderRadius: {
      control: { type: 'radio' },
      options: ['square', 'rounded'],
      description: '태그의 모서리 둥근 정도를 지정합니다.',
    },
    className: {
      control: { type: 'text' },
      description: '추가하고자 하는 스타일을 입력해주세요.',
    },
  },
  args: {
    borderRadius: 'square',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryToday: Story = {
  args: {
    tagColor: 'primary',
    children: '오늘 18시 마감',
    borderRadius: 'rounded',
  },
};

export const PrimaryTodaySquare: Story = {
  args: {
    tagColor: 'primary',
    children: '오늘 24시 마감',
    borderRadius: 'square',
  },
};

export const Secondary1Day: Story = {
  args: {
    tagColor: 'secondary',
    children: '1일 후 마감',
    borderRadius: 'rounded',
  },
};

export const Secondary1DaySquare: Story = {
  args: {
    tagColor: 'secondary',
    children: '1일 후 마감',
    borderRadius: 'square',
  },
};

export const Tertiary8Days: Story = {
  args: {
    tagColor: 'tertiary',
    children: '8일 후 마감',
    borderRadius: 'rounded',
  },
};

export const Tertiary8DaysSquare: Story = {
  args: {
    tagColor: 'tertiary',
    children: '8일 후 마감',
    borderRadius: 'square',
  },
};
