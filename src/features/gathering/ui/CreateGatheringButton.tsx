'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal';
import { CreateGatheringModal } from './CreateGatheringModal';

export const CreateGatheringButton = () => {
  const { data: session, status } = useSession();
  const t = useTranslations('pages.gatherings');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => {
    if (status === 'loading') {
      return;
    }

    if (!session) {
      setIsPopupOpen(true);
      return;
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        className="font-bold"
        onClick={handleOpenModal}
      >
        {t('createButton')}
      </Button>

      <CreateGatheringModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <Modal.Root
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        variant="form"
      >
        <Modal.Body>
          <div className="mt-6 flex h-full flex-col items-center justify-center gap-10">
            <p className="text-xl font-medium">{t('loginRequired')}</p>
            <Button onClick={() => router.push(ROUTES.SIGNIN)}>{t('loginButton')}</Button>
          </div>
        </Modal.Body>
      </Modal.Root>
    </>
  );
};
