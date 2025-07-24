import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { BoxSelector } from './BoxSelector';
import { BoxSelectorGroup } from './BoxSelectorGroup';

const meta: Meta<typeof BoxSelector> = {
  title: 'shared/ui/BoxSelector',
  component: BoxSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isSelected: {
      control: 'boolean',
      description: '선택된 상태 여부',
    },
    title: {
      control: 'text',
      description: '카드의 제목',
    },
    subtitle: {
      control: 'text',
      description: '카드의 부제목 (선택사항)',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    onSelect: {
      action: 'selected',
      description: '선택 시 호출되는 콜백 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '달램핏',
    subtitle: '오피스 스트레칭',
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    title: '달램핏',
    subtitle: '오피스 스트레칭',
    isSelected: true,
  },
};

export const WithoutSubtitle: Story = {
  args: {
    title: '워케이션',
    isSelected: false,
  },
};

export const Disabled: Story = {
  args: {
    title: '달램핏',
    subtitle: '오피스 스트레칭',
    isSelected: false,
    disabled: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const options = [
      {
        id: 'dalaemfit',
        title: '달램핏',
        subtitle: '오피스 스트레칭',
      },
      {
        id: 'workation',
        title: '워케이션',
      },
    ];

    const handleSelect = (optionId: string) => {
      setSelectedOption(selectedOption === optionId ? null : optionId);
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          {options.map((option) => (
            <BoxSelector
              key={option.id}
              title={option.title}
              subtitle={option.subtitle}
              isSelected={selectedOption === option.id}
              onSelect={() => handleSelect(option.id)}
            />
          ))}
        </div>
        <div className="text-sm text-gray-600">선택된 옵션: {selectedOption || '없음'}</div>
      </div>
    );
  },
};

export const SingleSelector: Story = {
  render: () => {
    const [isSelected, setIsSelected] = useState(false);

    return (
      <div className="space-y-4">
        <BoxSelector
          title="달램핏"
          subtitle="오피스 스트레칭"
          isSelected={isSelected}
          onSelect={() => setIsSelected(!isSelected)}
        />
        <div className="text-sm text-gray-600">
          선택 상태: {isSelected ? '선택됨' : '선택되지 않음'}
        </div>
      </div>
    );
  },
};

export const MultipleSelectors: Story = {
  render: () => (
    <div className="flex gap-4">
      <BoxSelector
        title="달램핏"
        subtitle="오피스 스트레칭"
        isSelected={true}
        onSelect={() => console.log('달램핏 선택됨')}
      />
      <BoxSelector
        title="달램핏"
        subtitle="오피스 스트레칭"
        isSelected={false}
        onSelect={() => console.log('달램핏 선택됨')}
      />
      <BoxSelector
        title="워케이션"
        isSelected={false}
        onSelect={() => console.log('워케이션 선택됨')}
      />
    </div>
  ),
};

export const DifferentTextLengths: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <BoxSelector
          title="짧은 제목"
          subtitle="짧은 부제목"
          isSelected={false}
          onSelect={() => console.log('짧은 제목 선택됨')}
        />
        <BoxSelector
          title="매우 긴 제목입니다 이것은 테스트를 위한 긴 텍스트입니다"
          subtitle="매우 긴 부제목입니다 이것도 테스트를 위한 긴 텍스트입니다"
          isSelected={false}
          onSelect={() => console.log('긴 제목 선택됨')}
        />
        <BoxSelector
          title="워케이션"
          isSelected={false}
          onSelect={() => console.log('워케이션 선택됨')}
        />
      </div>
      <div className="text-sm text-gray-600">
        모든 박스가 동일한 크기로 표시됩니다. 긴 텍스트는 truncate됩니다.
      </div>
    </div>
  ),
};

export const BoxSelectorGroupExample: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const options = [
      {
        id: 'dalaemfit',
        title: '달램핏',
        subtitle: '오피스 스트레칭',
      },
      {
        id: 'workation',
        title: '워케이션',
      },
      {
        id: 'fitness',
        title: '피트니스',
        subtitle: '헬스 트레이닝',
      },
    ];

    return (
      <div className="space-y-4">
        <BoxSelectorGroup
          options={options}
          value={selectedValue}
          onChange={setSelectedValue}
        />
        <div className="text-sm text-gray-600">선택된 값: {selectedValue || '없음'}</div>
      </div>
    );
  },
};

export const CustomSizeExample: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const options = [
      {
        id: 'small',
        title: '작은 크기',
        subtitle: '100x50px',
      },
      {
        id: 'medium',
        title: '중간 크기',
        subtitle: '150x70px (기본값)',
      },
      {
        id: 'large',
        title: '큰 크기',
        subtitle: '200x100px',
      },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h3 className="mb-2 text-lg font-semibold">기본 크기 (150x70px)</h3>
          <BoxSelectorGroup
            options={options}
            value={selectedValue}
            onChange={setSelectedValue}
          />
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold">큰 크기 (200x100px)</h3>
          <BoxSelectorGroup
            options={options}
            value={selectedValue}
            onChange={setSelectedValue}
          />
        </div>
      </div>
    );
  },
};

export const LayoutExamples: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const options = [
      {
        id: 'dalaemfit',
        title: '달램핏',
        subtitle: '오피스 스트레칭',
      },
      {
        id: 'workation',
        title: '워케이션',
      },
      {
        id: 'fitness',
        title: '피트니스',
        subtitle: '헬스 트레이닝',
      },
      {
        id: 'yoga',
        title: '요가',
        subtitle: '명상과 스트레칭',
      },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h3 className="mb-2 text-lg font-semibold">가로 배치 (기본값)</h3>
          <BoxSelectorGroup
            options={options}
            value={selectedValue}
            onChange={setSelectedValue}
            layout="horizontal"
          />
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold">세로 배치</h3>
          <BoxSelectorGroup
            options={options}
            value={selectedValue}
            onChange={setSelectedValue}
            layout="vertical"
          />
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold">그리드 배치</h3>
          <BoxSelectorGroup
            options={options}
            value={selectedValue}
            onChange={setSelectedValue}
            layout="grid"
          />
        </div>
      </div>
    );
  },
};
