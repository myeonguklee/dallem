import { useTranslations } from 'next-intl';
import type { CreateGatheringPayload } from '@/entities/gathering/model/schema';
import { cn } from '@/shared/lib/cn';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface GatheringNameFieldProps {
  register: UseFormRegister<CreateGatheringPayload>;
  error?: FieldError;
}

export const GatheringNameField = ({ register, error }: GatheringNameFieldProps) => {
  const t = useTranslations('pages.gatherings.create');
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{t('form.title')}</label>
      <input
        {...register('name')}
        placeholder={t('form.titlePlaceholder')}
        className={cn(
          'flex w-full rounded-xl bg-gray-50 px-4 py-2.5 text-base leading-6 transition outline-none',
          error
            ? 'border-2 border-red-600 text-gray-800'
            : 'border border-gray-50 text-gray-800 focus:border-2 focus:border-orange-600',
        )}
      />
      {error?.message && <p className="pt-2 text-xs text-red-500">{t(String(error.message))}</p>}
    </div>
  );
};
