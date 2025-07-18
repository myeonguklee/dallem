import type { Meta, StoryObj } from '@storybook/nextjs';
import { ContainerInformation } from './ContainerInformation';

const meta: Meta<typeof ContainerInformation> = {
  title: 'Widgets/ContainerInformation',
  component: ContainerInformation,
};

export default meta;

type Story = StoryObj<typeof ContainerInformation>;

export const Default: Story = {
  args: {
    size: 'large',
    title: '달램핏 오피스 스트레칭',
    location: '을지로 3가',
    date: '1월 7일',
    time: '17:30',
    participants: [
      { id: '1', avatarUrl: '/cat-profile.jpg' },
      { id: '2', avatarUrl: '/cat-profile.jpg' },
      { id: '3', avatarUrl: '/cat-profile.jpg' },
      { id: '4', avatarUrl: '/cat-profile.jpg' },
      { id: '5', avatarUrl: '/cat-profile.jpg' },
      { id: '6', avatarUrl: '/cat-profile.jpg' },
      { id: '7', avatarUrl: '/cat-profile.jpg' },
    ],
    maxParticipants: 20,
    minParticipants: 5,
  },
};
export const Tablet: Story = {
  args: {
    size: 'small',
    title: '달램핏 오피스 스트레칭',
    location: '을지로 3가',
    date: '1월 7일',
    time: '17:30',
    participants: [
      { id: '1', avatarUrl: '/cat-profile.jpg' },
      { id: '2', avatarUrl: '/cat-profile.jpg' },
      { id: '3', avatarUrl: '/cat-profile.jpg' },
      { id: '4', avatarUrl: '/cat-profile.jpg' },
      { id: '5', avatarUrl: '/cat-profile.jpg' },
      { id: '6', avatarUrl: '/cat-profile.jpg' },
      { id: '7', avatarUrl: '/cat-profile.jpg' },
    ],
    maxParticipants: 20,
    minParticipants: 5,
  },
};
