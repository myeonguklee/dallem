'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useRouter } from '@/i18n';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';

const CreateGatheringModal = dynamic(
  () => import('./CreateGatheringModal').then((mod) => ({ default: mod.CreateGatheringModal })),
  { ssr: false },
);

const ModalRoot = dynamic(
  () => import('@/shared/ui/modal').then((mod) => ({ default: mod.Modal.Root })),
  { ssr: false },
);

const ModalBody = dynamic(
  () => import('@/shared/ui/modal').then((mod) => ({ default: mod.Modal.Body })),
  { ssr: false },
);

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

      {isModalOpen && (
        <CreateGatheringModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      {isPopupOpen && (
        <ModalRoot
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          variant="form"
        >
          <ModalBody>
            <div className="mt-6 flex h-full flex-col items-center justify-center gap-10">
              <p className="text-xl font-medium">{t('loginRequired')}</p>
              <Button onClick={() => router.push(ROUTES.SIGNIN)}>{t('loginButton')}</Button>
            </div>
          </ModalBody>
        </ModalRoot>
      )}
    </>
  );
};
