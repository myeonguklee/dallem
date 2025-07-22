'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { httpClient } from '@/shared/api/httpClient';
import { cn } from '@/shared/lib/cn';
import { BoxSelector } from '@/shared/ui/box-selector/BoxSelector';
import { Dropdown, DropdownItem, DropdownList, DropdownTrigger } from '@/shared/ui/dropdown';
import { Input } from '@/shared/ui/input';
import { Modal } from '@/shared/ui/modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const LOCATION_OPTIONS = [
  { value: '건대입구', label: '건대입구' },
  { value: '을지로3가', label: '을지로3가' },
  { value: '신림', label: '신림' },
  { value: '홍대입구', label: '홍대입구' },
];

const SERVICE_OPTIONS = [
  { value: 'OFFICE_STRETCHING', label: '달램핏', subtitle: '오피스 스트레칭' },
  { value: 'MINDFULNESS', label: '달램핏', subtitle: '마인드풀니스' },
  { value: 'WORKATION', label: '워케이션' },
];

const schema = z.object({
  name: z.string().min(1, '모임 이름을 입력해주세요'),
  location: z.enum(['건대입구', '을지로3가', '신림', '홍대입구'], {
    required_error: '장소를 선택해주세요',
  }),
  type: z.enum(['OFFICE_STRETCHING', 'MINDFULNESS', 'WORKATION'], {
    required_error: '서비스를 선택해주세요',
  }),
  // dateTime: z.string().min(1, '모임 날짜를 선택해주세요'),
  // registrationEnd: z.string().optional(),
  capacity: z.coerce.number().min(5, '최소 5인 이상 입력해주세요'),
  image: z.any().optional(),
});
// .refine(
//   (data) => !data.registrationEnd || new Date(data.registrationEnd) < new Date(data.dateTime),
//   { message: '모집 마감일은 모임 날짜보다 이전이어야 합니다', path: ['registrationEnd'] },
// );

type FormValues = z.infer<typeof schema>;

interface CreateGatheringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateGatheringModal = ({ isOpen, onClose }: CreateGatheringModalProps) => {
  const t = useTranslations('pages.gatherings.create');
  const [loading, setLoading] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      location: undefined,
      type: undefined,
      // dateTime: '',
      // registrationEnd: '',
      capacity: 5,
      image: undefined,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await httpClient.post(
        `/teams/1/gatherings`,
        {
          ...data,
          // image는 File 객체 그대로 전달
        },
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      // reset(); // Removed as per edit hint
      onClose();
    } catch (e) {
      // TODO: 에러 핸들링
      alert(e instanceof Error ? e.message : '오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  // 파일 업로드 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValue('image', e.target.files[0]);
    }
  };

  return (
    <Modal.Root
      isOpen={isOpen}
      onClose={onClose}
      variant="form"
    >
      <Modal.Header>{t('title')}</Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className="space-y-4">
            {/* 모임 이름 */}
            <div>
              <label className="mb-2 block text-sm font-medium">{t('form.title')}</label>
              <Input
                {...register('name')}
                placeholder={t('form.titlePlaceholder')}
                variant={errors.name ? 'error' : 'default'}
                errorMessage={errors.name?.message}
                inputSize="lg"
                className="w-full"
              />
            </div>

            {/* 장소 드롭다운 (Dropdown 컴포넌트 활용, Input 유사 디자인) */}
            <div>
              <label className="mb-2 block text-sm font-medium">{t('form.location')}</label>
              <Controller
                control={control}
                name="location"
                render={({ field }) => (
                  <Dropdown>
                    {({ isOpen, toggle }) => (
                      <div className="relative w-full">
                        <DropdownTrigger
                          type="button"
                          size="large"
                          state={field.value ? 'selected' : 'default'}
                          className={cn(
                            'flex w-full items-center rounded-xl bg-gray-50 px-4 py-2.5 font-normal text-gray-400',
                            errors.location && 'border-red-500',
                            // 'focus:outline-none',
                            // border 제거
                            // 'border-0',
                          )}
                          onClick={toggle}
                          tabIndex={0}
                        >
                          <span className={field.value ? 'text-gray-800' : 'text-gray-400'}>
                            {LOCATION_OPTIONS.find((opt) => opt.value === field.value)?.label ||
                              t('form.locationPlaceholder')}
                          </span>
                          <span className="ml-auto text-gray-400">&#9660;</span>
                        </DropdownTrigger>
                        <DropdownList
                          isOpen={isOpen}
                          className="w-full overflow-hidden rounded-xl border-gray-200 bg-gray-50"
                        >
                          {LOCATION_OPTIONS.map((opt) => (
                            <DropdownItem
                              key={opt.value}
                              size="large"
                              state={field.value === opt.value ? 'selected' : 'default'}
                              className="w-full px-4 py-2.5 hover:bg-gray-50"
                              onClick={() => {
                                field.onChange(opt.value);
                                toggle();
                              }}
                            >
                              {opt.label}
                            </DropdownItem>
                          ))}
                        </DropdownList>
                        {errors.location && (
                          <p className="absolute left-0 mt-1 text-xs text-red-500">
                            {errors.location.message}
                          </p>
                        )}
                      </div>
                    )}
                  </Dropdown>
                )}
              />
            </div>

            {/* 이미지 업로드 (파일명+버튼 분리, 한 줄 배치) */}
            <div>
              <label className="mb-2 block text-sm font-medium">이미지</label>
              <div className="flex w-full items-center gap-2">
                <div
                  className={cn(
                    'flex-1 rounded-xl bg-gray-50 px-4 py-2.5',
                    'border-0',
                    errors.image && 'border-red-500',
                  )}
                >
                  <span
                    className={cn(
                      'block truncate',
                      watch('image') ? 'text-gray-800' : 'text-gray-400',
                    )}
                  >
                    {watch('image')?.name || '이미지를 첨부해주세요'}
                  </span>
                </div>
                <button
                  type="button"
                  className="rounded-xl border border-orange-500 bg-white px-4 py-2 font-semibold text-orange-500 transition hover:bg-orange-50 focus:outline-none"
                  onClick={() => document.getElementById('gathering-image-upload')?.click()}
                >
                  파일 찾기
                </button>
                <input
                  type="file"
                  accept="image/*"
                  id="gathering-image-upload"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              {errors.image && (
                <p className="mt-1 text-xs text-red-500">{errors.image.message as string}</p>
              )}
            </div>

            {/* 선택 서비스 (BoxSelector) */}
            <div>
              <label className="mb-2 block text-sm font-medium">선택 서비스</label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <div className="flex w-full min-w-0 gap-2">
                    {SERVICE_OPTIONS.map((opt) => (
                      <BoxSelector
                        key={opt.value}
                        isSelected={field.value === opt.value}
                        title={opt.label}
                        subtitle={opt.subtitle}
                        onSelect={() => field.onChange(opt.value)}
                        className="min-w-0 flex-1"
                      />
                    ))}
                  </div>
                )}
              />
              {errors.type && <p className="mt-1 text-xs text-red-500">{errors.type.message}</p>}
            </div>

            {/* 모집 정원 */}
            <div>
              <label className="mb-2 block text-sm font-medium">모집 정원</label>
              <Input
                type="number"
                {...register('capacity')}
                placeholder={t('form.participantsPlaceholder')}
                min={5}
                variant={errors.capacity ? 'error' : 'default'}
                errorMessage={errors.capacity?.message}
                inputSize="lg"
                className="w-full"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          primaryButtonText={loading ? '생성 중...' : t('submit')}
          secondaryButtonText={t('cancel')}
          onPrimaryClick={handleSubmit(onSubmit)}
          onSecondaryClick={() => {
            // reset(); // Removed as per edit hint
            onClose();
          }}
        />
      </form>
    </Modal.Root>
  );
};
