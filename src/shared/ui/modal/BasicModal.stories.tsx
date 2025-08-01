import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from '../button';
import { BasicModal } from './BasicModal';

const meta = {
  title: 'shared/ui/BasicModal',
  component: BasicModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: false },
    onClose: { control: false },
    title: { control: 'text' },
    children: { control: false },
  },
  args: {
    isOpen: false,
    onClose: () => {},
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalTemplet: Story['render'] = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setName('');
    setEmail('');
    setIsOpen(false);
  };

  const handleCancel = () => {
    setName('');
    setEmail('');
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant={'primary'}
        onClick={() => setIsOpen(true)}
      >
        모달 열기
      </Button>
      <BasicModal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="리뷰 작성"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-2"
        >
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2"
            required
          />
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2"
            required
          />
          <div className="flex gap-4">
            <Button
              type="button"
              variant={'outline'}
              className="w-full"
              onClick={handleCancel}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant={'primary'}
              className="w-full"
              disabled={!name || !email}
            >
              제출
            </Button>
          </div>
        </form>
      </BasicModal>
    </>
  );
};

export const FormModalExample: Story = {
  render: ModalTemplet,
  args: {
    children: undefined,
  },
};
