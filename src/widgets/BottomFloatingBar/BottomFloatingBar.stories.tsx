import { GatheringRole } from '@/entities/gathering-detail/model/types';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { BottomFloatingBar } from './BottomFloatingBar';

const meta: Meta<typeof BottomFloatingBar> = {
  title: 'Widgets/BottomFloatingBar',
  component: BottomFloatingBar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: '150px', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BottomFloatingBar>;

export const Guest: Story = {
  args: {
    role: GatheringRole.GUEST,
    title: '모임에 참여해보세요',
    content: '참여 시 최신 소식을 받아볼 수 있어요.',
    onJoin: () => alert('참여하기 클릭'),
    isFull: false,
  },
};

export const GuestFull: Story = {
  args: {
    role: GatheringRole.GUEST,
    title: '모임에 참여할 수 없어요',
    content: '인원이 모두 찼습니다.',
    isFull: true,
  },
};

export const Member: Story = {
  args: {
    role: GatheringRole.MEMBER,
    title: '이미 참여한 모임입니다',
    content: '필요하면 참여를 취소할 수 있어요.',
    onCancelJoin: () => alert('참여 취소하기 클릭'),
  },
};

export const Host: Story = {
  args: {
    role: GatheringRole.HOST,
    title: '내가 만든 모임입니다',
    content: '모임을 관리하거나 공유할 수 있어요.',
    onCancelProject: () => alert('취소하기 클릭'),
    onShare: () => alert('공유하기 클릭'),
  },
};
