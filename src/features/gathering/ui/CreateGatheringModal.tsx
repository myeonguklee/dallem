'use client';

import { Modal } from '@/shared/ui/modal';
import { CreateGatheringForm } from './CreateGatheringForm';

interface CreateGatheringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateGatheringModal = ({ isOpen, onClose }: CreateGatheringModalProps) => (
  <Modal.Root
    isOpen={isOpen}
    onClose={onClose}
    variant="form"
  >
    <Modal.Header>모임 만들기</Modal.Header>
    <CreateGatheringForm onClose={onClose} />
  </Modal.Root>
);
