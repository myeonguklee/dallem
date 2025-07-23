'use client';

import Link from 'next/link';
import { ROUTES } from '@/shared/config/routes';
import { InputWithLabel } from '@/shared/ui/InputWithLabel';
import { Button } from '@/shared/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z
  .object({
    name: z.string().min(1, '이름을 입력해주세요.'),
    email: z.string().email('올바른 이메일 형식이어야 합니다.'),
    company: z.string().min(1, '회사명을 입력해주세요.'),
    password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
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

  const onSubmit = (data: FormData) => {
    console.log('회원가입 데이터:', data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="web:w-[510px] rounded-common tablet:px-16 tablet:py-8 mobile:px-4 mobile:py-8 tablet:w-[608px] flex w-full flex-col items-center gap-8 border border-gray-200"
    >
      <h1 className="text-2xl font-bold text-gray-900">회원가입</h1>

      <div className="flex w-full flex-col gap-6">
        <InputWithLabel
          label="이름"
          placeholder="이름을 입력해주세요"
          {...register('name')}
          errorMessage={errors.name?.message}
        />
        <InputWithLabel
          label="아이디"
          placeholder="이메일을 입력해주세요"
          {...register('email')}
          errorMessage={errors.email?.message}
        />
        <InputWithLabel
          label="회사명"
          placeholder="회사명을 입력해주세요"
          {...register('company')}
          errorMessage={errors.company?.message}
        />
        <InputWithLabel
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          variant={errors.password ? 'password_error' : 'password_default'}
          {...register('password')}
          errorMessage={errors.password?.message}
        />
        <InputWithLabel
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          type="password"
          variant={errors.confirmPassword ? 'password_error' : 'password_default'}
          {...register('confirmPassword')}
          errorMessage={errors.confirmPassword?.message}
        />
      </div>

      <Button
        type="submit"
        className="mt-3 w-full rounded-xl bg-gray-400 py-2.5 text-white transition hover:bg-gray-500"
      >
        확인
      </Button>

      <p className="pt-3 text-sm text-gray-500">
        이미 회원이신가요?
        <Link
          href={ROUTES.SIGNIN}
          className="text-orange-500 hover:underline"
        >
          로그인
        </Link>
      </p>
    </form>
  );
}
