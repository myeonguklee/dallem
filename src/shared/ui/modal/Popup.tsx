import React from 'react';
import { Modal } from './ModalLayout';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  children?: React.ReactNode;
  secondaryButtonText?: string;
  primaryButtonText: string;
  isPrimaryDisabled?: boolean;
  isSecondaryDisabled?: boolean;
  showCloseButton?: boolean;
}

export const Popup = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  children,
  secondaryButtonText,
  primaryButtonText,
  isPrimaryDisabled,
  isSecondaryDisabled,
}: PopupProps) => {
  return (
    <Modal.Root
      isOpen={isOpen}
      onClose={onClose}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>{message || children}</Modal.Body>
      <Modal.Footer
        secondaryButtonText={secondaryButtonText}
        primaryButtonText={primaryButtonText}
        isPrimaryDisabled={isPrimaryDisabled}
        isSecondaryDisabled={isSecondaryDisabled}
        onSecondaryClick={onClose}
        onPrimaryClick={onConfirm}
      ></Modal.Footer>
    </Modal.Root>
  );
};
