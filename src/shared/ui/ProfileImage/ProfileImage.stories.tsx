import { ChangeEvent, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { ProfileImage } from './ProfileImage';

// 파일을 data URL로 변환하는 유틸리티 함수
const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const meta = {
  title: 'shared/ProfileImage',
  component: ProfileImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'number',
        min: 20,
        max: 200,
        step: 10,
      },
      description: '프로필 이미지 크기 (px 단위)',
    },
    url: {
      control: 'text',
      description: '프로필 이미지 URL',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof ProfileImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 40,
  },
};

export const WithCustomSize: Story = {
  args: {
    size: 80,
  },
};

export const WithImage: Story = {
  args: {
    size: 56,
    url: 'https://i.namu.wiki/i/bCmE_8XrnEYeEKlbme2ZS8rsG6dcB1vGD-UJtxvGncvXuYL9fiBqL8Fk_6cQ58EKJYTyyw9mA0LWK3yIaRYQow.webp',
  },
};

export const WithFileUpload: Story = {
  render: function Render(args) {
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        try {
          const url = await toBase64(file);
          setImageUrl(url);
        } catch (error) {
          console.error('Error reading file:', error);
        }
      }
    };

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="bg-primary px-4 py-2">
          <ProfileImage
            {...args}
            url={imageUrl}
          />
        </div>
        <div className="mt-4">
          <label className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
            이미지 업로드
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
    );
  },
  args: {
    size: 56,
  },
  parameters: {
    controls: { exclude: ['url'] },
  },
};
