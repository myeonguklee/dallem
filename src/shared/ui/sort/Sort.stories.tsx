import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Sort } from './Sort';

const meta: Meta<typeof Sort> = {
  title: 'shared/ui/Sort',
  tags: ['autodocs'],
  component: Sort,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof Sort>;

const sortOptions = [
  { label: '마감 임박', value: 'deadline' },
  { label: '참여 인원 순', value: 'participant' },
  { label: '인기 순', value: 'popular' },
  { label: '최신 순', value: 'latest' },
  { label: '거리 순', value: 'distance' },
];

// 1. 기본 옵션
export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState(sortOptions[0].value);
    return (
      <Sort
        options={sortOptions.slice(0, 2)}
        selected={selected}
        onChange={setSelected}
      />
    );
  },
};

// 2. 옵션이 1개뿐인 경우
export const SingleOption: Story = {
  render: () => {
    const [selected, setSelected] = useState(sortOptions[0].value);
    return (
      <Sort
        options={sortOptions.slice(0, 1)}
        selected={selected}
        onChange={setSelected}
      />
    );
  },
};

// 3. 옵션이 5개 이상
export const ManyOptions: Story = {
  render: () => {
    const [selected, setSelected] = useState(sortOptions[0].value);
    return (
      <Sort
        options={sortOptions}
        selected={selected}
        onChange={setSelected}
      />
    );
  },
};
