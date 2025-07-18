import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Filter } from './Filter';

const meta: Meta<typeof Filter> = {
  title: 'shared/ui/Filter',
  component: Filter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 옵션들
const defaultOptions = [
  { label: '전체보기', value: 'all' },
  { label: '건대입구', value: '건대입구' },
  { label: '을지로3가', value: '을지로3가' },
  { label: '신림', value: '신림' },
  { label: '홍대입구', value: '홍대입구' },
];

// 전체보기 선택된 상태
export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState('all');
    return (
      <Filter
        options={defaultOptions}
        selected={selected}
        onChange={setSelected}
        allValue="all"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: '전체보기가 선택된 상태입니다. 흰색 배경으로 표시됩니다.',
      },
    },
  },
};

// 특정 옵션 선택된 상태
export const OptionSelected: Story = {
  render: () => {
    const [selected, setSelected] = useState(defaultOptions[1].value);
    return (
      <Filter
        options={defaultOptions}
        selected={selected}
        onChange={setSelected}
        allValue="all"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: '특정 옵션이 선택된 상태입니다. 검정색 배경으로 표시됩니다.',
      },
    },
  },
};
