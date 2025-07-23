'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { signup } from '@/entities/auth/signup/api/signup';
import { ROUTES } from '@/shared/config/routes';
import { localeUrlFormatter } from '@/shared/lib/localeUrlFormatter';
import { AuthForm } from '@/widgets/AuthForm/ui/AuthForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { signupFields } from '../model/signupFields';
import { signupSchema } from '../model/signupSchema';
import { SignupFormData } from '../model/type';
import { formatSignupFormToPayload } from '../utils/formatSignupFormToPayload';

const ERROR_CASE = {
  EMAIL_EXISTS: 'errors.validation.emailExists',
  VALIDATION_ERROR: 'errors.validation.invalidEmail',
};

export const SignupForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (formData: SignupFormData) => {
    toast.promise(signup(formatSignupFormToPayload(formData)), {
      loading: t('common.saving'),
      success: () => {
        setTimeout(() => router.push(localeUrlFormatter(ROUTES.SIGNIN)), 2000);
        return <b>{t('pages.signup.success')}</b>;
      },
      error: (e) => {
        if (e.code === 'EMAIL_EXISTS' || e.code === 'VALIDATION_ERROR') {
          setError('email', {
            type: 'manual',
            message: t(ERROR_CASE[e.code as keyof typeof ERROR_CASE]),
          });
        }
        return <b>{t('pages.signup.failure')}</b>;
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="web:justify-end flex w-full justify-center"
    >
      <AuthForm
        meta={{
          title: 'pages.signup.title',
          buttonLabel: 'pages.signup.signupButton',
          footerText: 'pages.signup.footerText',
          footerLinkText: 'pages.signup.signinLink',
          footerHref: ROUTES.SIGNIN,
        }}
        fields={signupFields}
        handlers={{
          register,
          errors,
        }}
        isValid={isValid}
      />
    </form>
  );
};
