'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCreateReview } from '@/entities/review/api/queries';
import { CreateReviewPayload, createReviewSchema } from '@/entities/review/model/schema';
import { CreateReviewForm } from '@/entities/review/ui';
import { Button } from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

interface CreateReviewBtnProps {
  gatheringId: number;
}

export const CreateReviewBtn = ({ gatheringId }: CreateReviewBtnProps) => {
  const t = useTranslations('pages.myPage.reviewModal');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: createReview, isPending } = useCreateReview();

  const { control, reset } = useForm<CreateReviewPayload>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      gatheringId,
      score: undefined,
      comment: '',
    },
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    reset();
    setIsModalOpen(false);
  };

  const onSubmit = (data: CreateReviewPayload) => {
    createReview(data, {
      onSuccess: () => {
        toast.success(t('success'));
        reset();
        setIsModalOpen(false);
      },
    });
  };

  return (
    <>
      <Button onClick={handleOpenModal}>{t('button')}</Button>

      {isModalOpen && (
        <Modal.Root
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          variant="dialog"
        >
          <Modal.Header>
            <span className="text-lg font-bold">{t('title')}</span>
          </Modal.Header>
          <Modal.Body>
            <CreateReviewForm
              control={control}
              gatheringId={gatheringId}
              onSubmit={onSubmit}
              onCancel={handleCloseModal}
              isSubmitting={isPending}
            />
          </Modal.Body>
        </Modal.Root>
      )}
    </>
  );
};
