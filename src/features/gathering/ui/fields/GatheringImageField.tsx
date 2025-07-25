import { useTranslations } from 'next-intl';
import type { CreateGatheringFormValues } from '@/features/gathering/model';
import { FieldError, UseFormSetValue, UseFormWatch } from 'react-hook-form';

interface GatheringImageFieldProps {
  setValue: UseFormSetValue<CreateGatheringFormValues>;
  error?: FieldError;
  watch: UseFormWatch<CreateGatheringFormValues>;
}

export const GatheringImageField = ({ setValue, error, watch }: GatheringImageFieldProps) => {
  const t = useTranslations('pages.gatherings.create');
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{t('form.image')}</label>
      <div className="flex w-full items-center gap-2">
        <div
          className={
            'flex-1 rounded-xl border-0 bg-gray-50 px-4 py-2.5' + (error ? ' border-red-500' : '')
          }
        >
          <span className={watch('image') ? 'text-gray-800' : 'text-gray-400'}>
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
          onChange={(e) => setValue('image', e.target.files?.[0])}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{t(error.message ?? '')}</p>}
    </div>
  );
};
