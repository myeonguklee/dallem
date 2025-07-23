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
    ],
    maxParticipants: 20,
    minParticipants: 5,
  },
};
