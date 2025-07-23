'use client';

import { useTranslations } from 'next-intl';
import { ROUTES } from '@/shared/config/routes';
import { InputWithLabel } from '@/shared/ui/InputWithLabel';
import { Button } from '@/shared/ui/button';
import { HeaderLink } from '@/widgets/Header/ui/HeaderLink';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const fields = [
  { name: 'name', label: 'name', placeholder: 'pages.signup.namePlaceholder' },
  { name: 'email', label: '아이디', placeholder: 'pages.signup.emailPlaceholder' },
  { name: 'company', label: '회사명', placeholder: 'pages.signup.companyPlaceholder' },
  {
    name: 'password',
    label: '비밀번호',
    placeholder: 'pages.signup.passwordPlaceholder',
    type: 'password',
    withVariant: true,
  },
  {
    name: 'confirmPassword',
    label: '비밀번호 확인',
    placeholder: 'pages.signup.confirmPasswordPlaceholder',
    type: 'password',
    withVariant: true,
  },
];

const schema = z
  .object({
    name: z.string().min(1, 'errors.validation.required'),
    email: z.string().email('errors.validation.email'),
    company: z.string().min(1, 'errors.validation.required'),
    password: z.string().min(8, 'errors.validation.password'),
    confirmPassword: z.string().min(1, 'errors.validation.confirmPasswordError'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'errors.validation.passwordConfirm',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const t = useTranslations('');

  const onSubmit = (data: FormData) => {
    console.log('회원가입 데이터:', data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="web:w-[510px] rounded-common tablet:px-16 tablet:py-8 mobile:px-4 mobile:py-8 tablet:w-[608px] flex w-full flex-col items-center gap-8 border border-gray-200"
    >
      <h1 className="text-2xl font-bold text-gray-900">{t('pages.signup.title')}</h1>

      <div className="flex w-full flex-col gap-6">
        {fields.map(({ name, label, placeholder, type = 'text', withVariant }) => (
          <InputWithLabel
            key={name}
            label={label}
            placeholder={t(placeholder)}
            type={type}
            variant={
              withVariant
                ? errors[name as keyof FormData]?.message
                  ? 'password_error'
                  : 'password_default'
                : undefined
            }
            errorMessage={
              errors[name as keyof FormData]?.message
                ? t(errors[name as keyof FormData]?.message as string)
                : undefined
            }
            {...register(name as keyof FormData)}
          />
        ))}
      </div>

      <Button
        type="submit"
        className="mt-3 w-full rounded-xl bg-gray-400 py-2.5 text-white transition hover:bg-gray-500"
      >
        {t('pages.signup.signupButton')}
      </Button>

      <p className="pt-3 text-sm text-gray-500">
        이미 회원이신가요?
        <HeaderLink
          href={ROUTES.SIGNIN}
          className="text-orange-500 hover:underline"
        >
          {t('pages.signup.signinLink')}
        </HeaderLink>
      </p>
    </form>
  );
}
