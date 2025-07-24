import { useTranslations } from 'next-intl';
import type { CreateGatheringFormValues } from '@/features/gathering/model';
import { Input } from '@/shared/ui/input';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface GatheringNameFieldProps {
  register: UseFormRegister<CreateGatheringFormValues>;
  error?: FieldError;
}

export const GatheringNameField = ({ register, error }: GatheringNameFieldProps) => {
  const t = useTranslations('pages.gatherings.create');
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{t('form.title')}</label>
      <Input
        {...register('name')}
        placeholder={t('form.titlePlaceholder')}
        variant={error ? 'error' : 'default'}
        errorMessage={error?.message ? t(String(error.message)) : undefined}
        inputSize="lg"
        className="w-full"
      />
    </div>
  );
};
