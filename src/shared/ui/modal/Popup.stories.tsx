import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from '../button';
import { Popup } from './Popup';

const meta = {
  title: 'shared/ui/Popup',
  component: Popup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: false },
    onClose: { control: false },
    onConfirm: { control: false },
    title: { control: 'text' },
    message: { control: 'text' },
    primaryButtonText: { control: 'text' },
    secondaryButtonText: { control: 'text' },
  },
  args: {
    isOpen: false,
    onClose: () => {},
    onConfirm: () => {},
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalTemplet: Story['render'] = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant={'primary'}
        onClick={() => setIsOpen(true)}
      >
        모달 열기
      </Button>
      <Popup
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
};

export const ConfirmOnly: Story = {
  render: ModalTemplet,
  args: {
    message: '가입이 완료 되었습니다.',
    primaryButtonText: '저장',
  },
};

export const CancelPopup: Story = {
  render: ModalTemplet,
  args: {
    message: `정말로 나가시겠어요?  작성한 내용이 모두 사라집니다 `,
    secondaryButtonText: '취소',
    primaryButtonText: '확인',
  },
};
