'use client';

import { useEffect, useState } from 'react';
import { getSignupImageSize } from '../utils/getSignupImageSize';

export const useSignupImageSize = () => {
  const [size, setSize] = useState<number>();

  useEffect(() => {
    const handleResize = () => {
      setSize(getSignupImageSize(window.innerWidth));
    };

    // 초기 사이즈 설정
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};
