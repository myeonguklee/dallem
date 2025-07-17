import type { Meta, StoryObj } from '@storybook/nextjs';
import reviewImg from '../ui/reviewImg.jpg';
import userCat from '../ui/userCat.jpg';
import { ReviewCard } from './ReviewCard';

const meta = {
  title: 'Entities/ReviewCard',
  component: ReviewCard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    comment: {
      control: { type: 'text' },
      description: '리뷰를 남겨주세요',
    },
    score: {
      control: { type: 'range', min: 1, max: 5, step: 1 },
      description: '평점을 정해주세요 ',
    },
    userName: {
      control: { type: 'text' },
      description: '리뷰남기는 사용자의 이름',
    },
    gatheringName: {
      control: { type: 'text' },
      description: '내가 참여한 모임의 이름  ',
    },
    location: {
      control: { type: 'text' },
      description: '모임의 위치를 기입 ',
    },
    userImg: { control: false },
    reviewImg: { control: false },
  },
  args: {
    dateTime: '2025.05.29',
    score: 5,
  },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const DefultReviewCard: Story = {
  args: {
    comment:
      '이번 모임은 기대 이상이었어요. 평소 온라인으로만 보던 동료들을 직접 만날 수 있다는 설렘으로 시작해, 따뜻한 환영 인사와 함께 마치 오랜 친구처럼 어울릴 수 있었습니다. ',
    score: 5,
    userName: '고구마',
    userImg: userCat,
    gatheringName: '코딩 스터디 ',
    location: '강남',
    reviewImg: reviewImg,
  },
};

export const DetailReviewCard: Story = {
  args: {
    comment: '뛰어난 실력자들이 많앙서 기쁩니다!',
    score: 3,
    userName: '감자돌이',
    userImg: userCat,
  },
};

export const MypageReviewCard: Story = {
  args: {
    comment: '모두 화이팅해서 나아갑시다 ',
    score: 1,
    reviewImg: reviewImg,
    gatheringName: '코딩 스터디',
    location: '강남',
  },
};
