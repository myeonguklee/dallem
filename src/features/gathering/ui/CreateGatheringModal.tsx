'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { httpClient } from '@/shared/api/httpClient';
import { cn } from '@/shared/lib/cn';
import { BoxSelector } from '@/shared/ui/box-selector/BoxSelector';
import { Calendar } from '@/shared/ui/calendar/Calendar';
import { Dropdown, DropdownItem, DropdownList, DropdownTrigger } from '@/shared/ui/dropdown';
import { ArrowDownIcon } from '@/shared/ui/icon/icons/ArrowDownIcon';
import { ArrowUpIcon } from '@/shared/ui/icon/icons/ArrowUpIcon';
import { CalendarIcon } from '@/shared/ui/icon/icons/CalendarIcon';
import { Input } from '@/shared/ui/input';
import { Modal } from '@/shared/ui/modal';
import { TimePicker } from '@/shared/ui/time-picker';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z
  .object({
    name: z.string().min(1, 'form.errors.nameRequired'),
    location: z.enum(['건대입구', '을지로3가', '신림', '홍대입구'], {
      required_error: 'form.errors.locationRequired',
    }),
    type: z.enum(['OFFICE_STRETCHING', 'MINDFULNESS', 'WORKATION'], {
      required_error: 'form.errors.typeRequired',
    }),
    dateTime: z.date({
      required_error: 'form.errors.dateTimeRequired',
    }),
    registrationEnd: z.date().optional(),
    capacity: z.coerce.number().min(5, 'form.errors.capacityMin'),
    image: z
      .any()
      .optional()
      .refine(
        (file) =>
          !file ||
          (typeof File !== 'undefined' && file instanceof File && file.type.startsWith('image/')),
        {
          message: 'form.errors.imageType',
          path: ['image'],
        },
      ),
  })
  .refine(
    (data) => !data.registrationEnd || (data.dateTime && data.registrationEnd < data.dateTime),
    {
      message: 'form.errors.registrationEndInvalid',
      path: ['registrationEnd'],
    },
  )
  .refine((data) => data.dateTime && data.dateTime > new Date(), {
    message: 'form.errors.dateTimePast',
    path: ['dateTime'],
  });

type FormValues = z.infer<typeof schema>;

interface CreateGatheringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateGatheringModal = ({ isOpen, onClose }: CreateGatheringModalProps) => {
  const t = useTranslations('pages.gatherings.create');
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDateField, setCurrentDateField] = useState<'dateTime' | 'registrationEnd' | null>(
    null,
  );

  // i18n을 사용한 동적 옵션 생성
  const LOCATION_OPTIONS = [
    { value: '건대입구', label: t('form.locations.konkuk') },
    { value: '을지로3가', label: t('form.locations.euljiro') },
    { value: '신림', label: t('form.locations.sinrim') },
    { value: '홍대입구', label: t('form.locations.hongdae') },
  ];

  const SERVICE_OPTIONS = [
    {
      value: 'OFFICE_STRETCHING',
      label: t('form.services.officeStretching.label'),
      subtitle: t('form.services.officeStretching.subtitle'),
    },
    {
      value: 'MINDFULNESS',
      label: t('form.services.mindfulness.label'),
      subtitle: t('form.services.mindfulness.subtitle'),
    },
    {
      value: 'WORKATION',
      label: t('form.services.workation.label'),
      subtitle: t('form.services.workation.subtitle'),
    },
  ];
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      location: undefined,
      type: undefined,
      dateTime: undefined,
      registrationEnd: undefined,
      capacity: undefined,
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
      alert(e instanceof Error ? e.message : t('common:error'));
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

  // URL에서 로케일 추출
  const locale = pathname?.split('/')[1] || 'ko';

  // 날짜 포맷팅 함수 (로케일 기반)
  const formatDateTime = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleString(locale === 'ko' ? 'ko-KR' : 'en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // 모바일용 날짜 포맷팅 함수 (연도 제외, 로케일 기반)
  const formatDateTimeMobile = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleString(locale === 'ko' ? 'ko-KR' : 'en-US', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
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
                errorMessage={errors.name?.message ? t(String(errors.name.message)) : undefined}
                inputSize="lg"
                className="w-full"
              />
            </div>

            {/* 장소 드롭다운 */}
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
                          state="default"
                          className={cn(
                            'flex w-full items-center rounded-xl bg-gray-50 px-4 py-2.5 font-normal text-gray-400',
                            errors.location && 'border-red-500',
                          )}
                          onClick={toggle}
                          tabIndex={0}
                        >
                          <span className={field.value ? 'text-gray-800' : 'text-gray-400'}>
                            {LOCATION_OPTIONS.find((opt) => opt.value === field.value)?.label ||
                              t('form.locationPlaceholder')}
                          </span>
                          {isOpen ? (
                            <ArrowUpIcon
                              size={16}
                              className="ml-auto text-gray-400"
                            />
                          ) : (
                            <ArrowDownIcon
                              size={16}
                              className="ml-auto text-gray-400"
                            />
                          )}
                        </DropdownTrigger>
                        <DropdownList
                          isOpen={isOpen}
                          className="absolute z-[var(--z-dropdown)] w-full overflow-hidden rounded-xl border-gray-200 bg-gray-50"
                        >
                          {LOCATION_OPTIONS.map((opt) => (
                            <DropdownItem
                              key={opt.value}
                              size="large"
                              value={opt.value}
                              selectedValue={field.value}
                              onSelect={(value) => {
                                field.onChange(value);
                                toggle();
                              }}
                              className="w-full px-4 py-2.5"
                            >
                              {opt.label}
                            </DropdownItem>
                          ))}
                        </DropdownList>
                        {errors.location && (
                          <p className="text-xs text-red-500">
                            {t(errors.location?.message ?? '')}
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
              <label className="mb-2 block text-sm font-medium">{t('form.image')}</label>
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
                    {watch('image')?.name || t('form.imagePlaceholder')}
                  </span>
                </div>
                <button
                  type="button"
                  className="rounded-xl border border-orange-500 bg-white px-4 py-2 font-semibold text-orange-500 transition hover:bg-orange-50 focus:outline-none"
                  onClick={() => document.getElementById('gathering-image-upload')?.click()}
                >
                  {t('form.imageButton')}
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
                <p className="mt-1 text-xs text-red-500">{t(errors.image?.message as string)}</p>
              )}
            </div>

            {/* 선택 서비스 (BoxSelector) */}
            <div>
              <label className="mb-2 block text-sm font-medium">{t('form.type')}</label>
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
              {errors.type && (
                <p className="mt-1 text-xs text-red-500">{t(errors.type?.message ?? '')}</p>
              )}
            </div>

            {/* 모임 날짜와 마감 날짜 (한 줄 배치) */}
            <div className="flex w-full gap-4">
              {/* 모임 날짜 */}
              <div className="min-w-0 flex-1">
                <label className="mb-2 block text-sm font-medium">{t('form.date')}</label>
                <Controller
                  control={control}
                  name="dateTime"
                  render={({ field }) => (
                    <div className="relative">
                      <div
                        className={cn(
                          'flex w-full cursor-pointer items-center rounded-xl bg-gray-50 px-4 py-2.5',
                          'border-0',
                          errors.dateTime && 'border-red-500',
                        )}
                        onClick={() => {
                          setCurrentDateField('dateTime');
                          if (!watch('dateTime')) {
                            const now = new Date();
                            now.setHours(14, 0, 0, 0);
                            setValue('dateTime', now);
                          }
                          setShowDatePicker(!showDatePicker);
                        }}
                      >
                        <span
                          className={cn(
                            'block min-w-0 flex-1 truncate',
                            field.value ? 'text-gray-800' : 'text-gray-400',
                          )}
                        >
                          {field.value ? (
                            <>
                              <span className="tablet:inline hidden">
                                {formatDateTime(field.value)}
                              </span>
                              <span className="tablet:hidden">
                                {formatDateTimeMobile(field.value)}
                              </span>
                            </>
                          ) : (
                            t('form.datePlaceholder')
                          )}
                        </span>
                        <CalendarIcon
                          size={16}
                          className="ml-auto flex-shrink-0 text-gray-400"
                        />
                      </div>
                      {showDatePicker && currentDateField === 'dateTime' && (
                        <div className="fixed top-1/2 left-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2">
                          <div className="">
                            <Calendar
                              value={field.value}
                              onChange={(date) => {
                                if (date) {
                                  // 날짜 선택 시 자동으로 오후 2시로 설정
                                  const newDate = new Date(date);
                                  newDate.setHours(14, 0, 0, 0); // 오후 2시로 고정
                                  field.onChange(newDate);
                                }
                              }}
                              footer={
                                <TimePicker
                                  value={field.value}
                                  onChange={(timeDate) => {
                                    if (field.value) {
                                      const newDate = new Date(field.value);
                                      newDate.setHours(
                                        timeDate.getHours(),
                                        timeDate.getMinutes(),
                                        0,
                                        0,
                                      );
                                      field.onChange(newDate);
                                    }
                                  }}
                                  onReset={() => {
                                    // 날짜와 시간 모두 초기화
                                    field.onChange(undefined);
                                  }}
                                  onConfirm={() => {
                                    setShowDatePicker(false);
                                  }}
                                />
                              }
                            />
                          </div>
                        </div>
                      )}
                      {errors.dateTime && (
                        <p className="mt-1 text-xs text-red-500">
                          {t(errors.dateTime?.message ?? '')}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              {/* 마감 날짜 */}
              <div className="min-w-0 flex-1">
                <label className="mb-2 block text-sm font-medium">
                  {t('form.registrationEnd')}
                </label>
                <Controller
                  control={control}
                  name="registrationEnd"
                  render={({ field }) => (
                    <div className="relative">
                      <div
                        className={cn(
                          'flex w-full cursor-pointer items-center rounded-xl bg-gray-50 px-4 py-2.5',
                          'border-0',
                          errors.registrationEnd && 'border-red-500',
                        )}
                        onClick={() => {
                          setCurrentDateField('registrationEnd');
                          if (!watch('registrationEnd')) {
                            const now = new Date();
                            now.setHours(14, 0, 0, 0);
                            setValue('registrationEnd', now);
                          }
                          setShowDatePicker(!showDatePicker);
                        }}
                      >
                        <span
                          className={cn(
                            'block min-w-0 flex-1 truncate',
                            field.value ? 'text-gray-800' : 'text-gray-400',
                          )}
                        >
                          {field.value ? (
                            <>
                              <span className="tablet:inline hidden">
                                {formatDateTime(field.value)}
                              </span>
                              <span className="tablet:hidden">
                                {formatDateTimeMobile(field.value)}
                              </span>
                            </>
                          ) : (
                            t('form.registrationEndPlaceholder')
                          )}
                        </span>
                        <CalendarIcon
                          size={16}
                          className="ml-auto flex-shrink-0 text-gray-400"
                        />
                      </div>
                      {showDatePicker && currentDateField === 'registrationEnd' && (
                        <div className="fixed top-1/2 left-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2">
                          <Calendar
                            value={field.value}
                            onChange={(date) => {
                              if (date) {
                                // 날짜 선택 시 자동으로 14:00로 설정
                                const newDate = new Date(date);
                                newDate.setHours(14, 0, 0, 0); // 14:00로 고정
                                field.onChange(newDate);
                              }
                            }}
                            footer={
                              <TimePicker
                                value={field.value}
                                onChange={(timeDate) => {
                                  if (field.value) {
                                    const newDate = new Date(field.value);
                                    newDate.setHours(
                                      timeDate.getHours(),
                                      timeDate.getMinutes(),
                                      0,
                                      0,
                                    );
                                    field.onChange(newDate);
                                  }
                                }}
                                onReset={() => {
                                  // 날짜와 시간 모두 초기화
                                  field.onChange(undefined);
                                }}
                                onConfirm={() => {
                                  setShowDatePicker(false);
                                }}
                              />
                            }
                          />
                        </div>
                      )}
                      {errors.registrationEnd && (
                        <p className="mt-1 text-xs text-red-500">
                          {t(errors.registrationEnd?.message ?? '')}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            {/* 모집 정원 */}
            <div>
              <label className="mb-2 block text-sm font-medium">{t('form.participants')}</label>
              <Input
                type="number"
                {...register('capacity')}
                placeholder={t('form.participantsPlaceholder')}
                min={5}
                variant={errors.capacity ? 'error' : 'default'}
                errorMessage={
                  errors.capacity?.message ? t(String(errors.capacity.message)) : undefined
                }
                inputSize="lg"
                className="w-full"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          primaryButtonText={loading ? t('common:loading') : t('submit')}
          secondaryButtonText={t('cancel')}
          onPrimaryClick={handleSubmit(onSubmit)}
          onSecondaryClick={() => {
            reset();
            onClose();
          }}
        />
      </form>
    </Modal.Root>
  );
};
