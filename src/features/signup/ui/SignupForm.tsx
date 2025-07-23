'use client';

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
  EMAIL_EXISTS: '이미 사용 중인 이메일입니다',
  VALIDATION_ERROR: '유효한 이메일 주소를 입력하세요',
};

export const SignupForm = () => {
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
      loading: 'Saving...',
      success: () => {
        setTimeout(() => router.push(localeUrlFormatter(ROUTES.SIGNIN)), 2000);
        return <b>회원가입이 완료되었습니다.</b>;
      },
      error: (e) => {
        if (e.code === 'EMAIL_EXISTS' || e.code === 'VALIDATION_ERROR') {
          setError('email', {
            type: 'manual',
            message: ERROR_CASE[e.code as keyof typeof ERROR_CASE],
          });
        }
        return <b>회원가입에 실패했습니다.</b>;
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
