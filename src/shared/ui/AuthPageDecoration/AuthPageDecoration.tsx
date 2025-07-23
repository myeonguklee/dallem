'use client';

import { useAuthImageSize } from '@/shared/hooks/useAuthImageSize';
import { LoginImageIcon } from '../icon';

export const AuthPageDecoration = () => {
  const size = useAuthImageSize();

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800">Welcome to 같이 달램!!</h2>
      <p className="text-base">
        바쁜 일상 속 잠깐의 휴식, <br />
        이제는 같이 달램과 함께 해보세요
      </p>

      <LoginImageIcon size={size} />
    </>
  );
};
