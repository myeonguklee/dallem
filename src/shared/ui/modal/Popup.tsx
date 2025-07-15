import React from 'react';
import { Modal } from './ModalLayout';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  secondaryButtonText?: string;
  primaryButtonText: string;
  showCloseButton?: boolean;
}

export const Popup = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  secondaryButtonText,
  primaryButtonText,
}: PopupProps) => {
  return (
    <Modal.Root
      isOpen={isOpen}
      onClose={onClose}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer
        secondaryButtonText={secondaryButtonText}
        primaryButtonText={primaryButtonText}
        onSecondaryClick={onClose}
        onPrimaryClick={onConfirm}
      ></Modal.Footer>
    </Modal.Root>
  );
};
