import type { Meta, StoryObj } from '@storybook/nextjs';
import { ContainerInformation } from './ContainerInformation';

const meta: Meta<typeof ContainerInformation> = {
  title: 'Widgets/ContainerInformation',
  component: ContainerInformation,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: '모임의 제목' },
    location: { control: 'text', description: '모임 장소' },
    date: { control: 'text', description: '모임 날짜 (예: 1월 7일)' },
    time: { control: 'text', description: '모임 시간 (예: 17:30)' },
    participants: { control: 'object', description: '참여자 목록' },
    maxParticipants: { control: 'number', description: '최대 참여 인원' },
    minParticipants: { control: 'number', description: '최소 참여 인원' },
  },
};

export default meta;

type Story = StoryObj<typeof ContainerInformation>;

const mockParticipants = [
  {
    id: '1',
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1728361169610_19610008.JPG',
  },
  {
    id: '2',
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1728361169610_19610008.JPG',
  },
  {
    id: '3',
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1728361169610_19610008.JPG',
  },
  {
    id: '4',
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1728361169610_19610008.JPG',
  },
  {
    id: '5',
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1728361169610_19610008.JPG',
  },
  {
    id: '6',
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1728361169610_19610008.JPG',
  },
  {
    id: '7',
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1728361169610_19610008.JPG',
  },
];

/**
 * 최소 인원을 충족하여 '확정' 상태가 된 경우를 보여주는 스토리
 * 참여자가 4명을 초과하여 +N 아바타가 표시됩니다.
 */
export const Confirmed: Story = {
  args: {
    title: '달램핏 오피스 스트레칭',
    location: '을지로 3가',
    date: '1월 7일',
    time: '17:30',
    // 현재 참여자 수(7명)가 최소 인원(5명)보다 많으므로 '확정' 칩이 보임
    participants: mockParticipants.slice(0, 7),
    maxParticipants: 20,
    minParticipants: 5,
  },
};

/**
 * 아직 최소 인원을 충족하지 못한 '모집 중' 상태를 보여주는 스토리
 */
export const NotConfirmed: Story = {
  args: {
    ...Confirmed.args,
    // 현재 참여자 수(3명)가 최소 인원(5명)보다 적으므로 '확정' 칩이 보이지 않음
    participants: mockParticipants.slice(0, 3),
  },
};
