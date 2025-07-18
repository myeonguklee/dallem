import type { Meta, StoryObj } from '@storybook/nextjs';
import { GatheringCard } from './GatheringCard';

// 현재 날짜 기준으로 미래 날짜 생성
const getFutureDate = (daysFromNow: number, hour: number = 21, minute: number = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hour, minute, 0, 0);
  return date;
};

const meta: Meta<typeof GatheringCard> = {
  title: 'Widgets/GatheringCard',
  component: GatheringCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[1200px] min-w-[800px] p-4">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    gatheringId: {
      control: { type: 'number' },
      description: '모임 ID',
    },
    gatheringType: {
      control: { type: 'text' },
      description: '모임 타입',
    },
    gatheringName: {
      control: { type: 'text' },
      description: '모임 이름',
    },
    gatheringLocation: {
      control: { type: 'text' },
      description: '모임 장소',
    },
    gatheringDateTime: {
      control: { type: 'date' },
      description: '모임 날짜/시간',
    },
    gatheringRegistrationEnd: {
      control: { type: 'date' },
      description: '모집 마감일',
    },
    gatheringParticipantCount: {
      control: { type: 'number', min: 0 },
      description: '현재 참여자 수',
    },
    gatheringCapacity: {
      control: { type: 'number', min: 1 },
      description: '최대 참여자 수',
    },
    gatheringImage: {
      control: { type: 'text' },
      description: '모임 이미지 URL',
    },
    isCanceled: {
      control: { type: 'boolean' },
      description: '모임 취소 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 모임 카드
export const Default: Story = {
  args: {
    gatheringId: 1,
    gatheringType: '워케이션',
    gatheringName: '워케이션',
    gatheringLocation: '을지로 3가',
    gatheringDateTime: getFutureDate(1, 17, 30), // 내일 17:30
    gatheringRegistrationEnd: getFutureDate(7, 21, 0), // 7일 후 21:00 마감
    gatheringParticipantCount: 8,
    gatheringCapacity: 20,
    gatheringImage:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=224&fit=crop&crop=center&q=80',
    isCanceled: false,
  },
};

// 개설확정된 모임 (참여자 5명 이상)
export const Confirmed: Story = {
  args: {
    ...Default.args,
    gatheringParticipantCount: 12,
    gatheringCapacity: 15,
    gatheringRegistrationEnd: getFutureDate(14, 23, 59), // 14일 후 마감
  },
};

// 마감 임박 모임 (오늘 마감)
export const DeadlineToday: Story = {
  args: {
    ...Default.args,
    gatheringRegistrationEnd: getFutureDate(0, 21, 0), // 오늘 21:00 마감
    gatheringParticipantCount: 3,
    gatheringCapacity: 10,
  },
};

// 일주일 이내 마감
export const DeadlineThisWeek: Story = {
  args: {
    ...Default.args,
    gatheringRegistrationEnd: getFutureDate(4, 23, 59), // 4일 후 마감
    gatheringParticipantCount: 5,
    gatheringCapacity: 12,
  },
};

// 일주일 이후 마감
export const DeadlineNextWeek: Story = {
  args: {
    ...Default.args,
    gatheringRegistrationEnd: getFutureDate(11, 23, 59), // 11일 후 마감
    gatheringParticipantCount: 2,
    gatheringCapacity: 8,
  },
};

// 거의 마감된 모임
export const AlmostFull: Story = {
  args: {
    ...Default.args,
    gatheringParticipantCount: 18,
    gatheringCapacity: 20,
    gatheringRegistrationEnd: getFutureDate(2, 18, 0), // 2일 후 18:00 마감
  },
};

// 모집 마감된 모임
export const FullCapacity: Story = {
  args: {
    ...Default.args,
    gatheringParticipantCount: 20,
    gatheringCapacity: 20,
    gatheringRegistrationEnd: getFutureDate(1, 15, 0), // 1일 후 15:00 마감
  },
};

// 빈 모임
export const Empty: Story = {
  args: {
    ...Default.args,
    gatheringParticipantCount: 0,
    gatheringCapacity: 10,
    gatheringRegistrationEnd: getFutureDate(8, 20, 0), // 8일 후 20:00 마감
  },
};

// 다른 타입의 모임
export const DifferentType: Story = {
  args: {
    ...Default.args,
    gatheringType: '스터디',
    gatheringName: 'React 스터디',
    gatheringLocation: '강남역',
    gatheringImage:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=224&fit=crop&crop=center&q=80',
    gatheringRegistrationEnd: getFutureDate(5, 19, 30), // 5일 후 19:30 마감
  },
};

// 이미지가 없는 모임
export const NoImage: Story = {
  args: {
    ...Default.args,
    gatheringImage: '',
    gatheringRegistrationEnd: getFutureDate(3, 22, 0), // 3일 후 22:00 마감
  },
};

// 취소된 모임
export const Canceled: Story = {
  args: {
    ...Default.args,
    isCanceled: true,
    gatheringParticipantCount: 5,
    gatheringCapacity: 15,
  },
};

// 취소된 모임 (참여자 많은 경우)
export const CanceledWithManyParticipants: Story = {
  args: {
    ...Default.args,
    isCanceled: true,
    gatheringParticipantCount: 18,
    gatheringCapacity: 20,
  },
};

// 취소된 모임 (빈 모임)
export const CanceledEmpty: Story = {
  args: {
    ...Default.args,
    isCanceled: true,
    gatheringParticipantCount: 0,
    gatheringCapacity: 10,
  },
};
