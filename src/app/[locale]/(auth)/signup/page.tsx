'use client';

import { useSignupImageSize } from '@/features/signup/hooks/useSignupImageSize';
import SignupForm from '@/features/signup/ui/SignupForm';
import { LoginImageIcon } from '@/shared/ui/icon';

export default function SignUpPage() {
  const size = useSignupImageSize();

  return (
    <div className="max-w-web web:flex-row flex flex-1 flex-col items-center justify-between">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Welcome to 같이 달램!</h2>
        <p className="text-base">
          바쁜 일상 속 잠깐의 휴식, <br />
          이제는 같이 달램과 함께 해보세요
        </p>
        <LoginImageIcon size={size} />
      </div>
      <SignupForm />
    </div>
  );
}
