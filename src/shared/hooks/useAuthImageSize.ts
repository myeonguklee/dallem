'use client';

import { useEffect, useState } from 'react';
import { getAuthImageSize } from '../lib/getAuthImageSize';

export const useAuthImageSize = () => {
  const [size, setSize] = useState<number>();

  useEffect(() => {
    const handleResize = () => {
      setSize(getAuthImageSize(window.innerWidth));
    };

    // 초기 사이즈 설정
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};
