import React from 'react';
import { Modal } from './ModalLayout';

interface BasicModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const BasicModal = ({ isOpen, onClose, title, children }: BasicModalProps) => {
  return (
    <Modal.Root
      isOpen={isOpen}
      onClose={onClose}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal.Root>
  );
};
