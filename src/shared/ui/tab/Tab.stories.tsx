import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { PersonIcon, WorkationIcon } from '../icon';
import { Tab } from './Tab';

const meta: Meta<typeof Tab> = {
  title: 'shared/ui/Tab',
  component: Tab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: '탭 아이템 배열',
    },
    selectedId: {
      control: 'text',
      description: '선택된 탭 ID',
    },
    onSelect: {
      action: 'selected',
      description: '탭 선택 시 호출되는 콜백 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tab>;

// 달램핏 아이콘 (명상하는 사람)
const DallaemfitIcon = () => <PersonIcon className="h-5 w-5" />;

// 워케이션 아이콘 (해변)
const WorkationIconComponent = () => <WorkationIcon className="h-5 w-5" />;

const TabWithState = ({
  items,
  initialSelectedId,
  size,
  orientation,
  disabled,
  className,
}: {
  items: Array<{ id: string; label: string; icon?: React.ReactNode; disabled?: boolean }>;
  initialSelectedId: string;
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  className?: string;
}) => {
  const [activeId, setActiveId] = useState(initialSelectedId);

  return (
    <Tab
      items={items}
      selectedId={activeId}
      onSelect={setActiveId}
      size={size}
      orientation={orientation}
      disabled={disabled}
      className={className}
    />
  );
};

export const Default: Story = {
  render: () => (
    <TabWithState
      items={[
        {
          id: 'dallaemfit',
          label: '달램핏',
          icon: <DallaemfitIcon />,
        },
        {
          id: 'workation',
          label: '워케이션',
          icon: <WorkationIconComponent />,
        },
      ]}
      initialSelectedId="dallaemfit"
      size="md"
      orientation="horizontal"
    />
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <TabWithState
      items={[
        {
          id: 'dallaemfit',
          label: '달램핏',
          icon: <DallaemfitIcon />,
        },
        {
          id: 'workation',
          label: '워케이션',
          icon: <WorkationIconComponent />,
        },
      ]}
      initialSelectedId="dallaemfit"
      size="md"
      orientation="horizontal"
      className="rounded-lg bg-gray-50 p-4"
    />
  ),
};

export const WithoutIcons: Story = {
  render: () => (
    <TabWithState
      items={[
        {
          id: 'option1',
          label: '옵션 1',
        },
        {
          id: 'option2',
          label: '옵션 2',
        },
        {
          id: 'option3',
          label: '옵션 3',
        },
      ]}
      initialSelectedId="option1"
      size="md"
      orientation="horizontal"
    />
  ),
};

export const VerticalOrientation: Story = {
  render: () => (
    <TabWithState
      items={[
        {
          id: 'dallaemfit',
          label: '달램핏',
          icon: <DallaemfitIcon />,
        },
        {
          id: 'workation',
          label: '워케이션',
          icon: <WorkationIconComponent />,
        },
      ]}
      initialSelectedId="dallaemfit"
      size="md"
      orientation="vertical"
    />
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <TabWithState
      items={[
        {
          id: 'dallaemfit',
          label: '달램핏',
          icon: <DallaemfitIcon />,
        },
        {
          id: 'workation',
          label: '워케이션',
          icon: <WorkationIconComponent />,
          disabled: true,
        },
        {
          id: 'option3',
          label: '옵션 3',
        },
      ]}
      initialSelectedId="dallaemfit"
      size="md"
      orientation="horizontal"
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <TabWithState
      items={[
        {
          id: 'dallaemfit',
          label: '달램핏',
          icon: <DallaemfitIcon />,
        },
        {
          id: 'workation',
          label: '워케이션',
          icon: <WorkationIconComponent />,
        },
      ]}
      initialSelectedId="dallaemfit"
      size="md"
      orientation="horizontal"
      disabled={true}
    />
  ),
};
