import { useState } from 'react';
import { PutUserFormValues, putUserSchema } from '@/entities/user/model';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { usePutUser } from '../api/quries';

interface ProfileEditFormProps {
  companyName: string;
  email: string;
  onClose: () => void;
}

export const ProfileEditForm = ({ companyName, email, onClose }: ProfileEditFormProps) => {
  const { isPending, mutate } = usePutUser();
  const [fileName, setFileName] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PutUserFormValues>({
    resolver: zodResolver(putUserSchema),
    defaultValues: {
      companyName: companyName,
      image: '',
    },
  });

  const onSubmit = (data: PutUserFormValues) => {
    mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleImageChange = (file: File | null) => {
    if (!file) {
      setValue('image', '');
      setFileName('');
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setValue('image', base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="image"
            className="mb-2 block text-sm font-medium"
          >
            프로필 이미지
          </label>
          <div className="flex w-full items-center gap-2">
            <div
              className={
                'flex-1 rounded-xl border border-gray-300 bg-gray-50 px-4 py-2' +
                (errors.image ? ' border-red-500' : '')
              }
            >
              <span className={fileName ? 'text-gray-800' : 'text-gray-400'}>
                {fileName || '이미지를 선택해주세요'}
              </span>
            </div>
            <button
              type="button"
              className="rounded-xl border border-orange-500 bg-white px-4 py-2 font-semibold text-orange-500 transition hover:bg-orange-50 focus:outline-none"
              onClick={() => document.getElementById('profile-image-upload')?.click()}
            >
              이미지 선택
            </button>
            <input
              type="file"
              accept="image/*"
              id="profile-image-upload"
              className="hidden"
              onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
            />
          </div>
          {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image.message}</p>}
        </div>

        <div>
          <label
            htmlFor="companyName"
            className="mb-2 block text-sm font-medium"
          >
            회사명
          </label>
          <input
            type="text"
            id="companyName"
            {...register('companyName')}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
          />
          {errors.companyName && (
            <p className="mt-1 text-xs text-red-500">{errors.companyName.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium"
          >
            이메일
          </label>
          <input
            type="email"
            id="email"
            value={email}
            disabled
            className="w-full cursor-not-allowed rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 text-gray-500"
          />
          <p className="mt-1 text-xs text-gray-500">이메일은 수정할 수 없습니다</p>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 rounded-xl bg-orange-500 px-4 py-2 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50"
        >
          {isPending ? '수정 중...' : '수정 완료'}
        </button>
      </div>
    </form>
  );
};
