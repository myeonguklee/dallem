'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/button';
import { CreateGatheringModal } from './CreateGatheringModal';

export const CreateGatheringButton = () => {
  const t = useTranslations('pages.gatherings');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        className="font-semibold"
        onClick={handleOpenModal}
      >
        {t('createButton')}
      </Button>

      <CreateGatheringModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};
