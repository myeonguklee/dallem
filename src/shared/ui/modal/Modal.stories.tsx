import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from '../button';
import { Modal } from './Modal';

const meta = {
  title: 'shared/ui/modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'modal body로 문구 혹은 컴포넌트를 넣을 수 있습니다.',
    },
    variant: {
      control: 'select',
      options: ['dialog', 'form', 'default'],
    },
    isOverlay: {
      control: 'boolean',
    },
    primaryButtonText: {
      control: 'text',
      description: 'primaryButtonText를 사용하면 primary 버튼이 생성 ',
    },
    secondaryButtonText: {
      control: 'text',
      description: 'secondaryButtonText를 사용하면 outline 버튼이 생성',
    },
    disabledPrimary: {
      control: 'boolean',
      description: 'primary 버튼의 disabled 다룹니다. ',
    },
    disabledSecondary: {
      control: 'boolean',
      description: 'outline의 버튼의 disabled 다룹니다. ',
    },
  },
  args: {
    children: ' 가입이 완료 되었습니다. ',
    isOpen: false,
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
      <Modal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          console.log('Confirm clicked');
          setIsOpen(false);
        }}
      />
    </>
  );
};

// 버튼이 없는 모달
export const DefaultModal: Story = {
  render: ModalTemplet,
  args: {
    isOverlay: true,
  },
};

// 주 버튼 하나만 있는 모달
export const PopupPrimaryModal: Story = {
  render: ModalTemplet,
  args: {
    isOverlay: true,
    primaryButtonText: '확인',
  },
};

// 버튼이 두개인 dialog 모달
export const PopupModal: Story = {
  render: ModalTemplet,
  args: {
    isOverlay: true,
    primaryButtonText: '확인',
    secondaryButtonText: '취소',
  },
};

// 폼을 담고 있는 모달
export const FormModal: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formState, setFormState] = useState({ name: '', email: '' });
    const isFormValid = formState.name && formState.email;

    const handleConfirm = () => {
      console.log('Form submitted:', formState);
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
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
          disabledPrimary={!isFormValid}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleConfirm();
            }}
            className="space-y-4 text-left"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium"
              >
                이름
              </label>
              <input
                id="name"
                type="text"
                value={formState.name}
                onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full rounded border px-2 py-1"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium"
              >
                이메일
              </label>
              <input
                id="email"
                type="email"
                value={formState.email}
                onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                className="mt-1 block w-full rounded border px-2 py-1"
              />
            </div>
          </form>
        </Modal>
      </>
    );
  },
  args: {
    isOverlay: true,
    primaryButtonText: '확인',
    secondaryButtonText: '취소',
    disabledPrimary: true,
    disabledSecondary: false,
  },
};
