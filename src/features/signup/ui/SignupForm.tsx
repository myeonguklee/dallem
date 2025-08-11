'use client';

import { useTranslations } from 'next-intl';
import { signupApi } from '@/entities/auth/api';
import { type SignupFormData, signupFields, signupSchema } from '@/features/signup/model';
import { formatSignupFormToPayload } from '@/features/signup/utils/formatSignupFormToPayload';
import { useRouter } from '@/i18n';
import { ROUTES } from '@/shared/config/routes';
import { AuthForm } from '@/widgets/AuthForm/ui/AuthForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

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
    formState: { errors, isValid, isSubmitted },
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (formData: SignupFormData) => {
    toast.promise(signupApi(formatSignupFormToPayload(formData)), {
      loading: t('common.saving'),
      success: () => {
        setTimeout(() => router.push(ROUTES.SIGNIN), 2000);
        return <b>{t('pages.signup.success')}</b>;
      },
      error: (e) => {
        if (e.code === 'EMAIL_EXISTS' || e.code === 'VALIDATION_ERROR') {
          setError('email', {
            type: 'manual',
            message: ERROR_CASE[e.code as keyof typeof ERROR_CASE],
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
        isSubmitted={isSubmitted}
      />
    </form>
  );
};
