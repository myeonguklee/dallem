import React from 'react';
import {
  AlarmIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowLineRightIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  BlackStateIcon,
  CalendarIcon,
  CheckBoxIcon,
  CheckCircleIcon,
  CheckIcon,
  DalaemfitIcon,
  DarkCheckCircleIcon,
  DoubleHeartIcon,
  EditIcon,
  HeartBoxIcon,
  LikeIcon,
  LoginImageIcon,
  PencilIcon,
  PersonIcon,
  ProfileBGIcon,
  ProfileEditIcon,
  ProfileIcon,
  ThinDoubleHeartIcon,
  UnlikeIcon,
  VacantCheckBoxIcon,
  VisibilityOffIcon,
  VisibilityOnIcon,
  WhiteArrowDownIcon,
  WhiteStateIcon,
  WorkationIcon,
  XIcon,
} from '@/shared/ui/icon';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'shared/ui/icons',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number', min: 16, max: 64, step: 4 },
      description: '아이콘 크기 (픽셀)',
    },
  },
  args: {
    size: 24,
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 아이콘들
export const Check: Story = {
  render: (args) => <CheckIcon {...args} />,
};

export const Alarm: Story = {
  render: (args) => (
    <div className="inline-block rounded-md bg-gray-200 p-2">
      <AlarmIcon {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '알람 아이콘은 흰색입니다. 배경은 임의로 추가했습니다. 사용시 참고해주세요.',
      },
    },
  },
};

export const Calendar: Story = {
  render: (args) => <CalendarIcon {...args} />,
};

export const Edit: Story = {
  render: (args) => <EditIcon {...args} />,
};

export const Person: Story = {
  render: (args) => <PersonIcon {...args} />,
};

export const X: Story = {
  render: (args) => <XIcon {...args} />,
};

// 화살표 아이콘들
export const ArrowDown: Story = {
  render: (args) => <ArrowDownIcon {...args} />,
};

export const ArrowUp: Story = {
  render: (args) => <ArrowUpIcon {...args} />,
};

export const ArrowLeft: Story = {
  render: (args) => <ArrowLeftIcon {...args} />,
};

export const ArrowRight: Story = {
  render: (args) => <ArrowRightIcon {...args} />,
};

export const ArrowLineRight: Story = {
  render: (args) => <ArrowLineRightIcon {...args} />,
};

export const WhiteArrowDown: Story = {
  render: (args) => (
    <div className="inline-block rounded-md bg-gray-200 p-2">
      <WhiteArrowDownIcon {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '화살표 아이콘은 흰색입니다. 배경은 임의로 추가했습니다. 사용시 참고해주세요.',
      },
    },
  },
};

// 체크 관련 아이콘들
export const CheckCircle: Story = {
  render: (args) => <CheckCircleIcon {...args} />,
};

export const CheckBox: Story = {
  render: (args) => <CheckBoxIcon {...args} />,
};

export const VacantCheckBox: Story = {
  render: (args) => <VacantCheckBoxIcon {...args} />,
};

export const DarkCheckCircle: Story = {
  render: (args) => <DarkCheckCircleIcon {...args} />,
};

// 좋아요 관련 아이콘들
export const Like: Story = {
  render: (args) => <LikeIcon {...args} />,
};

export const HeartBox: Story = {
  render: (args) => <HeartBoxIcon {...args} />,
};

export const DoubleHeart: Story = {
  render: (args) => <DoubleHeartIcon {...args} />,
};

export const ThinDoubleHeart: Story = {
  render: (args) => <ThinDoubleHeartIcon {...args} />,
};

export const Unlike: Story = {
  render: (args) => <UnlikeIcon {...args} />,
};

// 가시성 관련 아이콘들
export const VisibilityOn: Story = {
  render: (args) => <VisibilityOnIcon {...args} />,
};

export const VisibilityOff: Story = {
  render: (args) => <VisibilityOffIcon {...args} />,
};

// 프로필 관련 아이콘들
export const Profile: Story = {
  render: (args) => <ProfileIcon {...args} />,
};

export const ProfileBG: Story = {
  render: (args) => <ProfileBGIcon {...args} />,
};

export const ProfileEdit: Story = {
  render: (args) => <ProfileEditIcon {...args} />,
};

// 상태 아이콘들
export const BlackState: Story = {
  render: (args) => <BlackStateIcon {...args} />,
};

export const WhiteState: Story = {
  render: (args) => (
    <div className="inline-block rounded-md bg-gray-200 p-2">
      <WhiteStateIcon {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '상태 아이콘은 흰색입니다. 배경은 임의로 추가했습니다. 사용시 참고해주세요.',
      },
    },
  },
};

// 기타 아이콘들
export const Dalaemfit: Story = {
  render: (args) => <DalaemfitIcon {...args} />,
};

export const LoginImage: Story = {
  render: (args) => <LoginImageIcon {...args} />,
};

export const Pencile: Story = {
  render: (args) => <PencilIcon {...args} />,
};

export const Workation: Story = {
  render: (args) => <WorkationIcon {...args} />,
};

// 크기 변형 예시
export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <CheckIcon size={16} />
      <CheckIcon size={24} />
      <CheckIcon size={32} />
      <CheckIcon size={48} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 아이콘 예시입니다.',
      },
    },
  },
};

// 배경 대비 예시
export const BackgroundContrast: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="inline-block rounded-md bg-gray-600 p-2">
        <AlarmIcon size={24} />
      </div>
      <div className="inline-block rounded-md bg-gray-600 p-2">
        <WhiteArrowDownIcon size={24} />
      </div>
      <div className="inline-block rounded-md bg-gray-600 p-2">
        <WhiteStateIcon size={24} />
      </div>
      <div className="inline-block rounded-md bg-gray-100 p-2">
        <AlarmIcon size={24} />
      </div>
      <div className="inline-block rounded-md bg-gray-100 p-2">
        <WhiteArrowDownIcon size={24} />
      </div>
      <div className="inline-block rounded-md bg-gray-100 p-2">
        <WhiteStateIcon size={24} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '어두운 배경과 밝은 배경에서의 가시성 비교입니다. 어두운 배경에서는 흰색/연한 회색 아이콘이 더 잘 보입니다.',
      },
    },
  },
};
